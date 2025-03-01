-- Create enum types
CREATE TYPE payment_status AS ENUM ('pending', 'paid', 'overdue');
CREATE TYPE attendance_status AS ENUM ('signed_up', 'attended', 'no_show', 'excused');

-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- Create users table
CREATE TABLE users (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    email TEXT UNIQUE NOT NULL,
    first_name TEXT NOT NULL,
    last_name TEXT NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL,
    is_trainer BOOLEAN DEFAULT false NOT NULL,
    avatar_url TEXT
);

-- Create courses table
CREATE TABLE courses (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    name TEXT NOT NULL,
    description TEXT NOT NULL,
    max_participants INTEGER NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL,
    created_by UUID REFERENCES users(id) NOT NULL,
    is_active BOOLEAN DEFAULT true NOT NULL
);

-- Create sessions table
CREATE TABLE sessions (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    course_id UUID REFERENCES courses(id) NOT NULL,
    start_time TIMESTAMP WITH TIME ZONE NOT NULL,
    end_time TIMESTAMP WITH TIME ZONE NOT NULL,
    location TEXT NOT NULL,
    max_participants INTEGER,
    is_cancelled BOOLEAN DEFAULT false NOT NULL,
    cancellation_reason TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL
);

-- Create subscriptions table
CREATE TABLE subscriptions (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID REFERENCES users(id) NOT NULL,
    course_id UUID REFERENCES courses(id) NOT NULL,
    start_date DATE NOT NULL,
    end_date DATE NOT NULL,
    payment_status payment_status DEFAULT 'pending' NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL
);

-- Create session_attendances table
CREATE TABLE session_attendances (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    session_id UUID REFERENCES sessions(id) NOT NULL,
    user_id UUID REFERENCES users(id) NOT NULL,
    status attendance_status NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL
);

-- Create announcements table
CREATE TABLE announcements (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    title TEXT NOT NULL,
    content TEXT NOT NULL,
    created_by UUID REFERENCES users(id) NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL,
    is_important BOOLEAN DEFAULT false NOT NULL
);

-- Create indexes for better query performance
CREATE INDEX idx_sessions_course_id ON sessions(course_id);
CREATE INDEX idx_subscriptions_user_id ON subscriptions(user_id);
CREATE INDEX idx_subscriptions_course_id ON subscriptions(course_id);
CREATE INDEX idx_session_attendances_session_id ON session_attendances(session_id);
CREATE INDEX idx_session_attendances_user_id ON session_attendances(user_id);
CREATE INDEX idx_announcements_created_by ON announcements(created_by);

-- Set up Row Level Security (RLS)
ALTER TABLE users ENABLE ROW LEVEL SECURITY;
ALTER TABLE courses ENABLE ROW LEVEL SECURITY;
ALTER TABLE sessions ENABLE ROW LEVEL SECURITY;
ALTER TABLE subscriptions ENABLE ROW LEVEL SECURITY;
ALTER TABLE session_attendances ENABLE ROW LEVEL SECURITY;
ALTER TABLE announcements ENABLE ROW LEVEL SECURITY;

-- Create policies
-- Users can read all users
CREATE POLICY "Users can read all users" ON users
    FOR SELECT USING (true);

-- Users can update their own profile
CREATE POLICY "Users can update own profile" ON users
    FOR UPDATE USING (auth.uid() = id);

-- Trainers can read all courses
CREATE POLICY "Trainers can read all courses" ON courses
    FOR SELECT USING (EXISTS (
        SELECT 1 FROM users WHERE id = auth.uid() AND is_trainer = true
    ));

-- Users can read active courses
CREATE POLICY "Users can read active courses" ON courses
    FOR SELECT USING (is_active = true);

-- Trainers can manage courses
CREATE POLICY "Trainers can manage courses" ON courses
    FOR ALL USING (EXISTS (
        SELECT 1 FROM users WHERE id = auth.uid() AND is_trainer = true
    ));

-- Similar policies for other tables...
-- Add more specific policies based on your application's requirements 