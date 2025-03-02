import { View, StyleSheet } from 'react-native';
import { Card, Text, useTheme, Avatar, IconButton } from 'react-native-paper';
import { format } from 'date-fns';
import { de } from 'date-fns/locale';
import { MaterialCommunityIcons } from '@expo/vector-icons';

interface AnnouncementCardProps {
  title: string;
  content: string;
  createdAt: string;
  isImportant: boolean;
  trainerName: string;
}

export const AnnouncementCard = ({
  title,
  content,
  createdAt,
  isImportant,
  trainerName,
}: AnnouncementCardProps) => {
  const theme = useTheme();
  const initials = trainerName
    .split(' ')
    .map(n => n[0])
    .join('')
    .toUpperCase();

  return (
    <Card
      style={[styles.card, isImportant && { backgroundColor: theme.colors.primaryContainer }]}
      mode="outlined"
    >
      <Card.Content style={styles.content}>
        <View style={styles.header}>
          <View style={styles.trainerInfo}>
            <Avatar.Text
              size={36}
              label={initials}
              style={{
                backgroundColor: isImportant ? theme.colors.primary : theme.colors.secondary,
              }}
            />
            <View style={styles.headerText}>
              <Text
                variant="titleMedium"
                style={[styles.title, isImportant && { color: theme.colors.onPrimaryContainer }]}
              >
                {title}
              </Text>
              <Text variant="bodySmall" style={{ color: theme.colors.onSurfaceVariant }}>
                {trainerName} • {format(new Date(createdAt), 'dd. MMMM', { locale: de })}
              </Text>
            </View>
          </View>
          {isImportant && (
            <MaterialCommunityIcons name="alert-circle" size={24} color={theme.colors.primary} />
          )}
        </View>
        <Text
          variant="bodyMedium"
          style={[styles.contentText, isImportant && { color: theme.colors.onPrimaryContainer }]}
        >
          {content}
        </Text>
      </Card.Content>
    </Card>
  );
};

const styles = StyleSheet.create({
  card: {
    marginHorizontal: 16,
    marginVertical: 8,
  },
  content: {
    gap: 12,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
  },
  trainerInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  headerText: {
    marginLeft: 12,
    flex: 1,
  },
  title: {
    fontWeight: '600',
  },
  contentText: {
    lineHeight: 20,
  },
});
