import React, { useState, useEffect, useRef } from 'react';
import { 
  Search, Book as BookIcon, Star, Smile, Settings, ScanLine, 
  ChevronLeft, Mic, Plus, Trash2, Edit2, Camera, X,
  CheckCircle, XCircle, Volume2, Square
} from 'lucide-react';
import { Book, ScreenName, MoodType, GENRES } from './types';
import { MOCK_BOOKS, QUIZ_QUESTIONS, COLORS } from './constants';
import * as GeminiService from './geminiService';

// --- COMPONENTS ---

const Button = ({ 
  children, 
  onClick, 
  variant = 'primary', 
  className = '', 
  icon: Icon 
}: { 
  children?: React.ReactNode; 
  onClick?: () => void; 
  variant?: 'primary' | 'secondary' | 'danger' | 'ghost'; 
  className?: string;
  icon?: React.ElementType;
}) => {
  const baseStyle = "flex items-center justify-center gap-2 font-bold py-3 px-6 rounded-2xl transition-transform active:scale-95 shadow-md";
  
  let bg = COLORS.primary;
  let color = 'white';
  let border = 'none';

  if (variant === 'secondary') bg = COLORS.secondary;
  if (variant === 'danger') bg = COLORS.danger;
  if (variant === 'ghost') {
    bg = 'transparent';
    color = COLORS.primary;
  }

  return (
    <button 
      onClick={onClick} 
      className={`${baseStyle} ${className}`}
      style={{ 
        backgroundColor: bg, 
        color: color, 
        border: border,
        boxShadow: variant !== 'ghost' ? `0 4px 12px ${COLORS.shadowColor}` : 'none'
      }}
    >
      {Icon && <Icon size={20} strokeWidth={2.5} />}
      {children}
    </button>
  );
};

const IconButton = ({ icon: Icon, onClick, className = "", color = "" }: { icon: React.ElementType, onClick?: () => void, className?: string, color?: string }) => {
  return (
    <button 
      onClick={onClick}
      className={`p-3 rounded-2xl shadow-md active:scale-90 transition-transform flex items-center justify-center border border-white/50 ${className}`}
      style={{ 
        backgroundColor: color || 'white', 
        boxShadow: `0 4px 10px ${COLORS.shadowColor}`
      }}
    >
      <Icon size={24} style={{ color: COLORS.primary }} strokeWidth={2.5} />
    </button>
  );
};

const Card = ({ children, className = "", onClick }: { children: React.ReactNode, className?: string, onClick?: () => void }) => (
  <div 
    onClick={onClick} 
    className={`p-4 rounded-3xl shadow-lg border border-white/50 ${className}`}
    style={{ backgroundColor: COLORS.card, boxShadow: `0 8px 24px ${COLORS.shadowColor}` }}
  >
    {children}
  </div>
);

const Badge = ({ text, style }: { text: string, style?: React.CSSProperties }) => (
  <span 
    className="px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wide"
    style={{ 
      backgroundColor: COLORS.input, 
      color: COLORS.primary,
      ...style 
    }}
  >
    {text}
  </span>
);

// --- SCREENS ---

