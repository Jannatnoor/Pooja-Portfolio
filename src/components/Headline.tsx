import React from 'react';
import { SectionProps } from '../types/Section.types';
import profileImage from '../assets/image2.png';
import {Mail, Linkedin, Facebook, Instagram, Twitter,} from 'lucide-react';

const Headline: React.FC<SectionProps> = ({ setActiveSection, darkMode }) => {
  const personalInfo = {
    greeting: "Hello I'm",
    name: 'POOJA BARMA  ',
    role: 'OPTICAL ENGINEER',
    bio: "I am ambitious, hardworking, Independent, goal-oriented, quick learner, enthusiastic and experienced working in international ambience.",
  };

  const socialLinks = [
    { icon: <Mail size={20} />, url: `mailto:${import.meta.env.VITE_EMAIL_RECIPIENT}` },
    { icon: <Linkedin size={20} />, url: `${import.meta.env.VITE_LINKEDIN_URL}` },
    { icon: <Facebook size={20} />, url: `${import.meta.env.VITE_FACEBOOK_URL}` },
    { icon: <Instagram size={20} />, url: `${import.meta.env.VITE_INSTAGRAM_URL}` },
    { icon: <Twitter size={20} />, url: `${import.meta.env.VITE_TWITTER_URL}` },

    //{ icon: <Github size={20} />, url: 'https://github.com/yourprofile' },
  ];

  return (
    <section
      id="headline"
      className="relative min-h-screen overflow-hidden"
      onMouseEnter={() => setActiveSection('headline')}
    >
      {/* Green Background Section with Curve */}
      <div 
        className={`absolute top-0 right-0 w-1/2 h-full bg-teal-500 z-0`}
        style={{
          clipPath: 'polygon(40% 0, 100% 0, 100% 100%, 0% 100%)'
        }}
      />

      <div className="relative z-10 flex h-screen">
        {/* Left Side Content */}
        <div className="w-1/2 flex flex-col justify-center px-10 lg:px-20">
          {/* Social Icons on the left */}
          <div className="fixed left-5 top-1/2 transform -translate-y-1/2 flex flex-col space-y-6">
            {socialLinks.map((social, index) => (
              <a
                key={index}
                href={social.url}
                target="_blank"
                rel="noopener noreferrer"
                className={`p-2 rounded-full  transition-duration-300
                  ${darkMode ? 'text-gray-400 hover:text-white' : 'text-gray-600 hover:text-teal-500'}`}
              >
                {social.icon}
              </a>
            ))}
          </div>

          {/* Main Content - Positioned like in the image */}
          <div className="ml-12">
            <p className="text-teal-500 text-2xl font-bold mb-4">{personalInfo.greeting}</p>
            <h1 className={`text-4xl sm:text-5xl font-bold mb-3 ${darkMode ? 'text-white' : 'text-gray-900'}`}>
              {personalInfo.name}
            </h1>
            <h2 className={`text-xl sm:text-2xl mb-6 ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
              {personalInfo.role}
            </h2>
            <p className={`max-w-md text-lg mb-8 ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
              {personalInfo.bio}
            </p>
            
            <button 
              className="bg-teal-500 hover:bg-teal-600 text-white px-8 py-3 rounded-md transition-colors duration-300"
              onClick={() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })}
            >
              Hire Me
            </button>
          </div>
        </div>

        {/* Right Side with Image */}
        <div className="w-full md:w-1/2 flex items-center justify-center mt-10 md:mt-0 pb-10 md:pb-0">
        <div className="w-full max-w-md lg:max-w-lg xl:max-w-xl">
           <div className="relative w-64 h-64 md:w-80 md:h-80 lg:w-96 lg:h-96 mx-auto">
              
          <img 
            src={profileImage} 
            alt="Profile" 
            className="relative z-10 w-full h-full object-cover rounded-full border-4 border-teal-500 shadow-l" 
          />
        </div>
      </div>
      </div>
      
      </div>
    </section>
  );
};

export default Headline;