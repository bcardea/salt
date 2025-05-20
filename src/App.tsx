import React, { useState, useEffect } from 'react';
import { Routes, Route } from 'react-router-dom';
import { supabase } from './lib/supabase';
import Header from './components/Header';
import Footer from './components/Footer';
import HomePage from './pages/HomePage';
import GeneratorPage from './pages/GeneratorPage';
import LibraryPage from './pages/LibraryPage';
import TermsPage from './pages/TermsPage';
import PrivacyPage from './pages/PrivacyPage';
import ResetPasswordPage from './pages/ResetPasswordPage';
import { ApiKeyProvider } from './context/ApiKeyContext';
import VideoModal from './components/VideoModal';

const DEMO_VIDEO_URL = "https://storage.googleapis.com/msgsndr/jI35EgXT0cs2YnriH7gl/media/6825fdd739adaa074fde36eb.mp4";

function App() {
  const [isVideoModalOpen, setIsVideoModalOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [session, setSession] = useState(null);

  useEffect(() => {
    // Initial session check
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
      setIsLoading(false);
    });

    // Listen for auth changes
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
      setIsLoading(false);
    });

    return () => subscription.unsubscribe();
  }, []);

  const handleOpenVideo = () => setIsVideoModalOpen(true);
  const handleCloseVideo = () => setIsVideoModalOpen(false);

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-secondary-50">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary-500"></div>
      </div>
    );
  }

  return (
    <ApiKeyProvider>
      <div className="flex flex-col min-h-screen">
        <Header session={session} />
        <main className="flex-grow">
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/generator" element={<GeneratorPage session={session} />} />
            <Route path="/library" element={<LibraryPage />} />
            <Route path="/terms" element={<TermsPage />} />
            <Route path="/privacy" element={<PrivacyPage />} />
            <Route path="/reset-password" element={<ResetPasswordPage />} />
          </Routes>
        </main>
        <Footer onWatchDemo={handleOpenVideo} />
        <VideoModal
          isOpen={isVideoModalOpen}
          onClose={handleCloseVideo}
          videoUrl={DEMO_VIDEO_URL}
        />
      </div>
    </ApiKeyProvider>
  );
}

export default App;