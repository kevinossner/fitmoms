import React from 'react';
import { View, StyleSheet } from 'react-native';
import { Card, Text, Button, IconButton, useTheme } from 'react-native-paper';
import { format } from 'date-fns';
import { de } from 'date-fns/locale';
import { useSessionAttendance } from '../../hooks/sessions/useSessionAttendance';
import { Database } from '../../types/database.types';
import { customTheme } from '../../styles/theme';

type Session = Database['public']['Tables']['sessions']['Row'] & {
  course: Database['public']['Tables']['courses']['Row'];
  attendance?: Database['public']['Tables']['session_attendances']['Row'];
};

interface SessionCardProps {
  session: Session;
  onUpdate: () => void;
}

export function SessionCard({ session, onUpdate }: SessionCardProps) {
  const { signUp, signOff, isLoading } = useSessionAttendance();
  const theme = useTheme();

  const isSignedUp = !!session.attendance;
  const isCancelled = session.is_cancelled;

  const handleAttendance = async () => {
    try {
      if (isSignedUp) {
        await signOff(session.id);
      } else {
        await signUp(session.id);
      }
      onUpdate();
    } catch (error) {
      // Error is handled by the hook
    }
  };

  return (
    <Card style={styles.card}>
      <Card.Content>
        <View style={styles.header}>
          <View style={styles.titleContainer}>
            <Text variant="titleMedium">{session.course.name}</Text>
            {isCancelled && (
              <Text variant="bodyMedium" style={styles.cancelled}>
                Abgesagt
              </Text>
            )}
          </View>
          {!isCancelled && (
            <IconButton
              icon={isSignedUp ? 'check-circle' : 'plus-circle-outline'}
              iconColor={isSignedUp ? theme.colors.primary : theme.colors.onSurfaceVariant}
              onPress={handleAttendance}
              disabled={isLoading}
            />
          )}
        </View>

        <View style={styles.details}>
          <View style={styles.detailRow}>
            <IconButton icon="clock-outline" size={20} />
            <Text variant="bodyMedium">
              {format(new Date(session.start_time), 'EEEE, d. MMMM yyyy', { locale: de })}
            </Text>
          </View>
          <View style={styles.detailRow}>
            <IconButton icon="clock" size={20} />
            <Text variant="bodyMedium">
              {format(new Date(session.start_time), 'HH:mm')} -{' '}
              {format(new Date(session.end_time), 'HH:mm')}
            </Text>
          </View>
          <View style={styles.detailRow}>
            <IconButton icon="map-marker" size={20} />
            <Text variant="bodyMedium">{session.location}</Text>
          </View>
        </View>

        {isCancelled && session.cancellation_reason && (
          <View style={styles.cancellationReason}>
            <Text variant="bodyMedium" style={{ color: theme.colors.error }}>
              Grund: {session.cancellation_reason}
            </Text>
          </View>
        )}
      </Card.Content>
    </Card>
  );
}

const styles = StyleSheet.create({
  card: {
    marginBottom: customTheme.spacing.m,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  titleContainer: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    gap: customTheme.spacing.s,
  },
  cancelled: {
    color: customTheme.colors.error,
    fontWeight: '500',
  },
  details: {
    marginTop: customTheme.spacing.s,
  },
  detailRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 2,
  },
  cancellationReason: {
    marginTop: customTheme.spacing.m,
    padding: customTheme.spacing.s,
    backgroundColor: customTheme.colors.errorContainer,
    borderRadius: 4,
  },
});
