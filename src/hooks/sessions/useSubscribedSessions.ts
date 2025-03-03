import { useState, useEffect } from 'react';
import { supabase } from '../../lib/supabase';
import { useAuth } from '../auth/useAuth';
import { Database } from '../../types/database.types';

type Session = Database['public']['Tables']['sessions']['Row'] & {
  course: Database['public']['Tables']['courses']['Row'];
  attendance?: Database['public']['Tables']['session_attendances']['Row'];
};

interface UseSubscribedSessionsResult {
  sessions: Session[];
  isLoading: boolean;
  error: Error | null;
  refetch: () => Promise<void>;
}

export function useSubscribedSessions(): UseSubscribedSessionsResult {
  const [sessions, setSessions] = useState<Session[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);
  const { user } = useAuth();

  const fetchSessions = async () => {
    if (!user) {
      setSessions([]);
      setIsLoading(false);
      return;
    }

    try {
      setIsLoading(true);
      setError(null);

      // First, get all courses the user is subscribed to
      const { data: subscriptions, error: subscriptionsError } = await supabase
        .from('subscriptions')
        .select('course_id')
        .eq('user_id', user.id);

      if (subscriptionsError) throw subscriptionsError;

      if (!subscriptions || subscriptions.length === 0) {
        setSessions([]);
        return;
      }

      const courseIds = subscriptions.map(sub => sub.course_id);

      // Then, get all sessions for these courses
      const { data: sessionData, error: sessionsError } = await supabase
        .from('sessions')
        .select(
          `
          *,
          course:courses(*),
          attendance:session_attendances(*)
        `
        )
        .in('course_id', courseIds)
        .eq('attendance.user_id', user.id)
        .gte('start_time', new Date().toISOString()) // Only future sessions
        .order('start_time', { ascending: true });

      if (sessionsError) throw sessionsError;

      setSessions(sessionData || []);
    } catch (err) {
      console.error('Error fetching sessions:', err);
      setError(err instanceof Error ? err : new Error('Failed to fetch sessions'));
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchSessions();
  }, [user]);

  return {
    sessions,
    isLoading,
    error,
    refetch: fetchSessions,
  };
}
