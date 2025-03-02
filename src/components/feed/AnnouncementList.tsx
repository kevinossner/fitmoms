import { useEffect, useState } from 'react';
import { FlatList, RefreshControl, StyleSheet } from 'react-native';
import { ActivityIndicator, Text } from 'react-native-paper';
import { supabase } from '../../lib/supabase';
import { AnnouncementCard } from './AnnouncementCard';

interface Announcement {
  id: string;
  title: string;
  content: string;
  created_at: string;
  is_important: boolean;
  created_by: string;
  users: {
    first_name: string;
    last_name: string;
  };
}

export const AnnouncementList = () => {
  const [announcements, setAnnouncements] = useState<Announcement[]>([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);

  const fetchAnnouncements = async () => {
    try {
      const { data, error } = await supabase
        .from('announcements')
        .select(
          `
          *,
          users (
            first_name,
            last_name
          )
        `
        )
        .order('created_at', { ascending: false });

      if (error) throw error;
      setAnnouncements(data || []);
    } catch (error) {
      console.error('Error fetching announcements:', error);
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  };

  useEffect(() => {
    fetchAnnouncements();

    // Subscribe to real-time updates
    const subscription = supabase
      .channel('announcements')
      .on(
        'postgres_changes',
        {
          event: '*',
          schema: 'public',
          table: 'announcements',
        },
        () => {
          fetchAnnouncements();
        }
      )
      .subscribe();

    return () => {
      subscription.unsubscribe();
    };
  }, []);

  const onRefresh = () => {
    setRefreshing(true);
    fetchAnnouncements();
  };

  if (loading) {
    return <ActivityIndicator style={styles.loader} />;
  }

  return (
    <FlatList
      data={announcements}
      keyExtractor={item => item.id}
      renderItem={({ item }) => (
        <AnnouncementCard
          title={item.title}
          content={item.content}
          createdAt={item.created_at}
          isImportant={item.is_important}
          trainerName={`${item.users.first_name} ${item.users.last_name}`}
        />
      )}
      contentContainerStyle={styles.list}
      refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}
      ListEmptyComponent={<Text style={styles.emptyText}>No announcements yet</Text>}
    />
  );
};

const styles = StyleSheet.create({
  list: {
    paddingVertical: 16,
  },
  loader: {
    marginTop: 20,
  },
  emptyText: {
    textAlign: 'center',
    marginTop: 20,
  },
});
