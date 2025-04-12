
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Download, ChevronLeft, ChevronRight, Edit, RefreshCw, Save, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '@/components/ui/collapsible';
import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';
import TableOfContents from '@/components/TableOfContents';
import ChapterPreview from '@/components/ChapterPreview';
import BookCover from '@/components/BookCover';
import { toast } from 'sonner';

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
      navigate('/create');
      return;
    }
    
    const parsedBook = JSON.parse(storedBook);
    setBook(parsedBook);
    
    // Initialize editing state
    setEditingTitle(parsedBook.title);
  }, [navigate]);
  
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
  
  const saveEdits = () => {
    if (!book || !editingChapter) return;
    
    setSaving(true);
    
    // Update the book with edited title and chapter (if edited)
    const updatedBook = {
      ...book,
      title: editingTitle,
      chapters: book.chapters.map(ch => 
        ch.id === editingChapter.id ? editingChapter : ch
      )
    };
    
    // Simulate saving delay
    setTimeout(() => {
      setBook(updatedBook);
      setEditingChapter(null);
      
      // Update in session storage
      sessionStorage.setItem('generatedBook', JSON.stringify(updatedBook));
      
      setSaving(false);
      toast.success("Changes saved successfully");
    }, 800);
  };
  
  const returnToEditor = () => {
    // Update the session storage with latest changes
    if (book) {
      sessionStorage.setItem('generatedBook', JSON.stringify(book));
    }
    navigate('/editor');
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
  
  const activeChapterData = book.chapters.find(chapter => chapter.id === activeChapter);
  
  return (
    <div className="min-h-screen flex flex-col">
      <Navigation />
      
      <main className="flex-grow py-12">
        <div className="container px-4 md:px-6">
          <div className="text-center mb-6 animate-fade-in">
            <h1 className="text-3xl md:text-4xl font-bold mb-2">{book.title}</h1>
            <p className="text-muted-foreground">
              Preview your generated book and make final adjustments before downloading.
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
              Return to Book Editor
            </Button>
            
            <Button 
              className="flex items-center gap-2"
              onClick={handleDownload}
            >
              <Download className="h-4 w-4" />
              Download as PDF
            </Button>
          </div>
          
          {/* Collapsible Editor Panel */}
          <Collapsible 
            open={showEditor} 
            onOpenChange={setShowEditor}
            className="mb-8"
          >
            <CollapsibleContent className="bg-accent/30 rounded-xl p-6 space-y-6 animate-accordion-down">
              <div className="space-y-4">
                <h2 className="text-xl font-semibold">Quick Edits</h2>
                
                <div>
                  <label htmlFor="book-title-edit" className="block text-sm font-medium mb-1">
                    Book Title
                  </label>
                  <Input
                    id="book-title-edit"
                    value={editingTitle}
                    onChange={e => setEditingTitle(e.target.value)}
                    className="w-full"
                    placeholder="Enter book title"
                  />
                </div>
                
                <div>
                  <h3 className="text-sm font-medium mb-2">Chapter Quick Edit</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {book.chapters.map(chapter => (
                      <div 
                        key={chapter.id}
                        className="bg-white/50 p-3 rounded-md flex justify-between items-center"
                      >
                        <span>Chapter {chapter.id}: {chapter.title}</span>
                        <Button 
                          variant="ghost" 
                          size="sm"
                          onClick={() => startEditingChapter(chapter)}
                        >
                          <Edit className="h-3.5 w-3.5" />
                        </Button>
                      </div>
                    ))}
                  </div>
                </div>
                
                <div className="pt-2 flex justify-end">
                  <Button 
                    onClick={() => {
                      const updatedBook = {...book, title: editingTitle};
                      setBook(updatedBook);
                      sessionStorage.setItem('generatedBook', JSON.stringify(updatedBook));
                      toast.success("Title updated successfully");
                    }}
                  >
                    <Save className="h-4 w-4 mr-2" />
                    Save Changes
                  </Button>
                </div>
              </div>
            </CollapsibleContent>
          </Collapsible>
          
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Sidebar */}
            <div className="lg:col-span-1 space-y-6">
              <div className="flex flex-col items-center">
                <BookCover title={book.title} genre={book.genre} className="mb-4 shadow-lg hover:shadow-xl transition-shadow" />
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
                  chapters={book.chapters.map(chapter => ({ id: chapter.id, title: chapter.title }))}
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
                    className="hover:scale-105 transition-transform"
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
                    className="hover:scale-105 transition-transform"
                  >
                    Next
                    <ChevronRight className="h-4 w-4 ml-2" />
                  </Button>
                </div>
                
                <div className="lg:hidden mb-6">
                  <TableOfContents 
                    chapters={book.chapters.map(chapter => ({ id: chapter.id, title: chapter.title }))}
                    activeChapter={activeChapter}
                    onChapterClick={setActiveChapter}
                  />
                </div>
                
                {activeChapterData && (
                  <div className="space-y-6">
                    <h2 className="text-2xl font-semibold hover:text-purple transition-colors">
                      Chapter {activeChapterData.id}: {activeChapterData.title}
                    </h2>
                    
                    {activeChapterData.imageUrl && (
                      <img 
                        src={activeChapterData.imageUrl}
                        alt={`Chapter ${activeChapterData.id}: ${activeChapterData.title}`}
                        className="w-full h-48 object-cover rounded-lg shadow-md hover:shadow-lg transition-shadow"
                      />
                    )}
                    
                    {activeChapterData.summary && (
                      <p className="text-muted-foreground italic">
                        {activeChapterData.summary}
                      </p>
                    )}
                    
                    <div className="pt-4 space-y-4 text-muted-foreground">
                      {activeChapterData.content.split("\n\n").map((paragraph, i) => (
                        <p key={i}>{paragraph}</p>
                      ))}
                    </div>
                    
                    <div className="pt-4 flex justify-end">
                      <Button 
                        variant="outline" 
                        size="sm"
                        onClick={() => startEditingChapter(activeChapterData)}
                        className="hover:bg-purple/10 transition-colors"
                      >
                        <Edit className="h-4 w-4 mr-2" />
                        Edit This Chapter
                      </Button>
                    </div>
                  </div>
                )}
              </div>
              
              <div className="mt-8">
                <h3 className="font-medium mb-4">Other Chapters</h3>
                <div className="space-y-3">
                  {book.chapters
                    .filter(chapter => chapter.id !== activeChapter)
                    .slice(0, 3)
                    .map(chapter => (
                      <ChapterPreview 
                        key={chapter.id}
                        number={chapter.id}
                        title={chapter.title}
                        summary={chapter.summary || ''}
                        imageUrl={chapter.imageUrl}
                        onClick={() => setActiveChapter(chapter.id)}
                      />
                    ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
      
      {/* Chapter Editing Modal */}
      {editingChapter && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50 animate-fade-in">
          <div className="bg-white rounded-xl w-full max-w-2xl max-h-[80vh] overflow-y-auto p-6 space-y-4">
            <div className="flex justify-between items-center">
              <h3 className="text-xl font-semibold">Edit Chapter</h3>
              <Button variant="ghost" size="sm" onClick={cancelEditing}>
                <X className="h-4 w-4" />
              </Button>
            </div>
            
            <div className="space-y-4">
              <div>
                <label htmlFor="chapter-title" className="block text-sm font-medium mb-1">
                  Chapter Title
                </label>
                <Input
                  id="chapter-title"
                  value={editingChapter.title}
                  onChange={e => setEditingChapter({...editingChapter, title: e.target.value})}
                  className="w-full"
                  placeholder="Enter chapter title"
                />
              </div>
              
              <div>
                <label htmlFor="chapter-content" className="block text-sm font-medium mb-1">
                  Chapter Content
                </label>
                <Textarea
                  id="chapter-content"
                  value={editingChapter.content}
                  onChange={e => setEditingChapter({...editingChapter, content: e.target.value})}
                  className="w-full min-h-[300px]"
                  placeholder="Enter chapter content"
                />
              </div>
            </div>
            
            <div className="pt-4 flex justify-end gap-2">
              <Button variant="outline" onClick={cancelEditing}>
                Cancel
              </Button>
              <Button 
                onClick={saveEdits}
                disabled={saving}
              >
                {saving ? (
                  <>
                    <RefreshCw className="h-4 w-4 mr-2 animate-spin" />
                    Saving...
                  </>
                ) : (
                  <>
                    <Save className="h-4 w-4 mr-2" />
                    Save Changes
                  </>
                )}
              </Button>
            </div>
          </div>
        </div>
      )}
      
      <Footer />
    </div>
  );
};

export default BookPreviewPage;
