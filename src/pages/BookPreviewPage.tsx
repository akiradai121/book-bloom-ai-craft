
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Download, ChevronLeft, ChevronRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';
import TableOfContents from '@/components/TableOfContents';
import ChapterPreview from '@/components/ChapterPreview';
import BookCover from '@/components/BookCover';
import { toast } from 'sonner';

// Placeholder data
const generatePlaceholderBook = (bookIdea: string, genre: string) => {
  // Generate a title based on the book idea
  const words = bookIdea.split(' ').filter(word => word.length > 3);
  const randomWord = words[Math.floor(Math.random() * words.length)] || 'Journey';
  const titles = [
    `The ${randomWord} Chronicles`,
    `${randomWord}'s Journey`,
    `Beyond the ${randomWord}`,
    `The Last ${randomWord}`,
    `${randomWord} Rising`
  ];
  const title = titles[Math.floor(Math.random() * titles.length)];
  
  // Generate chapters
  const chapterCount = 5 + Math.floor(Math.random() * 5); // 5-9 chapters
  const chapters = [];
  
  for (let i = 1; i <= chapterCount; i++) {
    chapters.push({
      id: i,
      title: getRandomChapterTitle(i),
      summary: getRandomChapterSummary(),
      imageUrl: `https://source.unsplash.com/random/300x200?${genre}&sig=${i}`
    });
  }
  
  return { title, genre, chapters };
};

const getRandomChapterTitle = (chapterNumber: number) => {
  const beginningTitles = [
    "The Beginning",
    "First Steps",
    "Origins",
    "The Awakening",
    "Discovery"
  ];
  
  const middleTitles = [
    "Challenges Arise",
    "The Journey Continues",
    "Unexpected Turns",
    "Revelations",
    "The Conflict",
    "Rising Tension",
    "New Allies",
    "Hidden Truths"
  ];
  
  const endingTitles = [
    "The Final Battle",
    "Resolution",
    "A New Dawn",
    "Coming Full Circle",
    "The End and Beginning"
  ];
  
  if (chapterNumber === 1) {
    return beginningTitles[Math.floor(Math.random() * beginningTitles.length)];
  } else if (chapterNumber >= 2 && chapterNumber <= 8) {
    return middleTitles[Math.floor(Math.random() * middleTitles.length)];
  } else {
    return endingTitles[Math.floor(Math.random() * endingTitles.length)];
  }
};

const getRandomChapterSummary = () => {
  const summaries = [
    "In this chapter, the characters face unexpected challenges that test their resolve and force them to reconsider their goals.",
    "A mysterious stranger appears, bringing crucial information that changes everything the protagonists thought they knew.",
    "The journey takes a dangerous turn as the environment becomes increasingly hostile and resources begin to dwindle.",
    "Hidden secrets from the past are revealed, shedding new light on the current conflict and motivations of key characters.",
    "Alliances shift as true intentions are revealed, leaving the hero to question who can truly be trusted.",
    "A moment of calm allows for reflection and growth, strengthening bonds between characters before the coming storm.",
    "The antagonist makes a bold move, raising the stakes and forcing an immediate response from our heroes.",
    "An ancient power is discovered, promising both great opportunity and terrible danger if misused.",
    "The protagonists must overcome internal conflicts and personal demons to progress on their journey.",
    "A dramatic confrontation leads to a pivotal decision that will alter the course of the entire story."
  ];
  
  return summaries[Math.floor(Math.random() * summaries.length)];
};

