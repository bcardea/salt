import React, { useState } from "react";
import { Link } from "react-router-dom";
import { ArrowRight, Play } from "lucide-react";
import VideoModal from "../components/VideoModal";

const fromImage =
  "https://storage.googleapis.com/msgsndr/jI35EgXT0cs2YnriH7gl/media/68293e458acc4a9f8cb8315f.jpeg";

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

const DEMO_VIDEO_URL = "https://storage.googleapis.com/msgsndr/jI35EgXT0cs2YnriH7gl/media/68277db887598fe88e900a12.mp4";

const HomePage = () => {
  const [isVideoModalOpen, setIsVideoModalOpen] = useState(false);

  const handleOpenVideo = () => setIsVideoModalOpen(true);
  const handleCloseVideo = () => setIsVideoModalOpen(false);

  return (
    <div className="bg-white text-gray-900 font-sans">
      {/* Hero Section */}
      <section className="w-full px-4 md:px-8 lg:px-16 pt-10 md:pt-20 pb-28 bg-gradient-to-b from-secondary-50 to-white">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row-reverse gap-12 items-center">
            {/* RIGHT: TRANSFORMATION IMAGES */}
            <div className="w-full max-w-xl mx-auto md:mx-0 md:w-1/2">
              {/* From Image */}
              <div className="relative mb-12">
                <img
                  src={saltyImage}
                  alt=""
                  className="absolute -left-7 top-1/2 -translate-y-1/2 w-20 h-auto z-10 drop-shadow-xl"
                />
                <div className="pl-16">
                  <div className="aspect-[3/2] w-full">
                    <img
                      src={fromImage}
                      alt="Sermon Notes"
                      className="w-full h-full object-cover rounded-2xl shadow-2xl border-4 border-white"
                    />
                  </div>
                </div>
                <p className="text-center text-base text-gray-500 mt-4 italic">
                  From this…
                </p>
              </div>

              {/* Arrow */}
              <div className="flex justify-center mb-12">
                <svg
                  className="w-8 h-16 text-secondary-200"
                  fill="none"
                  viewBox="0 0 24 54"
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

              {/* To Images Grid */}
              <div className="grid grid-cols-2 gap-6">
                {toImages.map((img) => (
                  <div key={img.src} className="flex flex-col items-center">
                    <div className="aspect-[3/2] w-full">
                      <img
                        src={img.src}
                        alt={img.label}
                        className="w-full h-full object-cover rounded-2xl shadow-xl border-2 border-white transition-transform duration-200 hover:scale-105"
                      />
                    </div>
                    <p className="text-sm text-gray-500 mt-3 italic">
                      {img.label}
                    </p>
                  </div>
                ))}
              </div>
            </div>

            {/* LEFT: TEXT */}
            <div className="relative flex flex-col items-start justify-center md:pr-10 lg:pr-16 md:w-1/2">
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold leading-tight tracking-tight mb-5">
                Your Words,<br />
                <span className="block mt-2">
                  <span className="young-serif gradient-text">Divinely</span>{" "}
                  <span className="text-secondary-900">Visualized</span>
                </span>
              </h1>
              <p className="text-lg md:text-xl text-gray-700 mb-5">
                The world has enough ordinary sermon slides.{" "}
                <span className="font-semibold text-secondary-700">
                  Yours should be extraordinary
                </span>{" "}
                — in just 120 seconds.
              </p>
              <p className="mb-8 text-base md:text-lg text-gray-600 max-w-xl">
                You didn't answer the call to ministry to spend hours wrestling with design software. SALT Creative transforms your sermon into captivating visuals with one click. No technical skills required. No creative team needed.{" "}
                <span className="font-semibold text-secondary-600">
                  While you focus on the Word, we focus on making it seen.
                </span>
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Link
                  to="/generator"
                  className="inline-flex items-center px-8 py-4 text-lg font-bold text-white bg-secondary-900 rounded-full shadow-lg hover:bg-secondary-800 transition-all group focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-secondary-700"
                >
                  Create Your First Masterpiece
                  <ArrowRight className="ml-3 h-5 w-5 group-hover:translate-x-1 transition-transform" />
                </Link>
                <button
                  onClick={handleOpenVideo}
                  className="inline-flex items-center px-8 py-4 text-lg font-medium text-secondary-600 hover:text-secondary-900 transition-colors group focus:outline-none"
                >
                  Watch Demo Video
                  <Play className="ml-3 h-5 w-5 group-hover:translate-x-1 transition-transform" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Ministry Use Cases Section */}
      <section className="px-4 md:px-8 lg:px-16 py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-14">
            <h2 className="text-3xl md:text-4xl font-bold text-secondary-900 mb-3">
              Design Anything You Need for Ministry
            </h2>
            <p className="text-lg text-secondary-600 max-w-2xl mx-auto">
              From sermon graphics to event promotions, SALT helps you create professional designs for every aspect of your ministry.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {ministryUsesCases.map((useCase, index) => (
              <div 
                key={index}
                className={useCase.chat ? "bg-transparent" : "bg-white rounded-2xl overflow-hidden shadow-md hover:shadow-xl transition-all duration-300"}
              >
                {useCase.chat ? (
                  <div className="relative">
                    <div className="flex flex-col space-y-3">
                      {useCase.chat.map((message, idx) => (
                        <div
                          key={idx}
                          className={`flex ${message.role === 'response' ? 'justify-end' : 'justify-start'}`}
                        >
                          <div
                            className={`max-w-[80%] rounded-2xl px-4 py-2 ${
                              message.role === 'response'
                                ? 'bg-[#1e8efc] text-white'
                                : 'bg-secondary-100'
                            }`}
                          >
                            <p className="text-sm">{message.message}</p>
                          </div>
                        </div>
                      ))}
                    </div>
                    <div className="mt-8 flex justify-end">
                      <img
                        src="https://storage.googleapis.com/msgsndr/jI35EgXT0cs2YnriH7gl/media/68262fc2a32ad3673c166033.png"
                        alt=""
                        className="w-72 md:w-80 h-auto"
                      />
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
                      <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/15 to-transparent pointer-events-none" />
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