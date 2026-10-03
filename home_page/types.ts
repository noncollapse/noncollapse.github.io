import type { ReactNode } from 'react';

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
  status?: string;
  year: string | number;
  abstract?: string | ReactNode;
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
  courseCode?: string;
  courseName: string;
  role: string;
  semester: string;
  institution: string;
  level: string;
}

export interface TerminalLine {
  id: string;
  type: 'input' | 'output' | 'system' | 'component';
  content: string | ReactNode;
}

export const RESEARCH_AREAS = [
  "Reinforcement learning",
  "Large language models",
  "POMDPs",
  "AIGT",
  "RLHF & RLVR",
  "High-dimensional statistics"
];
