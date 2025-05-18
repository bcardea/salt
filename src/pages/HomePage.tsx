import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { ArrowRight, Play, ChevronRight, Sparkles, Users, Image, MessageSquare } from "lucide-react";
import useEmblaCarousel from 'embla-carousel-react';
import { useInView } from 'react-intersection-observer';
import VideoModal from "../components/VideoModal";

const DEMO_VIDEO_URL = "https://storage.googleapis.com/msgsndr/jI35EgXT0cs2YnriH7gl/media/68277db887598fe88e900a12.mp4";

const fromImage = "https://storage.googleapis.com/msgsndr/jI35EgXT0cs2YnriH7gl/media/68293e458acc4a9f8cb8315f.jpeg";
const saltyImage = "https://storage.googleapis.com/msgsndr/jI35EgXT0cs2YnriH7gl/media/68253020b12e575165b9498e.svg";

const toImages = [
  {
    src: "https://storage.googleapis.com/msgsndr/jI35EgXT0cs2YnriH7gl/media/68291f22d083852cb5168da6.jpeg",
    label: "…to this!",
  },
  {
    src: "https://storage.googleapis.com/msgsndr/jI35EgXT0cs2YnriH7gl/media/6827d01280f93e0bc6af0382.jpeg",
    label: "…or this!",
  },
  {
    src: "https://storage.googleapis.com/msgsndr/jI35EgXT0cs2YnriH7gl/media/68291f22e5ca6c6882f32b73.jpeg",
    label: "…maybe this!",
  },
  {
    src: "https://storage.googleapis.com/msgsndr/jI35EgXT0cs2YnriH7gl/media/682934d4e5ca6c3465f343e9.jpeg",
    label: "…how about this?",
  },
];

const ministryUsesCases = [
  {
    icon: Image,
    title: "Community Service Events",
    description: "Transform your outreach initiatives with compelling visuals that inspire action",
    formats: ["Social Media", "Print Materials", "Digital Displays"]
  },
  {
    icon: Users,
    title: "Youth Ministry",
    description: "Create dynamic, relevant designs that resonate with young audiences",
    formats: ["Instagram Stories", "Event Graphics", "Social Posts"]
  },
  {
    icon: MessageSquare,
    title: "Women's Ministry",
    description: "Design beautiful materials that speak to and empower women in your community",
    formats: ["Event Banners", "Study Guides", "Social Media"]
  },
  {
    icon: Sparkles,
    title: "Special Events",
    description: "Elevate your church events with professional, eye-catching artwork",
    formats: ["Posters", "Invitations", "Digital Signage"]
  }
];

const testimonials = [
  {
    quote: "SALT has revolutionized how we create sermon artwork. What used to take hours now takes minutes.",
    author: "Pastor Michael Chen",
    role: "Lead Pastor",
    church: "Grace Community Church"
  },
  {
    quote: "The quality and consistency of our visual content has improved dramatically since using SALT.",
    author: "Sarah Williams",
    role: "Creative Director",
    church: "Hillside Chapel"
  }
];

