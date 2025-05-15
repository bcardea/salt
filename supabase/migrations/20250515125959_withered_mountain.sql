/*
  # Add user credits system

  1. New Tables
    - `user_credits`
      - `user_id` (uuid, primary key, references auth.users)
      - `credits_remaining` (integer)
      - `last_reset_at` (timestamp)
      - `next_reset_at` (timestamp)

  2. Functions
    - Function to automatically create credits for new users
    - Function to check and reset credits every 30 days
    - Function to decrement credits

  3. Security
    - Enable RLS on user_credits table
    - Add policies for users to read their own credits
*/

-- Create user_credits table
CREATE TABLE IF NOT EXISTS user_credits (
  user_id uuid PRIMARY KEY REFERENCES auth.users(id),
  credits_remaining integer NOT NULL DEFAULT 25,
  last_reset_at timestamptz NOT NULL DEFAULT now(),
  next_reset_at timestamptz NOT NULL DEFAULT (now() + interval '30 days'),
  created_at timestamptz NOT NULL DEFAULT now()
);

-- Enable RLS
ALTER TABLE user_credits ENABLE ROW LEVEL SECURITY;

-- Create policy for users to read their own credits
CREATE POLICY "Users can read own credits"
  ON user_credits
  FOR SELECT
  TO authenticated
  USING (auth.uid() = user_id);

-- Function to create credits for new users
CREATE OR REPLACE FUNCTION create_user_credits()
RETURNS TRIGGER
LANGUAGE plpgsql
SECURITY DEFINER
AS $$
BEGIN
  INSERT INTO public.user_credits (user_id)
  VALUES (NEW.id);
  RETURN NEW;
END;
$$;

-- Trigger to create credits when new user signs up
CREATE TRIGGER create_user_credits_on_signup
  AFTER INSERT ON auth.users
  FOR EACH ROW
  EXECUTE FUNCTION create_user_credits();

-- Function to check and reset credits
CREATE OR REPLACE FUNCTION check_and_reset_credits()
RETURNS TRIGGER
LANGUAGE plpgsql
SECURITY DEFINER
AS $$
BEGIN
  IF NEW.next_reset_at <= now() THEN
    NEW.credits_remaining := 25;
    NEW.last_reset_at := now();
    NEW.next_reset_at := now() + interval '30 days';
  END IF;
  RETURN NEW;
END;
$$;

-- Trigger to check and reset credits on update
CREATE TRIGGER check_credits_on_update
  BEFORE UPDATE ON user_credits
  FOR EACH ROW
  EXECUTE FUNCTION check_and_reset_credits();

-- Function to decrement credits
CREATE OR REPLACE FUNCTION decrement_credits(user_id uuid)
RETURNS boolean
LANGUAGE plpgsql
SECURITY DEFINER
AS $$
DECLARE
  credits_available integer;
BEGIN
  -- Get current credits
  SELECT credits_remaining INTO credits_available
  FROM user_credits
  WHERE user_credits.user_id = decrement_credits.user_id;

  -- Check if credits are available
  IF credits_available > 0 THEN
    -- Decrement credits
    UPDATE user_credits
    SET credits_remaining = credits_remaining - 1
    WHERE user_credits.user_id = decrement_credits.user_id;
    RETURN true;
  END IF;

  RETURN false;
END;
$$;