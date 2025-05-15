import React from "react";
import { ArrowRight } from "lucide-react";

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

const HomePage = () => {
  return (
    <div className="bg-white text-gray-900 font-sans">
      {/* Hero Section */}
      <section className="w-full px-4 md:px-0 pt-14 md:pt-24 pb-10 md:pb-20 bg-gradient-to-b from-secondary-50 to-white">
        <div className="max-w-7xl mx-auto flex flex-col-reverse md:grid md:grid-cols-2 gap-10 items-center">
          {/* LEFT: TEXT */}
          <div className="relative flex flex-col items-start justify-center md:pr-10">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold leading-tight tracking-tight mb-4">
              Your Words,<br />
              <span className="block mt-1 text-secondary-600">
                Divinely Visualized.
              </span>
            </h1>
            <p className="text-lg md:text-xl text-gray-700 mb-6">
              The world has enough ordinary sermon slides. <span className="font-semibold text-secondary-700">Yours should be extraordinary</span> — in just 120 seconds.
            </p>
            <p className="mb-8 text-base md:text-lg text-gray-600 max-w-xl">
              You didn't answer the call to ministry to spend hours wrestling with design software. SALT Creative transforms your sermon into captivating visuals with one click. No technical skills required. No creative team needed. <span className="font-semibold text-secondary-600">While you focus on the Word, we focus on making it seen.</span>
            </p>
            <a
              href="/generator"
              className="inline-flex items-center px-8 py-4 text-lg font-bold text-white bg-secondary-900 rounded-full shadow-lg hover:bg-secondary-800 transition-all group"
            >
              Create Your First Masterpiece
              <ArrowRight className="ml-3 h-5 w-5 group-hover:translate-x-1 transition-transform" />
            </a>
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
                viewBox="0 0 32 60"
                style={{ minHeight: "48px" }}
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

      {/* Use Cases Section */}
      <section className="px-4 md:px-0 py-16 bg-gray-50 text-center">
        <h3 className="text-2xl md:text-3xl font-bold mb-6">Design Anything You Need for Ministry</h3>
        <ul className="max-w-3xl mx-auto text-left list-disc list-inside space-y-3 text-gray-800">
          <li>
            <strong>Sermon Series Artwork:</strong> Instantly create stunning title slides and social media graphics that capture your message.
          </li>
          <li>
            <strong>Bible Study & Small Group Invites:</strong> Engaging images for Bible studies, youth nights, and small group gatherings.
          </li>
          <li>
            <strong>Event Promotions & Digital Signage:</strong> Design announcement slides, flyers, and digital signage in minutes.
          </li>
          <li>
            <strong>Social Media Inspiration:</strong> Turn verses or quotes into shareable graphics that inspire and encourage.
          </li>
        </ul>
      </section>

      {/* ...the rest of your page, benefits, midpage CTA, footer etc. */}
    </div>
  );
};

export default HomePage;