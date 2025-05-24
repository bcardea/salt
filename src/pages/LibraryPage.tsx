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

const IMAGES_PER_PAGE = 3; // Reduced from 9 to 3

const LibraryPage: React.FC = () => {
  const [images, setImages] = useState<Image[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [hasMore, setHasMore] = useState(true);
  const [page, setPage] = useState(0);
  const [loadingMore, setLoadingMore] = useState(false);

  const fetchImages = async (pageNumber: number = 0) => {
    try {
      setLoadingMore(true);
      const from = pageNumber * IMAGES_PER_PAGE;
      const to = from + IMAGES_PER_PAGE - 1;

      const { data, error, count } = await supabase
        .from('images')
        .select('*', { count: 'exact' })
        .order('created_at', { ascending: false })
        .range(from, to);

      if (error) throw error;

      if (pageNumber === 0) {
        setImages(data || []);
      } else {
        setImages(prev => [...prev, ...(data || [])]);
      }

      // Check if we have more images to load
      setHasMore(count ? from + IMAGES_PER_PAGE < count : false);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to load images');
    } finally {
      setLoading(false);
      setLoadingMore(false);
    }
  };

  useEffect(() => {
    fetchImages();
  }, []);

  const handleLoadMore = () => {
    const nextPage = page + 1;
    setPage(nextPage);
    fetchImages(nextPage);
  };

  if (loading && page === 0) {
    return (
      <div className="min-h-screen pt-32">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-20">
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
    <div className="min-h-screen pt-32">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-20">
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
          <>
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

            {hasMore && (
              <div className="mt-12 text-center">
                <button
                  onClick={handleLoadMore}
                  disabled={loadingMore}
                  className="btn-secondary"
                >
                  {loadingMore ? (
                    <>
                      <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-secondary-600" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                      </svg>
                      Loading more...
                    </>
                  ) : (
                    'Load More'
                  )}
                </button>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default LibraryPage;