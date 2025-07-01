
-- Enable necessary extensions
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- Create enum types
CREATE TYPE public.user_role AS ENUM ('user', 'admin', 'support');
CREATE TYPE public.exercise_type AS ENUM ('breathing', 'journaling', 'reflection');
CREATE TYPE public.alert_reason AS ENUM ('emergency_button', 'inactivity', 'mood_trigger');

-- Create profiles table (extends Supabase auth.users)
CREATE TABLE public.profiles (
  id UUID REFERENCES auth.users(id) ON DELETE CASCADE PRIMARY KEY,
  email TEXT NOT NULL,
  role public.user_role NOT NULL DEFAULT 'user',
  language TEXT NOT NULL DEFAULT 'en',
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT NOW()
);

-- Create moods table
CREATE TABLE public.moods (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
  mood_score INTEGER NOT NULL CHECK (mood_score >= 1 AND mood_score <= 5),
  note TEXT,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT NOW()
);

-- Create exercises table
CREATE TABLE public.exercises (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
  type public.exercise_type NOT NULL,
  duration_minutes INTEGER,
  notes TEXT,
  completed_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT NOW()
);

-- Create alerts table
CREATE TABLE public.alerts (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
  reason public.alert_reason NOT NULL,
  message TEXT,
  resolved BOOLEAN NOT NULL DEFAULT FALSE,
  resolved_by UUID REFERENCES auth.users(id),
  resolved_at TIMESTAMP WITH TIME ZONE,
  triggered_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT NOW()
);

-- Create feedback table
CREATE TABLE public.feedback (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
  week_start_date DATE NOT NULL,
  overall_rating INTEGER NOT NULL CHECK (overall_rating >= 1 AND overall_rating <= 5),
  app_helpfulness INTEGER NOT NULL CHECK (app_helpfulness >= 1 AND app_helpfulness <= 5),
  feature_satisfaction INTEGER NOT NULL CHECK (feature_satisfaction >= 1 AND feature_satisfaction <= 5),
  comments TEXT,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT NOW()
);

-- Create admin_comments table
CREATE TABLE public.admin_comments (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
  admin_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
  comment TEXT NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT NOW()
);

-- Create safety_plans table
CREATE TABLE public.safety_plans (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
  content TEXT NOT NULL,
  created_by UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT NOW()
);

-- Create motivational_messages table
CREATE TABLE public.motivational_messages (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  title TEXT NOT NULL,
  content TEXT NOT NULL,
  language TEXT NOT NULL DEFAULT 'en',
  is_active BOOLEAN NOT NULL DEFAULT TRUE,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT NOW()
);

-- Insert some default motivational messages
INSERT INTO public.motivational_messages (title, content, language) VALUES
('Welcome to Today', 'Every new day is a chance to grow and find peace within yourself. Take a deep breath and embrace the possibilities ahead.', 'en'),
('You Are Strong', 'Remember that you have overcome challenges before, and you have the strength to face whatever comes your way today.', 'en'),
('Mindful Moments', 'Take a moment to notice three things around you. This simple practice can help ground you in the present moment.', 'en'),
('Self-Compassion', 'Be kind to yourself today. Treat yourself with the same compassion you would show a good friend.', 'en'),
('Progress Not Perfection', 'Small steps forward are still progress. Celebrate the little victories along your journey.', 'en');

-- Enable Row Level Security
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.moods ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.exercises ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.alerts ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.feedback ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.admin_comments ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.safety_plans ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.motivational_messages ENABLE ROW LEVEL SECURITY;

-- Create security definer function to get user role
CREATE OR REPLACE FUNCTION public.get_user_role(user_uuid UUID)
RETURNS public.user_role
LANGUAGE SQL
SECURITY DEFINER
STABLE
AS $$
  SELECT role FROM public.profiles WHERE id = user_uuid;
$$;

-- Create function to check if user is admin or support
CREATE OR REPLACE FUNCTION public.is_admin_or_support(user_uuid UUID)
RETURNS BOOLEAN
LANGUAGE SQL
SECURITY DEFINER
STABLE
AS $$
  SELECT EXISTS (
    SELECT 1 FROM public.profiles 
    WHERE id = user_uuid AND role IN ('admin', 'support')
  );
$$;

-- RLS Policies for profiles
CREATE POLICY "Users can view own profile" ON public.profiles
  FOR SELECT USING (auth.uid() = id);

CREATE POLICY "Users can update own profile" ON public.profiles
  FOR UPDATE USING (auth.uid() = id);

CREATE POLICY "Admins can view all profiles" ON public.profiles
  FOR SELECT USING (public.is_admin_or_support(auth.uid()));

CREATE POLICY "Admins can update all profiles" ON public.profiles
  FOR UPDATE USING (public.is_admin_or_support(auth.uid()));

-- RLS Policies for moods
CREATE POLICY "Users can view own moods" ON public.moods
  FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "Users can insert own moods" ON public.moods
  FOR INSERT WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Admins can view all moods" ON public.moods
  FOR SELECT USING (public.is_admin_or_support(auth.uid()));

-- RLS Policies for exercises
CREATE POLICY "Users can view own exercises" ON public.exercises
  FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "Users can insert own exercises" ON public.exercises
  FOR INSERT WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Admins can view all exercises" ON public.exercises
  FOR SELECT USING (public.is_admin_or_support(auth.uid()));

