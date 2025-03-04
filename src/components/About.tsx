import React from 'react';
import { SectionProps } from '../types/Section.types';


const About: React.FC<SectionProps> = ({ setActiveSection, darkMode }) => {
  return (
    <section
      id="about"
      className={`h-screen flex items-center justify-center ${darkMode ? 'bg-[#1a1f2e]' : 'bg-white'}`}
      onMouseEnter={() => setActiveSection('about')}
    >
      <div className="section-content">
        <h2 className={`section-heading text-teal-500`}>
          About Me
        </h2>

        <div 
          className={`card-container transition-all duration-300 hover:transform hover:scale-[1.01] ${
            darkMode 
              ? 'bg-white/5 backdrop-blur-sm hover:bg-teal-800/20' 
              : 'bg-gray-50 hover:bg-teal-90/80'
          }`}
        >
          <div className="space-y-4">
            <p className={`text-base ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
              I'm a multidisciplinary engineer with expertise spanning technical documentation, 
              optical engineering, and project management. I was born and raised in Bangladesh before moving to <strong className="text-teal-500"> Germany </strong> ,
              where I spent <strong>six years</strong> gaining valuable academic and professional experience. 
              For the past <strong> three years</strong>, I have been living in <strong className="text-teal-500">Finland</strong>. Throughout my journey, I have gained diverse academic and professional experiences in international environments.
            </p>
            
            <p className={`text-base ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
              I hold a <strong className="text-teal-500">double master's degree</strong>, earning a 
              Master of Science in <strong className="text-teal-500">Optics and Photonics</strong> from the <strong> Karlsruhe Institute of Technology, Germany</strong>, 
              and a second Master of Science in <strong className="text-teal-500">Electrical Engineering and Electronicss</strong> from the 
              <strong> American International University, Bangladesh </strong>. Additionally, I completed my master's <strong>Thesis</strong> in 
              Optical Remote Sensing at Tampere University, Finland, where I worked on
              <strong className="text-teal-500"> LiDAR-based Raman spectroscopy </strong>.
            </p>
            
            <p className={`text-base ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
              With hands-on experience in technical documentation, medical device engineering, and 
              optical remote sensing, I have worked on complex projects ranging from LiDAR-based Raman 
              spectroscopy to telecommunication network monitoring. I have a proven track record in 
              project management, technical drawing, and device testing, having contributed significantly to organizations such as 
              <strong> Devicemaster GmbH in Germany </strong> and <strong> Robi Axiata Limited in Bangladesh</strong>.
            </p>
            
            <p className={`text-base ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
              My expertise extends to SolidWorks, Matlab, Python, Power BI, and various technical tools essential 
              for engineering and research. Being multilingual, I am fluent in English and proficient in German, 
              Finnish, and Bengali, which enhances my ability to work in international environments.
            </p>
            
            <p className={`text-base ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
              Passionate about innovation and problem-solving, I thrive in dynamic and collaborative settings. 
              Whether working on cutting-edge optical research or ensuring the efficiency of technical documentation, 
              I bring enthusiasm, adaptability, and a keen analytical mindset to every challenge.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;