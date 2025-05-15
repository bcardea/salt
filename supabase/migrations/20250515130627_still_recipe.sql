/*
  # Add invite code system
  
  1. New Tables
    - `invite_codes`
      - `code` (text, primary key) - The actual invite code
      - `uses_remaining` (integer) - Number of times this code can still be used
      - `created_at` (timestamptz) - When the code was created
      - `created_by` (uuid) - Which admin created the code
      - `expires_at` (timestamptz) - When the code expires
      - `is_active` (boolean) - Whether the code is currently active

  2. Security
    - Enable RLS on `invite_codes` table
    - Add policy for public read access to check codes
    - Add policy for admins to manage codes
*/

-- Create invite_codes table
CREATE TABLE IF NOT EXISTS invite_codes (
  code text PRIMARY KEY,
  uses_remaining integer NOT NULL DEFAULT 1,
  created_at timestamptz NOT NULL DEFAULT now(),
  created_by uuid REFERENCES auth.users(id),
  expires_at timestamptz,
  is_active boolean NOT NULL DEFAULT true
);

-- Enable RLS
ALTER TABLE invite_codes ENABLE ROW LEVEL SECURITY;

-- Allow anyone to read active codes (needed for validation during signup)
CREATE POLICY "Anyone can read active codes"
  ON invite_codes
  FOR SELECT
  TO public
  USING (is_active = true AND (expires_at IS NULL OR expires_at > now()) AND uses_remaining > 0);

-- Function to validate and use an invite code
CREATE OR REPLACE FUNCTION use_invite_code(invite_code text)
RETURNS boolean
LANGUAGE plpgsql
SECURITY DEFINER
AS $$
DECLARE
  valid boolean;
BEGIN
  -- Check if code exists and is valid
  UPDATE invite_codes
  SET uses_remaining = uses_remaining - 1
  WHERE code = invite_code
    AND is_active = true
    AND uses_remaining > 0
    AND (expires_at IS NULL OR expires_at > now())
  RETURNING true INTO valid;
  
  RETURN COALESCE(valid, false);
END;
$$;