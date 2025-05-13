/*
  # Create images table for storing user-generated artwork

  1. New Tables
    - `images`
      - `id` (uuid, primary key)
      - `user_id` (uuid, references auth.users)
      - `url` (text, the image URL)
      - `prompt` (text, the prompt used to generate the image)
      - `topic` (text, the sermon topic)
      - `created_at` (timestamp with timezone)

  2. Security
    - Enable RLS on `images` table
    - Add policies for users to:
      - Read their own images
      - Insert their own images
*/

CREATE TABLE images (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid REFERENCES auth.users NOT NULL,
  url text NOT NULL,
  prompt text NOT NULL,
  topic text NOT NULL,
  created_at timestamptz DEFAULT now()
);

ALTER TABLE images ENABLE ROW LEVEL SECURITY;

-- Allow users to read their own images
CREATE POLICY "Users can read own images"
  ON images
  FOR SELECT
  TO authenticated
  USING (auth.uid() = user_id);

-- Allow users to insert their own images
CREATE POLICY "Users can insert own images"
  ON images
  FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() = user_id);