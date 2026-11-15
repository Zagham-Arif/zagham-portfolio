export interface Project {
  id: string;
  title: string;
  description: string;
  technologies: string[];
  githubUrl?: string;
  liveUrl?: string;
  imageUrl: string;
  /** Translation key for the image alt text. Required whenever imageUrl is set. */
  imageAlt?: string;
}

export interface Experience {
  id: string;
  title: string;
  company: string;
  duration: {
    start: string;
    end: string | null;
  };
  /** City and country, or "Remote". Rendered next to the date and used in JSON-LD. */
  location: string;
  summaryKey: string;
  responsibilitiesKey: string;
  technologies: string[];
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
