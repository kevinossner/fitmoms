export type Json = string | number | boolean | null | { [key: string]: Json | undefined } | Json[];

export type Database = {
  public: {
    Tables: {
      users: {
        Row: {
          id: string;
          email: string;
          first_name: string;
          last_name: string;
          created_at: string;
          is_trainer: boolean;
          avatar_url: string | null;
        };
        Insert: {
          id?: string;
          email: string;
          first_name: string;
          last_name: string;
          created_at?: string;
          is_trainer?: boolean;
          avatar_url?: string | null;
        };
        Update: {
          id?: string;
          email?: string;
          first_name?: string;
          last_name?: string;
          created_at?: string;
          is_trainer?: boolean;
          avatar_url?: string | null;
        };
      };
      courses: {
        Row: {
          id: string;
          name: string;
          description: string;
          max_participants: number;
          created_at: string;
          created_by: string;
          is_active: boolean;
        };
        Insert: {
          id?: string;
          name: string;
          description: string;
          max_participants: number;
          created_at?: string;
          created_by: string;
          is_active?: boolean;
        };
        Update: {
          id?: string;
          name?: string;
          description?: string;
          max_participants?: number;
          created_at?: string;
          created_by?: string;
          is_active?: boolean;
        };
      };
      sessions: {
        Row: {
          id: string;
          course_id: string;
          start_time: string;
          end_time: string;
          location: string;
          max_participants: number | null;
          is_cancelled: boolean;
          cancellation_reason: string | null;
          created_at: string;
        };
        Insert: {
          id?: string;
          course_id: string;
          start_time: string;
          end_time: string;
          location: string;
          max_participants?: number | null;
          is_cancelled?: boolean;
          cancellation_reason?: string | null;
          created_at?: string;
        };
        Update: {
          id?: string;
          course_id?: string;
          start_time?: string;
          end_time?: string;
          location?: string;
          max_participants?: number | null;
          is_cancelled?: boolean;
          cancellation_reason?: string | null;
          created_at?: string;
        };
      };
      subscriptions: {
        Row: {
          id: string;
          user_id: string;
          course_id: string;
          start_date: string;
          end_date: string;
          payment_status: 'pending' | 'paid' | 'overdue';
          created_at: string;
        };
        Insert: {
          id?: string;
          user_id: string;
          course_id: string;
          start_date: string;
          end_date: string;
          payment_status?: 'pending' | 'paid' | 'overdue';
          created_at?: string;
        };
        Update: {
          id?: string;
          user_id?: string;
          course_id?: string;
          start_date?: string;
          end_date?: string;
          payment_status?: 'pending' | 'paid' | 'overdue';
          created_at?: string;
        };
      };
      session_attendances: {
        Row: {
          id: string;
          session_id: string;
          user_id: string;
          status: 'signed_up' | 'attended' | 'no_show' | 'excused';
          created_at: string;
        };
        Insert: {
          id?: string;
          session_id: string;
          user_id: string;
          status: 'signed_up' | 'attended' | 'no_show' | 'excused';
          created_at?: string;
        };
        Update: {
          id?: string;
          session_id?: string;
          user_id?: string;
          status?: 'signed_up' | 'attended' | 'no_show' | 'excused';
          created_at?: string;
        };
      };
      announcements: {
        Row: {
          id: string;
          title: string;
          content: string;
          created_by: string;
          created_at: string;
          is_important: boolean;
        };
        Insert: {
          id?: string;
          title: string;
          content: string;
          created_by: string;
          created_at?: string;
          is_important?: boolean;
        };
        Update: {
          id?: string;
          title?: string;
          content?: string;
          created_by?: string;
          created_at?: string;
          is_important?: boolean;
        };
      };
    };
  };
};
