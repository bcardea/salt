/*
  # Add insert policy for user credits

  1. Changes
    - Add RLS policy to allow authenticated users to insert their own credit records
    
  2. Security
    - Policy ensures users can only insert records with their own user_id
    - Maintains data isolation between users
*/

CREATE POLICY "Users can insert own credits"
ON public.user_credits
FOR INSERT
TO authenticated
WITH CHECK (auth.uid() = user_id);