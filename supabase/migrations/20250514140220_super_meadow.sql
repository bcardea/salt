/*
  # Configure storage for sermon images
  
  1. Storage Setup
    - Create public storage bucket for sermon images
    - Configure access policies for authenticated uploads
    - Enable public read access
    
  2. Security
    - Restrict uploads to authenticated users
    - Allow public viewing of images
*/

-- Create the bucket if it doesn't exist
DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM storage.buckets WHERE id = 'sermon-images'
  ) THEN
    INSERT INTO storage.buckets (id, name, public)
    VALUES ('sermon-images', 'sermon-images', true);
  END IF;
END $$;

-- Drop existing policies if they exist to avoid conflicts
DO $$
BEGIN
  DROP POLICY IF EXISTS "Users can upload images" ON storage.objects;
  DROP POLICY IF EXISTS "Public can view images" ON storage.objects;
END $$;

-- Create upload policy for authenticated users
CREATE POLICY "Users can upload images"
ON storage.objects
FOR INSERT
TO authenticated
WITH CHECK (
  bucket_id = 'sermon-images' AND
  auth.uid() = owner
);

-- Create public read policy
CREATE POLICY "Public can view images"
ON storage.objects
FOR SELECT
TO public
USING (bucket_id = 'sermon-images');