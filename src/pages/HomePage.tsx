import React, { useState } from "react";
import { Link } from "react-router-dom";
import { ArrowRight, Play } from "lucide-react";
import VideoModal from "../components/VideoModal";

const DEMO_VIDEO_URL = "https://storage.googleapis.com/msgsndr/jI35EgXT0cs2YnriH7gl/media/6825fdd739adaa074fde36eb.mp4";

const features = [
  {
    title: "Instant Transformation",
    description: "Transform your sermon notes into stunning visuals in seconds, not hours.",
    icon: "⚡️"
  },
  {
    title: "AI-Powered Design",
    description: "Our advanced AI understands your message and creates visually compelling artwork.",
    icon: "🎨"
  },
  {
    title: "No Design Skills Needed",
    description: "Skip the learning curve - create professional graphics without any design experience.",
    icon: "✨"
  }
];

const testimonials = [
  {
    quote: "SALT has revolutionized how we create sermon graphics. What used to take hours now takes minutes.",
    author: "Pastor Michael R.",
    role: "Lead Pastor",
    church: "Grace Community Church"
  },
  {
    quote: "The quality and consistency of our visual content has improved dramatically since using SALT.",
    author: "Sarah T.",
    role: "Creative Director",
    church: "Hillside Chapel"
  }
];

const HomePage: React.FC = () => {
  const [isVideoModalOpen, setIsVideoModalOpen] = useState(false);

  const handleOpenVideo = () => setIsVideoModalOpen(true);
  const handleCloseVideo = () => setIsVideoModalOpen(false);

  return (
    <div className="bg-white">
      {/* Hero Section */}
      <section className="relative min-h-[90vh] flex items-center bg-gradient-to-b from-secondary-50 to-white overflow-hidden">
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(82,142,148,0.1),transparent_70%)]"></div>
          <div className="absolute bottom-0 left-0 w-full h-1/3 bg-gradient-to-t from-white to-transparent"></div>
        </div>
        
        <div className="container mx-auto px-4 py-20 relative z-10">
          <div className="max-w-7xl mx-auto">
            <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
              <div className="text-center lg:text-left">
                <h1 className="text-5xl lg:text-6xl font-bold leading-tight mb-6 animate-fade-in-up">
                  Transform Your <br />
                  <span className="young-serif gradient-text">Message</span> Into Art
                </h1>
                <p className="text-xl text-secondary-600 mb-8 animate-fade-in-up" style={{ animationDelay: "0.2s" }}>
                  Create stunning sermon artwork in seconds with our AI-powered design tool. No design skills needed.
                </p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start animate-fade-in-up" style={{ animationDelay: "0.4s" }}>
                  <Link
                    to="/generator"
                    className="btn-primary"
                  >
                    Start Creating Now
                    <ArrowRight className="ml-2 h-5 w-5 inline-block" />
                  </Link>
                  <button
                    onClick={handleOpenVideo}
                    className="btn-secondary"
                  >
                    Watch Demo
                    <Play className="ml-2 h-5 w-5 inline-block" />
                  </button>
                </div>
              </div>
              
              <div className="relative animate-fade-in-up" style={{ animationDelay: "0.6s" }}>
                <img
                  src="https://storage.googleapis.com/msgsndr/jI35EgXT0cs2YnriH7gl/media/682391af265ab584e938e916.png"
                  alt="SALT Creative Example"
                  className="rounded-2xl shadow-2xl transform-hover"
                />
                <div className="absolute -bottom-6 -right-6 bg-white p-4 rounded-xl shadow-lg">
                  <p className="text-sm font-medium text-secondary-900">Created with SALT in 2 minutes</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-4xl font-bold mb-6">Why Choose SALT Creative?</h2>
              <p className="text-xl text-secondary-600 max-w-3xl mx-auto">
                Designed specifically for ministry leaders who want to create impactful visuals without the complexity.
              </p>
            </div>
            
            <div className="grid md:grid-cols-3 gap-8">
              {features.map((feature, index) => (
                <div key={index} className="feature-card">
                  <div className="text-4xl mb-4">{feature.icon}</div>
                  <h3 className="text-xl font-bold mb-3">{feature.title}</h3>
                  <p className="text-secondary-600">{feature.description}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-20 bg-secondary-50">
        <div className="container mx-auto px-4">
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-4xl font-bold mb-6">Loved by Ministry Leaders</h2>
              <p className="text-xl text-secondary-600 max-w-3xl mx-auto">
                Join hundreds of churches already using SALT Creative to enhance their visual communication.
              </p>
            </div>
            
            <div className="grid md:grid-cols-2 gap-8">
              {testimonials.map((testimonial, index) => (
                <div key={index} className="feature-card">
                  <p className="text-xl mb-6">"{testimonial.quote}"</p>
                  <div>
                    <p className="font-semibold">{testimonial.author}</p>
                    <p className="text-secondary-600">{testimonial.role}</p>
                    <p className="text-secondary-600">{testimonial.church}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-4xl font-bold mb-6">Ready to Transform Your Message?</h2>
            <p className="text-xl text-secondary-600 mb-8">
              Join the growing community of ministry leaders creating stunning visuals with SALT Creative.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                to="/generator"
                className="btn-primary"
              >
                Start Creating Now
                <ArrowRight className="ml-2 h-5 w-5 inline-block" />
              </Link>
              <button
                onClick={handleOpenVideo}
                className="btn-secondary"
              >
                Watch Demo
                <Play className="ml-2 h-5 w-5 inline-block" />
              </button>
            </div>
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