const HomeScreen = ({ onNavigate, setBook }: { onNavigate: (s: ScreenName) => void, setBook: (b: Book) => void }) => {
  const featuredBook = MOCK_BOOKS[0]; // Science

  return (
    <div className="space-y-6 pb-32 pt-6 px-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-xl font-bold font-display" style={{ color: COLORS.textSub }}>Class 6, CBSE 👋</h1>
          <h2 className="text-3xl font-black font-display" style={{ color: COLORS.textMain }}>Library Assistant</h2>
        </div>
        <div className="h-12 w-12 rounded-full overflow-hidden border-2 border-white shadow-md">
          <img src="https://picsum.photos/100" alt="Avatar" className="h-full w-full object-cover" />
        </div>
      </div>

      {/* Hero: Book of the Day */}
      <div 
        className="relative h-64 w-full rounded-[32px] overflow-hidden shadow-xl group cursor-pointer border-4 border-white"
        style={{ boxShadow: `0 10px 30px ${COLORS.shadowColor}` }}
        onClick={() => { setBook(featuredBook); onNavigate('DETAILS'); }}
      >
        <img src={featuredBook.coverUrl} alt="Featured" className="absolute inset-0 w-full h-full object-cover transition-transform group-hover:scale-105" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent"></div>
        <div className="absolute bottom-6 left-6 right-6 text-white">
          <Badge text="Subject of the Day" style={{ backgroundColor: COLORS.accent, color: 'black', marginBottom: '8px', display: 'inline-block' }} />
          <h3 className="text-2xl font-bold font-display leading-tight drop-shadow-md">{featuredBook.title}</h3>
          <p className="opacity-90 mt-1 text-sm font-medium text-gray-200">{featuredBook.summary.substring(0, 60)}...</p>
        </div>
      </div>

      {/* Search Bar Trigger */}
      <div 
        onClick={() => onNavigate('SEARCH')}
        className="bg-white p-4 rounded-2xl shadow-lg flex items-center gap-3 cursor-pointer active:scale-95 transition-transform border border-white/50"
        style={{ boxShadow: `0 4px 15px ${COLORS.shadowColor}` }}
      >
        <Search style={{ color: COLORS.primary }} size={24} />
        <span className="font-medium text-lg" style={{ color: COLORS.textSub }}>Find chapter or book...</span>
      </div>

      {/* Feature Grid */}
      <div>
        <h3 className="text-lg font-bold mb-4 font-display" style={{ color: COLORS.textMain }}>Study Tools</h3>
        <div className="grid grid-cols-2 gap-4">
          <button 
            onClick={() => onNavigate('SCANNER')} 
            className="p-5 rounded-[24px] flex flex-col items-center justify-center gap-2 shadow-lg active:scale-95 transition-all h-32 relative overflow-hidden group border-4 border-white"
            style={{ backgroundColor: COLORS.secondary }}
          >
            <ScanLine size={32} className="text-white z-10" strokeWidth={2.5} />
            <span className="font-bold text-white text-lg z-10">Scan Cover</span>
          </button>
          
          <button 
            onClick={() => onNavigate('MOOD')} 
            className="p-5 rounded-[24px] flex flex-col items-center justify-center gap-2 shadow-lg active:scale-95 transition-all h-32 relative overflow-hidden group border-4 border-white"
            style={{ backgroundColor: COLORS.accent }}
          >
             <Smile size={32} className="text-black z-10" strokeWidth={2.5} />
             <span className="font-bold text-black text-lg z-10">Mood Pick</span>
          </button>

          <button 
            onClick={() => onNavigate('QUIZ')} 
            className="p-5 rounded-[24px] flex flex-col items-center justify-center gap-2 shadow-lg active:scale-95 transition-all h-32 relative overflow-hidden group border-4 border-white"
            style={{ backgroundColor: COLORS.primary }}
          >
             <Star size={32} className="text-white z-10" strokeWidth={2.5} />
             <span className="font-bold text-white text-lg z-10">Class 6 Quiz</span>
          </button>

          <button 
            onClick={() => onNavigate('ADMIN')} 
            className="bg-white border-4 border-white p-5 rounded-[24px] flex flex-col items-center justify-center gap-2 shadow-lg active:scale-95 transition-all h-32"
          >
             <Settings size={32} style={{ color: COLORS.textSub }} strokeWidth={2.5} />
             <span className="font-bold text-lg" style={{ color: COLORS.textSub }}>Admin</span>
          </button>
        </div>
      </div>
    </div>
  );
};

