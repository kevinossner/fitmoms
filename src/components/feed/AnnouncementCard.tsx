import { View, StyleSheet } from 'react-native';
import { Card, Text, useTheme } from 'react-native-paper';
import { format } from 'date-fns';

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

  return (
    <Card
      style={[
        styles.card,
        isImportant && { borderLeftColor: theme.colors.error, borderLeftWidth: 4 },
      ]}
      mode="outlined"
    >
      <Card.Content>
        <View style={styles.header}>
          <Text variant="titleMedium" style={styles.title}>
            {title}
          </Text>
          <Text variant="bodySmall" style={{ color: theme.colors.secondary }}>
            {format(new Date(createdAt), 'MMM d, yyyy')}
          </Text>
        </View>
        <Text variant="bodyMedium" style={styles.content}>
          {content}
        </Text>
        <Text variant="bodySmall" style={{ color: theme.colors.secondary }}>
          Posted by {trainerName}
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
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  title: {
    flex: 1,
    marginRight: 8,
  },
  content: {
    marginBottom: 12,
  },
});
