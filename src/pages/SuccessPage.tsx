
import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Download, Check, Share2, Eye, RefreshCw, Edit } from 'lucide-react';
import { Button } from '@/components/ui/button';
import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';
import BookCover from '@/components/BookCover';
import { toast } from 'sonner';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';

const SuccessPage = () => {
  const navigate = useNavigate();
  const [book, setBook] = useState<any>(null);
  const [isAnimating, setIsAnimating] = useState(true);
  
  useEffect(() => {
    const storedBook = sessionStorage.getItem('generatedBook');
    if (!storedBook) {
      navigate('/create');
      return;
    }
    
    setBook(JSON.parse(storedBook));
    
    // Animation timing
    const timer = setTimeout(() => {
      setIsAnimating(false);
    }, 1000);
    
    return () => clearTimeout(timer);
  }, [navigate]);
  
  const handleDownload = () => {
    toast.success("Download started!");
    
    // Simulate download delay
    setTimeout(() => {
      toast.success("Your book has been downloaded successfully!");
    }, 1500);
  };
  
  const handleShare = () => {
    toast.success("Share link copied to clipboard!");
  };
  
  const handleViewPreview = () => {
    navigate('/preview');
  };
  
  const handleEditBook = () => {
    navigate('/editor');
  };
  
  const handleRegenerateImages = () => {
    toast.info("Regenerating all images...");
    setTimeout(() => {
      toast.success("All images have been regenerated!");
    }, 1500);
  };
  
  if (!book) {
    return (
      <div className="min-h-screen flex flex-col">
        <Navigation />
        <main className="flex-grow flex items-center justify-center">
          <p>Loading...</p>
        </main>
      </div>
    );
  }
  
  // Get format and size from session storage
  const bookDetails = sessionStorage.getItem('bookDetails');
  const format = bookDetails ? JSON.parse(bookDetails).format?.toUpperCase() || 'PDF' : 'PDF';
  const pageSize = bookDetails ? JSON.parse(bookDetails).pageSize?.toUpperCase() || 'A4' : 'A4';
  
  return (
    <div className="min-h-screen flex flex-col">
      <Navigation />
      
      <main className="flex-grow py-16">
        <div className="container px-4 md:px-6 max-w-4xl mx-auto">
          <div className={`bg-white rounded-2xl shadow-xl p-8 md:p-12 text-center transition-all duration-500 ${
            isAnimating ? 'opacity-0 scale-95' : 'opacity-100 scale-100'
          }`}>
            <div className="mb-6">
              <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
                <Check className="h-10 w-10 text-green-600" />
              </div>
              
              <h1 className="text-3xl md:text-4xl font-bold mb-4">Your Book is Ready!</h1>
              <p className="text-muted-foreground max-w-md mx-auto">
                Your book has been generated in your selected format and size. What would you like to do next?
              </p>
              
              <p className="text-sm text-muted-foreground mt-2">
                Format: <span className="font-medium">{format}</span> | Size: <span className="font-medium">{pageSize}</span>
              </p>
            </div>
            
            <div className="py-8 flex flex-col md:flex-row items-center justify-center gap-10">
              <BookCover 
                title={book.title}
                genre={book.genre}
                size="lg"
                className="animate-fade-in"
              />
              
              <div className="space-y-4">
                <h2 className="text-2xl font-semibold">{book.title}</h2>
                <p className="text-sm text-muted-foreground mb-6">
                  {book.chapters.length} chapters • {book.genre}
                </p>
                
                <TooltipProvider>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <Button 
                        className="w-full btn-primary"
                        size="lg"
                        onClick={handleDownload}
                      >
                        <Download className="mr-2 h-5 w-5" />
                        Download in {format}
                      </Button>
                    </TooltipTrigger>
                    <TooltipContent>
                      <p>Download your completed book in the selected format.</p>
                    </TooltipContent>
                  </Tooltip>
                </TooltipProvider>
                
                <TooltipProvider>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <Button 
                        variant="outline"
                        className="w-full"
                        onClick={handleViewPreview}
                      >
                        <Eye className="mr-2 h-4 w-4" />
                        View Book Preview
                      </Button>
                    </TooltipTrigger>
                    <TooltipContent>
                      <p>See what your book will look like before downloading.</p>
                    </TooltipContent>
                  </Tooltip>
                </TooltipProvider>
                
                <Button 
                  variant="outline"
                  className="w-full"
                  onClick={handleEditBook}
                >
                  <Edit className="mr-2 h-4 w-4" />
                  Make Changes to This Book
                </Button>
                
                {bookDetails && JSON.parse(bookDetails).enableImages && (
                  <Button 
                    variant="outline"
                    className="w-full"
                    onClick={handleRegenerateImages}
                  >
                    <RefreshCw className="mr-2 h-4 w-4" />
                    Regenerate All Images
                  </Button>
                )}
              </div>
            </div>
            
            <div className="border-t border-border pt-8 mt-8">
              <p className="text-muted-foreground mb-6">What would you like to do next?</p>
              
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link to="/create">
                  <Button variant="outline">
                    Create Another Book
                  </Button>
                </Link>
                
                <Link to="/">
                  <Button variant="secondary">
                    Back to Home
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default SuccessPage;
