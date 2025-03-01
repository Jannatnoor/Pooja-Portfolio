export type Section = 'headline' | 'about' | 'skills' | 'work' | 'projects' | 'contact';

export interface SectionProps {
  setActiveSection: (section: Section) => void;
  darkMode: boolean;
}
