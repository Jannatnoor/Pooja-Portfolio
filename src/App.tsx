import { useState, useEffect } from 'react';
import Navbar from './components/Layout/Navbar';
import Headline from './components/Headline';
import About from './components/About';
import Skills from './components/Skills';
import Work from './components/Work';
import Projects from './components/Projects';
import FoodBusiness from './components/FoodBusiness';
import Contact from './components/Contact';
import ContactVerification from './components/ContactVerification';
import { Section } from './types/Section.types';

function App() {
  const [activeSection, setActiveSection] = useState<Section>("headline");
  const [darkMode, setDarkMode] = useState(() => {
    const savedMode = localStorage.getItem("darkMode");
    return savedMode ? JSON.parse(savedMode) : false;
  });

  // Determine if we're on the verification page
  const [isVerificationPage, setIsVerificationPage] = useState(() => {
    return (
      window.location.pathname === "/verify-contact" &&
      window.location.search.includes("token=")
    );
  });

  // Persist dark mode setting
  useEffect(() => {
    localStorage.setItem("darkMode", JSON.stringify(darkMode));
    if (darkMode) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, [darkMode]);

  // Check for verification page on route changes
  useEffect(() => {
    const checkVerificationPage = () => {
      const isCurrentlyVerificationPage =
        window.location.pathname === "/verify-contact" &&
        window.location.search.includes("token=");

      setIsVerificationPage(isCurrentlyVerificationPage);
    };

    // Check on initial load and add listener for potential changes
    checkVerificationPage();

    // Optional: Handle browser back/forward navigation
    window.addEventListener("popstate", checkVerificationPage);

    return () => {
      window.removeEventListener("popstate", checkVerificationPage);
    };
  }, []);

  // Handle scroll for active section
  useEffect(() => {
    if (isVerificationPage) return; // Skip scroll handling on verification page

    const handleScroll = () => {
      const sections = document.querySelectorAll("section");
      const scrollPosition = window.scrollY + window.innerHeight / 3;

      sections.forEach((section) => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        const sectionId = section.id as Section;

        if (
          scrollPosition >= sectionTop &&
          scrollPosition <= sectionTop + sectionHeight
        ) {
          setActiveSection(sectionId);
        }
      });
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [isVerificationPage]);

  // Handle smooth scrolling
  const handleNavClick = (sectionId: Section) => {
    const element = document.getElementById(sectionId);
    if (element) {
      // Get the navbar height
      const navbar = document.querySelector("nav");
      const navbarHeight = navbar?.offsetHeight || 0;

      // Calculate scroll position accounting for navbar height
      const offsetPosition = element.offsetTop - navbarHeight;

      window.scrollTo({
        top: offsetPosition,
        behavior: "smooth",
      });
    }
    setActiveSection(sectionId);
  };

  // Render verification page or main portfolio
  if (isVerificationPage) {
    return <ContactVerification />;
  }

  return (
    <div
      className={`min-h-screen bg-pattern relative ${
        darkMode ? "dark bg-[#1a1f2e]" : "bg-white"
      }`}
    >
      {/* Background overlay */}
      <div className="absolute inset-0 bg-gradient-to-br from-transparent to-black/5 pointer-events-none" />

      {/* Main content */}
      <div className="relative z-10">
        <Navbar
          activeSection={activeSection}
          onNavClick={handleNavClick}
          darkMode={darkMode}
          setDarkMode={setDarkMode}
        />

        <main className="relative">
          <Headline setActiveSection={setActiveSection} darkMode={darkMode} />
          <About setActiveSection={setActiveSection} darkMode={darkMode} />
          <Skills setActiveSection={setActiveSection} darkMode={darkMode} />
          <Work setActiveSection={setActiveSection} darkMode={darkMode} />
          <Projects setActiveSection={setActiveSection} darkMode={darkMode} />
          <FoodBusiness
            setActiveSection={setActiveSection}
            darkMode={darkMode}
          />
          <Contact setActiveSection={setActiveSection} darkMode={darkMode} />
        </main>

        {/* Footer */}
        <footer
          className={`py-6 text-center relative z-10 ${
            darkMode ? "text-gray-400" : "text-gray-600"
          }`}
        >
          <p>© {new Date().getFullYear()} Your Name. All rights reserved.</p>
        </footer>
      </div>
    </div>
  );
}

export default App;