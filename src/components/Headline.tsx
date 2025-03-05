import React from "react";
import { SectionProps } from "../types/Section.types";
import { Mail, Linkedin, Facebook, Instagram, Twitter } from "lucide-react";

const Headline: React.FC<SectionProps> = ({ setActiveSection, darkMode }) => {
  const personalInfo = {
    greeting: "Hello I'm",
    name: "POOJA BARMA",
    role: "OPTICAL ENGINEER",
    bio: "I am ambitious, hardworking, Independent, goal-oriented, quick learner, enthusiastic and experienced working in international ambience.",
  };

  const socialLinks = [
    {
      icon: <Mail size={20} />,
      url: `mailto:${import.meta.env.VITE_EMAIL_RECIPIENT}`,
    },
    {
      icon: <Linkedin size={20} />,
      url: `${import.meta.env.VITE_LINKEDIN_URL}`,
    },
    {
      icon: <Facebook size={20} />,
      url: `${import.meta.env.VITE_FACEBOOK_URL}`,
    },
    {
      icon: <Instagram size={20} />,
      url: `${import.meta.env.VITE_INSTAGRAM_URL}`,
    },
    { icon: <Twitter size={20} />, url: `${import.meta.env.VITE_TWITTER_URL}` },
  ];

  return (
    <section
      id="headline"
      className="relative min-h-screen overflow-hidden"
      onMouseEnter={() => setActiveSection("headline")}
    >
      {/* Desktop: Green Background Section with Curve */}
      <div
        className="absolute top-0 right-0 w-1/2 h-full bg-teal-500 z-0 hidden md:block"
        style={{
          clipPath: "polygon(40% 0, 100% 0, 100% 100%, 0% 100%)",
        }}
      />

      {/* Mobile: Full teal background */}
      <div className="absolute top-0 left-0 w-full h-full bg-teal-500 z-0 md:hidden" />

      {/* DESKTOP LAYOUT */}
      <div className="relative z-10 h-screen hidden md:flex">
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
                className={`p-2 rounded-full transition-duration-300
                  ${
                    darkMode
                      ? "text-gray-400 hover:text-white"
                      : "text-gray-600 hover:text-teal-500"
                  }`}
              >
                {social.icon}
              </a>
            ))}
          </div>

          {/* Main Content */}
          <div className="ml-12">
            <p className="text-teal-500 text-2xl font-bold mb-4">
              {personalInfo.greeting}
            </p>
            <h1
              className={`text-5xl font-bold mb-3 ${
                darkMode ? "text-white" : "text-gray-900"
              }`}
            >
              {personalInfo.name}
            </h1>
            <h2
              className={`text-2xl mb-6 ${
                darkMode ? "text-gray-300" : "text-gray-700"
              }`}
            >
              {personalInfo.role}
            </h2>
            <p
              className={`max-w-md text-lg mb-8 ${
                darkMode ? "text-gray-400" : "text-gray-600"
              }`}
            >
              {personalInfo.bio}
            </p>

            <button
              className="bg-teal-500 hover:bg-teal-600 text-white px-8 py-3 rounded-md transition-colors duration-300"
              onClick={() =>
                document
                  .getElementById("contact")
                  ?.scrollIntoView({ behavior: "smooth" })
              }
            >
              Hire Me
            </button>
          </div>
        </div>

        {/* Right Side with Image */}
        <div className="w-1/2 flex items-center justify-center relative">
          <div className="relative w-64 h-64 md:w-72 md:h-72 lg:w-80 lg:h-80 xl:w-96 xl:h-96">
            {/* Background Circle for better contrast */}
            <div className="absolute inset-0 bg-white rounded-full shadow-lg scale-[1.15]"></div>

            {/* Profile Image */}
            <img
              src="/assets/image2.jpg"
              alt="Profile"
              className="relative z-10 w-full h-full object-contain rounded-full"
            />
          </div>
        </div>
      </div>

      {/* MOBILE LAYOUT - Exactly matching Image 1 */}
      <div className="relative z-10 flex flex-col h-screen items-center text-center justify-center md:hidden px-8">
        {/* Profile Image at top */}
        <div className="relative w-36 h-36 mb-5 mt-4">
          <div className="absolute inset-0 bg-white rounded-full shadow-lg"></div>
          <img
            src="/assets/image2.jpg"
            alt="Profile"
            className="relative z-10 w-full h-full object-cover rounded-full"
          />
        </div>

        {/* Text content */}
        <p className="text-white text-lg font-medium mt-2 mb-1">
          {personalInfo.greeting}
        </p>

        <h1 className="text-white text-3xl font-bold mb-1">
          {personalInfo.name}
        </h1>

        <h2 className="text-white text-xl mb-4">{personalInfo.role}</h2>

        <p className="text-white text-base mb-6 max-w-xs">{personalInfo.bio}</p>

        {/* Social Icons - horizontal row */}
        <div className="flex space-x-6 mb-6">
          {socialLinks.map((social, index) => (
            <a
              key={index}
              href={social.url}
              target="_blank"
              rel="noopener noreferrer"
              className="text-white hover:text-gray-200 transition-duration-300"
            >
              {social.icon}
            </a>
          ))}
        </div>

        {/* Call to action button */}
        <button
          className="bg-white text-teal-500 hover:bg-gray-100 px-8 py-3 rounded-md transition-colors duration-300 font-medium"
          onClick={() =>
            document
              .getElementById("contact")
              ?.scrollIntoView({ behavior: "smooth" })
          }
        >
          Hire Me
        </button>
      </div>
    </section>
  );
};

export default Headline;
