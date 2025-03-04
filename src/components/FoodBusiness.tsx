import React, { useEffect, useRef, useState } from 'react';
import { SectionProps } from '../types/Section.types';
import { ArrowRight } from 'lucide-react';

interface FoodItem {
  name: string;
  image: string;
}

const FoodBusiness: React.FC<SectionProps> = ({ setActiveSection, darkMode }) => {
  const carouselRef = useRef<HTMLDivElement>(null);
  const [hoveredItem, setHoveredItem] = useState<string | null>(null);
  
  // Sample food items - replace with actual data and images
  const foodItems: FoodItem[] = [
    {
      name: "Chocolate Cake",  
      image: "/assets/food1.jpg", // Replace with actual image paths
    },
    {
      name: "Malai kulfi",
      image: "/assets/food2.jpg",
    },
    {
      name: "Grilled Chicken",    
      image: "/assets/food3.jpg",
    },
    {
      name: "Butter Chicken",
      image: " /assets/food4.jpg",
    },
    {
      name: "Feta Cheese Salad",
      image: " /assets/food5.jpg",
    },
    {
      name: "Yugurt Bowl with fruits",
      image: " /assets/food6.jpg",
    },
    {
      name: "Dum Biryani",
      image: " /assets/food7.jpg",
    },
    {
      name: "Cranberry Brie Bitest",
      image: " /assets/food8.jpg",
    },
  ];
  
  // Setup infinite scroll carousel
  useEffect(() => {
    if (!carouselRef.current) return;
 
    // Set CSS variables for animation
    const calculateCarouselWidth = () => {
      const itemWidth = 280; // Fixed width for food items
      const gap = 24; // Gap between items
      const itemsCount = foodItems.length;
      const carouselWidth = (itemWidth + gap) * itemsCount;
      
      // Set CSS variables for animation
      document.documentElement.style.setProperty('--carousel-width', `${carouselWidth}px`);
      document.documentElement.style.setProperty('--carousel-duration', `${itemsCount * 5}s`); // 5s per item
    };
    
    // Initial calculation
    calculateCarouselWidth();
    
    // Add resize listener
    window.addEventListener('resize', calculateCarouselWidth);
    
    // Cleanup
    return () => {
      window.removeEventListener('resize', calculateCarouselWidth);
    };
  }, [foodItems.length]);

  return (
    <section
      id="food-business"
      className={`py-16 ${darkMode ? 'bg-[#1a1f2e]' : 'bg-white'}`}
      onMouseEnter={() => setActiveSection('food-business')}
    >
      <div className="section-content">
        <h2 className="section-heading text-teal-500">
          Culinary Passion
        </h2>

        <div className="text-center mb-8">
          <p className={`text-lg mb-4 ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
            Beyond engineering, I nurture a passion for culinary exploration, bringing together a vibrant collection of global flavors. 
            My food business celebrates the art of cooking, offering a delightful journey through diverse cuisines from comfort classics to gourmet innovations.
          </p>
          
          <a 
            href={import.meta.env.VITE_FOOD_BUSINESS_FACEBOOK}
            className={`inline-flex items-center text-teal-500 font-medium hover:text-teal-600 transition-colors duration-200`}
          >
            Visit my food business <ArrowRight className="ml-2 h-4 w-4" />
          </a>
        </div>

        {/* Food showcase carousel */}
        <div className="mt-10 relative">
          <h3 className={`text-xl font-semibold mb-6 text-center ${darkMode ? 'text-white' : 'text-gray-900'}`}>
            Signature Dishes
          </h3>
          
          {/* Carousel container with overflow hidden */}
          <div className="relative overflow-hidden">
            {/* Gradient overlays to indicate continuous scrolling */}
            <div className="absolute left-0 top-0 bottom-0 w-8 z-10 pointer-events-none bg-gradient-to-r from-white to-transparent dark:from-[#1a1f2e] dark:to-transparent"></div>
            <div className="absolute right-0 top-0 bottom-0 w-8 z-10 pointer-events-none bg-gradient-to-l from-white to-transparent dark:from-[#1a1f2e] dark:to-transparent"></div>
            
            {/* The carousel wrapper */}
            <div 
              ref={carouselRef}
              className="carousel-wrapper"
            >
              {/* First set of items */}
              {foodItems.map((item, index) => (
                <div 
                  key={`set1-${index}`}
                  className={`food-item mx-3 rounded-lg overflow-hidden ${
                    darkMode ? 'bg-white/5 backdrop-blur-sm' : 'bg-white shadow-md'
                  } ${hoveredItem === item.name ? 'paused' : ''}`}
                  onMouseEnter={() => setHoveredItem(item.name)}
                  onMouseLeave={() => setHoveredItem(null)}
                >
                  <div className="h-48 overflow-hidden">
                    <img 
                      src={item.image} 
                      alt={item.name}
                      className="w-full h-full object-cover transition-transform duration-500 hover:scale-110"
                    />
                  </div>
                  <div className="p-4">
                    <h4 className={`text-lg font-medium ${darkMode ? 'text-white' : 'text-gray-900'}`}>
                      {item.name}
                    </h4>
                  </div>
                </div>
              ))}
              
              {/* Duplicate set for seamless looping */}
              {foodItems.map((item, index) => (
                <div 
                  key={`set2-${index}`}
                  className={`food-item mx-3 rounded-lg overflow-hidden ${
                    darkMode ? 'bg-white/5 backdrop-blur-sm' : 'bg-white shadow-md'
                  } ${hoveredItem === item.name ? 'paused' : ''}`}
                  onMouseEnter={() => setHoveredItem(item.name)}
                  onMouseLeave={() => setHoveredItem(null)}
                >
                  <div className="h-48 overflow-hidden">
                    <img 
                      src={item.image} 
                      alt={item.name}
                      className="w-full h-full object-cover transition-transform duration-500 hover:scale-110"
                    />
                  </div>
                  <div className="p-4">
                    <h4 className={`text-lg font-medium ${darkMode ? 'text-white' : 'text-gray-900'}`}>
                      {item.name}
                    </h4>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
        
        {/* About section */}
        <div className="mt-12 bg-teal-50 dark:bg-teal-900/20 rounded-lg p-6">
          <h3 className={`text-xl font-semibold mb-4 ${darkMode ? 'text-white' : 'text-gray-900'}`}>
           Culinary Kitchen
          </h3>
          <p className={`mb-4 ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
             My culinary journey is a testament to the art of global gastronomy. Driven by a passion for exploring diverse flavors and innovative cooking techniques, 
             I've crafted a menu that celebrates the richness of international cuisine. Each dish is more than just a meal – 
             it's a carefully composed experience that tells a story of culinary creativity and precision.
          </p>
          <p className={`mb-4 ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
            From the decadent layers of a Chocolate Cake to the aromatic spices of Dum Biryani, my menu is a curated 
            collection that bridges cultures and culinary traditions. I believe in the power of food to connect people, 
            to spark conversation, and to create memorable moments.
            </p>
          <p className={`${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
           Whether you're looking for catering services, private dining experiences, or interactive cooking workshops, I'm dedicated to bringing exceptional culinary experiences to your table. 
           Each culinary creation is crafted with meticulous precision – carefully balanced, innovative, and designed to transform ordinary moments into extraordinary experiences.
          </p>
          
          {/* Call to action */}
          <div className="mt-6">
            <a 
              href={import.meta.env.VITE_FOOD_BUSINESS_FACEBOOK}
              className="py-2 px-4 rounded-md bg-teal-600 hover:bg-teal-700 text-white transition-colors duration-200"
            >
              Order Now
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};

export default FoodBusiness;