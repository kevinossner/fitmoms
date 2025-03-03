import { useState } from 'react';
import { supabase } from '../../lib/supabase';
import { useAuth } from '../auth/useAuth';

interface UseSessionAttendanceResult {
  signUp: (sessionId: string) => Promise<void>;
  signOff: (sessionId: string) => Promise<void>;
  isLoading: boolean;
  error: Error | null;
}

export function useSessionAttendance(): UseSessionAttendanceResult {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);
  const { user } = useAuth();

  const signUp = async (sessionId: string) => {
    if (!user) {
      throw new Error('You must be logged in to sign up for a session');
    }

    try {
      setIsLoading(true);
      setError(null);

      // Check if user is already signed up
      const { data: existingAttendance, error: checkError } = await supabase
        .from('session_attendances')
        .select('*')
        .eq('session_id', sessionId)
        .eq('user_id', user.id)
        .single();

      if (checkError && checkError.code !== 'PGRST116') {
        throw checkError;
      }

      if (existingAttendance) {
        throw new Error('You are already signed up for this session');
      }

      // Create new attendance record
      const { error: createError } = await supabase.from('session_attendances').insert({
        session_id: sessionId,
        user_id: user.id,
        status: 'signed_up',
      });

      if (createError) throw createError;
    } catch (err) {
      console.error('Error signing up for session:', err);
      setError(err instanceof Error ? err : new Error('Failed to sign up for session'));
      throw err;
    } finally {
      setIsLoading(false);
    }
  };

  const signOff = async (sessionId: string) => {
    if (!user) {
      throw new Error('You must be logged in to sign off from a session');
    }

    try {
      setIsLoading(true);
      setError(null);

      // Delete attendance record
      const { error: deleteError } = await supabase
        .from('session_attendances')
        .delete()
        .eq('session_id', sessionId)
        .eq('user_id', user.id);

      if (deleteError) throw deleteError;
    } catch (err) {
      console.error('Error signing off from session:', err);
      setError(err instanceof Error ? err : new Error('Failed to sign off from session'));
      throw err;
    } finally {
      setIsLoading(false);
    }
  };

  return {
    signUp,
    signOff,
    isLoading,
    error,
  };
}
