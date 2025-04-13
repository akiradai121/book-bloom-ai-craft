
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Download, ChevronLeft, Edit } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '@/components/ui/collapsible';
import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';
import TableOfContents from '@/components/TableOfContents';
import { toast } from 'sonner';
import BookPreviewSidebar from '@/components/BookPreviewSidebar';
import ChapterContentDisplay from '@/components/ChapterContentDisplay';
import OtherChaptersPreview from '@/components/OtherChaptersPreview';
import ChapterEditorModal from '@/components/ChapterEditorModal';
import BookEditorPanel from '@/components/BookEditorPanel';

interface Chapter {
  id: number;
  title: string;
  content: string;
  summary?: string;
  imageUrl?: string;
}

interface Book {
  title: string;
  genre?: string;
  chapters: Chapter[];
}

const BookPreviewPage = () => {
  const navigate = useNavigate();
  const [book, setBook] = useState<Book | null>(null);
  const [activeChapter, setActiveChapter] = useState(1);
  const [showEditor, setShowEditor] = useState(false);
  const [editingTitle, setEditingTitle] = useState('');
  const [editingChapter, setEditingChapter] = useState<Chapter | null>(null);
  const [saving, setSaving] = useState(false);
  
  useEffect(() => {
    // Retrieve stored book
    const storedBook = sessionStorage.getItem('generatedBook');
    
    if (!storedBook) {
      // Instead of redirecting to /create, generate a sample book
      const sampleBook = generateSampleBook();
      setBook(sampleBook);
      setEditingTitle(sampleBook.title);
      
      // Store the sample book
      sessionStorage.setItem('generatedBook', JSON.stringify(sampleBook));
      return;
    }
    
    const parsedBook = JSON.parse(storedBook);
    setBook(parsedBook);
    
    // Initialize editing state
    setEditingTitle(parsedBook.title);
  }, [navigate]);
  
  // New function to generate a sample book if none exists
  const generateSampleBook = (): Book => {
    const sampleChapters = Array.from({ length: 5 }, (_, i) => ({
      id: i + 1,
      title: `Chapter ${i + 1}: ${getSampleChapterTitle(i)}`,
      content: getSampleChapterContent(),
      summary: `A brief summary of chapter ${i + 1}`,
      imageUrl: `https://source.unsplash.com/random/300x200?book&sig=${i}`
    }));
    
    return {
      title: "Your Amazing Book",
      genre: "Fiction",
      chapters: sampleChapters
    };
  };
  
  // Sample chapter title generator
  const getSampleChapterTitle = (index: number) => {
    const titles = [
      "The Beginning",
      "Unexpected Encounters",
      "Revelations",
      "The Challenge",
      "A New Direction"
    ];
    return titles[index % titles.length];
  };
  
  // Sample chapter content generator
  const getSampleChapterContent = () => {
    return `Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.

Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.

Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo.`;
  };
  
  const handleDownload = () => {
    // Store book data for the success page
    if (book) {
      sessionStorage.setItem('generatedBook', JSON.stringify(book));
      toast.success("Preparing your book download...");
      setTimeout(() => {
        navigate('/success');
      }, 800);
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
  
  const startEditingChapter = (chapter: Chapter) => {
    setEditingChapter({...chapter});
  };
  
  const cancelEditing = () => {
    setEditingChapter(null);
  };
  
  const saveEdits = (updatedChapter: Chapter) => {
    if (!book) return;
    
    setSaving(true);
    
    // Update the book with edited title and chapter
    const updatedBook = {
      ...book,
      title: editingTitle,
      chapters: book.chapters.map(ch => 
        ch.id === updatedChapter.id ? updatedChapter : ch
      )
    };
    
    // Simulate saving delay
    setTimeout(() => {
      setBook(updatedBook);
      setEditingChapter(null);
      
      // Update in session storage
      sessionStorage.setItem('generatedBook', JSON.stringify(updatedBook));
      
      setSaving(false);
      toast.success("Changes applied. Ready to download!");
    }, 800);
  };
  
  const saveBookChanges = () => {
    if (!book) return;
    
    const updatedBook = {...book, title: editingTitle};
    setBook(updatedBook);
    sessionStorage.setItem('generatedBook', JSON.stringify(updatedBook));
    toast.success("Book title updated!");
  };
  
  const returnToEditor = () => {
    // Redirect to create page instead of editor
    navigate('/create');
  };
  
  // Get format and size from session storage
  const bookDetails = sessionStorage.getItem('bookDetails');
  const format = bookDetails ? JSON.parse(bookDetails).format?.toUpperCase() || 'PDF' : 'PDF';
  const pageSize = bookDetails ? JSON.parse(bookDetails).pageSize?.toUpperCase() || 'A4' : 'A4';
  
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
  
  const activeChapterData = book.chapters.find(chapter => chapter.id === activeChapter);
  
  return (
    <div className="min-h-screen flex flex-col">
      <Navigation />
      
      <main className="flex-grow py-12">
        <div className="container px-4 md:px-6">
          <div className="text-center mb-6 animate-fade-in">
            <h1 className="text-3xl md:text-4xl font-bold mb-2">Book Preview</h1>
            <p className="text-muted-foreground">
              Here's how your book will look in {format} and {pageSize}.
            </p>
          </div>
          
          <div className="flex flex-wrap justify-center gap-4 mb-8">
            <Button 
              variant="outline" 
              onClick={() => setShowEditor(!showEditor)}
              className="flex items-center gap-2"
            >
              <Edit className="h-4 w-4" />
              {showEditor ? "Hide Editor" : "Edit This Book"}
            </Button>
            
            <Button 
              variant="outline"
              onClick={returnToEditor}
              className="flex items-center gap-2"
            >
              <ChevronLeft className="h-4 w-4" />
              Back to Create Page
            </Button>
            
            <Button 
              className="flex items-center gap-2"
              onClick={handleDownload}
            >
              <Download className="h-4 w-4" />
              Download in {format}
            </Button>
          </div>
          
          {/* Collapsible Editor Panel */}
          <Collapsible 
            open={showEditor} 
            onOpenChange={setShowEditor}
            className="mb-8"
          >
            <CollapsibleContent>
              <BookEditorPanel
                book={book}
                editingTitle={editingTitle}
                setEditingTitle={setEditingTitle}
                onStartEditingChapter={startEditingChapter}
                onSaveBookChanges={saveBookChanges}
              />
            </CollapsibleContent>
          </Collapsible>
          
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Sidebar */}
            <BookPreviewSidebar
              title={book.title}
              genre={book.genre}
              chapters={book.chapters}
              activeChapter={activeChapter}
              onChapterClick={setActiveChapter}
              format={format}
              onDownload={handleDownload}
            />
            
            {/* Main Content */}
            <div className="lg:col-span-2">
              {activeChapterData && (
                <ChapterContentDisplay
                  chapter={activeChapterData}
                  totalChapters={book.chapters.length}
                  onNavigate={navigateChapter}
                  onEdit={startEditingChapter}
                />
              )}
              
              <div className="lg:hidden mb-6">
                <TableOfContents 
                  chapters={book.chapters.map(chapter => ({ id: chapter.id, title: chapter.title }))}
                  activeChapter={activeChapter}
                  onChapterClick={setActiveChapter}
                />
              </div>
              
              <OtherChaptersPreview
                chapters={book.chapters}
                activeChapter={activeChapter}
                onChapterClick={setActiveChapter}
              />
            </div>
          </div>
        </div>
      </main>
      
      {/* Chapter Editing Modal */}
      {editingChapter && (
        <ChapterEditorModal
          chapter={editingChapter}
          onCancel={cancelEditing}
          onSave={saveEdits}
          saving={saving}
        />
      )}
      
      <Footer />
    </div>
  );
};

export default BookPreviewPage;
