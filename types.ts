export interface Book {
  id: string;
  title: string;
  author: string;
  genre: string;
  rack: string;
  summary: string;
  coverUrl: string;
  rating: number;
  isFavorite: boolean;
  moods?: string[]; // Added for offline mood picking
}

export type ScreenName = 'HOME' | 'SEARCH' | 'DETAILS' | 'MOOD' | 'FAVORITES' | 'QUIZ' | 'ADMIN' | 'SCANNER';

export enum MoodType {
  HAPPY = 'Happy 😊',
  SAD = 'Sad 😢',
  EXCITED = 'Excited ⚡',
  SLEEPY = 'Sleepy 😴',
  BORED = 'Bored 😐',
}

export interface QuizQuestion {
  question: string;
  options: string[];
  correctAnswer: number; // Index
}

export const GENRES = ['Fantasy', 'Sci-Fi', 'Adventure', 'Mystery', 'Non-Fiction', 'Comic', 'Science', 'Maths', 'History'];