const SearchScreen = ({ onBack, onSelect }: { onBack: () => void, onSelect: (b: Book) => void }) => {
  const [query, setQuery] = useState('');
  
  const filtered = MOCK_BOOKS.filter(b => b.title.toLowerCase().includes(query.toLowerCase()) || b.genre.toLowerCase().includes(query.toLowerCase()));

  return (
    <div className="h-full flex flex-col pt-6 px-6">
      <div className="flex items-center gap-3 mb-6">
        <IconButton icon={ChevronLeft} onClick={onBack} />
        <div className="flex-1 relative">
          <input 
            autoFocus
            type="text" 
            placeholder="Search subjects..." 
            className="w-full bg-white text-lg font-bold placeholder-gray-300 rounded-2xl py-3 px-12 border-2 border-transparent focus:outline-none shadow-lg"
            style={{ color: COLORS.textMain, caretColor: COLORS.primary, boxShadow: `0 4px 15px ${COLORS.shadowColor}` }}
            value={query}
            onChange={(e) => setQuery(e.target.value)}
          />
          <Search className="absolute left-4 top-1/2 -translate-y-1/2" style={{ color: COLORS.primary }} size={20} />
          {query && <X className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 cursor-pointer" size={20} onClick={() => setQuery('')} />}
        </div>
      </div>

      <div className="flex-1 overflow-y-auto pb-20 space-y-4 no-scrollbar">
        {filtered.map(book => (
          <div 
            key={book.id} 
            onClick={() => onSelect(book)}
            className="flex gap-4 p-3 bg-white rounded-3xl shadow-md border border-white/50 active:scale-[0.98] transition-transform cursor-pointer"
            style={{ boxShadow: `0 4px 12px ${COLORS.shadowColor}` }}
          >
            <img src={book.coverUrl} className="w-20 h-28 object-cover rounded-2xl shadow-sm bg-gray-100" />
            <div className="flex-1 flex flex-col justify-center">
              <Badge text={book.genre} style={{ alignSelf: 'flex-start', marginBottom: '8px' }} />
              <h4 className="font-bold leading-tight mb-1" style={{ color: COLORS.textMain }}>{book.title}</h4>
              <p className="text-sm font-medium" style={{ color: COLORS.textSub }}>{book.author}</p>
              <div className="mt-2 flex items-center gap-2">
                 <div className="flex items-center gap-1 bg-yellow-50 px-2 py-0.5 rounded-lg">
                    <Star size={12} className="text-yellow-500 fill-yellow-500" />
                    <span className="text-xs font-bold text-yellow-600">{book.rating}</span>
                 </div>
                 <div className="text-xs font-bold" style={{ color: COLORS.textSub }}>Rack {book.rack}</div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

const BookDetailsScreen = ({ book, onBack }: { book: Book, onBack: () => void }) => {
  const [isFav, setIsFav] = useState(book.isFavorite);
  const [isReading, setIsReading] = useState(false);

  // Stop reading when leaving the screen
  useEffect(() => {
    return () => {
      window.speechSynthesis.cancel();
    };
  }, []);

  const handleListen = () => {
    if (isReading) {
      window.speechSynthesis.cancel();
      setIsReading(false);
    } else {
      // Create a natural reading text
      const text = `${book.title}. By ${book.author}. ${book.summary}`;
      const utterance = new SpeechSynthesisUtterance(text);
      
      // Configure voice settings for kids (friendly pitch/rate)
      utterance.rate = 0.95;
      utterance.pitch = 1.1; 
      
      utterance.onend = () => setIsReading(false);
      utterance.onerror = () => setIsReading(false);
      
      window.speechSynthesis.cancel(); // Cancel any previous speech
      window.speechSynthesis.speak(utterance);
      setIsReading(true);
    }
  };

  return (
    <div className="h-full flex flex-col relative overflow-y-auto no-scrollbar">
      {/* Hero Image */}
      <div className="relative h-96 shrink-0">
        <img src={book.coverUrl} className="w-full h-full object-cover" />
        <div className="absolute inset-0" style={{ background: `linear-gradient(to bottom, rgba(0,0,0,0.2), transparent, ${COLORS.background})` }}></div>
        <IconButton icon={ChevronLeft} onClick={onBack} className="absolute top-6 left-6 backdrop-blur-md border-none" color="rgba(255,255,255,0.8)" />
      </div>

      {/* Content */}
      <div className="-mt-12 relative z-10 px-6 pb-32 space-y-6">
        <div className="bg-white p-6 rounded-[32px] shadow-xl border border-white/50" style={{ boxShadow: `0 10px 40px ${COLORS.shadowColor}` }}>
          <div className="flex justify-between items-start mb-4">
            <div className="flex-1">
              <div className="flex gap-2 mb-3">
                <Badge text={book.genre} style={{ backgroundColor: COLORS.primary, color: 'white' }} />
                <Badge text={`Rack ${book.rack}`} style={{ backgroundColor: 'transparent', border: `1px solid ${COLORS.input}`, color: COLORS.textSub }} />
              </div>
              <h1 className="text-2xl font-black font-display leading-tight mb-1" style={{ color: COLORS.textMain }}>{book.title}</h1>
              <p className="text-lg font-medium" style={{ color: COLORS.textSub }}>{book.author}</p>
            </div>
            <div onClick={() => setIsFav(!isFav)} className={`p-3 rounded-full cursor-pointer transition-colors ${isFav ? 'bg-yellow-50' : 'bg-gray-50'}`}>
              <Star size={24} className={isFav ? "text-yellow-500 fill-yellow-500" : "text-gray-300"} />
            </div>
          </div>

          <div className="p-4 rounded-2xl relative mb-6" style={{ backgroundColor: COLORS.input }}>
            <div className="absolute -top-2 left-8 w-4 h-4 rotate-45" style={{ backgroundColor: COLORS.input }}></div>
            <p className="font-medium leading-relaxed" style={{ color: COLORS.textMain }}>{book.summary}</p>
          </div>

          <div className="flex gap-3">
             <Button className="flex-1 rounded-full text-sm" variant="primary">Read Chapter</Button>
             <Button 
               className="flex-1 rounded-full text-sm" 
               variant="ghost" 
               icon={isReading ? Square : Volume2} 
               onClick={handleListen}
             >
               {isReading ? 'Stop' : 'Listen'}
             </Button>
          </div>
        </div>

        {/* Similar Books Strip */}
        <div>
          <h3 className="text-lg font-bold mb-3" style={{ color: COLORS.textMain }}>Other Subjects</h3>
          <div className="flex gap-4 overflow-x-auto pb-4 no-scrollbar">
            {MOCK_BOOKS.filter(b => b.id !== book.id).slice(0, 3).map(b => (
              <div key={b.id} className="w-32 shrink-0">
                <img src={b.coverUrl} className="w-full h-44 object-cover rounded-2xl shadow-md mb-2 bg-gray-100" />
                <p className="font-bold text-sm truncate" style={{ color: COLORS.textMain }}>{b.title}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

const MoodScreen = ({ onBack, onSelectBook }: { onBack: () => void, onSelectBook: (b: Book) => void }) => {
  const [recommendations, setRecommendations] = useState<Book[]>([]);
  const [selectedMood, setSelectedMood] = useState<string | null>(null);

  // Filter books locally based on mood tags or random selection if no tags match
  const handleMoodSelect = (mood: string) => {
    setSelectedMood(mood);
    const filtered = MOCK_BOOKS.filter(book => book.moods?.includes(mood));
    
    // If no specific match, just show a few random ones to keep it engaging
    if (filtered.length === 0) {
        setRecommendations(MOCK_BOOKS.slice(0, 3));
    } else {
        setRecommendations(filtered);
    }
  };

  return (
    <div className="h-full flex flex-col pt-6 px-6">
      <div className="flex items-center gap-3 mb-6">
        <IconButton icon={ChevronLeft} onClick={onBack} />
        <h2 className="text-2xl font-black font-display" style={{ color: COLORS.textMain }}>How are you feeling?</h2>
      </div>

      {!selectedMood ? (
        <div className="grid grid-cols-2 gap-4 pb-10 overflow-y-auto no-scrollbar">
          {Object.values(MoodType).map((mood, idx) => {
             const [label, emoji] = mood.split(' ');
             const bgColors = ['#FEF08A', '#BFDBFE', '#FED7AA', '#E9D5FF', '#99F6E4'];
             const bgColor = bgColors[idx % bgColors.length];
             
             return (
               <button 
                key={mood}
                onClick={() => handleMoodSelect(label)}
                className="p-6 rounded-[28px] aspect-square flex flex-col items-center justify-center gap-2 shadow-md active:scale-95 transition-transform border-4 border-white"
                style={{ backgroundColor: bgColor }}
               >
                 <span className="text-5xl drop-shadow-sm">{emoji}</span>
                 <span className="text-xl font-black text-gray-800">{label}</span>
               </button>
             )
          })}
        </div>
      ) : (
        <div className="flex-1 flex flex-col">
          <div className="mb-4 flex items-center justify-between">
            <h3 className="font-bold text-lg" style={{ color: COLORS.textSub }}>Picks for "{selectedMood}"</h3>
            <button onClick={() => { setSelectedMood(null); setRecommendations([]); }} className="font-bold text-sm" style={{ color: COLORS.primary }}>Reset</button>
          </div>

          <div className="space-y-4 overflow-y-auto pb-20 no-scrollbar">
            {recommendations.map((book) => (
              <div key={book.id} onClick={() => onSelectBook(book)} className="bg-white p-4 rounded-3xl shadow-sm border border-white flex gap-4 cursor-pointer active:scale-[0.98] transition-transform">
                   <img src={book.coverUrl} className="w-20 h-28 object-cover rounded-xl bg-gray-100 shadow-sm" />
                   <div className="flex-1 flex flex-col justify-center">
                     <h4 className="font-bold text-lg leading-tight" style={{ color: COLORS.textMain }}>{book.title}</h4>
                     <p className="text-sm mt-1" style={{ color: COLORS.textSub }}>{book.author}</p>
                     <div className="mt-2">
                       <Badge text={book.genre} style={{ backgroundColor: COLORS.input, color: COLORS.primary, fontSize: '10px' }} />
                     </div>
                   </div>
              </div>
            ))}
            {recommendations.length === 0 && <p className="text-center mt-10" style={{ color: COLORS.textSub }}>No specific books for this mood, try another!</p>}
          </div>
        </div>
      )}
    </div>
  );
};

const QuizScreen = ({ onBack }: { onBack: () => void }) => {
  const [started, setStarted] = useState(false);
  const [currentQIndex, setCurrentQIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [selectedOption, setSelectedOption] = useState<number | null>(null);
  const [showResult, setShowResult] = useState(false);
  const [showConfetti, setShowConfetti] = useState(false);

  const currentQuestion = QUIZ_QUESTIONS[currentQIndex];

  const handleStart = () => {
    setStarted(true);
    setScore(0);
    setCurrentQIndex(0);
    setShowResult(false);
  };

  const handleAnswer = (idx: number) => {
    if (selectedOption !== null) return; // Prevent multiple clicks
    setSelectedOption(idx);
    
    if (idx === currentQuestion.correctAnswer) {
      setScore(s => s + 10);
      setShowConfetti(true);
      setTimeout(() => setShowConfetti(false), 2000);
    }
  };

  const nextQuestion = () => {
    setSelectedOption(null);
    if (currentQIndex < QUIZ_QUESTIONS.length - 1) {
      setCurrentQIndex(c => c + 1);
    } else {
      setShowResult(true);
    }
  };

  const restartQuiz = () => {
    setStarted(false);
    setShowResult(false);
    setScore(0);
    setCurrentQIndex(0);
    setSelectedOption(null);
  };

  return (
    <div className="h-full flex flex-col relative pt-6 px-6">
      {/* Confetti Overlay */}
      {showConfetti && (
        <div className="absolute inset-0 pointer-events-none z-50 flex items-center justify-center overflow-hidden">
           <div className="text-6xl animate-bounce">🎉</div>
           <div className="absolute top-1/4 left-1/4 text-4xl animate-ping">✨</div>
           <div className="absolute top-1/3 right-1/4 text-5xl animate-pulse">🌟</div>
        </div>
      )}

      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <IconButton icon={ChevronLeft} onClick={onBack} />
        <div className="px-4 py-1.5 rounded-full text-white font-bold shadow-lg" style={{ backgroundColor: COLORS.primary }}>
          {started && !showResult ? `Q: ${currentQIndex + 1}/${QUIZ_QUESTIONS.length}` : 'Quiz'}
        </div>
      </div>

      {!started ? (
        // Start Screen
        <div className="flex-1 flex flex-col items-center justify-center text-center p-6">
          <div className="w-40 h-40 rounded-full flex items-center justify-center mb-8 animate-bounce border-4 border-white shadow-xl" style={{ backgroundColor: COLORS.input }}>
             <Star size={64} style={{ color: COLORS.primary, fill: COLORS.primary }} />
          </div>
          <h2 className="text-3xl font-black font-display mb-4" style={{ color: COLORS.textMain }}>Class 6 Quiz!</h2>
          <p className="mb-8 max-w-xs" style={{ color: COLORS.textSub }}>Test your knowledge on Science, Maths, and Social Studies. 10 points per correct answer!</p>
          <Button onClick={handleStart} variant="primary" className="w-full">Start Quiz</Button>
        </div>
      ) : showResult ? (
        // Result Screen
        <div className="flex-1 flex flex-col items-center justify-center text-center p-6">
          <h2 className="text-3xl font-black font-display mb-2" style={{ color: COLORS.textMain }}>Quiz Complete!</h2>
          <p className="text-lg mb-8" style={{ color: COLORS.textSub }}>You scored</p>
          
          <div className="w-48 h-48 bg-white rounded-full flex flex-col items-center justify-center mb-8 shadow-xl border-4 border-white relative">
             <span className="text-5xl font-black" style={{ color: COLORS.primary }}>{score}</span>
             <span className="text-sm font-bold text-gray-400 uppercase">Total Points</span>
             <div className="absolute -bottom-2 bg-yellow-400 text-black text-xs font-bold px-3 py-1 rounded-full">
               {score === QUIZ_QUESTIONS.length * 10 ? 'PERFECT!' : score > (QUIZ_QUESTIONS.length * 10) / 2 ? 'GREAT JOB!' : 'KEEP LEARNING!'}
             </div>
          </div>

          <Button onClick={restartQuiz} variant="secondary" className="w-full mb-3">Retake Quiz</Button>
          <Button onClick={onBack} variant="ghost" className="w-full">Back to Home</Button>
        </div>
      ) : (
        // Question Screen
        <div className="flex-1 flex flex-col justify-center pb-20 overflow-y-auto no-scrollbar">
          <div className="bg-white p-8 rounded-[32px] shadow-xl border-b-8 border-purple-100 mb-8 relative">
            <div className="absolute -bottom-4 right-8 w-8 h-8 bg-white rotate-45 border-b border-r border-purple-100"></div>
            <h3 className="text-xl font-bold leading-relaxed text-center" style={{ color: COLORS.textMain }}>{currentQuestion.question}</h3>
          </div>

          <div className="space-y-3">
            {currentQuestion.options.map((opt, idx) => {
              let bg = 'white';
              let border = 'transparent';
              let text = COLORS.textMain;
              let icon = null;

              if (selectedOption !== null) {
                if (idx === currentQuestion.correctAnswer) {
                  bg = COLORS.success;
                  text = 'white';
                  icon = <CheckCircle size={20} />;
                } else if (idx === selectedOption) {
                  bg = COLORS.danger;
                  text = 'white';
                  icon = <XCircle size={20} />;
                } else {
                  text = 'rgba(0,0,0,0.3)';
                }
              }

              return (
                <button
                  key={idx}
                  onClick={() => handleAnswer(idx)}
                  disabled={selectedOption !== null}
                  className="w-full p-4 rounded-2xl font-bold text-lg transition-all flex items-center justify-between border-2 shadow-sm"
                  style={{ backgroundColor: bg, borderColor: border, color: text }}
                >
                  <span>{opt}</span>
                  {icon}
                </button>
              );
            })}
          </div>

          {selectedOption !== null && (
            <Button onClick={nextQuestion} className="mt-8 w-full" variant="secondary">
              {currentQIndex < QUIZ_QUESTIONS.length - 1 ? 'Next Question' : 'Finish Quiz'}
            </Button>
          )}
        </div>
      )}
    </div>
  );
};

const ScannerScreen = ({ onBack, onScanComplete }: { onBack: () => void, onScanComplete: (data: any) => void }) => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [scanning, setScanning] = useState(false);
  const [stream, setStream] = useState<MediaStream | null>(null);

  useEffect(() => {
    startCamera();
    return () => stopCamera();
  }, []);

  const startCamera = async () => {
    try {
      const mediaStream = await navigator.mediaDevices.getUserMedia({ video: { facingMode: 'environment' } });
      setStream(mediaStream);
      if (videoRef.current) {
        videoRef.current.srcObject = mediaStream;
      }
    } catch (e) {
      console.error("Camera error", e);
    }
  };

  const stopCamera = () => {
    if (stream) {
      stream.getTracks().forEach(track => track.stop());
    }
  };

  const captureAndAnalyze = async () => {
    if (!videoRef.current) return;
    setScanning(true);
    
    // Capture frame
    const canvas = document.createElement('canvas');
    canvas.width = videoRef.current.videoWidth;
    canvas.height = videoRef.current.videoHeight;
    canvas.getContext('2d')?.drawImage(videoRef.current, 0, 0);
    const base64 = canvas.toDataURL('image/jpeg').split(',')[1];

    // Send to Gemini
    const result = await GeminiService.identifyBookFromImage(base64);
    setScanning(false);
    
    if (result) {
       onScanComplete(result);
    } else {
       alert("Could not identify book. Try again.");
    }
  };

  return (
    <div className="h-full flex flex-col bg-black relative overflow-hidden">
      <video ref={videoRef} autoPlay playsInline className="absolute inset-0 w-full h-full object-cover opacity-80" />
      
      {/* Overlay UI */}
      <div className="absolute inset-0 flex flex-col justify-between p-6 z-10">
        <div className="flex justify-between items-start">
           <IconButton icon={X} onClick={onBack} className="bg-black/50 backdrop-blur-md border-none" color="transparent" />
           <div className="bg-black/50 backdrop-blur-md px-4 py-2 rounded-full text-white text-xs font-bold uppercase tracking-wider border border-white/20">
              Point at Cover
           </div>
        </div>

        {/* Scan Frame */}
        <div className="flex-1 flex items-center justify-center p-8">
           <div className="w-full aspect-[2/3] border-4 border-white/30 rounded-3xl relative">
              <div className="absolute top-0 left-0 w-12 h-12 border-t-4 border-l-4 rounded-tl-xl -mt-1 -ml-1" style={{ borderColor: COLORS.accent }}></div>
              <div className="absolute top-0 right-0 w-12 h-12 border-t-4 border-r-4 rounded-tr-xl -mt-1 -mr-1" style={{ borderColor: COLORS.accent }}></div>
              <div className="absolute bottom-0 left-0 w-12 h-12 border-b-4 border-l-4 rounded-bl-xl -mb-1 -ml-1" style={{ borderColor: COLORS.accent }}></div>
              <div className="absolute bottom-0 right-0 w-12 h-12 border-b-4 border-r-4 rounded-br-xl -mb-1 -mr-1" style={{ borderColor: COLORS.accent }}></div>
              {scanning && <div className="absolute inset-x-0 top-0 h-1 animate-[scan_2s_ease-in-out_infinite]" style={{ backgroundColor: COLORS.accent, boxShadow: `0 0 20px ${COLORS.accent}` }}></div>}
           </div>
        </div>

        <div className="flex justify-center pb-8">
           <button 
             onClick={captureAndAnalyze}
             disabled={scanning}
             className="w-20 h-20 bg-white rounded-full flex items-center justify-center border-4 shadow-lg active:scale-95 transition-transform"
             style={{ borderColor: COLORS.accent }}
           >
             {scanning ? <div className="animate-spin w-8 h-8 border-4 border-gray-200 rounded-full" style={{ borderTopColor: COLORS.accent }}></div> : <div className="w-16 h-16 bg-gray-100 rounded-full border-2 border-gray-300"></div>}
           </button>
        </div>
      </div>
    </div>
  );
};

const AdminScreen = ({ onBack }: { onBack: () => void }) => {
  return (
     <div className="h-full flex flex-col pt-6 px-6">
       <div className="flex items-center gap-3 mb-6">
        <IconButton icon={ChevronLeft} onClick={onBack} />
        <h2 className="text-2xl font-black font-display" style={{ color: COLORS.textMain }}>Library Admin</h2>
      </div>

      <div className="flex-1 overflow-y-auto pb-20 space-y-6 no-scrollbar">
         <div className="bg-white p-6 rounded-[32px] shadow-sm border border-white/50">
            <h3 className="font-bold text-lg mb-4" style={{ color: COLORS.textMain }}>Add New Book</h3>
            <div className="space-y-4">
               <div>
                 <label className="text-xs font-bold uppercase tracking-wider mb-1 block" style={{ color: COLORS.textSub }}>Title</label>
                 <input className="w-full rounded-xl p-3 font-bold border-none focus:ring-2 outline-none placeholder-gray-400" style={{ backgroundColor: COLORS.input, color: COLORS.textMain, '--tw-ring-color': COLORS.primary } as any} placeholder="Book Title" />
               </div>
               <div className="flex gap-4">
                  <div className="flex-1">
                    <label className="text-xs font-bold uppercase tracking-wider mb-1 block" style={{ color: COLORS.textSub }}>Author</label>
                    <input className="w-full rounded-xl p-3 font-bold border-none outline-none placeholder-gray-400" style={{ backgroundColor: COLORS.input, color: COLORS.textMain }} placeholder="Author Name" />
                  </div>
                  <div className="w-1/3">
                    <label className="text-xs font-bold uppercase tracking-wider mb-1 block" style={{ color: COLORS.textSub }}>Rack</label>
                    <input className="w-full rounded-xl p-3 font-bold border-none outline-none placeholder-gray-400" style={{ backgroundColor: COLORS.input, color: COLORS.textMain }} placeholder="A-01" />
                  </div>
               </div>
               <div>
                  <label className="text-xs font-bold uppercase tracking-wider mb-1 block" style={{ color: COLORS.textSub }}>Genre</label>
                  <div className="flex flex-wrap gap-2">
                     {GENRES.map(g => (
                        <span key={g} className="px-3 py-1 rounded-lg bg-gray-50 text-gray-600 font-bold text-sm cursor-pointer hover:bg-gray-100 transition-colors">{g}</span>
                     ))}
                  </div>
               </div>
               <Button className="w-full mt-2" variant="primary">Add Book</Button>
            </div>
         </div>

         <div className="space-y-3">
            <h3 className="font-bold text-lg px-2" style={{ color: COLORS.textMain }}>Manage Inventory</h3>
            {MOCK_BOOKS.slice(0,3).map(b => (
               <div key={b.id} className="bg-white p-4 rounded-2xl flex items-center justify-between shadow-sm border border-white/50">
                  <div className="flex items-center gap-3">
                     <img src={b.coverUrl} className="w-10 h-14 object-cover rounded-lg bg-gray-100" />
                     <div>
                        <p className="font-bold text-sm" style={{ color: COLORS.textMain }}>{b.title}</p>
                        <p className="text-xs" style={{ color: COLORS.textSub }}>{b.rack}</p>
                     </div>
                  </div>
                  <div className="flex gap-2">
                     <button className="p-2 bg-gray-50 rounded-lg text-gray-600"><Edit2 size={16}/></button>
                     <button className="p-2 bg-red-50 rounded-lg text-red-500"><Trash2 size={16}/></button>
                  </div>
               </div>
            ))}
         </div>
      </div>
     </div>
  );
};


// --- MAIN APP ---

const App = () => {
  const [screen, setScreen] = useState<ScreenName>('HOME');
  const [selectedBook, setSelectedBook] = useState<Book | null>(null);

  // Helper for scanned results
  const handleScanResult = (data: any) => {
    const tempBook: Book = {
      id: 'temp',
      title: data.title || 'Unknown Title',
      author: data.author || 'Unknown Author',
      genre: data.genre || 'General',
      rack: 'Desk',
      summary: 'Scanned book from Gemini.',
      coverUrl: 'https://placehold.co/400x600/808080/FFFFFF.png?text=SCANNED&font=roboto',
      rating: 0,
      isFavorite: false
    };
    setSelectedBook(tempBook);
    setScreen('DETAILS');
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4 sm:p-8 font-sans" style={{ backgroundColor: COLORS.background }}>
      <style>
        {`
          @keyframes scan {
            0% { top: 0%; opacity: 0; }
            10% { opacity: 1; }
            90% { opacity: 1; }
            100% { top: 100%; opacity: 0; }
          }
        `}
      </style>
      
      {/* Mobile Frame Constraint */}
      <div 
        className="w-full max-w-[390px] h-[844px] rounded-[40px] shadow-2xl overflow-hidden border-8 border-white relative flex flex-col" 
        style={{ backgroundColor: COLORS.background }}
      >
        {/* Status Bar Area (Visual only) */}
        <div className="h-6 w-full shrink-0"></div>

        {/* Main Content Area - Scrollable */}
        <div className="flex-1 h-0 overflow-y-auto no-scrollbar relative flex flex-col">
          {screen === 'HOME' && <HomeScreen onNavigate={setScreen} setBook={setSelectedBook} />}
          {screen === 'SEARCH' && <SearchScreen onBack={() => setScreen('HOME')} onSelect={(b) => { setSelectedBook(b); setScreen('DETAILS'); }} />}
          {screen === 'DETAILS' && selectedBook && <BookDetailsScreen book={selectedBook} onBack={() => setScreen('HOME')} />}
          {screen === 'MOOD' && <MoodScreen onBack={() => setScreen('HOME')} onSelectBook={(b) => { setSelectedBook(b); setScreen('DETAILS'); }} />}
          {screen === 'QUIZ' && <QuizScreen onBack={() => setScreen('HOME')} />}
          {screen === 'SCANNER' && <ScannerScreen onBack={() => setScreen('HOME')} onScanComplete={handleScanResult} />}
          {screen === 'ADMIN' && <AdminScreen onBack={() => setScreen('HOME')} />}
          
          {screen === 'FAVORITES' && (
             <div className="h-full flex flex-col pt-6 px-6">
               <div className="flex items-center gap-3 mb-6">
                 <IconButton icon={ChevronLeft} onClick={() => setScreen('HOME')} />
                 <h2 className="text-2xl font-black" style={{ color: COLORS.textMain }}>Favorites</h2>
               </div>
               <div className="space-y-4 overflow-y-auto pb-20 no-scrollbar">
                  {MOCK_BOOKS.filter(b => b.isFavorite).map(b => (
                    <div key={b.id} onClick={() => {setSelectedBook(b); setScreen('DETAILS');}} className="bg-white p-4 rounded-2xl shadow-sm flex gap-4 border border-white/50 cursor-pointer">
                      <img src={b.coverUrl} className="w-16 h-20 rounded-lg object-cover" />
                      <div>
                        <h4 className="font-bold" style={{ color: COLORS.textMain }}>{b.title}</h4>
                        <p className="text-sm" style={{ color: COLORS.textSub }}>{b.author}</p>
                      </div>
                    </div>
                  ))}
               </div>
             </div>
          )}
        </div>

        {/* Bottom Nav (Only visible on Home) */}
        {screen === 'HOME' && (
          <div className="absolute bottom-6 left-6 right-6 h-16 bg-white/90 backdrop-blur-md rounded-full shadow-[0_10px_40px_-10px_rgba(100,50,200,0.15)] flex items-center justify-around px-2 border border-white/50 z-20">
            <button className="p-3" style={{ color: COLORS.primary }}><BookIcon strokeWidth={3} /></button>
            <button className="p-3 text-gray-400 hover:text-purple-600" onClick={() => setScreen('FAVORITES')}><Star strokeWidth={3} /></button>
            <div 
              className="w-12 h-12 rounded-full -mt-8 border-4 border-white flex items-center justify-center shadow-lg text-white" 
              style={{ backgroundColor: COLORS.primary, boxShadow: `0 4px 15px ${COLORS.shadowColor}` }}
              onClick={() => setScreen('SEARCH')}
            >
               <Search size={24} strokeWidth={3} />
            </div>
            <button className="p-3 text-gray-400 hover:text-purple-600" onClick={() => setScreen('MOOD')}><Smile strokeWidth={3} /></button>
            <button className="p-3 text-gray-400 hover:text-purple-600"><Settings strokeWidth={3} /></button>
          </div>
        )}
      </div>
    </div>
  );
};

export default App;