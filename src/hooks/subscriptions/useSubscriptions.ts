import { useState, useEffect } from 'react';
import { supabase } from '../../lib/supabase';
import { useAuth } from '../auth/useAuth';
import { Database } from '../../types/database.types';

type Subscription = Database['public']['Tables']['subscriptions']['Row'] & {
  course: Database['public']['Tables']['courses']['Row'];
};

interface UseSubscriptionsResult {
  subscriptions: Subscription[];
  isLoading: boolean;
  error: Error | null;
  refetch: () => Promise<void>;
}

export function useSubscriptions(): UseSubscriptionsResult {
  const [subscriptions, setSubscriptions] = useState<Subscription[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);
  const { user } = useAuth();

  const fetchSubscriptions = async () => {
    if (!user) {
      setSubscriptions([]);
      setIsLoading(false);
      return;
    }

    try {
      setIsLoading(true);
      setError(null);

      const { data, error: supabaseError } = await supabase
        .from('subscriptions')
        .select(
          `
          *,
          course:courses(*)
        `
        )
        .eq('user_id', user.id)
        .order('created_at', { ascending: false });

      if (supabaseError) {
        throw supabaseError;
      }

      setSubscriptions(data || []);
    } catch (err) {
      console.error('Error fetching subscriptions:', err);
      setError(err instanceof Error ? err : new Error('Failed to fetch subscriptions'));
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchSubscriptions();
  }, [user]);

  return {
    subscriptions,
    isLoading,
    error,
    refetch: fetchSubscriptions,
  };
}
