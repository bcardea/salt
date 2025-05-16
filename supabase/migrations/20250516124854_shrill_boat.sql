/*
  # Optimize RLS policies performance

  1. Changes
    - Update RLS policies to use (select auth.uid()) for better performance
    - Affects tables:
      - images
      - user_credits

  2. Performance Impact
    - Reduces per-row function evaluation
    - Improves query performance at scale
*/

-- Update RLS policies for images table
DROP POLICY IF EXISTS "Users can read own images" ON public.images;
DROP POLICY IF EXISTS "Users can insert own images" ON public.images;

CREATE POLICY "Users can read own images"
  ON public.images
  FOR SELECT
  TO authenticated
  USING (user_id = (select auth.uid()));

CREATE POLICY "Users can insert own images"
  ON public.images
  FOR INSERT
  TO authenticated
  WITH CHECK (user_id = (select auth.uid()));

-- Update RLS policies for user_credits table
DROP POLICY IF EXISTS "Users can read own credits" ON public.user_credits;
DROP POLICY IF EXISTS "Users can insert own credits" ON public.user_credits;

CREATE POLICY "Users can read own credits"
  ON public.user_credits
  FOR SELECT
  TO authenticated
  USING (user_id = (select auth.uid()));

CREATE POLICY "Users can insert own credits"
  ON public.user_credits
  FOR INSERT
  TO authenticated
  WITH CHECK (user_id = (select auth.uid()));