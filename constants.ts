import { Book, QuizQuestion } from './types';

// Using Placehold.co for reliable, generated book covers with clear text
export const MOCK_BOOKS: Book[] = [
  {
    id: '1',
    title: 'Science (Class VI)',
    author: 'NCERT',
    genre: 'Science',
    rack: 'S-06',
    summary: 'Explore food sources, components of food, fibre to fabric, sorting materials, and the world of living organisms.',
    coverUrl: 'https://placehold.co/400x600/6E2594/FFFFFF.png?text=Science+VI&font=montserrat',
    rating: 4.8,
    isFavorite: false,
    moods: ['Excited', 'Bored']
  },
  {
    id: '2',
    title: 'Mathematics (Class VI)',
    author: 'NCERT',
    genre: 'Maths',
    rack: 'M-06',
    summary: 'Learn about knowing our numbers, whole numbers, playing with numbers, basic geometrical ideas, and integers.',
    coverUrl: 'https://placehold.co/400x600/FF33BA/FFFFFF.png?text=Maths+VI&font=montserrat',
    rating: 4.5,
    isFavorite: true,
    moods: ['Bored', 'Sleepy']
  },
  {
    id: '3',
    title: 'Honeysuckle',
    author: 'NCERT',
    genre: 'English',
    rack: 'E-01',
    summary: 'The main English textbook for Class 6, featuring stories like "Who Did Patrick\'s Homework?" and beautiful poems.',
    coverUrl: 'https://placehold.co/400x600/00D26A/FFFFFF.png?text=Honeysuckle&font=montserrat',
    rating: 4.6,
    isFavorite: false,
    moods: ['Happy', 'Sad']
  },
  {
    id: '4',
    title: 'The Earth Our Habitat',
    author: 'NCERT',
    genre: 'Geography',
    rack: 'SS-01',
    summary: 'Understanding the solar system, globe, latitudes, longitudes, and the motions of the Earth.',
    coverUrl: 'https://placehold.co/400x600/3B82F6/FFFFFF.png?text=Geography&font=montserrat',
    rating: 4.4,
    isFavorite: false,
    moods: ['Excited']
  },
  {
    id: '5',
    title: 'Our Pasts - I',
    author: 'NCERT',
    genre: 'History',
    rack: 'SS-02',
    summary: 'A journey into early human history, from gathering to growing food, and the earliest cities.',
    coverUrl: 'https://placehold.co/400x600/F59E0B/FFFFFF.png?text=History+I&font=montserrat',
    rating: 4.7,
    isFavorite: true,
    moods: ['Bored', 'Sleepy']
  },
  {
    id: '6',
    title: 'Vasant (Bhag 1)',
    author: 'NCERT',
    genre: 'Hindi',
    rack: 'H-01',
    summary: 'A collection of engaging Hindi stories and poems designed for 6th standard students.',
    coverUrl: 'https://placehold.co/400x600/EF4444/FFFFFF.png?text=Hindi+Vasant&font=montserrat',
    rating: 4.3,
    isFavorite: false,
    moods: ['Happy', 'Sad']
  },
  {
    id: '7',
    title: 'A Pact with the Sun',
    author: 'NCERT',
    genre: 'English',
    rack: 'E-02',
    summary: 'Supplementary English reader containing moral stories and fables for extended reading.',
    coverUrl: 'https://placehold.co/400x600/10B981/FFFFFF.png?text=Sup+English&font=montserrat',
    rating: 4.5,
    isFavorite: false,
    moods: ['Sleepy', 'Sad']
  },
  {
    id: '8',
    title: 'Social & Political Life',
    author: 'NCERT',
    genre: 'Civics',
    rack: 'SS-03',
    summary: 'Understand diversity, government, local administration, and rural livelihoods.',
    coverUrl: 'https://placehold.co/400x600/8B5CF6/FFFFFF.png?text=Civics+VI&font=montserrat',
    rating: 4.2,
    isFavorite: false,
    moods: ['Bored']
  }
];

export const QUIZ_QUESTIONS: QuizQuestion[] = [
  {
    question: "Which vitamin is prepared by our body in the presence of sunlight?",
    options: ["Vitamin A", "Vitamin B", "Vitamin C", "Vitamin D"],
    correctAnswer: 3
  },
  {
    question: "The Roman Numeral for 50 is:",
    options: ["L", "V", "X", "C"],
    correctAnswer: 0
  },
  {
    question: "Who composed the National Anthem of India?",
    options: ["Bankim Chandra Chatterjee", "Rabindranath Tagore", "Subhash Chandra Bose", "Mahatma Gandhi"],
    correctAnswer: 1
  },
  {
    question: "Which is the third nearest planet to the sun?",
    options: ["Venus", "Earth", "Mars", "Mercury"],
    correctAnswer: 1
  },
  {
    question: "The place where rice was first grown is located in:",
    options: ["North of the Vindhyas", "Sulaiman Hills", "Garo Hills", "Banks of Ganga"],
    correctAnswer: 0
  },
  {
    question: "Identify the Noun: 'The dog ran very fast.'",
    options: ["ran", "very", "dog", "fast"],
    correctAnswer: 2
  },
  {
    question: "What is the perimeter of a square with side 5 cm?",
    options: ["25 cm", "20 cm", "10 cm", "15 cm"],
    correctAnswer: 1
  },
  {
    question: "Which of these is a translucent material?",
    options: ["Wood", "Glass", "Oiled Paper", "Stone"],
    correctAnswer: 2
  }
];

export const COLORS = {
  // Zepto-inspired Light Violet Theme - Adjusted for better visibility
  primary: '#6E2594',   // Deep Violet (Brand)
  secondary: '#FF33BA', // Hot Pink (Accent)
  accent: '#E6FF00',    // Neon Lime/Yellow (Highlights)
  success: '#00D26A',   // Green
  danger: '#FF4B4B',    // Red
  
  // Theme Colors (Light Mode)
  background: '#EBD9FC', // Richer Light Lavender (Distinct Violet)
  card: '#FFFFFF',       // Pure white cards
  input: '#F3E8FF',      // Light lavender for inputs
  
  textMain: '#2D0046',   // Dark Violet/Black text for readability
  textSub: '#5B4070',    // Darker muted text for better contrast
  
  shadow: 'rgba(110, 37, 148, 0.2)', // Violet tinted shadow
};
