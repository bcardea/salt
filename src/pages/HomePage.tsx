import React, { useState } from "react";
import { Link } from "react-router-dom";
import { ArrowRight, Play } from "lucide-react";
import VideoModal from "../components/VideoModal";

const fromImage =
  "https://storage.googleapis.com/msgsndr/jI35EgXT0cs2YnriH7gl/media/682523349cd8fb6bde9bbb09.jpeg";

const saltyImage = "https://storage.googleapis.com/msgsndr/jI35EgXT0cs2YnriH7gl/media/68253020b12e575165b9498e.svg";

const toImages = [
  {
    src: "https://storage.googleapis.com/msgsndr/jI35EgXT0cs2YnriH7gl/media/68251c81183ce502b0921294.png",
    label: "…to this!",
  },
  {
    src: "https://storage.googleapis.com/msgsndr/jI35EgXT0cs2YnriH7gl/media/68251a9db098801ec44508d0.png",
    label: "…or this!",
  },
  {
    src: "https://storage.googleapis.com/msgsndr/jI35EgXT0cs2YnriH7gl/media/68251a9dc469326aedc5682b.png",
    label: "…maybe this!",
  },
  {
    src: "https://storage.googleapis.com/msgsndr/jI35EgXT0cs2YnriH7gl/media/68251a9d9cd8fb87c29ba7f0.png",
    label: "…how about this?",
  },
];

const ministryUsesCases = [
  {
    title: "Community Service Events",
    description: "Promote your church's outreach and service initiatives",
    image: "https://storage.googleapis.com/msgsndr/jI35EgXT0cs2YnriH7gl/media/68262b369ce13305523fb0b0.jpeg",
    formats: ["Posters", "Social Media", "Email Headers"]
  },
  {
    title: "Youth Ministry",
    description: "Engage young people with dynamic, relevant designs",
    image: "https://storage.googleapis.com/msgsndr/jI35EgXT0cs2YnriH7gl/media/68262b3687ff6450da9e721e.jpeg",
    formats: ["Instagram Stories", "Event Banners", "Digital Signage"]
  },
  {
    title: "Women's Ministry",
    description: "Create beautiful materials for women's events and studies",
    image: "https://storage.googleapis.com/msgsndr/jI35EgXT0cs2YnriH7gl/media/68262b36b6b7cd5fefd72c71.jpeg",
    formats: ["Social Posts", "Study Guides", "Event Flyers"]
  },
  {
    title: "Men's Fellowship",
    description: "Design impactful graphics for men's gatherings",
    image: "https://storage.googleapis.com/msgsndr/jI35EgXT0cs2YnriH7gl/media/68262b36a32ad3085a164bf6.jpeg",
    formats: ["Digital Banners", "Social Media", "Print Materials"]
  },
  {
    title: "Children's Ministry",
    description: "Attract volunteers and promote kids' programs",
    image: "https://storage.googleapis.com/msgsndr/jI35EgXT0cs2YnriH7gl/media/68262b36b6b7cd59b6d72c72.jpeg",
    formats: ["Recruitment Posts", "Parent Communications", "Signage"]
  },
  {
    title: "Last-Minute Requests",
    description: "Handle urgent design needs with confidence",
    image: "https://images.pexels.com/photos/3182833/pexels-photo-3182833.jpeg",
    formats: ["Quick Turnaround", "Team Communication", "24/7 Availability"],
    chat: [
      {
        role: "request",
        message: "Hey, sorry to ask so late on a Saturday but we need a design for Prayer Night ready by tomorrow morning's service"
      },
      {
        role: "response",
        message: "No problem! I can use SALT to create this, I'll have it ready in 5 minutes!"
      },
      {
        role: "request",
        message: "🙌 Amazing, thank you! 🙏"
      }
    ]
  }
];

const DEMO_VIDEO_URL = "https://storage.googleapis.com/msgsndr/jI35EgXT0cs2YnriH7gl/media/6825fdd739adaa074fde36eb.mp4";

