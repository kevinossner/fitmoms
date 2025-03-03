import { useState, useEffect } from 'react';
import { supabase } from '../../lib/supabase';

interface AttendanceStats {
  total: number;
  attended: number;
  noShow: number;
  excused: number;
  signedUp: number;
  attendanceRate: number;
}

interface UseSubscriptionStatsResult {
  stats: AttendanceStats | null;
  isLoading: boolean;
  error: Error | null;
  refetch: () => void;
}

export function useSubscriptionStats(subscriptionId: string): UseSubscriptionStatsResult {
  const [stats, setStats] = useState<AttendanceStats | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  const fetchStats = async () => {
    if (!subscriptionId) {
      setStats(null);
      setIsLoading(false);
      return;
    }

    try {
      setIsLoading(true);
      setError(null);

      // First, get the course_id and user_id from the subscription
      const { data: subscription, error: subscriptionError } = await supabase
        .from('subscriptions')
        .select('course_id, user_id')
        .eq('id', subscriptionId)
        .single();

      if (subscriptionError) throw subscriptionError;
      if (!subscription) throw new Error('Subscription not found');

      // Then, get all sessions for this course
      const { data: attendances, error: attendancesError } = await supabase
        .from('session_attendances')
        .select('status, sessions!inner(*)')
        .eq('user_id', subscription.user_id)
        .eq('sessions.course_id', subscription.course_id);

      if (attendancesError) throw attendancesError;

      // Calculate statistics
      const total = attendances?.length || 0;
      const attended = attendances?.filter(a => a.status === 'attended').length || 0;
      const noShow = attendances?.filter(a => a.status === 'no_show').length || 0;
      const excused = attendances?.filter(a => a.status === 'excused').length || 0;
      const signedUp = attendances?.filter(a => a.status === 'signed_up').length || 0;

      setStats({
        total,
        attended,
        noShow,
        excused,
        signedUp,
        attendanceRate: total > 0 ? (attended / total) * 100 : 0,
      });
    } catch (err) {
      console.error('Error fetching subscription stats:', err);
      setError(err instanceof Error ? err : new Error('Failed to fetch subscription statistics'));
      setStats(null);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchStats();
  }, [subscriptionId]);

  return {
    stats,
    isLoading,
    error,
    refetch: fetchStats,
  };
}
