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

const DEMO_VIDEO_URL = "https://storage.googleapis.com/msgsndr/jI35EgXT0cs2YnriH7gl/media/682b7349aea9c626efc2e702.mp4";

const HomePage = () => {
  const [isVideoModalOpen, setIsVideoModalOpen] = useState(false);

  const handleOpenVideo = () => setIsVideoModalOpen(true);
  const handleCloseVideo = () => setIsVideoModalOpen(false);

  return (
    <div className="bg-white text-gray-900 font-sans">
      {/* Hero Section - Part 1: Visual Showcase */}
      <section className="bg-secondary-900 text-white">
        <div className="max-w-none">
          <div className="md:flex md:h-[calc(75vh)] min-h-[500px] md:min-h-[600px]"> {/* Ensure minimum height */}
            {/* Left Panel: "From" Image */}
            <div className="md:w-1/2 h-80 md:h-full relative group overflow-hidden">
              <img
                src={fromImage}
                alt="Example of basic sermon notes"
                className="w-full h-full object-cover transition-transform duration-500 ease-in-out group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-black/10"></div> {/* Subtle vignette */}
              <img
                src={saltyImage}
                alt="SALT logo"
                className="absolute top-6 left-6 w-20 md:w-28 h-auto z-10 drop-shadow-xl transition-transform duration-300 group-hover:scale-105"
              />
              <p className="absolute bottom-6 left-6 text-lg md:text-xl font-semibold bg-black/70 p-3 rounded-lg z-10">
                From this…
              </p>
            </div>
            {/* Right Panel: "To" Images */}
            <div className="md:w-1/2 h-[300px] md:h-full grid grid-cols-2 gap-0.5 overflow-y-auto"> {/* Minimal gap, allow scroll */}
              {toImages.map((img) => (
                <div key={img.src} className="relative group aspect-w-1 aspect-h-1"> {/* Enforce square aspect ratio */}
                  <img
                    src={img.src}
                    alt={img.label.replace("…", "")}
                    className="w-full h-full object-cover transition-all duration-300 ease-in-out group-hover:scale-105 group-hover:opacity-80"
                  />
                  <div className="absolute inset-0 bg-black/20 group-hover:bg-black/0 transition-colors duration-300"></div>
                  <p className="absolute bottom-2 left-2 right-2 text-xs sm:text-sm font-medium bg-black/70 text-white p-1.5 rounded text-center group-hover:bg-secondary-600/90 transition-colors duration-300">
                    {img.label}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Hero Section - Part 2: Text Content */}
      <section className="py-16 md:py-24 px-4 sm:px-6 lg:px-8 bg-white">
        <div className="max-w-3xl mx-auto text-center">
          <h1 className="text-5xl md:text-6xl lg:text-7xl font-extrabold leading-tight tracking-tight mb-8">
            Your Words,<br />
            <span className="block mt-2 md:mt-3">
              <span className="young-serif gradient-text">Divinely</span>{" "}
              <span className="text-secondary-900">Visualized</span>
            </span>
          </h1>
          <p className="text-lg md:text-xl text-gray-700 mb-8 leading-relaxed max-w-2xl mx-auto">
            The world has enough ordinary sermon slides.{" "}
            <span className="font-semibold text-secondary-700">
              Yours should be extraordinary
            </span>{" "}
            — in just 120 seconds.
          </p>
          <p className="mb-12 text-base md:text-lg text-gray-600 max-w-xl mx-auto leading-relaxed">
            You didn't answer the call to ministry to spend hours wrestling with design software. SALT Creative transforms your sermon into captivating visuals with one click. No technical skills required. No creative team needed.{" "}
            <span className="font-semibold text-secondary-600">
              While you focus on the Word, we focus on making it seen.
            </span>
          </p>
          <div className="flex flex-col sm:flex-row gap-5 sm:gap-6 justify-center">
            <Link
              to="/generator"
              className="inline-flex items-center justify-center px-10 py-5 text-lg md:text-xl font-bold text-white bg-secondary-900 rounded-lg shadow-xl hover:bg-secondary-800 transition-all duration-300 group focus:outline-none focus:ring-4 focus:ring-offset-2 focus:ring-secondary-700/50 transform hover:scale-105 active:scale-95"
            >
              Create Your First Masterpiece
              <ArrowRight className="ml-3 h-6 w-6 group-hover:translate-x-1.5 transition-transform duration-200" />
            </Link>
            <button
              onClick={handleOpenVideo}
              className="inline-flex items-center justify-center px-10 py-5 text-lg md:text-xl font-semibold text-secondary-700 bg-transparent border-2 border-secondary-400 rounded-lg hover:bg-secondary-50 hover:border-secondary-500 hover:text-secondary-800 transition-all duration-300 group focus:outline-none focus:ring-4 focus:ring-offset-2 focus:ring-secondary-500/50 transform hover:scale-105 active:scale-95"
            >
              Watch Demo Video
              <Play className="ml-3 h-6 w-6 group-hover:scale-110 transition-transform duration-200" />
            </button>
          </div>
        </div>
      </section>

      {/* Ministry Use Cases Section */}
      <section className="px-4 sm:px-6 lg:px-8 py-16 md:py-24 bg-gray-50">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16 md:mb-20">
            <h2 className="text-4xl md:text-5xl font-bold text-secondary-900 mb-5">
              Design Anything You Need for Ministry
            </h2>
            <p className="text-lg md:text-xl text-secondary-600 max-w-3xl mx-auto leading-relaxed">
              From sermon graphics to event promotions, SALT helps you create professional designs for every aspect of your ministry with unparalleled ease and speed.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 md:gap-10">
            {ministryUsesCases.map((useCase, index) => {
              if (useCase.chat) {
                return (
                  <div
                    key={index}
                    className="md:col-span-2 lg:col-span-1 bg-secondary-800 text-gray-100 rounded-xl shadow-2xl p-6 sm:p-8 flex flex-col transform hover:-translate-y-1 transition-all duration-300"
                  >
                    <div className="flex-grow space-y-4 mb-6">
                      {useCase.chat.map((message, idx) => (
                        <div
                          key={idx}
                          className={`flex ${message.role === 'response' ? 'justify-end' : 'justify-start'}`}
                        >
                          <div
                            className={`max-w-[90%] rounded-lg px-4 py-3 text-sm sm:text-base shadow-md ${
                              message.role === 'response'
                                ? 'bg-blue-500 text-white rounded-br-md'
                                : 'bg-secondary-700 text-gray-50 rounded-bl-md'
                            }`}
                          >
                            <p>{message.message}</p>
                          </div>
                        </div>
                      ))}
                    </div>
                    <div className="mt-auto flex justify-center pt-4">
                      <img
                        src="https://storage.googleapis.com/msgsndr/jI35EgXT0cs2YnriH7gl/media/68262fc2a32ad3673c166033.png"
                        alt="Chat illustration for quick design requests"
                        className="w-48 sm:w-56 h-auto"
                      />
                    </div>
                  </div>
                );
              }
              return (
                <div
                  key={index}
                  className="bg-white rounded-xl shadow-2xl overflow-hidden group flex flex-col transform hover:-translate-y-2 hover:shadow-[0_20px_50px_-10px_rgba(0,0,0,0.15)] transition-all duration-300"
                >
                  <div className="h-64 sm:h-72 w-full overflow-hidden">
                    <img
                      src={useCase.image}
                      alt={useCase.title}
                      className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-500 ease-in-out"
                    />
                  </div>
                  <div className="p-6 sm:p-8 flex flex-col flex-grow">
                    <h3 className="text-2xl font-semibold text-secondary-900 mb-3">
                      {useCase.title}
                    </h3>
                    <p className="text-gray-600 mb-6 text-sm sm:text-base leading-relaxed flex-grow">
                      {useCase.description}
                    </p>
                    <div className="flex flex-wrap gap-3 mt-auto">
                      {useCase.formats?.map((format, idx) => (
                        <span
                          key={idx}
                          className="px-4 py-2 bg-secondary-100 text-secondary-800 rounded-md text-xs font-semibold uppercase tracking-wider group-hover:bg-secondary-200 transition-colors"
                        >
                          {format}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              );
            })}
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