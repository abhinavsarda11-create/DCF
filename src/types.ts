export interface NavItem {
  label: string;
  href: string;
}

export interface StatItem {
  id: string;
  icon: string;
  value: string;
  label: string;
}

export interface HeroSlide {
  id: number;
  image: string;
  heading: string;
  caption?: string;
}

export interface StoryItem {
  id: string;
  title: string;
  subtitle: string;
  category: string;
  image: string;
  imageGradient?: string;
  fullStory?: string;
}

export interface FAQItem {
  id: string;
  question: string;
  answer: string;
}

export interface ChatAction {
  label: string;
  action: 'donate' | 'volunteer' | 'parenting' | 'faq' | 'contact' | 'query' | 'pledge';
  payload?: string;
}

export interface ChatMessage {
  id: string;
  sender: 'user' | 'bot';
  text: string;
  timestamp: Date;
  suggestedActions?: ChatAction[];
}

export interface RiseWithLoveQuadrant {
  id: string;
  title: string;
  items: string[];
}

export interface ShaalaCurriculumWeek {
  week: number;
  theme: string;
  focus: string;
  detailedPoints?: string[];
}


