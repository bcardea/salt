import React, { useState } from "react";
import { Link } from "react-router-dom";
import { ArrowRight, Play } from "lucide-react";
import VideoModal from "../components/VideoModal"; // Assuming this path is correct

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
    <div className="bg-white text-gray-900 font-sans antialiased"> {/* Added antialiased for smoother fonts */}
      {/* Hero Section */}
      <section className="w-full px-6 md:px-8 lg:px-12 pt-16 md:pt-24 pb-16 md:pb-24 bg-gradient-to-b from-secondary-50 to-white"> {/* Adjusted padding */}
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col md:grid md:grid-cols-2 gap-12 md:gap-10 lg:gap-16 md:items-start"> {/* Changed to items-start, adjusted gap */}
            {/* LEFT: TEXT */}
            <div className="flex flex-col items-start justify-start md:pt-4 lg:pt-8 md:pr-10 lg:pr-16 text-center md:text-left"> {/* Added pt for alignment, justify-start, text alignment */}
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold leading-tight tracking-tight mb-6"> {/* Adjusted mb, responsive text size */}
                Your Words,<br />
                <span className="block mt-1 sm:mt-2"> {/* Adjusted mt */}
                  <span className="young-serif gradient-text">Divinely</span>{" "}
                  <span className="text-secondary-900">Visualized</span>
                </span>
              </h1>
              <p className="text-lg md:text-xl text-gray-700 mb-6 max-w-xl mx-auto md:mx-0"> {/* max-w for readability, centered on mobile */}
                The world has enough ordinary sermon slides. <span className="font-semibold text-secondary-700">Yours should be extraordinary</span> — in just 120 seconds.
              </p>
              <p className="mb-8 text-base md:text-lg text-gray-600 max-w-xl mx-auto md:mx-0"> {/* max-w for readability, centered on mobile */}
                You didn't answer the call to ministry to spend hours wrestling with design software. SALT Creative transforms your sermon into captivating visuals with one click. No technical skills required. No creative team needed. <span className="font-semibold text-secondary-600">While you focus on the Word, we focus on making it seen.</span>
              </p>
              <div className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto justify-center md:justify-start"> {/* Centered buttons on mobile */}
                <Link
                  to="/generator"
                  className="inline-flex items-center justify-center px-8 py-4 text-lg font-bold text-white bg-secondary-900 rounded-full shadow-lg hover:bg-secondary-800 transition-all group transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-secondary-700 focus:ring-offset-2" /* Added focus states, hover transform */
                >
                  Create Your First Masterpiece
                  <ArrowRight className="ml-3 h-5 w-5 group-hover:translate-x-1 transition-transform" />
                </Link>
                <button
                  onClick={handleOpenVideo}
                  className="inline-flex items-center justify-center px-8 py-4 text-lg font-medium text-secondary-700 hover:text-secondary-900 hover:bg-secondary-100 rounded-full transition-all group transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-secondary-600 focus:ring-offset-1" /* Enhanced styling, hover, focus */
                >
                  Watch Demo Video
                  <Play className="ml-3 h-5 w-5 fill-current group-hover:translate-x-1 transition-transform" /> {/* Added fill-current for icon color */ }
                </button>
              </div>
            </div>

            {/* RIGHT: TRANSFORMATION IMAGES */}
            <div className="w-full max-w-2xl mx-auto mt-12 md:mt-0"> {/* Added mt for mobile spacing */}
              {/* From Image */}
              <div className="relative mb-8"> {/* Reduced mb */}
                <img
                  src={saltyImage}
                  alt="SALT Creative mascot" // Added alt text
                  className="absolute top-1/2 -translate-y-1/2 w-16 -left-4 sm:w-20 sm:-left-6 md:w-24 md:-left-8 h-auto z-10" // Responsive size & position
                />
                <div className="ml-10 sm:ml-12 md:ml-14"> {/* Adjusted padding to accommodate saltyImage */}
                  <div className="aspect-[3/2] w-full">
                    <img
                      src={fromImage}
                      alt="Sermon Notes example before transformation" // Descriptive alt text
                      className="w-full h-full object-cover rounded-xl shadow-2xl border-4 border-white" // Enhanced shadow
                    />
                  </div>
                </div>
                <p className="text-center text-base text-gray-600 mt-4 font-medium"> {/* Adjusted text color & weight */}
                  From this…
                </p>
              </div>

              {/* Arrow */}
              <div className="flex justify-center my-6 md:my-8"> {/* Adjusted margin */}
                <svg
                  className="w-8 h-12 md:h-16 text-secondary-300" /* Adjusted size and color */
                  fill="none"
                  viewBox="0 0 24 64" // Adjusted viewBox for a potentially slimmer arrow
                  preserveAspectRatio="xMidYMid meet"
                >
                  <path
                    d="M12 0V58M12 58L6 50M12 58L18 50" // Centered arrow
                    stroke="currentColor"
                    strokeWidth="2.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </div>

              {/* To Images Grid */}
              <div className="grid grid-cols-2 gap-4 sm:gap-6"> {/* Adjusted gap */}
                {toImages.map((img) => (
                  <div key={img.src} className="flex flex-col items-center">
                    <div className="aspect-[3/2] w-full overflow-hidden rounded-xl shadow-xl border-2 border-white"> {/* Added overflow-hidden */}
                      <img
                        src={img.src}
                        alt={img.label.replace("…", "") + " design example"} // More descriptive alt
                        className="w-full h-full object-cover transition-transform duration-300 ease-in-out hover:scale-110" // Enhanced hover, timing function
                      />
                    </div>
                    <p className="text-sm text-gray-600 mt-3 font-medium"> {/* Adjusted text color & weight */}
                      {img.label}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Ministry Use Cases Section */}
      <section className="px-6 md:px-8 lg:px-12 py-16 md:py-20 lg:py-24 bg-gray-50"> {/* Consistent padding */}
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12 md:mb-16"> {/* Increased mb */}
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-secondary-900 mb-4"> {/* Responsive text size */}
              Design Anything You Need for Ministry
            </h2>
            <p className="text-lg md:text-xl text-secondary-700 max-w-3xl mx-auto"> {/* Adjusted color, max-width */}
              From sermon graphics to event promotions, SALT helps you create professional designs for every aspect of your ministry.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {ministryUsesCases.map((useCase, index) => (
              <div 
                key={index}
                className={useCase.chat ? "bg-white rounded-xl shadow-lg p-6 md:p-8 flex flex-col" : "bg-white rounded-xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 ease-in-out flex flex-col"} /* Standardized card style, added flex for chat card */
              >
                {useCase.chat ? (
                  <div className="flex flex-col h-full"> {/* Ensure chat card takes full height if needed */}
                    <div className="flex-grow space-y-4 mb-6"> {/* Added mb and more space */}
                      {useCase.chat.map((message, idx) => (
                        <div
                          key={idx}
                          className={`flex ${message.role === 'response' ? 'justify-end' : 'justify-start'}`}
                        >
                          <div
                            className={`max-w-[85%] rounded-2xl px-4 py-3 text-sm sm:text-base ${ /* Increased padding and text size */ },
                              message.role === 'response'
                                ? 'bg-[#1e8efc] text-white rounded-br-lg' /* Tailored rounding */
                                : 'bg-secondary-100 text-secondary-800 rounded-bl-lg' /* Tailored rounding */
                            }`}
                          >
                            <p>{message.message}</p>
                          </div>
                        </div>
                      ))}
                    </div>
                    <div className="mt-auto flex justify-center md:justify-end"> {/* mt-auto to push image down, centered on mobile */ }
                      <img
                        src="https://storage.googleapis.com/msgsndr/jI35EgXT0cs2YnriH7gl/media/68262fc2a32ad3673c166033.png"
                        alt="Phone mockup showing SALT Creative app interface" // Descriptive alt
                        className="w-full max-w-[280px] sm:max-w-xs h-auto" /* Responsive max-width */
                      />
                    </div>
                  </div>
                ) : (
                  <>
                    <div className="aspect-[16/10] relative overflow-hidden"> {/* Adjusted aspect ratio for variety */ }
                      <img
                        src={useCase.image}
                        alt={useCase.title}
                        className="w-full h-full object-cover transform transition-transform duration-300 ease-in-out hover:scale-105"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-black/10 to-transparent" /> {/* Softer gradient */}
                    </div>
                    <div className="p-6 flex flex-col flex-grow"> {/* Added flex-grow for consistent card height */}
                      <h3 className="text-xl lg:text-2xl font-semibold text-secondary-900 mb-2"> {/* Adjusted size, weight */}
                        {useCase.title}
                      </h3>
                      <p className="text-secondary-700 mb-4 text-base flex-grow"> {/* Adjusted color, flex-grow */}
                        {useCase.description}
                      </p>
                      <div className="flex flex-wrap gap-2 mt-auto"> {/* mt-auto to push tags to bottom */}
                        {useCase.formats.map((format, idx) => (
                          <span 
                            key={idx}
                            className="px-3 py-1.5 bg-secondary-100 text-secondary-700 rounded-full text-xs sm:text-sm font-medium" /* Adjusted padding, font-weight */
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