-- RLS Policies for alerts
CREATE POLICY "Users can view own alerts" ON public.alerts
  FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "Users can insert own alerts" ON public.alerts
  FOR INSERT WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Admins can view all alerts" ON public.alerts
  FOR SELECT USING (public.is_admin_or_support(auth.uid()));

CREATE POLICY "Admins can update all alerts" ON public.alerts
  FOR UPDATE USING (public.is_admin_or_support(auth.uid()));

-- RLS Policies for feedback
CREATE POLICY "Users can view own feedback" ON public.feedback
  FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "Users can insert own feedback" ON public.feedback
  FOR INSERT WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Admins can view all feedback" ON public.feedback
  FOR SELECT USING (public.is_admin_or_support(auth.uid()));

-- RLS Policies for admin_comments
CREATE POLICY "Users can view comments about them" ON public.admin_comments
  FOR SELECT USING (auth.uid() = user_id OR public.is_admin_or_support(auth.uid()));

CREATE POLICY "Admins can insert comments" ON public.admin_comments
  FOR INSERT WITH CHECK (public.is_admin_or_support(auth.uid()) AND auth.uid() = admin_id);

-- RLS Policies for safety_plans
CREATE POLICY "Users can view own safety plan" ON public.safety_plans
  FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "Admins can view all safety plans" ON public.safety_plans
  FOR SELECT USING (public.is_admin_or_support(auth.uid()));

CREATE POLICY "Admins can insert safety plans" ON public.safety_plans
  FOR INSERT WITH CHECK (public.is_admin_or_support(auth.uid()) AND auth.uid() = created_by);

CREATE POLICY "Admins can update safety plans" ON public.safety_plans
  FOR UPDATE USING (public.is_admin_or_support(auth.uid()));

-- RLS Policies for motivational_messages
CREATE POLICY "All users can view active messages" ON public.motivational_messages
  FOR SELECT USING (is_active = true);

CREATE POLICY "Admins can manage messages" ON public.motivational_messages
  FOR ALL USING (public.is_admin_or_support(auth.uid()));

-- Create function to handle new user registration
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
BEGIN
  INSERT INTO public.profiles (id, email, role, language)
  VALUES (
    NEW.id,
    NEW.email,
    'user',
    COALESCE(NEW.raw_user_meta_data->>'language', 'en')
  );
  RETURN NEW;
END;
$$;

-- Create trigger for new user registration
CREATE OR REPLACE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();

-- Create function to get daily motivational message
CREATE OR REPLACE FUNCTION public.get_daily_message(user_language TEXT DEFAULT 'en')
RETURNS TABLE (
  id UUID,
  title TEXT,
  content TEXT,
  language TEXT
)
LANGUAGE SQL
SECURITY DEFINER
STABLE
AS $$
  SELECT m.id, m.title, m.content, m.language
  FROM public.motivational_messages m
  WHERE m.language = user_language AND m.is_active = true
  ORDER BY RANDOM()
  LIMIT 1;
$$;

-- Create function to get user weekly summary
CREATE OR REPLACE FUNCTION public.get_user_weekly_summary(
  user_uuid UUID,
  week_start DATE DEFAULT CURRENT_DATE - INTERVAL '7 days'
)
RETURNS JSON
LANGUAGE plpgsql
SECURITY DEFINER
AS $$
DECLARE
  result JSON;
  mood_stats JSON;
  exercise_stats JSON;
  recent_feedback JSON;
BEGIN
  -- Get mood statistics
  SELECT json_build_object(
    'average_mood', COALESCE(AVG(mood_score)::NUMERIC(3,2), 0),
    'total_entries', COUNT(*),
    'mood_distribution', json_agg(
      json_build_object('score', mood_score, 'count', count)
    )
  )
  INTO mood_stats
  FROM (
    SELECT mood_score, COUNT(*) as count
    FROM public.moods
    WHERE user_id = user_uuid 
    AND DATE(created_at) >= week_start
    GROUP BY mood_score
    ORDER BY mood_score
  ) mood_counts;

  -- Get exercise statistics
  SELECT json_build_object(
    'total_exercises', COUNT(*),
    'by_type', json_agg(
      json_build_object('type', type, 'count', count)
    )
  )
  INTO exercise_stats
  FROM (
    SELECT type, COUNT(*) as count
    FROM public.exercises
    WHERE user_id = user_uuid 
    AND DATE(completed_at) >= week_start
    GROUP BY type
  ) exercise_counts;

  -- Get recent feedback
  SELECT json_agg(
    json_build_object(
      'overall_rating', overall_rating,
      'comments', comments,
      'created_at', created_at
    )
  )
  INTO recent_feedback
  FROM public.feedback
  WHERE user_id = user_uuid 
  AND created_at >= week_start::TIMESTAMP
  ORDER BY created_at DESC;

  -- Combine all results
  SELECT json_build_object(
    'week_start', week_start,
    'mood_stats', COALESCE(mood_stats, '{}'),
    'exercise_stats', COALESCE(exercise_stats, '{}'),
    'recent_feedback', COALESCE(recent_feedback, '[]')
  )
  INTO result;

  RETURN result;
END;
$$;