const HomePage = () => {
  const [isVideoModalOpen, setIsVideoModalOpen] = useState(false);
  const [emblaRef, emblaApi] = useEmblaCarousel({ loop: true, dragFree: true });
  const [selectedIndex, setSelectedIndex] = useState(0);

  const [heroRef, heroInView] = useInView({
    threshold: 0.1,
    triggerOnce: true
  });

  const [casesRef, casesInView] = useInView({
    threshold: 0.1,
    triggerOnce: true
  });

  const [testimonialsRef, testimonialsInView] = useInView({
    threshold: 0.1,
    triggerOnce: true
  });

  useEffect(() => {
    if (!emblaApi) return;

    emblaApi.on('select', () => {
      setSelectedIndex(emblaApi.selectedScrollSnap());
    });

    const autoplay = setInterval(() => {
      if (emblaApi.canScrollNext()) {
        emblaApi.scrollNext();
      } else {
        emblaApi.scrollTo(0);
      }
    }, 3000);

    return () => {
      clearInterval(autoplay);
      emblaApi.off('select');
    };
  }, [emblaApi]);

  return (
    <div className="bg-white text-gray-900 font-sans">
      {/* Hero Section */}
      <section 
        ref={heroRef}
        className={`w-full px-4 md:px-8 lg:px-16 pt-16 md:pt-24 pb-32 bg-gradient-to-b from-secondary-50 to-white transition-opacity duration-1000 ${
          heroInView ? 'opacity-100' : 'opacity-0'
        }`}
      >
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row-reverse gap-16 items-center">
            {/* Image Transformation Showcase */}
            <div className="w-full md:w-1/2">
              <div className="relative" ref={emblaRef}>
                <div className="overflow-hidden">
                  <div className="flex">
                    {toImages.map((image, index) => (
                      <div
                        key={index}
                        className="relative flex-[0_0_100%] min-w-0"
                      >
                        <img
                          src={image.src}
                          alt={image.label}
                          className="w-full h-auto rounded-2xl shadow-2xl transition-transform duration-300 hover:scale-[1.02]"
                        />
                      </div>
                    ))}
                  </div>
                </div>
                <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2">
                  {toImages.map((_, index) => (
                    <button
                      key={index}
                      className={`w-2 h-2 rounded-full transition-all duration-300 ${
                        index === selectedIndex
                          ? 'bg-white w-6'
                          : 'bg-white/50'
                      }`}
                      onClick={() => emblaApi?.scrollTo(index)}
                    />
                  ))}
                </div>
              </div>
            </div>

            {/* Hero Content */}
            <div className="md:w-1/2 space-y-8">
              <h1 className="hero-title">
                Transform Your
                <span className="block mt-2 text-secondary-900">
                  Message Into
                </span>
                <span className="block mt-2 font-serif text-primary-600">
                  Visual Impact
                </span>
              </h1>
              
              <p className="hero-subtitle">
                Create stunning sermon artwork in seconds, not hours. 
                Let AI handle the design while you focus on what matters most—your message.
              </p>

              <div className="flex flex-col sm:flex-row gap-4 pt-4">
                <Link
                  to="/generator"
                  className="btn-primary group"
                >
                  Start Creating Now
                  <ArrowRight className="ml-2 h-5 w-5 inline-block transition-transform group-hover:translate-x-1" />
                </Link>
                
                <button
                  onClick={() => setIsVideoModalOpen(true)}
                  className="btn-secondary group"
                >
                  Watch Demo
                  <Play className="ml-2 h-5 w-5 inline-block transition-transform group-hover:translate-x-1" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Ministry Use Cases */}
      <section 
        ref={casesRef}
        className={`px-4 md:px-8 lg:px-16 py-24 bg-white transition-all duration-1000 transform ${
          casesInView ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'
        }`}
      >
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="section-title">Design for Every Ministry Need</h2>
            <p className="section-subtitle">
              From sermon graphics to event promotions, SALT helps you create professional designs 
              that elevate your ministry's visual presence.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {ministryUsesCases.map((useCase, index) => {
              const Icon = useCase.icon;
              return (
                <div
                  key={index}
                  className="bg-white rounded-xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1"
                >
                  <div className="w-12 h-12 bg-primary-100 rounded-lg flex items-center justify-center mb-6">
                    <Icon className="w-6 h-6 text-primary-600" />
                  </div>
                  
                  <h3 className="text-xl font-bold text-secondary-900 mb-3">
                    {useCase.title}
                  </h3>
                  
                  <p className="text-secondary-600 mb-4">
                    {useCase.description}
                  </p>
                  
                  <div className="flex flex-wrap gap-2">
                    {useCase.formats.map((format, idx) => (
                      <span
                        key={idx}
                        className="px-3 py-1 bg-secondary-100 text-secondary-700 rounded-full text-sm"
                      >
                        {format}
                      </span>
                    ))}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section 
        ref={testimonialsRef}
        className={`px-4 md:px-8 lg:px-16 py-24 bg-secondary-50 transition-all duration-1000 transform ${
          testimonialsInView ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'
        }`}
      >
        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-2 gap-8">
            {testimonials.map((testimonial, index) => (
              <div
                key={index}
                className="bg-white p-8 rounded-2xl shadow-lg"
              >
                <p className="text-xl text-secondary-600 italic mb-6">
                  "{testimonial.quote}"
                </p>
                <div className="flex items-center">
                  <div>
                    <p className="font-semibold text-secondary-900">
                      {testimonial.author}
                    </p>
                    <p className="text-sm text-secondary-600">
                      {testimonial.role}, {testimonial.church}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Final CTA Section */}
      <section className="px-4 md:px-8 lg:px-16 py-24 bg-white">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="section-title mb-6">
            Ready to Transform Your Ministry's Visual Impact?
          </h2>
          <p className="section-subtitle mb-8">
            Join hundreds of churches already using SALT to create stunning visuals 
            that amplify their message.
          </p>
          <Link
            to="/generator"
            className="btn-primary inline-flex items-center group"
          >
            Get Started Now
            <ChevronRight className="ml-2 h-5 w-5 transition-transform group-hover:translate-x-1" />
          </Link>
        </div>
      </section>

      <VideoModal
        isOpen={isVideoModalOpen}
        onClose={() => setIsVideoModalOpen(false)}
        videoUrl={DEMO_VIDEO_URL}
      />
    </div>
  );
};

export default HomePage;