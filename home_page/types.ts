export enum MessageRole {
  USER = 'user',
  MODEL = 'model',
  SYSTEM = 'system'
}

export interface ChatMessage {
  role: MessageRole;
  content: string;
  timestamp: number;
}

export interface Paper {
  id: string;
  title: string;
  authors: string[];
  venue: string;
  year: string | number;
  abstract?: string | React.ReactNode;
  link?: string;
  tags?: string[];
}

export interface Talk {
  id: string;
  title: string;
  event: string;
  date: string;
  location: string;
  link?: string;
}

export interface Teaching {
  id: string;
  courseCode: string;
  courseName: string;
  role: string;
  semester: string;
  institution: string;
}

export interface TerminalLine {
  id: string;
  type: 'input' | 'output' | 'system' | 'component';
  content: string | React.ReactNode;
}

export const RESEARCH_AREAS = [
  "Offline reinforcement learning",
  "Policy optimization",
  "POMDPs",
  "RLHF & Preference-based learning",
  "Double robust estimation",
  "High-dimensional statistics"
];