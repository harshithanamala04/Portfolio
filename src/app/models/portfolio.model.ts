export interface Internship {
  id: string;
  company: string;
  role: string;
  period?: string;
  location?: string;
  type?: string;
  status?: 'Completed' | 'Currently Ongoing';
  summary: string;
  achievements?: string[];
  technologies?: string[];
  featured?: boolean;
  logoUrl?: string;
  certificateUrl?: string;
  certificatePdf?: string;
  certificateTitle?: string;
}

export interface Certification {
  id: string;
  title: string;
  issuer: string;
  issueDate: string;
  credentialId?: string;
  verificationUrl?: string;
  previewUrl: string;
  pdfUrl?: string;
  description: string;
  skills?: string[];
}

export interface Education {
  id: string;
  degree: string;
  institution: string;
  score: string;
  scoreLabel: string;
  status: string;
  period?: string;
  description: string;
}

export interface SkillCategory {
  title: string;
  skills: string[];
}

export type ProjectCategory = 'All' | 'Full Stack' | 'Frontend' | 'Backend';

export interface Project {
  id: string;
  title: string;
  category: 'Full Stack' | 'Frontend' | 'Backend';
  tagline: string;
  description: string;
  highlights: string[];
  techStack: string[];
  liveUrl: string;
  githubUrl?: string;
  featured: boolean;
  metrics?: { label: string; value: string };
  gradient?: string;
  accentColor?: string;
  imageUrl?: string;
}

export interface ContactInfo {
  type: string;
  label: string;
  value: string;
  link: string;
  icon: string;
}
