import React from 'react';

const SaltCreativeLandingPage = () => {
  return (
    <div className="font-sans text-gray-800">
      {/* Hero Section */}
      <section className="bg-white px-6 py-12 text-center md:text-left md:flex md:items-center md:justify-between md:py-20">
        <div className="md:w-1/2 md:pr-8">
          <h1 className="text-4xl md:text-5xl font-extrabold mb-4">
            From Sermon Notes to <br className="hidden md:block"/> 
            Stunning Visuals in Minutes 
            {/* Retro mascot icon next to headline (optional) */}
            <img 
              src="/assets/retro-mascot.png" 
              alt="Salt Creative mascot" 
              className="inline-block w-12 md:w-16 ml-2 align-middle" 
            />
          </h1>
          <h2 className="text-xl md:text-2xl font-medium mb-6">
            Generate biblically inspired artwork at the click of a button – 
            <span className="font-semibold">fast</span>, 
            <span className="font-semibold"> faithful</span>, and 
            <span className="font-semibold"> effortless</span>.
          </h2>
          <p className="mb-8 text-gray-700 leading-relaxed">
            You wear many hats as a pastor. Designing graphics shouldn’t be one of them. 
            Salt Creative lets you create eye-catching, faith-filled graphics in minutes, 
            even with no design team. Engage your congregation with visuals as powerful as your message.
          </p>
          <button className="bg-blue-600 hover:bg-blue-700 text-white text-lg font-semibold py-3 px-6 rounded shadow-lg transition duration-150">
            Start Creating
          </button>
        </div>
        {/* Hero Transformation Images */}
        <div className="md:w-1/2 md:flex md:items-center md:justify-center mt-10 md:mt-0">
          <div className="flex flex-col items-center md:items-start md:mr-4">
            <img 
              src="https://storage.googleapis.com/msgsndr/jI35EgXT0cs2YnriH7gl/media/682523349cd8fb6bde9bbb09.jpeg" 
              alt="Sermon notes in a notebook" 
              className="w-64 h-64 object-cover rounded-md shadow-md"
            />
            <p className="mt-2 text-sm italic text-gray-600">From this...</p>
          </div>
          <div className="flex flex-col items-center md:items-start md:ml-4 md:mr-4">
            <img 
              src="https://www.langweiledich.net/wp-content/uploads/2024/02/venti-views-Df-7H6XiABQ-unsplash.jpg" 
              alt="Generated sermon artwork example 1" 
              className="w-64 h-64 object-cover rounded-md shadow-md"
            />
            <p className="mt-2 text-sm italic text-gray-600">...to this!</p>
          </div>
          <div className="flex flex-col items-center md:items-start md:ml-4">
            <img 
              src="https://i.pinimg.com/736x/fa/5e/80/fa5e805ec3ea5ebecf83d9c5c5dea76b.jpg" 
              alt="Generated sermon artwork example 2" 
              className="w-64 h-64 object-cover rounded-md shadow-md"
            />
            <p className="mt-2 text-sm italic text-gray-600">...or this!</p>
          </div>
        </div>
      </section>

      {/* Use Cases Section */}
      <section className="px-6 py-12 bg-gray-50 text-center">
        <h3 className="text-2xl font-bold mb-6">Design Anything You Need for Ministry</h3>
        <ul className="max-w-3xl mx-auto text-left list-disc list-inside space-y-3 text-gray-800">
          <li><strong>Sermon Series Artwork:</strong> Create stunning title slides and graphics that capture your sermon themes.</li>
          <li><strong>Bible Study &amp; Small Group Invites:</strong> Whip up engaging images for Bible studies, youth nights, and small group gatherings.</li>
          <li><strong>Event Promotions &amp; Signage:</strong> Instantly design announcement slides, flyers, and digital signage for upcoming events or services.</li>
          <li><strong>Social Media Inspiration:</strong> Turn verses or quotes into shareable graphics to inspire your online community.</li>
        </ul>
      </section>

      {/* Benefits Section */}
      <section className="px-6 py-16 text-center">
        <h3 className="text-2xl font-bold mb-10">Why Salt Creative?</h3>
        <div className="max-w-4xl mx-auto flex flex-col md:flex-row md:space-x-8 text-left">
          <div className="flex-1 mb-8 md:mb-0">
            <h4 className="text-xl font-semibold mb-2">⚡ Fast &amp; Easy</h4>
            <p>No complex software or long hours needed. Go from idea to finished graphic in under 5 minutes, so you can spend more time on ministry.</p>
          </div>
          <div className="flex-1 mb-8 md:mb-0">
            <h4 className="text-xl font-semibold mb-2">🙏 Faithful &amp; Authentic</h4>
            <p>Each design is rooted in biblical inspiration. Keep your visuals on-message and true to the Word, with imagery that complements your sermon.</p>
          </div>
          <div className="flex-1">
            <h4 className="text-xl font-semibold mb-2">🎨 Effective &amp; Engaging</h4>
            <p>Wow your congregation with professional-quality graphics. Elevate your church’s look and capture attention, whether on screens, posters, or social media.</p>
          </div>
        </div>
      </section>

      {/* Mid-Page CTA Section */}
      <section className="px-6 py-12 bg-blue-600 text-center text-white">
        <h3 className="text-2xl font-bold mb-4">Ready to Inspire Through Design?</h3>
        <p className="mb-6 text-lg">Join other pastors using Salt Creative to easily produce beautiful, faith-filled graphics. Start your journey now.</p>
        <button className="bg-white hover:bg-gray-100 text-blue-600 font-semibold text-lg py-3 px-8 rounded shadow-md transition duration-150">
          Start Creating Now
        </button>
      </section>

      {/* Footer / Final CTA Section */}
      <footer className="px-6 py-16 text-center">
        <h2 className="text-3xl font-extrabold mb-4">Share Your Message with Visual Impact</h2>
        <p className="text-xl text-gray-800 mb-8 max-w-2xl mx-auto">
          Your message matters. Empower it with visuals that inspire and engage. 
          Let Salt Creative be your partner in bringing your sermons to life.
        </p>
        <button className="bg-blue-600 hover:bg-blue-700 text-white font-semibold text-xl py-4 px-10 rounded shadow-lg transition duration-150">
          Start Creating for Free
        </button>
        <div className="mt-8">
          {/* Retro mascot waving at the bottom as a fun footer element */}
          <img 
            src="/assets/retro-mascot.png" 
            alt="Salt Creative mascot smiling" 
            className="mx-auto w-20 md:w-24" 
          />
        </div>
      </footer>
    </div>
  );
};

export default SaltCreativeLandingPage;