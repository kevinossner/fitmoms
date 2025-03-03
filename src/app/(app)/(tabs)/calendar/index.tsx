import React, { useState, useMemo } from 'react';
import { View, StyleSheet } from 'react-native';
import { Text, ActivityIndicator } from 'react-native-paper';
import { Stack } from 'expo-router';
import { Calendar } from 'react-native-calendars';
import { format } from 'date-fns';
import { de } from 'date-fns/locale';
import { useSubscribedSessions } from '../../../../hooks/sessions/useSubscribedSessions';
import { SessionDetailsModal } from '../../../../components/sessions/SessionDetailsModal';
import { customTheme } from '../../../../styles/theme';
import { Database } from '../../../../types/database.types';

type Session = Database['public']['Tables']['sessions']['Row'] & {
  course: Database['public']['Tables']['courses']['Row'];
  attendance?: Database['public']['Tables']['session_attendances']['Row'];
};

type SessionsByDate = {
  [date: string]: Session[];
};

type MarkedDates = {
  [date: string]: {
    marked: boolean;
    dotColor: string;
    selected?: boolean;
  };
};

export default function CalendarScreen() {
  const { sessions, isLoading, error, refetch } = useSubscribedSessions();
  const [selectedDate, setSelectedDate] = useState<string | null>(null);
  const [selectedSession, setSelectedSession] = useState<Session | null>(null);
  const [modalVisible, setModalVisible] = useState(false);

  // Group sessions by date
  const sessionsByDate = useMemo(() => {
    if (!sessions) return {};
    return sessions.reduce((acc: SessionsByDate, session) => {
      const date = format(new Date(session.start_time), 'yyyy-MM-dd');
      if (!acc[date]) {
        acc[date] = [];
      }
      acc[date].push(session);
      return acc;
    }, {});
  }, [sessions]);

  // Get marked dates for the calendar
  const markedDates = useMemo(() => {
    const dates: MarkedDates = {};
    Object.keys(sessionsByDate).forEach(date => {
      dates[date] = {
        marked: true,
        dotColor: customTheme.colors.primary,
        selected: date === selectedDate,
      };
    });
    return dates;
  }, [sessionsByDate, selectedDate]);

  const handleDateSelected = (date: { dateString: string }) => {
    const formattedDate = date.dateString;
    setSelectedDate(formattedDate);
    const sessionsOnDate = sessionsByDate[formattedDate];
    if (sessionsOnDate?.length === 1) {
      // If there's only one session on this date, show it directly
      setSelectedSession(sessionsOnDate[0]);
      setModalVisible(true);
    }
    // If there are multiple sessions, they will be shown in the list below
  };

  if (isLoading) {
    return (
      <View style={styles.container}>
        <Stack.Screen
          options={{
            title: 'Kalender',
            headerLargeTitle: true,
            headerLargeTitleStyle: {
              fontFamily: 'System',
            },
            headerStyle: {
              backgroundColor: customTheme.colors.background,
            },
            headerShadowVisible: false,
          }}
        />
        <View style={styles.centered}>
          <ActivityIndicator size="large" color={customTheme.colors.primary} />
        </View>
      </View>
    );
  }

  if (error) {
    return (
      <View style={styles.container}>
        <Stack.Screen
          options={{
            title: 'Kalender',
            headerLargeTitle: true,
            headerLargeTitleStyle: {
              fontFamily: 'System',
            },
            headerStyle: {
              backgroundColor: customTheme.colors.background,
            },
            headerShadowVisible: false,
          }}
        />
        <View style={styles.centered}>
          <Text style={styles.error}>Fehler beim Laden der Termine</Text>
        </View>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Stack.Screen
        options={{
          title: 'Kalender',
          headerLargeTitle: true,
          headerLargeTitleStyle: {
            fontFamily: 'System',
          },
          headerStyle: {
            backgroundColor: customTheme.colors.background,
          },
          headerShadowVisible: false,
        }}
      />
      <Calendar
        style={styles.calendar}
        theme={{
          backgroundColor: customTheme.colors.background,
          calendarBackground: customTheme.colors.background,
          textSectionTitleColor: customTheme.colors.onBackground,
          selectedDayBackgroundColor: customTheme.colors.primaryContainer,
          selectedDayTextColor: customTheme.colors.onPrimaryContainer,
          todayTextColor: customTheme.colors.primary,
          dayTextColor: customTheme.colors.onBackground,
          textDisabledColor: customTheme.colors.outline,
          dotColor: customTheme.colors.primary,
          monthTextColor: customTheme.colors.onBackground,
          textMonthFontSize: 16,
          textDayFontSize: 14,
          textDayHeaderFontSize: 14,
        }}
        markedDates={markedDates}
        onDayPress={handleDateSelected}
        firstDay={1} // Start week on Monday
        enableSwipeMonths={true}
        // German month names and weekday names
        monthNames={[
          'Januar',
          'Februar',
          'März',
          'April',
          'Mai',
          'Juni',
          'Juli',
          'August',
          'September',
          'Oktober',
          'November',
          'Dezember',
        ]}
        dayNames={['Sonntag', 'Montag', 'Dienstag', 'Mittwoch', 'Donnerstag', 'Freitag', 'Samstag']}
        dayNamesShort={['So', 'Mo', 'Di', 'Mi', 'Do', 'Fr', 'Sa']}
      />

      {selectedDate && sessionsByDate[selectedDate]?.length > 1 && (
        <View style={styles.sessionsContainer}>
          <Text variant="titleMedium" style={styles.sessionListTitle}>
            Termine am {format(new Date(selectedDate), 'dd.MM.yyyy', { locale: de })}
          </Text>
          {sessionsByDate[selectedDate].map(session => (
            <View
              key={session.id}
              style={styles.sessionItem}
              onTouchEnd={() => {
                setSelectedSession(session);
                setModalVisible(true);
              }}
            >
              <Text variant="titleSmall">{session.course.name}</Text>
              <Text variant="bodyMedium">
                {format(new Date(session.start_time), 'HH:mm')} -{' '}
                {format(new Date(session.end_time), 'HH:mm')}
              </Text>
            </View>
          ))}
        </View>
      )}

      <SessionDetailsModal
        visible={modalVisible}
        session={selectedSession}
        onDismiss={() => {
          setModalVisible(false);
          setSelectedSession(null);
        }}
        onUpdate={refetch}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: customTheme.colors.background,
  },
  centered: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: customTheme.spacing.m,
  },
  calendar: {
    marginBottom: customTheme.spacing.m,
  },
  sessionsContainer: {
    flex: 1,
    padding: customTheme.spacing.m,
  },
  sessionListTitle: {
    marginBottom: customTheme.spacing.m,
  },
  sessionItem: {
    padding: customTheme.spacing.m,
    backgroundColor: customTheme.colors.surface,
    borderRadius: 8,
    marginBottom: customTheme.spacing.s,
    elevation: 1,
  },
  error: {
    color: customTheme.colors.error,
  },
});
