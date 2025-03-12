import React, { useState, useMemo } from 'react';
import { View, StyleSheet, SafeAreaView, ScrollView } from 'react-native';
import { Text, ActivityIndicator } from 'react-native-paper';
import { Stack } from 'expo-router';
import { useFocusEffect } from '@react-navigation/native';
import { Calendar } from 'react-native-calendars';
import { format } from 'date-fns';
import { de } from 'date-fns/locale';
import { useSubscribedSessions } from '../../../../hooks/sessions/useSubscribedSessions';
import { SessionCard } from '../../../../components/sessions/SessionCard';
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
    dotColor?: string;
    selected?: boolean;
  };
};

export default function CalendarScreen() {
  const { sessions, isLoading, error, refetch } = useSubscribedSessions();
  const [selectedDate, setSelectedDate] = useState<string | null>(null);

  useFocusEffect(
    React.useCallback(() => {
      setSelectedDate(format(new Date(), 'yyyy-MM-dd'));
    }, [])
  );

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

    // Mark all dates with sessions
    Object.keys(sessionsByDate).forEach(date => {
      dates[date] = {
        marked: true,
        dotColor: customTheme.colors.primary,
        selected: date === selectedDate,
      };
    });

    // Always mark selected date, even if it has no sessions
    if (selectedDate && !dates[selectedDate]) {
      dates[selectedDate] = {
        marked: false,
        selected: true,
      };
    }

    return dates;
  }, [sessionsByDate, selectedDate]);

  const handleDateSelected = (date: { dateString: string }) => {
    setSelectedDate(date.dateString);
  };

  if (isLoading) {
    return (
      <SafeAreaView style={styles.container}>
        <View style={styles.centered}>
          <ActivityIndicator size="large" color={customTheme.colors.primary} />
        </View>
      </SafeAreaView>
    );
  }

  if (error) {
    return (
      <SafeAreaView style={styles.container}>
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
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
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
      <View style={styles.calendarContainer}>
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
            arrowColor: customTheme.colors.primary,
            textMonthFontSize: 16,
            textDayFontSize: 14,
            textDayHeaderFontSize: 14,
          }}
          markedDates={markedDates}
          onDayPress={handleDateSelected}
          firstDay={1}
          enableSwipeMonths={true}
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
          dayNames={[
            'Sonntag',
            'Montag',
            'Dienstag',
            'Mittwoch',
            'Donnerstag',
            'Freitag',
            'Samstag',
          ]}
          dayNamesShort={['So', 'Mo', 'Di', 'Mi', 'Do', 'Fr', 'Sa']}
        />
      </View>

      <ScrollView style={styles.sessionsContainer}>
        {selectedDate && sessionsByDate[selectedDate]?.length > 0 ? (
          <>
            <Text variant="titleMedium" style={styles.sessionListTitle}>
              Termine am {format(new Date(selectedDate), 'dd.MM.yyyy', { locale: de })}
            </Text>
            {sessionsByDate[selectedDate].map(session => (
              <SessionCard key={session.id} session={session} onUpdate={refetch} />
            ))}
          </>
        ) : selectedDate ? (
          <Text variant="bodyMedium" style={styles.noSessions}>
            Keine Termine an diesem Tag
          </Text>
        ) : null}
      </ScrollView>
    </SafeAreaView>
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
  calendarContainer: {
    backgroundColor: customTheme.colors.background,
    paddingBottom: customTheme.spacing.m,
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
  noSessions: {
    textAlign: 'center',
    color: customTheme.colors.outline,
  },
  error: {
    color: customTheme.colors.error,
  },
});