const HomePage = () => {
  const [isVideoModalOpen, setIsVideoModalOpen] = useState(false);

  const handleOpenVideo = () => setIsVideoModalOpen(true);
  const handleCloseVideo = () => setIsVideoModalOpen(false);

  return (
    <div className="bg-white text-gray-900 font-sans">
      {/* Hero Section */}
      <section className="w-full px-6 md:px-8 lg:px-12 pt-14 md:pt-24 pb-10 md:pb-20 bg-gradient-to-b from-secondary-50 to-white">
        <div className="max-w-7xl mx-auto flex flex-col md:grid md:grid-cols-2 gap-10 items-center">
          {/* LEFT: TEXT */}
          <div className="relative flex flex-col items-start justify-center md:pr-10 lg:pr-16">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold leading-tight tracking-tight mb-4">
              Your Words,<br />
              <span className="block mt-1">
                <span className="young-serif gradient-text">Divinely</span>{" "}
                <span className="text-secondary-900">Visualized</span>
              </span>
            </h1>
            <p className="text-lg md:text-xl text-gray-700 mb-6">
              The world has enough ordinary sermon slides. <span className="font-semibold text-secondary-700">Yours should be extraordinary</span> — in just 120 seconds.
            </p>
            <p className="mb-8 text-base md:text-lg text-gray-600 max-w-xl">
              You didn't answer the call to ministry to spend hours wrestling with design software. SALT Creative transforms your sermon into captivating visuals with one click. No technical skills required. No creative team needed. <span className="font-semibold text-secondary-600">While you focus on the Word, we focus on making it seen.</span>
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Link
                to="/generator"
                className="inline-flex items-center px-8 py-4 text-lg font-bold text-white bg-secondary-900 rounded-full shadow-lg hover:bg-secondary-800 transition-all group"
              >
                Create Your First Masterpiece
                <ArrowRight className="ml-3 h-5 w-5 group-hover:translate-x-1 transition-transform" />
              </Link>
              <button
                onClick={handleOpenVideo}
                className="inline-flex items-center px-8 py-4 text-lg font-medium text-secondary-600 hover:text-secondary-900 transition-colors group"
              >
                Watch Demo Video
                <Play className="ml-3 h-5 w-5 group-hover:translate-x-1 transition-transform" />
              </button>
            </div>
          </div>

          {/* RIGHT: TRANSFORMATION IMAGES */}
          <div className="w-full flex flex-col items-center relative">
            <div className="flex flex-col items-center mb-2">
              <div className="relative">
                {/* Salty SVG positioned to the left */}
                <img
                  src={saltyImage}
                  alt=""
                  className="absolute -left-24 top-1/2 -translate-y-1/2 w-24 h-auto z-10"
                />
                <img
                  src={fromImage}
                  alt="Sermon Notes"
                  className="w-56 h-44 object-cover rounded-xl shadow-xl border-4 border-white"
                />
                <span className="block text-center text-base text-gray-500 mt-1 italic">From this…</span>
              </div>
              {/* Arrow/Divider */}
              <svg
                width="32"
                height="60"
                className="my-2 md:my-4 text-secondary-200"
                fill="none"
                viewBox="0 0 24 24"
              >
                <path
                  d="M16 0v54M16 54l-8-8M16 54l8-8"
                  stroke="currentColor"
                  strokeWidth="2.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </div>
            <div className="grid grid-cols-2 gap-4">
              {toImages.map((img, idx) => (
                <div key={img.src} className="flex flex-col items-center">
                  <img
                    src={img.src}
                    alt={img.label}
                    className="w-36 h-36 object-cover rounded-xl shadow-lg border-2 border-white transition-transform hover:scale-105"
                  />
                  <span className="text-sm text-gray-500 mt-2 italic">{img.label}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Ministry Use Cases Section */}
      <section className="px-6 md:px-8 lg:px-12 py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-secondary-900 mb-4">
              Design Anything You Need for Ministry
            </h2>
            <p className="text-lg text-secondary-600 max-w-2xl mx-auto">
              From sermon graphics to event promotions, SALT helps you create professional designs for every aspect of your ministry.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {ministryUsesCases.map((useCase, index) => (
              <div 
                key={index}
                className="bg-white rounded-xl overflow-hidden shadow-sm hover:shadow-lg transition-all duration-300"
              >
                {useCase.chat ? (
                  <div className="p-6 h-full flex flex-col">
                    <h3 className="text-xl font-bold text-secondary-900 mb-4">
                      {useCase.title}
                    </h3>
                    <div className="flex-grow space-y-3">
                      {useCase.chat.map((message, idx) => (
                        <div
                          key={idx}
                          className={`flex ${message.role === 'response' ? 'justify-end' : 'justify-start'}`}
                        >
                          <div
                            className={`max-w-[80%] rounded-2xl px-4 py-2 ${
                              message.role === 'response'
                                ? 'bg-primary-600 text-white'
                                : 'bg-secondary-100'
                            }`}
                          >
                            <p className="text-sm">{message.message}</p>
                          </div>
                        </div>
                      ))}
                    </div>
                    <div className="mt-4 flex flex-wrap gap-2">
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
                ) : (
                  <>
                    <div className="aspect-[4/3] relative overflow-hidden">
                      <img
                        src={useCase.image}
                        alt={useCase.title}
                        className="w-full h-full object-cover transform hover:scale-105 transition-transform duration-300"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent" />
                    </div>
                    <div className="p-6">
                      <h3 className="text-xl font-bold text-secondary-900 mb-2">
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
                  </>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      <VideoModal
        isOpen={isVideoModalOpen}
        onClose={handleCloseVideo}
        videoUrl={DEMO_VIDEO_URL}
      />
    </div>
  );
};

export default HomePage;