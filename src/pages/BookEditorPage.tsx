
import { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { BookOpen, ChevronDown, ChevronUp, Image, Pencil, Save, Eye, Plus, RefreshCw, Bookmark, LayoutGrid } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent } from '@/components/ui/card';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '@/components/ui/collapsible';
import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';
import { toast } from 'sonner';

interface Chapter {
  id: number;
  title: string;
  content: string;
  imageUrl?: string;
  imagePrompt?: string;
  expanded: boolean;
}

interface SavedBook {
  id: string;
  title: string;
  chapters: Chapter[];
  enableImages: boolean;
  lastEdited: string;
}

const BookEditorPage = () => {
  const navigate = useNavigate();
  const [bookTitle, setBookTitle] = useState("Your Amazing Book");
  const [chapters, setChapters] = useState<Chapter[]>([]);
  const [enableImages, setEnableImages] = useState(true);
  const [loading, setLoading] = useState(true);
  const [imagePrompt, setImagePrompt] = useState("");
  const [selectedChapterId, setSelectedChapterId] = useState<number | null>(null);
  const [generatingImage, setGeneratingImage] = useState(false);
  const [showImagePromptDialog, setShowImagePromptDialog] = useState(false);
  const [showLayoutPreview, setShowLayoutPreview] = useState(false);
  const [savingDraft, setSavingDraft] = useState(false);
  const chapterRefs = useRef<Record<number, HTMLDivElement | null>>({});
  
  useEffect(() => {
    // Retrieve stored book details
    const storedDetails = sessionStorage.getItem('bookDetails');
    if (!storedDetails) {
      navigate('/create');
      return;
    }
    
    const { enableImages } = JSON.parse(storedDetails);
    setEnableImages(enableImages);
    
    // Check for drafts in local storage
    const savedDraft = localStorage.getItem('bookDraft');
    if (savedDraft) {
      try {
        const { title, chapters: savedChapters } = JSON.parse(savedDraft);
        setBookTitle(title);
        setChapters(savedChapters);
        toast.info("Loaded your most recent draft");
        setLoading(false);
        return;
      } catch (e) {
        console.error("Error loading draft:", e);
      }
    }
    
    // For demo purposes, generate sample chapters
    const sampleChapters = Array.from({ length: 5 }, (_, i) => ({
      id: i + 1,
      title: `Chapter ${i + 1}: ${getSampleChapterTitle(i)}`,
      content: getSampleChapterContent(),
      imageUrl: enableImages ? `https://source.unsplash.com/random/300x200?book&sig=${i}` : undefined,
      imagePrompt: "A beautiful illustration related to this chapter's theme",
      expanded: i === 0 // First chapter expanded by default
    }));
    
    setChapters(sampleChapters);
    setLoading(false);
  }, [navigate]);
  
  const scrollToChapter = (id: number) => {
    const element = chapterRefs.current[id];
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };
  
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
  
  const updateChapterImagePrompt = (id: number, newPrompt: string) => {
    setChapters(chapters.map(chapter => 
      chapter.id === id ? { ...chapter, imagePrompt: newPrompt } : chapter
    ));
  };
  
  const openImagePromptDialog = (id: number) => {
    const chapter = chapters.find(c => c.id === id);
    if (chapter) {
      setImagePrompt(chapter.imagePrompt || "");
      setSelectedChapterId(id);
      setShowImagePromptDialog(true);
    }
  };
  
  const generateImageWithPrompt = () => {
    if (!selectedChapterId) return;
    
    setGeneratingImage(true);
    toast.info("Generating image with your custom prompt...");
    
    // Save the prompt first
    updateChapterImagePrompt(selectedChapterId, imagePrompt);
    
    // In a real app, this would call an AI image generation API with the prompt
    setTimeout(() => {
      setChapters(chapters.map(chapter => 
        chapter.id === selectedChapterId ? { 
          ...chapter, 
          imageUrl: `https://source.unsplash.com/random/300x200?${encodeURIComponent(imagePrompt)}&sig=${chapter.id}-${Date.now()}` 
        } : chapter
      ));
      setGeneratingImage(false);
      setShowImagePromptDialog(false);
      toast.success("Image generated successfully!");
    }, 2000);
  };
  
  const regenerateImage = (id: number) => {
    const chapter = chapters.find(c => c.id === id);
    if (!chapter) return;
    
    toast.info("Regenerating image...");
    // In a real app, this would call an API to regenerate the image
    setTimeout(() => {
      setChapters(chapters.map(chapter => 
        chapter.id === id ? { 
          ...chapter, 
          imageUrl: `https://source.unsplash.com/random/300x200?${encodeURIComponent(chapter.imagePrompt || "book")}&sig=${id}-${Date.now()}` 
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
        imageUrl: `https://source.unsplash.com/random/300x200?${encodeURIComponent(chapter.imagePrompt || "book")}&sig=${chapter.id}-${Date.now()}` 
      })));
      toast.success("All images generated!");
    }, 2000);
  };
  
  const addNewChapter = () => {
    const newId = chapters.length > 0 ? Math.max(...chapters.map(c => c.id)) + 1 : 1;
    const newChapter: Chapter = {
      id: newId,
      title: `Chapter ${newId}: New Chapter`,
      content: "Write your chapter content here...",
      imagePrompt: "A beautiful illustration related to this chapter's theme",
      expanded: true,
    };
    
    setChapters([...chapters, newChapter]);
    
    // Scroll to the new chapter after the state update
    setTimeout(() => scrollToChapter(newId), 100);
  };
  
  const saveDraft = () => {
    setSavingDraft(true);
    
    try {
      const draft = {
        id: Date.now().toString(),
        title: bookTitle,
        chapters,
        enableImages,
        lastEdited: new Date().toISOString()
      };
      
      localStorage.setItem('bookDraft', JSON.stringify(draft));
      
      setTimeout(() => {
        setSavingDraft(false);
        toast.success("Draft saved successfully!");
      }, 800);
    } catch (e) {
      console.error("Error saving draft:", e);
      setSavingDraft(false);
      toast.error("Failed to save draft. Please try again.");
    }
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
              <Button 
                variant="outline"
                onClick={saveDraft}
                disabled={savingDraft}
                className="flex items-center gap-2"
              >
                {savingDraft ? (
                  <>
                    <Bookmark className="h-4 w-4 animate-pulse" />
                    Saving...
                  </>
                ) : (
                  <>
                    <Bookmark className="h-4 w-4" />
                    Save Draft
                  </>
                )}
              </Button>
              
              <Button 
                variant="outline"
                onClick={() => setShowLayoutPreview(!showLayoutPreview)}
                className={`flex items-center gap-2 ${showLayoutPreview ? 'bg-accent text-accent-foreground' : ''}`}
              >
                <LayoutGrid className="h-4 w-4" />
                {showLayoutPreview ? 'Hide Preview' : 'Show Preview'}
              </Button>
              
              {enableImages && (
                <Button 
                  variant="outline" 
                  onClick={generateAllImages}
                  className="flex items-center gap-2"
                >
                  <RefreshCw className="h-4 w-4" />
                  Regenerate All Images
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
                  <ScrollArea className="h-[calc(100vh-300px)]">
                    <ul className="space-y-1">
                      {chapters.map((chapter) => (
                        <li key={chapter.id}>
                          <button
                            className={`w-full text-left px-3 py-2 rounded-lg flex items-center text-sm transition-colors ${
                              chapter.expanded
                                ? "bg-purple text-white font-medium"
                                : "hover:bg-accent"
                            }`}
                            onClick={() => {
                              toggleChapter(chapter.id);
                              scrollToChapter(chapter.id);
                            }}
                          >
                            <ChevronDown className={`h-4 w-4 mr-2 ${
                              chapter.expanded ? "text-white" : "text-purple"
                            }`} />
                            <span>Chapter {chapter.id}</span>
                          </button>
                        </li>
                      ))}
                    </ul>
                  </ScrollArea>
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
                <Card 
                  key={chapter.id} 
                  className="overflow-hidden animate-fade-in transition-all"
                  ref={(el) => chapterRefs.current[chapter.id] = el}
                >
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
                    <Button variant="ghost" size="sm" onClick={(e) => {
                      e.stopPropagation();
                      toggleChapter(chapter.id);
                    }}>
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
                              <div className="flex gap-2">
                                <Button 
                                  variant="ghost" 
                                  size="sm"
                                  onClick={() => openImagePromptDialog(chapter.id)}
                                >
                                  <Pencil className="h-4 w-4 mr-2" />
                                  Edit Prompt
                                </Button>
                                <Button 
                                  variant="ghost" 
                                  size="sm"
                                  onClick={() => regenerateImage(chapter.id)}
                                >
                                  <RefreshCw className="h-4 w-4 mr-2" />
                                  Regenerate
                                </Button>
                              </div>
                            </div>
                            <div className="relative group overflow-hidden rounded-lg">
                              {chapter.imageUrl ? (
                                <img 
                                  src={chapter.imageUrl} 
                                  alt={`Chapter ${chapter.id}`} 
                                  className="w-full h-48 object-cover transition-transform group-hover:scale-105"
                                />
                              ) : (
                                <div className="w-full h-48 bg-accent/30 flex items-center justify-center">
                                  <Button onClick={() => openImagePromptDialog(chapter.id)}>
                                    <Image className="h-4 w-4 mr-2" />
                                    Create Image
                                  </Button>
                                </div>
                              )}
                              <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex items-end">
                                <div className="p-4 w-full">
                                  <Button
                                    size="sm"
                                    variant="outline"
                                    className="bg-white/20 backdrop-blur-sm border-white/40 text-white w-full"
                                    onClick={() => openImagePromptDialog(chapter.id)}
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
                        
                        {showLayoutPreview && (
                          <div className="mt-4 p-4 border rounded-lg bg-white/50">
                            <h4 className="text-sm font-medium mb-2">Layout Preview</h4>
                            <div className="prose prose-sm max-w-none">
                              <h2>{chapter.title}</h2>
                              {chapter.imageUrl && (
                                <img 
                                  src={chapter.imageUrl} 
                                  alt={chapter.title}
                                  className="w-full max-h-40 object-cover rounded my-2"
                                />
                              )}
                              {chapter.content.split('\n\n').map((paragraph, idx) => (
                                <p key={idx}>{paragraph}</p>
                              ))}
                            </div>
                          </div>
                        )}
                      </div>
                    </CardContent>
                  )}
                </Card>
              ))}
              
              <div className="flex justify-center pt-4">
                <Button 
                  variant="outline" 
                  className="w-full max-w-md flex items-center gap-2 hover:scale-105 transition-transform"
                  onClick={addNewChapter}
                >
                  <Plus className="h-4 w-4" />
                  Add New Chapter
                </Button>
              </div>
            </div>
          </div>
        </div>
      </main>
      
      {/* Image Prompt Dialog */}
      {showImagePromptDialog && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50 animate-fade-in">
          <div className="bg-white rounded-xl w-full max-w-lg p-6 space-y-4">
            <h3 className="text-xl font-semibold">Customize Image Prompt</h3>
            <p className="text-sm text-muted-foreground">
              Describe the image you'd like to generate for this chapter.
              Be specific about style, subjects, mood, and colors.
            </p>
            
            <Textarea
              value={imagePrompt}
              onChange={(e) => setImagePrompt(e.target.value)}
              className="min-h-[150px]"
              placeholder="Example: A whimsical watercolor painting of a small cottage in a forest clearing, morning sunlight filtering through tall trees, mist rising from the ground, in the style of Studio Ghibli"
            />
            
            <div className="flex justify-end gap-2 pt-2">
              <Button 
                variant="outline" 
                onClick={() => setShowImagePromptDialog(false)}
              >
                Cancel
              </Button>
              <Button 
                disabled={!imagePrompt.trim() || generatingImage}
                onClick={generateImageWithPrompt}
              >
                {generatingImage ? (
                  <>
                    <RefreshCw className="h-4 w-4 mr-2 animate-spin" />
                    Generating...
                  </>
                ) : (
                  <>
                    <Image className="h-4 w-4 mr-2" />
                    Generate Image
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
