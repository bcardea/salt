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
      <div className="min-h-screen py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[1, 2, 3].map((i) => (
              <div key={i} className="animate-pulse">
                <div className="aspect-video bg-secondary-200 rounded-lg mb-4"></div>
                <div className="h-4 bg-secondary-200 rounded w-3/4 mb-2"></div>
                <div className="h-4 bg-secondary-200 rounded w-1/2"></div>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen py-12 px-4 sm:px-6 lg:px-8 animate-fade-in">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-secondary-900 mb-4">
            Your Artwork Library
          </h1>
          <p className="text-lg text-secondary-600 max-w-2xl mx-auto">
            All your generated sermon artwork in one place. Click any image to download it.
          </p>
        </div>

        {error && (
          <div className="mb-8 p-4 bg-red-50 border border-red-200 text-red-700 rounded-lg">
            {error}
          </div>
        )}

        {images.length === 0 ? (
          <div className="text-center py-16 bg-white rounded-2xl shadow-sm">
            <div className="mb-6">
              <div className="w-24 h-24 bg-secondary-100 rounded-full flex items-center justify-center mx-auto">
                <Download className="w-12 h-12 text-secondary-400" />
              </div>
            </div>
            <h3 className="text-xl font-semibold text-secondary-900 mb-2">No artwork yet</h3>
            <p className="text-secondary-600 mb-8 max-w-md mx-auto">
              Start creating sermon artwork to build your library. Your generated images will appear here.
            </p>
            <a 
              href="/generator" 
              className="btn-primary inline-flex items-center"
            >
              Create Your First Artwork
            </a>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {images.map((image) => (
              <div 
                key={image.id} 
                className="bg-white rounded-xl overflow-hidden shadow-sm hover:shadow-lg transition-shadow duration-200"
              >
                <div 
                  className="aspect-video relative group cursor-pointer"
                  onClick={() => downloadImage(image.url, `sermon-art-${image.id}.png`)}
                >
                  <img
                    src={image.url}
                    alt={image.topic}
                    className="w-full h-full object-cover"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                    <Download className="w-8 h-8 text-white" />
                  </div>
                </div>
                <div className="p-6">
                  <h3 className="font-semibold text-lg text-secondary-900 mb-2 line-clamp-1">
                    {image.topic}
                  </h3>
                  <p className="text-sm text-secondary-600 mb-3">
                    {new Date(image.created_at).toLocaleDateString(undefined, {
                      year: 'numeric',
                      month: 'long',
                      day: 'numeric'
                    })}
                  </p>
                  <p className="text-sm text-secondary-500 line-clamp-2">
                    {image.prompt}
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