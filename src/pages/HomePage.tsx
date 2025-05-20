import React, { useState } from "react";
import { Link } from "react-router-dom";
import { ArrowRight, Play } from "lucide-react";
import VideoModal from "../components/VideoModal";

const fromImage =
  "https://storage.googleapis.com/msgsndr/jI35EgXT0cs2YnriH7gl/media/68293e458acc4a9f8cb8315f.jpeg";

const saltyImage =
  "https://storage.googleapis.com/msgsndr/jI35EgXT0cs2YnriH7gl/media/68253020b12e575165b9498e.svg";

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
    description: "Promote your church's outreach and service initiatives.",
    image:
      "https://storage.googleapis.com/msgsndr/jI35EgXT0cs2YnriH7gl/media/68262b369ce13305523fb0b0.jpeg",
    formats: ["Posters", "Social Media", "Email Headers"],
  },
  {
    title: "Youth Ministry",
    description: "Engage young people with dynamic, relevant designs.",
    image:
      "https://storage.googleapis.com/msgsndr/jI35EgXT0cs2YnriH7gl/media/68262b3687ff6450da9e721e.jpeg",
    formats: ["Instagram Stories", "Event Banners", "Digital Signage"],
  },
  {
    title: "Women's Ministry",
    description: "Create beautiful materials for women's events and studies.",
    image:
      "https://storage.googleapis.com/msgsndr/jI35EgXT0cs2YnriH7gl/media/68262b36b6b7cd5fefd72c71.jpeg",
    formats: ["Social Posts", "Study Guides", "Event Flyers"],
  },
  {
    title: "Men's Fellowship",
    description: "Design impactful graphics for men's gatherings.",
    image:
      "https://storage.googleapis.com/msgsndr/jI35EgXT0cs2YnriH7gl/media/68262b36a32ad3085a164bf6.jpeg",
    formats: ["Digital Banners", "Social Media", "Print Materials"],
  },
  {
    title: "Children's Ministry",
    description: "Attract volunteers and promote kids' programs.",
    image:
      "https://storage.googleapis.com/msgsndr/jI35EgXT0cs2YnriH7gl/media/68262b36b6b7cd59b6d72c72.jpeg",
    formats: ["Recruitment Posts", "Parent Communications", "Signage"],
  },
  {
    chat: [
      {
        role: "request",
        message:
          "Hey, sorry to ask so late on a Saturday but we need a design for Prayer Night ready by tomorrow morning's service.",
      },
      {
        role: "response",
        message:
          "No problem! I can use SALT to create this; I'll have it ready in 5 minutes!",
      },
      {
        role: "request",
        message: "🙌 Amazing, thank you! 🙏",
      },
    ],
  },
];

const DEMO_VIDEO_URL =
  "https://storage.googleapis.com/msgsndr/jI35EgXT0cs2YnriH7gl/media/682b7349aea9c626efc2e702.mp4";

