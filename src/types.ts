export interface ResumeAnalysis {
  score: number;
  skills: Skill[];
  suggestions: string[];
  careerPaths: CareerPath[];
}

export interface Skill {
  name: string;
  level: 'beginner' | 'intermediate' | 'expert';
  category: string;
}

export interface CareerPath {
  title: string;
  matchScore: number;
  requiredSkills: string[];
  description: string;
}

export interface ChatMessage {
  id: string;
  content: string;
  sender: 'user' | 'bot';
  timestamp: Date;
}