const BookPreviewPage = () => {
  const navigate = useNavigate();
  const [book, setBook] = useState<any>(null);
  const [activeChapter, setActiveChapter] = useState(1);
  
  useEffect(() => {
    // Retrieve stored book details
    const storedDetails = sessionStorage.getItem('bookDetails');
    if (!storedDetails) {
      navigate('/create');
      return;
    }
    
    const { bookIdea, genre } = JSON.parse(storedDetails);
    const generatedBook = generatePlaceholderBook(bookIdea, genre);
    setBook(generatedBook);
  }, [navigate]);
  
  const handleDownload = () => {
    // Store book data for the success page
    if (book) {
      sessionStorage.setItem('generatedBook', JSON.stringify(book));
      navigate('/success');
    }
  };
  
  const navigateChapter = (direction: 'prev' | 'next') => {
    if (!book) return;
    
    if (direction === 'prev' && activeChapter > 1) {
      setActiveChapter(activeChapter - 1);
    } else if (direction === 'next' && activeChapter < book.chapters.length) {
      setActiveChapter(activeChapter + 1);
    }
  };
  
  if (!book) {
    return (
      <div className="min-h-screen flex flex-col">
        <Navigation />
        <main className="flex-grow flex items-center justify-center">
          <p>Loading book preview...</p>
        </main>
      </div>
    );
  }
  
  const activeChapterData = book.chapters.find((chapter: any) => chapter.id === activeChapter);
  
  return (
    <div className="min-h-screen flex flex-col">
      <Navigation />
      
      <main className="flex-grow py-12">
        <div className="container px-4 md:px-6">
          <div className="text-center mb-10 animate-fade-in">
            <h1 className="text-3xl md:text-4xl font-bold mb-4">{book.title}</h1>
            <p className="text-muted-foreground">
              Preview your generated book and download when ready.
            </p>
          </div>
          
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Sidebar */}
            <div className="lg:col-span-1 space-y-6">
              <div className="flex flex-col items-center">
                <BookCover title={book.title} genre={book.genre} className="mb-4" />
                <Button 
                  className="w-full btn-primary"
                  onClick={handleDownload}
                >
                  <Download className="mr-2 h-4 w-4" />
                  Download as PDF
                </Button>
              </div>
              
              <div className="mt-8 hidden lg:block">
                <TableOfContents 
                  chapters={book.chapters.map((chapter: any) => ({ id: chapter.id, title: chapter.title }))}
                  activeChapter={activeChapter}
                  onChapterClick={setActiveChapter}
                />
              </div>
            </div>
            
            {/* Main Content */}
            <div className="lg:col-span-2">
              <div className="card animate-fade-in">
                <div className="flex justify-between items-center mb-6">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => navigateChapter('prev')}
                    disabled={activeChapter === 1}
                  >
                    <ChevronLeft className="h-4 w-4 mr-2" />
                    Previous
                  </Button>
                  
                  <span className="text-sm text-muted-foreground">
                    Chapter {activeChapter} of {book.chapters.length}
                  </span>
                  
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => navigateChapter('next')}
                    disabled={activeChapter === book.chapters.length}
                  >
                    Next
                    <ChevronRight className="h-4 w-4 ml-2" />
                  </Button>
                </div>
                
                <div className="lg:hidden mb-6">
                  <TableOfContents 
                    chapters={book.chapters.map((chapter: any) => ({ id: chapter.id, title: chapter.title }))}
                    activeChapter={activeChapter}
                    onChapterClick={setActiveChapter}
                  />
                </div>
                
                {activeChapterData && (
                  <div className="space-y-6">
                    <h2 className="text-2xl font-semibold">
                      Chapter {activeChapterData.id}: {activeChapterData.title}
                    </h2>
                    
                    <img 
                      src={activeChapterData.imageUrl}
                      alt={`Chapter ${activeChapterData.id}: ${activeChapterData.title}`}
                      className="w-full h-48 object-cover rounded-lg"
                    />
                    
                    <p className="text-muted-foreground">
                      {activeChapterData.summary}
                    </p>
                    
                    <div className="pt-4 space-y-3 text-muted-foreground">
                      <p>
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec vel egestas dolor, nec dignissim metus. Donec augue elit, rhoncus ac sodales id, porttitor vitae est. Donec laoreet rutrum libero sed pharetra.
                      </p>
                      <p>
                        Donec vel egestas dolor, nec dignissim metus. Donec augue elit, rhoncus ac sodales id, porttitor vitae est. Donec laoreet rutrum libero sed pharetra. Duis a arcu convallis, gravida purus eget, mollis diam.
                      </p>
                    </div>
                  </div>
                )}
              </div>
              
              <div className="mt-8">
                <h3 className="font-medium mb-4">Other Chapters</h3>
                <div className="space-y-3">
                  {book.chapters
                    .filter((chapter: any) => chapter.id !== activeChapter)
                    .slice(0, 3)
                    .map((chapter: any) => (
                      <ChapterPreview 
                        key={chapter.id}
                        number={chapter.id}
                        title={chapter.title}
                        summary={chapter.summary}
                        imageUrl={chapter.imageUrl}
                      />
                    ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default BookPreviewPage;
