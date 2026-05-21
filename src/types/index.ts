export type AgeRange = '0-1' | '1-3' | '3-12' | '0-12';

export type BadgeType = 'indispensable' | 'attention' | 'interdit';

export type EmergencyCategory = 'etouffement' | 'brulures' | 'chutes' | 'intoxications' | 'fievre' | 'plaies' | 'allergies';

export interface BilingualText {
  fr: string;
  ar: string;
}

export interface BilingualList {
  fr: string[];
  ar: string[];
}

export interface FirstAidEntry {
  id: string;
  title: BilingualText;
  category: EmergencyCategory;
  ageRange: AgeRange[];
  steps: BilingualList;
  dos: BilingualList;
  donts: BilingualList;
  pharmacistNote: BilingualText;
  illustrationColor: string;
  illustrationIcon: string;
  image?: string;
  videoId?: string;
  hasEmergencyLink: boolean;
  sources: string[];
  severity: 'low' | 'medium' | 'high';
}

export interface Medication {
  id: string;
  name: string;
  ageRange: AgeRange[];
  symptoms: string[];
  description: string;
  badge: BadgeType;
  forbiddenAge?: string;
  administration: string;
  conservation: string;
  dosage?: string;
  sources: string[];
}

export interface Article {
  id: string;
  title: string;
  excerpt: string;
  content: string;
  author: string;
  category: string;
  readTime: number;
  imageUrl: string;
  publishedAt: string;
}

export interface QuizQuestion {
  id: string;
  question: string;
  scenario?: string;
  options: string[];
  correctAnswer: number;
  explanation: string;
  category: string;
}

export type Page = 'home' | 'emergencies' | 'emergency' | 'guide' | 'about';
