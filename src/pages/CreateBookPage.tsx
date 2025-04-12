
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { BookOpen, Sparkles, BookText, ImageIcon } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';
import { toast } from 'sonner';

const CreateBookPage = () => {
  const navigate = useNavigate();
  const [bookIdea, setBookIdea] = useState('');
  const [genre, setGenre] = useState('');
  const [imageStyle, setImageStyle] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!bookIdea.trim()) {
      toast.error("Please enter a book idea");
      return;
    }
    
    if (!genre) {
      toast.error("Please select a genre");
      return;
    }
    
    if (!imageStyle) {
      toast.error("Please select an image style");
      return;
    }
    
    setIsSubmitting(true);
    
    // Simulate API call
    setTimeout(() => {
      // Store form data in session storage for demo purposes
      sessionStorage.setItem('bookDetails', JSON.stringify({
        bookIdea,
        genre,
        imageStyle
      }));
      
      navigate('/generating');
    }, 1000);
  };
  
  return (
    <div className="min-h-screen flex flex-col">
      <Navigation />
      
      <main className="flex-grow py-12">
        <div className="container px-4 md:px-6 max-w-4xl mx-auto">
          <div className="text-center mb-10">
            <h1 className="text-3xl md:text-4xl font-bold mb-4">Create Your Book</h1>
            <p className="text-muted-foreground">
              Tell us about your book idea and we'll generate a complete book for you.
            </p>
          </div>
          
          <div className="card p-8">
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="space-y-2">
                <label htmlFor="bookIdea" className="text-sm font-medium flex items-center gap-2">
                  <BookText className="h-4 w-4 text-purple" />
                  Book Idea
                </label>
                <Textarea
                  id="bookIdea"
                  placeholder="Describe your book idea in detail..."
                  className="resize-none input-field min-h-[150px]"
                  value={bookIdea}
                  onChange={(e) => setBookIdea(e.target.value)}
                />
                <p className="text-xs text-muted-foreground">
                  The more details you provide, the better your book will turn out.
                </p>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label htmlFor="genre" className="text-sm font-medium flex items-center gap-2">
                    <BookOpen className="h-4 w-4 text-purple" />
                    Genre
                  </label>
                  <Select value={genre} onValueChange={setGenre}>
                    <SelectTrigger id="genre" className="input-field">
                      <SelectValue placeholder="Select a genre" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="fantasy">Fantasy</SelectItem>
                      <SelectItem value="sci-fi">Science Fiction</SelectItem>
                      <SelectItem value="mystery">Mystery</SelectItem>
                      <SelectItem value="romance">Romance</SelectItem>
                      <SelectItem value="thriller">Thriller</SelectItem>
                      <SelectItem value="horror">Horror</SelectItem>
                      <SelectItem value="historical">Historical</SelectItem>
                      <SelectItem value="children">Children's</SelectItem>
                      <SelectItem value="non-fiction">Non-Fiction</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                
                <div className="space-y-2">
                  <label htmlFor="imageStyle" className="text-sm font-medium flex items-center gap-2">
                    <ImageIcon className="h-4 w-4 text-purple" />
                    Image Style
                  </label>
                  <Select value={imageStyle} onValueChange={setImageStyle}>
                    <SelectTrigger id="imageStyle" className="input-field">
                      <SelectValue placeholder="Select an image style" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="realistic">Realistic</SelectItem>
                      <SelectItem value="cartoon">Cartoon</SelectItem>
                      <SelectItem value="watercolor">Watercolor</SelectItem>
                      <SelectItem value="3d">3D Rendered</SelectItem>
                      <SelectItem value="minimalist">Minimalist</SelectItem>
                      <SelectItem value="fantasy">Fantasy</SelectItem>
                      <SelectItem value="comic">Comic Book</SelectItem>
                      <SelectItem value="sci-fi">Sci-Fi</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
              
              <div className="pt-4">
                <Button 
                  type="submit" 
                  className="w-full btn-primary"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? (
                    <span className="flex items-center gap-2">
                      <Sparkles className="h-4 w-4 animate-spin" />
                      Submitting...
                    </span>
                  ) : (
                    <span className="flex items-center gap-2">
                      <Sparkles className="h-4 w-4" />
                      Generate Book
                    </span>
                  )}
                </Button>
              </div>
            </form>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default CreateBookPage;
