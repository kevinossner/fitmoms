import React from 'react';
import { View, StyleSheet, ScrollView } from 'react-native';
import { Modal, Portal, Text, Button, IconButton, useTheme } from 'react-native-paper';
import { format } from 'date-fns';
import { de } from 'date-fns/locale';
import { useSessionAttendance } from '../../hooks/sessions/useSessionAttendance';
import { Database } from '../../types/database.types';
import { customTheme } from '../../styles/theme';

type Session = Database['public']['Tables']['sessions']['Row'] & {
  course: Database['public']['Tables']['courses']['Row'];
  attendance?: Database['public']['Tables']['session_attendances']['Row'];
};

interface SessionDetailsModalProps {
  visible: boolean;
  session: Session | null;
  onDismiss: () => void;
  onUpdate: () => void;
}

export function SessionDetailsModal({
  visible,
  session,
  onDismiss,
  onUpdate,
}: SessionDetailsModalProps) {
  const { signUp, signOff, isLoading } = useSessionAttendance();
  const theme = useTheme();

  if (!session) return null;

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
    <Portal>
      <Modal visible={visible} onDismiss={onDismiss} contentContainerStyle={styles.modalContainer}>
        <View style={styles.header}>
          <IconButton icon="close" onPress={onDismiss} />
          <Text variant="titleLarge" style={styles.title}>
            {session.course.name}
          </Text>
        </View>
        <ScrollView style={styles.content}>
          <View style={styles.detailRow}>
            <IconButton icon="calendar" size={24} />
            <Text variant="bodyLarge">
              {format(new Date(session.start_time), 'EEEE, d. MMMM yyyy', { locale: de })}
            </Text>
          </View>
          <View style={styles.detailRow}>
            <IconButton icon="clock" size={24} />
            <Text variant="bodyLarge">
              {format(new Date(session.start_time), 'HH:mm')} -{' '}
              {format(new Date(session.end_time), 'HH:mm')}
            </Text>
          </View>
          <View style={styles.detailRow}>
            <IconButton icon="map-marker" size={24} />
            <Text variant="bodyLarge">{session.location}</Text>
          </View>
          {session.max_participants && (
            <View style={styles.detailRow}>
              <IconButton icon="account-group" size={24} />
              <Text variant="bodyLarge">Max. Teilnehmer: {session.max_participants}</Text>
            </View>
          )}
          {isCancelled && session.cancellation_reason && (
            <View style={styles.cancellationContainer}>
              <Text variant="titleMedium" style={{ color: theme.colors.error }}>
                Abgesagt
              </Text>
              <Text variant="bodyLarge" style={styles.cancellationReason}>
                Grund: {session.cancellation_reason}
              </Text>
            </View>
          )}
        </ScrollView>
        {!isCancelled && (
          <View style={styles.actions}>
            <Button
              mode="contained"
              onPress={handleAttendance}
              loading={isLoading}
              disabled={isLoading}
              style={styles.button}
            >
              {isSignedUp ? 'Abmelden' : 'Anmelden'}
            </Button>
          </View>
        )}
      </Modal>
    </Portal>
  );
}

const styles = StyleSheet.create({
  modalContainer: {
    backgroundColor: 'white',
    margin: customTheme.spacing.m,
    borderRadius: 8,
    maxHeight: '80%',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: customTheme.spacing.s,
    borderBottomWidth: 1,
    borderBottomColor: customTheme.colors.outlineVariant,
  },
  title: {
    flex: 1,
    marginLeft: customTheme.spacing.s,
  },
  content: {
    padding: customTheme.spacing.m,
  },
  detailRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: customTheme.spacing.m,
  },
  cancellationContainer: {
    backgroundColor: customTheme.colors.errorContainer,
    padding: customTheme.spacing.m,
    borderRadius: 8,
    marginTop: customTheme.spacing.m,
  },
  cancellationReason: {
    marginTop: customTheme.spacing.s,
  },
  actions: {
    padding: customTheme.spacing.m,
    borderTopWidth: 1,
    borderTopColor: customTheme.colors.outlineVariant,
  },
  button: {
    width: '100%',
  },
});
