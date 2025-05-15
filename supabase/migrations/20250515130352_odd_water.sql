/*
  # Add credits for existing users

  1. Changes
    - Insert credit records for all existing users who don't have one
    - Uses default values from the table definition:
      - 25 credits
      - Reset dates based on current timestamp
*/

-- Insert credits for existing users who don't have them
INSERT INTO public.user_credits (user_id)
SELECT id 
FROM auth.users
WHERE id NOT IN (SELECT user_id FROM public.user_credits);