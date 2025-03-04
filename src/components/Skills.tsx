import React from 'react';
import { SectionProps } from '../types/Section.types';

const Skills: React.FC<SectionProps> = ({ setActiveSection, darkMode }) => {
  const skills = [
    {
      category: 'Technical Software',
      items: ['SolidWorks', 'Confluence', 'TestTrack Client', 'Robot Framework'],
    },
    {
      category: 'Programming & Analysis',
      items: ['Matlab', 'PowerBI', 'Pspice', 'Python', 'MS-Office'],
    },
    { 
      category: 'Technical Expertise', 
      items: ['Raman Spectroscopy', 'Optical Assembly', 'Cleanroom Operations', 'Technical Documentation', 'Project Planning'] 
    },
    {
      category: 'Soft Skills',
      items: ['Team Leadership', 'Project Management', 'Communication'],
    },
  ];

  return (
    <section
      id="skills"
      className={`py-16 flex items-center justify-center ${darkMode ? "bg-[#1a1f2e]" : "bg-white"}`}
      onMouseEnter={() => setActiveSection("skills")}
    >
      <div className="section-content">
        <h2 className={`section-heading text-teal-500`}>Skills</h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {skills.map((skillGroup, index) => (
            <div
              key={index}
              className={`card-container transition-all duration-300 hover:transform hover:scale-[1.01] ${
                darkMode
                  ? "bg-white/5 backdrop-blur-sm hover:bg-teal-800/20"
                  : "bg-gray-50 hover:bg-teal-90/80"
              }`}
            >
              <h3
                className={`text-lg font-semibold mb-4 ${
                  darkMode ? "text-white" : "text-gray-900"
                }`}
              >
                {skillGroup.category}
              </h3>
              <ul className="space-y-2">
                {skillGroup.items.map((skill, skillIndex) => (
                  <li
                    key={skillIndex}
                    className={`flex items-center text-base ${
                      darkMode ? "text-gray-300" : "text-gray-700"
                    }`}
                  >
                    <span
                      className={`w-2 h-2 rounded-full mr-2 ${
                        darkMode ? "bg-blue-400" : "bg-blue-500"
                      }`}
                    ></span>
                    {skill}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Skills;