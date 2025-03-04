import React, { useState } from 'react';
import { Section } from '../../types/Section.types';
import { Moon, Sun, Menu, X } from 'lucide-react';

interface NavbarProps {
  activeSection: Section;
  onNavClick: (section: Section) => void;
  darkMode: boolean;
  setDarkMode: (value: boolean) => void;
}

const Navbar: React.FC<NavbarProps> = ({
  activeSection,
  onNavClick,
  darkMode,
  setDarkMode,
}) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const navItems: { id: Section; label: string }[] = [
    { id: 'headline', label: 'Home' },
    { id: 'about', label: 'About' },
    { id: 'skills', label: 'Skills' },
    { id: 'work', label: 'Work' },
    { id: 'projects', label: 'Projects' },
    { id: 'food-business', label: 'Cuisine' },
    { id: 'contact', label: 'Contact' },
  ];

  const handleNavClick = (id: Section) => {
    onNavClick(id);
    const element = document.getElementById(id);
    const navbarHeight = 64; // 4rem or 64px
    const offsetPosition = element?.offsetTop ?? 0;
    
    window.scrollTo({
      top: offsetPosition - navbarHeight,
      behavior: 'smooth'
    });
    
    setIsMenuOpen(false);
  };

  return (
    <>
      {/* Overlay for mobile menu */}
      {isMenuOpen && (
        <div 
          className="fixed inset-0 bg-black bg-opacity-50 z-[9998] md:hidden"
          onClick={() => setIsMenuOpen(false)}
        />
      )}

      {/* Top Navbar */}
      <nav
        className={`fixed w-full z-[9999] top-0 left-0 transition-colors duration-300
        ${darkMode 
          ? 'bg-gray-900 text-white border-b border-gray-700'
          : 'bg-white text-gray-900 border-b border-gray-200'}`}
      >
        <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8'>
          <div className='flex items-center justify-between h-16'>
            {/* Logo/Brand - Modified to have two colors */}
            <div className='flex-shrink-0 '>
              <h1 className='text-base sm:text-lg font-bold '>
                <span className={darkMode ? 'text-white' : 'text-gray-900'}>Port</span>
                <span className='text-teal-500'>folio</span>
              </h1>
            </div>

            {/* Desktop Navigation - ALL ITEMS TEAL */}
            <div className='hidden md:flex items-center space-x-8'>
              {navItems.map((item) => (
                <button
                  key={item.id}
                  onClick={() => handleNavClick(item.id)}
                  className={`text-sm transition-colors duration-200 text-teal-500 hover:text-teal-600
                    ${activeSection === item.id ? 'font-bold' : 'font-normal'}`}
                >
                  {item.label}
                </button>
              ))}
            </div>

            {/* Right side controls */}
            <div className='flex items-center space-x-2'>
              <button
                onClick={() => setDarkMode(!darkMode)}
                className={`p-2 rounded-lg transition-colors duration-200
                  ${darkMode ? 'bg-gray-800 text-yellow-300' : 'bg-gray-100 text-gray-700'}`}
                aria-label="Toggle dark mode"
              >
                {darkMode ? <Sun className='w-5 h-5' /> : <Moon className='w-5 h-5' />}
              </button>
              
              {/* Mobile Menu Button */}
              <button
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                className={`md:hidden p-2 rounded-lg ${darkMode ? 'text-white' : 'text-gray-700'}`}
                aria-label="Toggle menu"
              >
                {isMenuOpen ? <X className='w-6 h-6' /> : <Menu className='w-6 h-6' />}
              </button>
            </div>
          </div>

          {/* Mobile Menu - ALL ITEMS TEAL */}
          {isMenuOpen && (
            <div className='md:hidden border-t border-gray-200 dark:border-gray-700'>
              <div className='px-2 py-3 space-y-1'>
                {navItems.map((item) => (
                  <button
                    key={item.id}
                    onClick={() => handleNavClick(item.id)}
                    className={`block w-full px-3 py-2 rounded-md text-left text-sm font-medium
                      text-teal-500 hover:text-teal-600
                      ${activeSection === item.id 
                        ? `font-semibold ${darkMode ? 'bg-gray-800' : 'bg-gray-100'}` 
                        : `font-normal ${darkMode ? 'hover:bg-gray-800' : 'hover:bg-gray-100'}`
                      }`}
                  >
                    {item.label}
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>
      </nav>
    </>
  );
};

export default Navbar;