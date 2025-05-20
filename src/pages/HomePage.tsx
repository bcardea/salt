import React, { useState } from 'react';
import { VideoModal } from '../components/VideoModal';

const HomePage: React.FC = () => {
  const [showDemo, setShowDemo] = useState(false);
  
  const showDemoVideo = () => setShowDemo(true);

  return (
    <div className="homepage">
      {/* Hero Section: clear value proposition and primary CTA */}
      <header className="hero">
        {/* Emphasize that no special skills or team are needed */}
        <p>No technical skills required. No creative team needed.</p>
        {/* Strong, friendly headline focusing on the main benefit (quality visuals quickly) */}
        <h1>Your Words, Divinely Visualized.</h1>
        {/* Highlight the problem and solution: ordinary vs. extraordinary, done fast */}
        <p>The world has enough ordinary sermon slides. Yours will be extraordinary — created in just 2 minutes.</p>
        {/* Reinforce the ministry focus: we handle visuals so you can focus on what matters */}
        <p>While you focus on the Word, we focus on making it seen.</p>
        {/* Primary and secondary calls to action */}
        <div className="cta-buttons">
          <a href="/app" className="btn btn-primary">Create Your First Masterpiece</a>
          <button className="btn btn-secondary" onClick={showDemoVideo}>
            Watch Demo Video
          </button>
        </div>
      </header>

      <main>
        {/* Section: Broad capabilities for all ministry design needs */}
        <section>
          <h2>Design Anything You Need for Ministry</h2>
          <p>
            From sermon series graphics and social media posts to event promotions, 
            SALT helps you create professional designs for every aspect of your ministry.
          </p>
        </section>

        {/* Section: Emphasize time savings, ease of use, and stress reduction */}
        <section>
          <h2>More Time for Ministry, Less Time on Graphics</h2>
          <p>
            We know you're juggling sermons, events, and caring for your congregation. 
            That's why SALT Creative is built for busy church leaders&mdash;in just a few clicks, 
            you can craft beautiful visuals and get back to what matters most.
          </p>
          <p>
            Using SALT feels like having a professional design team at your side whenever you need it&mdash;
            without the high costs or long wait. The result? Polished, modern graphics that engage your audience, 
            created by <strong>you</strong> in minutes <em>and without the stress</em>.
          </p>
        </section>

        {/* Final call-to-action Section: Encourage users to take the next step */}
        <section>
          <h2>Ready to Get Started?</h2>
          <p>
            You're just minutes away from creating your next show-stopping graphic. 
            Empower your ministry with stress-free, stunning visuals&mdash;no design experience required.
          </p>
          <a href="/app" className="btn btn-primary">Create Your First Masterpiece</a>
          <button className="btn btn-link" onClick={showDemoVideo}>
            Watch the Demo Video
          </button>
        </section>
      </main>

      <VideoModal isOpen={showDemo} onClose={() => setShowDemo(false)} />
    </div>
  );
};

export default HomePage;