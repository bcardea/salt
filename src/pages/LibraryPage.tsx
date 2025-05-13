import React, { useEffect, useState } from 'react';
import { supabase } from '../lib/supabase';
import { Download } from 'lucide-react';
import { downloadImage } from '../utils/downloadHelper';

interface Image {
  id: string;
  url: string;
  prompt: string;
  topic: string;
  created_at: string;
}

const LibraryPage: React.FC = () => {
  const [images, setImages] = useState<Image[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetchImages();
  }, []);

  const fetchImages = async () => {
    try {
      const { data, error } = await supabase
        .from('images')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) throw error;
      setImages(data || []);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to load images');
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="py-8 px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto">
          <div className="text-center">
            <div className="animate-pulse">
              <div className="h-8 bg-secondary-200 rounded w-48 mx-auto mb-4"></div>
              <div className="h-4 bg-secondary-100 rounded max-w-md mx-auto"></div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="py-8 px-4 sm:px-6 lg:px-8 animate-fade-in">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-8">
          <h1 className="text-3xl md:text-4xl font-bold text-secondary-900 mb-4">
            Your Artwork Library
          </h1>
          <p className="text-lg text-secondary-600">
            All your generated sermon artwork in one place
          </p>
        </div>

        {error && (
          <div className="mb-8 p-4 bg-red-50 border border-red-200 text-red-700 rounded-lg">
            {error}
          </div>
        )}

        {images.length === 0 ? (
          <div className="text-center py-12">
            <div className="mb-4">
              <img
                src="https://storage.googleapis.com/msgsndr/jI35EgXT0cs2YnriH7gl/media/682391af265ab55b4f38e913.png"
                alt="Empty library"
                className="w-32 h-32 mx-auto opacity-50"
              />
            </div>
            <h3 className="text-xl font-medium text-secondary-900 mb-2">No artwork yet</h3>
            <p className="text-secondary-600 mb-6">
              Start creating sermon artwork to build your library
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {images.map((image) => (
              <div key={image.id} className="card group">
                <div className="aspect-video relative overflow-hidden">
                  <img
                    src={image.url}
                    alt={image.topic}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/0 opacity-0 group-hover:opacity-100 transition-opacity">
                    <div className="absolute bottom-4 right-4">
                      <button
                        onClick={() => downloadImage(image.url, `sermon-art-${image.id}.png`)}
                        className="p-2 bg-white rounded-full hover:bg-secondary-50 transition-colors"
                        title="Download image"
                      >
                        <Download className="h-5 w-5 text-secondary-900" />
                      </button>
                    </div>
                  </div>
                </div>
                <div className="p-4">
                  <h3 className="font-medium text-secondary-900 mb-1">
                    {image.topic}
                  </h3>
                  <p className="text-sm text-secondary-600">
                    {new Date(image.created_at).toLocaleDateString()}
                  </p>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default LibraryPage;