const HomePage: React.FC = () => {
  const [isVideoModalOpen, setIsVideoModalOpen] = useState(false);

  const handleOpenVideo = () => setIsVideoModalOpen(true);
  const handleCloseVideo = () => setIsVideoModalOpen(false);

  return (
    <div className="bg-white text-gray-900 font-sans">
      {/* Hero Section */}
      <section className="w-full px-4 md:px-8 lg:px-16 pt-10 md:pt-20 pb-20 md:pb-24 bg-gradient-to-b from-secondary-50 to-white">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row-reverse gap-12 lg:gap-16 items-center">
            {/* RIGHT: TRANSFORMATION IMAGES */}
            <div className="w-full max-w-xl mx-auto md:mx-0 md:w-1/2">
              {/* From Image */}
              <div className="relative mb-10">
                <img
                  src={saltyImage}
                  alt="SALT logo icon"
                  className="absolute -left-5 top-1/2 -translate-y-1/2 w-16 h-auto z-10 drop-shadow-xl"
                />
                <div className="pl-12">
                  <div className="aspect-[3/2] w-full group">
                    <img
                      src={fromImage}
                      alt="Sermon notes before SALT"
                      className="w-full h-full object-cover rounded-2xl shadow-2xl border-4 border-white transition-all duration-300 group-hover:scale-[1.02] group-hover:shadow-[0_10px_30px_-10px_rgba(0,0,0,0.2)]"
                    />
                  </div>
                </div>
                <p className="text-center text-base text-gray-500 mt-4 italic">
                  From this…
                </p>
              </div>

              {/* Arrow */}
              <div className="flex justify-center mb-10">
                <svg
                  className="w-10 h-20 text-secondary-400"
                  fill="none"
                  viewBox="0 0 24 54"
                >
                  <path
                    d="M12 0v50M12 50l-7-7M12 50l7-7"
                    stroke="currentColor"
                    strokeWidth="2.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </div>

              {/* To Images Grid */}
              <div className="grid grid-cols-2 gap-5 md:gap-6">
                {toImages.map((img) => (
                  <div
                    key={img.src}
                    className="flex flex-col items-center group"
                  >
                    <div className="aspect-[3/2] w-full">
                      <img
                        src={img.src}
                        alt={img.label}
                        className="w-full h-full object-cover rounded-2xl shadow-xl border-2 border-white transition-all duration-300 group-hover:scale-105 group-hover:shadow-2xl group-hover:border-gray-200"
                      />
                    </div>
                    <p className="text-sm text-gray-500 mt-3 italic group-hover:text-gray-600 transition-colors">
                      {img.label}
                    </p>
                  </div>
                ))}
              </div>
            </div>

            {/* LEFT: TEXT */}
            <div className="relative flex flex-col items-start justify-center md:pr-10 lg:pr-16 md:w-1/2">
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold leading-tight tracking-tight mb-6">
                Your Words, <br />
                <span className="block mt-2">
                  <span className="young-serif gradient-text">Divinely</span>{" "}
                  <span className="text-secondary-900">Visualized</span>
                </span>
              </h1>

              <p className="text-lg md:text-xl text-gray-700 mb-4 leading-relaxed">
                <span className="font-semibold text-secondary-700">
                  Extraordinary sermon and ministry graphics
                </span>{" "}
                created in just <strong>2&nbsp;minutes</strong>—no design
                skills, no creative team, no stress.
              </p>

              <p className="mb-8 text-base md:text-lg text-gray-600 max-w-xl leading-relaxed">
                Spend less time wrestling with design software and more time
                shepherding your people. SALT transforms your sermon notes into
                stunning visuals with a single click—so you can focus on the
                Word while we make it seen.
              </p>

              <div className="flex flex-col sm:flex-row gap-4 items-center">
                <Link
                  to="/generator"
                  className="inline-flex items-center justify-center px-8 py-4 text-lg font-bold text-white bg-secondary-900 rounded-full shadow-lg hover:bg-secondary-800 transition-all duration-300 group focus:outline-none focus:ring-4 focus:ring-offset-2 focus:ring-secondary-700/50 transform hover:scale-[1.02]"
                >
                  Create Your First Masterpiece
                  <ArrowRight className="ml-3 h-5 w-5 group-hover:translate-x-1 transition-transform duration-200" />
                </Link>
                <button
                  onClick={handleOpenVideo}
                  className="inline-flex items-center justify-center px-8 py-4 text-lg font-semibold text-secondary-700 bg-transparent border-2 border-secondary-300 rounded-full hover:bg-secondary-50 hover:border-secondary-400 hover:text-secondary-800 transition-all duration-300 group focus:outline-none focus:ring-4 focus:ring-offset-2 focus:ring-secondary-500/50 transform hover:scale-[1.02]"
                >
                  Watch Demo Video
                  <Play className="ml-3 h-5 w-5 group-hover:scale-110 transition-transform duration-200" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Benefit Section */}
      <section className="px-4 md:px-8 lg:px-16 py-12 md:py-16 bg-white">
        <div className="max-w-5xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-secondary-900 mb-6">
            More Time for Ministry, Less Time on Graphics
          </h2>
          <p className="text-lg text-secondary-700 max-w-3xl mx-auto leading-relaxed mb-4">
            SALT Creative is your on-demand design team. In a few clicks, craft
            beautiful visuals without the cost, wait, or learning curve of
            traditional design tools.
          </p>
          <p className="text-lg text-secondary-700 max-w-3xl mx-auto leading-relaxed">
            The result? <strong>Polished, modern graphics</strong> that engage
            your congregation—created by <em>you</em> in minutes.
          </p>
        </div>
      </section>

      {/* Ministry Use Cases Section */}
      <section className="px-4 md:px-8 lg:px-16 py-16 md:py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16 md:mb-20">
            <h2 className="text-3xl md:text-4xl font-bold text-secondary-900 mb-4">
              Design Anything You Need for Ministry
            </h2>
            <p className="text-lg text-secondary-600 max-w-3xl mx-auto leading-relaxed">
              From sermon graphics to event promotions, SALT helps you create
              professional designs for every ministry need with unparalleled
              ease and speed.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {ministryUsesCases.map((useCase, index) => (
              <div
                key={index}
                className={
                  useCase.chat
                    ? "bg-white rounded-2xl shadow-lg overflow-hidden border border-gray-100 flex flex-col"
                    : "bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300 group border border-transparent hover:border-secondary-100 flex flex-col"
                }
              >
                {useCase.chat ? (
                  <div className="p-6 md:p-8 flex flex-col h-full">
                    <div className="flex-grow space-y-4 mb-6">
                      {useCase.chat.map((message, idx) => (
                        <div
                          key={idx}
                          className={`flex ${
                            message.role === "response"
                              ? "justify-end"
                              : "justify-start"
                          }`}
                        >
                          <div
                            className={`max-w-[90%] rounded-xl px-4 py-3 text-sm sm:text-base shadow-sm ${
                              message.role === "response"
                                ? "bg-blue-500 text-white rounded-br-lg"
                                : "bg-gray-200 text-gray-800 rounded-bl-lg"
                            }`}
                          >
                            <p>{message.message}</p>
                          </div>
                        </div>
                      ))}
                    </div>
                    <div className="mt-auto flex justify-center">
                      <img
                        src="https://storage.googleapis.com/msgsndr/jI35EgXT0cs2YnriH7gl/media/68262fc2a32ad3673c166033.png"
                        alt="Chat illustration"
                        className="w-52 md:w-60 h-auto"
                      />
                    </div>
                  </div>
                ) : (
                  <>
                    <div className="aspect-[4/3] relative overflow-hidden">
                      <img
                        src={useCase.image}
                        alt={useCase.title}
                        className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-300"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-black/10 to-transparent pointer-events-none" />
                    </div>
                    <div className="p-6 flex flex-col flex-grow">
                      <h3 className="text-xl font-bold text-secondary-900 mb-2">
                        {useCase.title}
                      </h3>
                      <p className="text-secondary-600 mb-4 text-sm leading-relaxed flex-grow">
                        {useCase.description}
                      </p>
                      <div className="flex flex-wrap gap-2 mt-auto">
                        {useCase.formats?.map((format, idx) => (
                          <span
                            key={idx}
                            className="px-3 py-1 bg-secondary-100 text-secondary-700 rounded-full text-xs font-medium"
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

      {/* Final CTA Section */}
      <section className="px-4 md:px-8 lg:px-16 py-16 md:py-20 bg-white">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-secondary-900 mb-6">
            Ready to Get Started?
          </h2>
          <p className="text-lg text-secondary-700 max-w-2xl mx-auto leading-relaxed mb-8">
            You’re minutes away from your next show-stopping graphic. Empower
            your ministry with stress-free, stunning visuals—no design
            experience required.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              to="/generator"
              className="inline-flex items-center justify-center px-8 py-4 text-lg font-bold text-white bg-secondary-900 rounded-full shadow-lg hover:bg-secondary-800 transition-all duration-300 group focus:outline-none focus:ring-4 focus:ring-offset-2 focus:ring-secondary-700/50 transform hover:scale-[1.02]"
            >
              Create Your First Masterpiece
              <ArrowRight className="ml-3 h-5 w-5 group-hover:translate-x-1 transition-transform duration-200" />
            </Link>
            <button
              onClick={handleOpenVideo}
              className="inline-flex items-center justify-center px-8 py-4 text-lg font-semibold text-secondary-700 bg-transparent border-2 border-secondary-300 rounded-full hover:bg-secondary-50 hover:border-secondary-400 hover:text-secondary-800 transition-all duration-300 group focus:outline-none focus:ring-4 focus:ring-offset-2 focus:ring-secondary-500/50 transform hover:scale-[1.02]"
            >
              Watch Demo Video
              <Play className="ml-3 h-5 w-5 group-hover:scale-110 transition-transform duration-200" />
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