/*
  # Set up storage for sermon images

  1. Storage
    - Create a public bucket for sermon images if it doesn't exist
    - Add policies for:
      - Authenticated users to upload images
      - Public access to view images

  2. Security
    - Ensure authenticated users can only upload to their own space
    - Allow public read access to all images
*/

DO $$
BEGIN
  -- Only create the bucket if it doesn't exist
  IF NOT EXISTS (
    SELECT 1 FROM storage.buckets WHERE id = 'sermon-images'
  ) THEN
    INSERT INTO storage.buckets (id, name, public)
    VALUES ('sermon-images', 'sermon-images', true);
  END IF;
END $$;

-- Allow authenticated users to upload images
DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM pg_policies WHERE policyname = 'Users can upload images'
  ) THEN
    CREATE POLICY "Users can upload images"
    ON storage.objects
    FOR INSERT
    TO authenticated
    WITH CHECK (
      bucket_id = 'sermon-images' AND
      auth.uid() = owner
    );
  END IF;
END $$;

-- Allow public access to view images
DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM pg_policies WHERE policyname = 'Public can view images'
  ) THEN
    CREATE POLICY "Public can view images"
    ON storage.objects
    FOR SELECT
    TO public
    USING (bucket_id = 'sermon-images');
  END IF;
END $$;