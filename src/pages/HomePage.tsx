import React, { useState } from "react";
import { Link } from "react-router-dom";
import { ArrowRight, Play } from "lucide-react";
import VideoModal from "../components/VideoModal";

const DEMO_VIDEO_URL =
  "https://storage.googleapis.com/msgsndr/jI35EgXT0cs2YnriH7gl/media/682b7349aea9c626efc2e702.mp4";

const HomePage: React.FC = () => {
  const [isVideoModalOpen, setIsVideoModalOpen] = useState(false);

  const handleOpenVideo = () => setIsVideoModalOpen(true);
  const handleCloseVideo = () => setIsVideoModalOpen(false);

  return (
    <div className="bg-white">
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-b from-secondary-50/50 to-white">
        <div className="absolute inset-0 bg-grid-pattern opacity-[0.02] pointer-events-none"></div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-20 pb-32">
          <div className="relative z-10">
            <div className="text-center max-w-4xl mx-auto">
              <h1 className="text-5xl md:text-7xl font-bold text-secondary-900 mb-6 leading-tight">
                Transform Your Sermons into
                <span className="block mt-2 young-serif gradient-text">Visual Masterpieces</span>
              </h1>
              <p className="text-xl md:text-2xl text-secondary-600 mb-12 leading-relaxed max-w-3xl mx-auto">
                Create stunning sermon artwork in seconds, not hours. Let AI handle the design while you focus on what matters most—your message.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link
                  to="/generator"
                  className="group inline-flex items-center justify-center px-8 py-4 text-lg font-semibold text-white bg-secondary-900 rounded-full transition-all duration-300 transform hover:scale-105 hover:shadow-xl"
                >
                  Start Creating
                  <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform duration-200" />
                </Link>
                <button
                  onClick={handleOpenVideo}
                  className="group inline-flex items-center justify-center px-8 py-4 text-lg font-semibold text-secondary-900 bg-white border-2 border-secondary-200 rounded-full hover:bg-secondary-50 hover:border-secondary-300 transition-all duration-300 transform hover:scale-105"
                >
                  Watch Demo
                  <Play className="ml-2 h-5 w-5 group-hover:scale-110 transition-transform duration-200" />
                </button>
              </div>
            </div>
          </div>

          {/* Hero Image */}
          <div className="mt-20 relative">
            <div className="absolute inset-0 bg-gradient-to-t from-white via-transparent to-transparent pointer-events-none z-10"></div>
            <div className="grid grid-cols-3 gap-4 max-w-5xl mx-auto">
              <div className="transform hover:scale-105 transition-transform duration-300">
                <img
                  src="https://storage.googleapis.com/msgsndr/jI35EgXT0cs2YnriH7gl/media/68291f22d083852cb5168da6.jpeg"
                  alt="Sermon Artwork Example 1"
                  className="w-full h-auto rounded-2xl shadow-2xl"
                />
              </div>
              <div className="transform hover:scale-105 transition-transform duration-300 -mt-8">
                <img
                  src="https://storage.googleapis.com/msgsndr/jI35EgXT0cs2YnriH7gl/media/6827d01280f93e0bc6af0382.jpeg"
                  alt="Sermon Artwork Example 2"
                  className="w-full h-auto rounded-2xl shadow-2xl"
                />
              </div>
              <div className="transform hover:scale-105 transition-transform duration-300">
                <img
                  src="https://storage.googleapis.com/msgsndr/jI35EgXT0cs2YnriH7gl/media/68291f22e5ca6c6882f32b73.jpeg"
                  alt="Sermon Artwork Example 3"
                  className="w-full h-auto rounded-2xl shadow-2xl"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="text-4xl font-bold text-secondary-900 mb-6">
              Designed for Modern Ministry
            </h2>
            <p className="text-xl text-secondary-600">
              Create professional-quality sermon artwork without the complexity of traditional design tools.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                title: "Lightning Fast",
                description: "Generate stunning artwork in under 2 minutes. No design skills needed.",
                image: "https://storage.googleapis.com/msgsndr/jI35EgXT0cs2YnriH7gl/media/68262b369ce13305523fb0b0.jpeg"
              },
              {
                title: "AI-Powered",
                description: "Our AI understands your sermon's message and creates visuals that enhance it.",
                image: "https://storage.googleapis.com/msgsndr/jI35EgXT0cs2YnriH7gl/media/68262b3687ff6450da9e721e.jpeg"
              },
              {
                title: "Always Fresh",
                description: "Every design is unique, ensuring your message stands out every time.",
                image: "https://storage.googleapis.com/msgsndr/jI35EgXT0cs2YnriH7gl/media/68262b36b6b7cd5fefd72c71.jpeg"
              }
            ].map((feature, index) => (
              <div key={index} className="group relative overflow-hidden rounded-2xl bg-secondary-50 p-8 hover:bg-secondary-100 transition-colors duration-300">
                <div className="aspect-square mb-6 overflow-hidden rounded-xl">
                  <img
                    src={feature.image}
                    alt={feature.title}
                    className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-300"
                  />
                </div>
                <h3 className="text-2xl font-bold text-secondary-900 mb-3">{feature.title}</h3>
                <p className="text-secondary-600">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="py-24 bg-secondary-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="text-4xl font-bold text-secondary-900 mb-6">
              Three Simple Steps
            </h2>
            <p className="text-xl text-secondary-600">
              From sermon notes to stunning visuals in minutes
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
            {[
              {
                number: "01",
                title: "Enter Your Message",
                description: "Paste your sermon notes or enter a topic"
              },
              {
                number: "02",
                title: "Choose Your Style",
                description: "Select from our curated design styles"
              },
              {
                number: "03",
                title: "Generate & Download",
                description: "Get your artwork in seconds"
              }
            ].map((step, index) => (
              <div key={index} className="relative">
                <div className="text-6xl font-bold text-secondary-200 mb-4">{step.number}</div>
                <h3 className="text-2xl font-bold text-secondary-900 mb-3">{step.title}</h3>
                <p className="text-secondary-600">{step.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-4xl font-bold text-secondary-900 mb-6">
            Ready to Transform Your Sermon Visuals?
          </h2>
          <p className="text-xl text-secondary-600 mb-12">
            Join thousands of ministry leaders who are creating stunning sermon artwork with SALT Creative.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              to="/generator"
              className="group inline-flex items-center justify-center px-8 py-4 text-lg font-semibold text-white bg-secondary-900 rounded-full transition-all duration-300 transform hover:scale-105 hover:shadow-xl"
            >
              Start Creating Now
              <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform duration-200" />
            </Link>
            <button
              onClick={handleOpenVideo}
              className="group inline-flex items-center justify-center px-8 py-4 text-lg font-semibold text-secondary-900 bg-white border-2 border-secondary-200 rounded-full hover:bg-secondary-50 hover:border-secondary-300 transition-all duration-300 transform hover:scale-105"
            >
              Watch Demo
              <Play className="ml-2 h-5 w-5 group-hover:scale-110 transition-transform duration-200" />
            </button>
          </div>
        </div>
      </section>

      {/* Video Modal */}
      <VideoModal
        isOpen={isVideoModalOpen}
        onClose={handleCloseVideo}
        videoUrl={DEMO_VIDEO_URL}
      />
    </div>
  );
};

export default HomePage;