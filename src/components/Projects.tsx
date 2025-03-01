import React from 'react';
import { SectionProps } from '../types/Section.types';

const Projects: React.FC<SectionProps> = ({ setActiveSection, darkMode }) => {
  const projects = [
    {
      title: 'Optical Remote Sensing System',
      description:
        'Designed and implemented a UV Raman spectroscopy system for LiDAR experiments, enabling remote sensing of chemical compounds using optical techniques.',
      technologies: ['Raman Spectroscopy', 'LiDAR', 'Optical Engineering', 'Data Analysis'],
      image: '/project1.jpg',
      link: '#',
      details: 'Master thesis project at Tampere University',
      period: 'June 2018 - Feb 2019',
      location: 'Tampere, Finland',
      isPublication: false
    },
    {
      title: 'Class F Amplifier Performance ',
      description:
        'Developed a Volterra model for improving the performance of a Class F amplifier with enhanced gain characteristics. This work was published in an international journal.',
      technologies: [
        'Power Amplifier Design',
        'Volterra Model',
        'Performance Optimization',
        'Circuit Design',
      ],
      image: '/project2.jpg',
      link: 'https://ijste.org/Article.php?manuscript=IJSTEV2I6026',
      details: 'Published research paper',
      period: 'Jan 2015 - Dec 2015',
      location: 'Bangladesh',
      isPublication: true
    },
    {
      title: 'Self-made Optical Metamaterials',
      description:
        'Research project on the creation and application of optical metamaterials, exploring their unique properties and potential applications in optical systems.',
      technologies: ['Optical Metamaterials', 'Theoretical Physics', 'Nanophotonics'],
      image: '/project3.jpg',
      link: '#',
      details: 'Seminar at Karlsruhe Institute of Technology',
      period: 'Oct 2017 - Nov 2017',
      location: 'Karlsruhe, Germany',
      isPublication: false
    },
    {
      title: 'Linearized Amplifier Design',
      description:
        'Designed an improved linearized amplifier with enhanced gain characteristics for telecommunications applications, focusing on performance and efficiency.',
      technologies: ['RF Design', 'Circuit Analysis', 'Signal Processing', 'Simulation'],
      image: '/project4.jpg',
      link: '#',
      details: 'Bachelor thesis project',
      period: 'Jun 2013 - Dec 2013',
      location: 'Bangladesh',
      isPublication: false
    },
  ];

  return (
    <section
      id='projects'
      className={`min-h-screen flex items-center justify-center py-16 ${
        darkMode ? 'bg-[#1a1f2e]' : 'bg-white'
      }`}
      onMouseEnter={() => setActiveSection('projects')}
    >
      <div className='max-w-6xl mx-auto px-4 sm:px-6 lg:px-8'>
        <h2
          className={`text-xl sm:text-2xl md:text-3xl font-bold text-center mb-12 text-teal-500`}
        >
          Projects
        </h2>

        <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-8'>
          {projects.map((project, index) => (
            <div
              key={index}
              className={`rounded-lg overflow-hidden ${
                darkMode
                  ? 'bg-white/5 backdrop-blur-sm hover:bg-teal-800/20'
                  : 'bg-white shadow-md hover:bg-teal-50'
              } transition-all duration-300`}
            >
              <div className='p-6'>
                <div className='flex flex-col md:flex-row md:items-start md:justify-between mb-4'>
                  <div>
                    <h3
                      className={`text-lg sm:text-xl font-semibold ${
                        darkMode ? 'text-white' : 'text-gray-900'
                      }`}
                    >
                      {project.title}
                    </h3>
                    <p className={`text-xs mt-1 ${darkMode ? 'text-teal-400' : 'text-teal-600'}`}>
                      {project.details}
                    </p>
                  </div>
                  <div
                    className={`text-sm mt-2 md:mt-0 md:text-right ${
                      darkMode ? 'text-gray-400' : 'text-gray-500'
                    }`}
                  >
                    <p className="font-medium">{project.period}</p>
                    <p>{project.location}</p>
                  </div>
                </div>
                
                <p
                  className={`text-sm sm:text-base mb-4 ${
                    darkMode ? 'text-gray-300' : 'text-gray-700'
                  }`}
                >
                  {project.description}
                </p>

                <div className='flex flex-wrap gap-2 mb-4'>
                  {project.technologies.map((tech, techIndex) => (
                    <span
                      key={techIndex}
                      className={`text-xs sm:text-sm px-2 py-1 rounded-full ${
                        darkMode
                          ? 'bg-white/10 text-gray-300'
                          : 'bg-teal-100 text-teal-800'
                      }`}
                    >
                      {tech}
                    </span>
                  ))}
                </div>

                {project.isPublication && (
                <div className='flex'>
                  <a
                    href={project.link}
                    target='_blank'
                    rel='noopener noreferrer'
                    className={`font-medium ${
                      darkMode
                        ? 'text-teal-400 hover:text-teal-300'
                        : 'text-teal-600 hover:text-teal-800'
                    }`}
                  >
                    View Project →
                  </a>
                </div>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Projects;