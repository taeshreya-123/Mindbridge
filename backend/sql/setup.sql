CREATE EXTENSION IF NOT EXISTS pgcrypto;

CREATE TABLE IF NOT EXISTS profiles (
    id uuid PRIMARY KEY REFERENCES auth.users(id),
    full_name text,
    student_id text,
    created_at timestamp DEFAULT now()
);

CREATE TABLE IF NOT EXISTS mood_entries (
    id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id uuid REFERENCES auth.users(id),
    mood integer CHECK (mood >= 0 AND mood <= 100),
    created_at timestamp DEFAULT now()
);

CREATE TABLE IF NOT EXISTS journal_entries (
    id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id uuid REFERENCES auth.users(id),
    entry_text text,
    created_at timestamp DEFAULT now()
);

CREATE TABLE IF NOT EXISTS checkins (
    id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id uuid REFERENCES auth.users(id),
    streak_count integer DEFAULT 0,
    created_at timestamp DEFAULT now()
);

CREATE INDEX IF NOT EXISTS profiles_created_at_idx ON profiles (created_at);
CREATE INDEX IF NOT EXISTS mood_entries_user_id_created_at_idx ON mood_entries (user_id, created_at);
CREATE INDEX IF NOT EXISTS journal_entries_user_id_created_at_idx ON journal_entries (user_id, created_at);
CREATE INDEX IF NOT EXISTS checkins_user_id_created_at_idx ON checkins (user_id, created_at);