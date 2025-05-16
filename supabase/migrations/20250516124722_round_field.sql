/*
  # Secure functions and fix role mutable search paths

  1. Security Updates
    - Set explicit search paths for all functions to prevent role mutation
    - Add security definer to ensure functions run with proper permissions
    - Update function definitions to use explicit schemas

  2. Functions Modified
    - create_user_credits
    - check_and_reset_credits
    - decrement_credits
    - use_invite_code
*/

-- Secure create_user_credits function
CREATE OR REPLACE FUNCTION public.create_user_credits()
RETURNS TRIGGER
SECURITY DEFINER
SET search_path = public, pg_temp
LANGUAGE plpgsql
AS $$
BEGIN
  INSERT INTO public.user_credits (user_id)
  VALUES (NEW.id);
  RETURN NEW;
END;
$$;

-- Secure check_and_reset_credits function
CREATE OR REPLACE FUNCTION public.check_and_reset_credits()
RETURNS TRIGGER
SECURITY DEFINER
SET search_path = public, pg_temp
LANGUAGE plpgsql
AS $$
BEGIN
  IF NEW.next_reset_at <= CURRENT_TIMESTAMP THEN
    NEW.credits_remaining := 25;
    NEW.last_reset_at := CURRENT_TIMESTAMP;
    NEW.next_reset_at := CURRENT_TIMESTAMP + INTERVAL '30 days';
  END IF;
  RETURN NEW;
END;
$$;

-- Secure decrement_credits function
CREATE OR REPLACE FUNCTION public.decrement_credits(user_id uuid)
RETURNS boolean
SECURITY DEFINER
SET search_path = public, pg_temp
LANGUAGE plpgsql
AS $$
DECLARE
  current_credits integer;
BEGIN
  SELECT credits_remaining INTO current_credits
  FROM public.user_credits
  WHERE user_credits.user_id = decrement_credits.user_id;

  IF current_credits > 0 THEN
    UPDATE public.user_credits
    SET credits_remaining = credits_remaining - 1
    WHERE user_credits.user_id = decrement_credits.user_id;
    RETURN true;
  END IF;

  RETURN false;
END;
$$;

-- Secure use_invite_code function
CREATE OR REPLACE FUNCTION public.use_invite_code(invite_code text)
RETURNS boolean
SECURITY DEFINER
SET search_path = public, pg_temp
LANGUAGE plpgsql
AS $$
BEGIN
  UPDATE public.invite_codes
  SET uses_remaining = uses_remaining - 1
  WHERE code = invite_code
    AND uses_remaining > 0
    AND (expires_at IS NULL OR expires_at > now())
    AND is_active = true;
  
  RETURN FOUND;
END;
$$;