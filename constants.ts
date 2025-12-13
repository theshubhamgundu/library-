import { Book, QuizQuestion } from './types';

// Updated images to look more like distinct textbooks using colored placeholders with clear text
export const MOCK_BOOKS: Book[] = [
  {
    id: '1',
    title: 'Science',
    author: 'Prof. R.S. Sindhu (Chair)',
    genre: 'Science',
    rack: 'S-06',
    summary: 'Food sources, components of food, fibre to fabric, sorting materials, and living organisms.',
    coverUrl: 'https://placehold.co/400x600/6E2594/FFFFFF.png?text=SCIENCE\nClass+6&font=roboto',
    rating: 4.8,
    isFavorite: false,
    moods: ['Excited', 'Bored']
  },
  {
    id: '2',
    title: 'Mathematics',
    author: 'Prof. H.K. Dewan (Advisor)',
    genre: 'Maths',
    rack: 'M-06',
    summary: 'Knowing our numbers, whole numbers, playing with numbers, basic geometrical ideas, and integers.',
    coverUrl: 'https://placehold.co/400x600/FF33BA/FFFFFF.png?text=MATHS\nClass+6&font=roboto',
    rating: 4.5,
    isFavorite: true,
    moods: ['Bored', 'Sleepy']
  },
  {
    id: '3',
    title: 'Honeysuckle',
    author: 'Prof. R. Amritavalli (Ed.)',
    genre: 'English',
    rack: 'E-01',
    summary: 'Stories like "Who Did Patrick\'s Homework?" and beautiful poems for Grade 6.',
    coverUrl: 'https://placehold.co/400x600/00D26A/FFFFFF.png?text=HONEYSUCKLE\nEnglish&font=roboto',
    rating: 4.6,
    isFavorite: false,
    moods: ['Happy', 'Sad']
  },
  {
    id: '4',
    title: 'The Earth',
    author: 'Prof. Savita Sinha (Chair)',
    genre: 'Geography',
    rack: 'SS-01',
    summary: 'The solar system, globe, latitudes, longitudes, and the motions of the Earth.',
    coverUrl: 'https://placehold.co/400x600/3B82F6/FFFFFF.png?text=THE+EARTH\nGeography&font=roboto',
    rating: 4.4,
    isFavorite: false,
    moods: ['Excited']
  },
  {
    id: '5',
    title: 'Our Pasts - I',
    author: 'Prof. Neeladri Bhattacharya',
    genre: 'History',
    rack: 'SS-02',
    summary: 'Early human history, from gathering to growing food, and the earliest cities.',
    coverUrl: 'https://placehold.co/400x600/F59E0B/FFFFFF.png?text=OUR+PASTS\nHistory&font=roboto',
    rating: 4.7,
    isFavorite: true,
    moods: ['Bored', 'Sleepy']
  },
  {
    id: '6',
    title: 'Vasant',
    author: 'Prof. Purushottam Agrawal',
    genre: 'Hindi',
    rack: 'H-01',
    summary: 'A collection of engaging Hindi stories and poems designed for 6th standard students.',
    coverUrl: 'https://placehold.co/400x600/EF4444/FFFFFF.png?text=VASANT\nHindi&font=roboto',
    rating: 4.3,
    isFavorite: false,
    moods: ['Happy', 'Sad']
  },
  {
    id: '7',
    title: 'Pact with Sun',
    author: 'Zakir Husain & Others',
    genre: 'English',
    rack: 'E-02',
    summary: 'Supplementary English reader containing moral stories and fables.',
    coverUrl: 'https://placehold.co/400x600/10B981/FFFFFF.png?text=PACT+W+SUN\nReader&font=roboto',
    rating: 4.5,
    isFavorite: false,
    moods: ['Sleepy', 'Sad']
  },
  {
    id: '8',
    title: 'Social Life',
    author: 'Prof. Saroj Yadav (Dean)',
    genre: 'Civics',
    rack: 'SS-03',
    summary: 'Diversity, government, local administration, and rural livelihoods.',
    coverUrl: 'https://placehold.co/400x600/8B5CF6/FFFFFF.png?text=POLITICAL\nLife&font=roboto',
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
  // Theme Colors
  primary: '#7C3AED',   // Violet-600 (Main Action)
  secondary: '#DB2777', // Pink-600 (Secondary Action)
  accent: '#FACC15',    // Yellow-400 (Highlights)
  success: '#10B981',   // Emerald-500
  danger: '#EF4444',    // Red-500
  
  // Backgrounds
  background: '#E9D5FF', // Purple-200 (Main App BG - Requested Light Violet)
  card: '#FFFFFF',       // White
  input: '#F3E8FF',      // Purple-100
  
  // Text
  textMain: '#2E1065',   // Purple-950 (High Contrast)
  textSub: '#5B21B6',    // Purple-800
  
  // Shadows
  shadowColor: 'rgba(124, 58, 237, 0.25)' // Purple shadow
};