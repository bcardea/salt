/*
  # Create storage bucket for sermon images

  1. Create a new public bucket for storing sermon images
  2. Enable public access to the bucket
  3. Add storage policies for authenticated users
*/

-- Create a new public bucket for sermon images
INSERT INTO storage.buckets (id, name, public)
VALUES ('sermon-images', 'sermon-images', true);

-- Allow authenticated users to upload images
CREATE POLICY "Users can upload images"
ON storage.objects
FOR INSERT
TO authenticated
WITH CHECK (
  bucket_id = 'sermon-images' AND
  auth.uid() = owner
);

-- Allow public access to view images
CREATE POLICY "Public can view images"
ON storage.objects
FOR SELECT
TO public
USING (bucket_id = 'sermon-images');