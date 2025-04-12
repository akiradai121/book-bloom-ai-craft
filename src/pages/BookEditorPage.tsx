
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { BookOpen, ChevronDown, ChevronUp, Image, Pencil, Save, Eye } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent } from '@/components/ui/card';
import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';
import { toast } from 'sonner';

interface Chapter {
  id: number;
  title: string;
  content: string;
  imageUrl?: string;
  expanded: boolean;
}

const BookEditorPage = () => {
  const navigate = useNavigate();
  const [bookTitle, setBookTitle] = useState("Your Amazing Book");
  const [chapters, setChapters] = useState<Chapter[]>([]);
  const [enableImages, setEnableImages] = useState(true);
  const [loading, setLoading] = useState(true);
  
  useEffect(() => {
    // Retrieve stored book details
    const storedDetails = sessionStorage.getItem('bookDetails');
    if (!storedDetails) {
      navigate('/create');
      return;
    }
    
    const { enableImages } = JSON.parse(storedDetails);
    setEnableImages(enableImages);
    
    // For demo purposes, generate sample chapters
    const sampleChapters = Array.from({ length: 5 }, (_, i) => ({
      id: i + 1,
      title: `Chapter ${i + 1}: ${getSampleChapterTitle(i)}`,
      content: getSampleChapterContent(),
      imageUrl: enableImages ? `https://source.unsplash.com/random/300x200?book&sig=${i}` : undefined,
      expanded: i === 0 // First chapter expanded by default
    }));
    
    setChapters(sampleChapters);
    setLoading(false);
  }, [navigate]);
  
  const toggleChapter = (id: number) => {
    setChapters(chapters.map(chapter => 
      chapter.id === id ? { ...chapter, expanded: !chapter.expanded } : chapter
    ));
  };
  
  const updateChapterTitle = (id: number, newTitle: string) => {
    setChapters(chapters.map(chapter => 
      chapter.id === id ? { ...chapter, title: newTitle } : chapter
    ));
  };
  
  const updateChapterContent = (id: number, newContent: string) => {
    setChapters(chapters.map(chapter => 
      chapter.id === id ? { ...chapter, content: newContent } : chapter
    ));
  };
  
  const regenerateImage = (id: number) => {
    toast.info("Regenerating image...");
    // In a real app, this would call an API to regenerate the image
    setTimeout(() => {
      setChapters(chapters.map(chapter => 
        chapter.id === id ? { 
          ...chapter, 
          imageUrl: `https://source.unsplash.com/random/300x200?book&sig=${id}-${Date.now()}` 
        } : chapter
      ));
      toast.success("Image regenerated!");
    }, 1500);
  };
  
  const generateAllImages = () => {
    toast.info("Generating all images...");
    // In a real app, this would call an API to generate all images
    setTimeout(() => {
      setChapters(chapters.map(chapter => ({ 
        ...chapter, 
        imageUrl: `https://source.unsplash.com/random/300x200?book&sig=${chapter.id}-${Date.now()}` 
      })));
      toast.success("All images generated!");
    }, 2000);
  };
  
  const previewBook = () => {
    // Store chapters for preview
    sessionStorage.setItem('generatedBook', JSON.stringify({
      title: bookTitle,
      chapters: chapters.map(({ id, title, content, imageUrl }) => ({ id, title, content, imageUrl }))
    }));
    navigate('/preview');
  };
  
  if (loading) {
    return (
      <div className="min-h-screen flex flex-col">
        <Navigation />
        <main className="flex-grow flex items-center justify-center">
          <p>Loading editor...</p>
        </main>
      </div>
    );
  }
  
  return (
    <div className="min-h-screen flex flex-col">
      <Navigation />
      
      <main className="flex-grow py-8">
        <div className="container px-4 md:px-6">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-8 gap-4">
            <div>
              <label htmlFor="book-title" className="sr-only">Book Title</label>
              <Input
                id="book-title"
                value={bookTitle}
                onChange={(e) => setBookTitle(e.target.value)}
                className="text-2xl md:text-3xl font-bold border-0 p-0 focus-visible:ring-0 focus:border-b-2 focus:rounded-none focus:border-purple/50 bg-transparent"
                placeholder="Enter your book title"
              />
            </div>
            
            <div className="flex flex-wrap gap-2">
              {enableImages && (
                <Button 
                  variant="outline" 
                  onClick={generateAllImages}
                  className="flex items-center gap-2"
                >
                  <Image className="h-4 w-4" />
                  Generate All Images
                </Button>
              )}
              
              <Button 
                onClick={previewBook}
                className="flex items-center gap-2"
              >
                <Eye className="h-4 w-4" />
                Preview Book
              </Button>
            </div>
          </div>
          
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
            {/* Table of Contents Sidebar */}
            <div className="lg:col-span-1 order-2 lg:order-1">
              <div className="sticky top-20">
                <div className="bg-accent/50 rounded-xl p-4 mb-6">
                  <h3 className="font-medium mb-3">Table of Contents</h3>
                  <ul className="space-y-1">
                    {chapters.map((chapter) => (
                      <li key={chapter.id}>
                        <button
                          className={`w-full text-left px-3 py-2 rounded-lg flex items-center text-sm transition-colors ${
                            chapter.expanded
                              ? "bg-purple text-white font-medium"
                              : "hover:bg-accent"
                          }`}
                          onClick={() => toggleChapter(chapter.id)}
                        >
                          <ChevronDown className={`h-4 w-4 mr-2 ${
                            chapter.expanded ? "text-white" : "text-purple"
                          }`} />
                          <span>Chapter {chapter.id}</span>
                        </button>
                      </li>
                    ))}
                  </ul>
                </div>
                
                <div className="bg-accent/50 rounded-xl p-4">
                  <h3 className="font-medium mb-3">Book Details</h3>
                  <div className="text-sm text-muted-foreground">
                    <p>Chapters: {chapters.length}</p>
                    <p>Images: {enableImages ? 'Enabled' : 'Disabled'}</p>
                    <p>Words: ~{chapters.reduce((acc, chapter) => acc + chapter.content.split(' ').length, 0)}</p>
                  </div>
                </div>
              </div>
            </div>
            
            {/* Chapter Editor */}
            <div className="lg:col-span-3 order-1 lg:order-2 space-y-6">
              {chapters.map((chapter) => (
                <Card key={chapter.id} className="overflow-hidden">
                  <div 
                    className={`border-b p-4 flex justify-between items-center cursor-pointer bg-card hover:bg-accent/20 transition-colors`}
                    onClick={() => toggleChapter(chapter.id)}
                  >
                    <Input
                      value={chapter.title}
                      onChange={(e) => updateChapterTitle(chapter.id, e.target.value)}
                      className="font-medium border-0 p-0 focus-visible:ring-0 bg-transparent flex-grow"
                      placeholder={`Chapter ${chapter.id} Title`}
                      onClick={(e) => e.stopPropagation()}
                    />
                    <Button variant="ghost" size="sm" onClick={() => toggleChapter(chapter.id)}>
                      {chapter.expanded ? (
                        <ChevronUp className="h-4 w-4" />
                      ) : (
                        <ChevronDown className="h-4 w-4" />
                      )}
                    </Button>
                  </div>
                  
                  {chapter.expanded && (
                    <CardContent className="p-0">
                      <div className="p-4 space-y-4">
                        {enableImages && (
                          <div className="space-y-2">
                            <div className="flex justify-between items-center">
                              <h4 className="text-sm font-medium">Chapter Image</h4>
                              <Button 
                                variant="ghost" 
                                size="sm"
                                onClick={() => regenerateImage(chapter.id)}
                              >
                                <Image className="h-4 w-4 mr-2" />
                                Regenerate
                              </Button>
                            </div>
                            <div className="relative group overflow-hidden rounded-lg">
                              <img 
                                src={chapter.imageUrl} 
                                alt={`Chapter ${chapter.id}`} 
                                className="w-full h-48 object-cover transition-transform group-hover:scale-105"
                              />
                              <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex items-end">
                                <div className="p-4 w-full">
                                  <Button
                                    size="sm"
                                    variant="outline"
                                    className="bg-white/20 backdrop-blur-sm border-white/40 text-white w-full"
                                  >
                                    <Pencil className="h-3 w-3 mr-2" />
                                    Edit Image Prompt
                                  </Button>
                                </div>
                              </div>
                            </div>
                          </div>
                        )}
                        
                        <div>
                          <h4 className="text-sm font-medium mb-2">Chapter Content</h4>
                          <Textarea
                            value={chapter.content}
                            onChange={(e) => updateChapterContent(chapter.id, e.target.value)}
                            className="min-h-[200px] resize-y"
                            placeholder="Write your chapter content here..."
                          />
                        </div>
                      </div>
                    </CardContent>
                  )}
                </Card>
              ))}
              
              <div className="flex justify-center pt-4">
                <Button variant="outline" className="w-full max-w-md">
                  + Add New Chapter
                </Button>
              </div>
            </div>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

// Helper functions for sample content
function getSampleChapterTitle(index: number) {
  const titles = [
    "The Beginning",
    "Unexpected Encounters",
    "Revelations",
    "The Challenge",
    "A New Direction",
    "Mysteries Unfold",
    "The Confrontation",
    "Finding the Way",
    "The Final Test"
  ];
  return titles[index % titles.length];
}

function getSampleChapterContent() {
  return `Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.

Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.

Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo.`;
}

export default BookEditorPage;
