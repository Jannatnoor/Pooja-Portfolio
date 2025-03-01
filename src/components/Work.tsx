import React from 'react';
import { SectionProps } from '../types/Section.types';

const Work: React.FC<SectionProps> = ({ setActiveSection, darkMode }) => {
  const experiences = [
    {
      title: 'Technical Documentation and Requirements Engineer',
      company: 'Devicemaster GmbH',
      period: 'Sept 2021 - July 2022',
      location: 'Karlsruhe, Germany',
      description: [
        'Created comprehensive technical documentation for medical devices, including SOPs, SI, risk management documents, and test cases',
        'Performed device testing and validation according to applicable standards',
        'Developed technical drawings and diagrams for medical device documentation',
        'Managed documentation projects and ensured compliance with regulatory requirements',
      ],
    },
    {
      title: 'Internship and Master Thesis',
      company: 'Photonic Lab, Tampere University',
      period: 'June 2018 - Feb 2019',
      location: 'Tampere, Finland',
      description: [
        'Focused on optical remote sensing using UV Raman spectroscopy',
        'Designed and constructed facilities for LiDAR experiments',
        'Conducted LiDAR remote sensing experiments with alcohol samples',
        'Characterized samples using Raman scattering techniques',
      ],
    },
    {
      title: 'Network Monitoring and Configuration Engineer',
      company: 'Robi Axiata Limited',
      period: 'Oct 2014 - Aug 2015',
      location: 'Dhaka, Bangladesh',
      description: [
        'Monitored telecommunications network performance and health',
        'Configured BTS systems from multiple vendors including Huawei, Ericsson, and Nokia Siemens',
        'Managed cell addition and deletion processes across diverse network infrastructures',
        'Ensured optimal network functionality and configuration integrity',
      ],
    },
  ];

  return (
    <section
      id='work'
      className={`py-16 ${
        darkMode ? 'bg-[#1a1f2e]' : 'bg-white'
      }`}
      onMouseEnter={() => setActiveSection('work')}
    >
      <div className='section-content'>
        <h2 className='section-heading text-teal-500'>
          Work Experience
        </h2>

        <div className='space-y-8'>
          {experiences.map((experience, index) => (
            <div
              key={index}
              className={`card-container transition-all duration-300 hover:transform hover:scale-[1.01] ${
                darkMode
                  ? 'bg-white/5 backdrop-blur-sm hover:bg-teal-800/20'
                  : 'bg-gray-50 hover:bg-teal-90/80'
              }`}
            >
              <div className='flex flex-col md:flex-row md:items-start md:justify-between mb-6'>
                <div>
                  <h3
                    className={`text-xl font-semibold ${
                      darkMode ? 'text-white' : 'text-gray-900'
                    }`}
                  >
                    {experience.title}
                  </h3>
                  <p
                    className={`text-lg font-medium mt-1 text-teal-500`}
                  >
                    {experience.company}
                  </p>
                </div>
                <div
                  className={`text-sm mt-2 md:mt-0 md:text-right ${
                    darkMode ? 'text-gray-400' : 'text-gray-500'
                  }`}
                >
                  <p className="font-medium">{experience.period}</p>
                  <p>{experience.location}</p>
                </div>
              </div>

              <ul
                className={`list-disc list-inside space-y-2 ${
                  darkMode ? 'text-gray-300' : 'text-gray-700'
                }`}
              >
                {experience.description.map((item, itemIndex) => (
                  <li key={itemIndex} className='leading-relaxed'>
                    {item}
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


export default Work;