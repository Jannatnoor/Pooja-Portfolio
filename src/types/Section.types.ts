export type Section = 'headline' | 'about' | 'skills' | 'work' | 'projects' | 'food-business' | 'contact';

export interface SectionProps {
  setActiveSection: (section: Section) => void;
  darkMode: boolean;
}
