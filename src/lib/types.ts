export interface Project {
  id: string;
  title: string;
  description: string;
  technologies: string[];
  githubUrl?: string;
  liveUrl?: string;
  imageUrl: string;
  featured: boolean;
}

export interface Experience {
  id: string;
  title: string;
  company: string;
  duration: {
    start: string;
    end: string | null;
  };
  responsibilitiesKey: string;
  technologies: string[];
}

export interface Skill {
  name: string;
  icon: string;
  category: 'frontend' | 'backend' | 'database' | 'tools' | 'other';
}

export interface ContactFormData {
  name: string;
  email: string;
  website?: string;
  message: string;
}

export interface SocialLink {
  name: string;
  url: string;
  icon: string;
}

export interface Education {
  id: string;
  degree: string;
  institution: string;
  duration: {
    start: string;
    end: string;
  };
  location: string;
}
