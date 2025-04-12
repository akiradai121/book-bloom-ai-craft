
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { BookText, ImageIcon, Sparkles, Toggle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import { Switch } from '@/components/ui/switch';
import { toast } from 'sonner';

const BookCreationForm = () => {
  const navigate = useNavigate();
  const [bookIdea, setBookIdea] = useState('');
  const [genre, setGenre] = useState('');
  const [imageStyle, setImageStyle] = useState('');
  const [enableImages, setEnableImages] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!bookIdea.trim()) {
      toast.error("Please enter your book idea");
      return;
    }
    
    if (!genre) {
      toast.error("Please select a genre");
      return;
    }
    
    if (enableImages && !imageStyle) {
      toast.error("Please select an image style or disable images");
      return;
    }
    
    setIsSubmitting(true);
    
    // Store form data in session storage
    sessionStorage.setItem('bookDetails', JSON.stringify({
      bookIdea,
      genre,
      imageStyle,
      enableImages
    }));
    
    // Navigate to the generating page after a short delay
    setTimeout(() => {
      navigate('/generating');
    }, 800);
  };
  
  return (
    <form onSubmit={handleSubmit} className="space-y-8 animate-fade-in">
      <div className="space-y-2">
        <label htmlFor="bookIdea" className="text-sm font-medium flex items-center gap-2">
          <BookText className="h-4 w-4 text-purple" />
          Book Idea
        </label>
        <Textarea
          id="bookIdea"
          placeholder="Describe your book idea in detail... The more specific you are, the better the result!"
          className="resize-none input-field min-h-[180px] transition-all focus:shadow-md"
          value={bookIdea}
          onChange={(e) => setBookIdea(e.target.value)}
        />
        <p className="text-xs text-muted-foreground">
          Be descriptive with characters, setting, plot, and themes for best results.
        </p>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="space-y-2">
          <label htmlFor="genre" className="text-sm font-medium flex items-center gap-2">
            <BookText className="h-4 w-4 text-purple" />
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
              <SelectItem value="historical">Historical Fiction</SelectItem>
              <SelectItem value="young-adult">Young Adult</SelectItem>
              <SelectItem value="children">Children's</SelectItem>
              <SelectItem value="non-fiction">Non-Fiction</SelectItem>
              <SelectItem value="biography">Biography</SelectItem>
              <SelectItem value="poetry">Poetry</SelectItem>
            </SelectContent>
          </Select>
        </div>
        
        <div className={`space-y-2 ${!enableImages ? 'opacity-50' : ''}`}>
          <label htmlFor="imageStyle" className="text-sm font-medium flex items-center gap-2">
            <ImageIcon className="h-4 w-4 text-purple" />
            Image Style
          </label>
          <Select 
            value={imageStyle} 
            onValueChange={setImageStyle}
            disabled={!enableImages}
          >
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
              <SelectItem value="pixel-art">Pixel Art</SelectItem>
              <SelectItem value="oil-painting">Oil Painting</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>
      
      <div className="flex items-center space-x-2 pt-2">
        <Switch 
          id="enable-images" 
          checked={enableImages}
          onCheckedChange={setEnableImages}
        />
        <label 
          htmlFor="enable-images" 
          className="text-sm font-medium cursor-pointer flex items-center gap-2"
        >
          <Toggle className="h-4 w-4 text-purple" />
          Enable Image Generation
        </label>
      </div>
      
      <div className="pt-6">
        <Button 
          type="submit" 
          className="w-full btn-primary h-14 text-lg group"
          disabled={isSubmitting}
        >
          {isSubmitting ? (
            <span className="flex items-center gap-2">
              <Sparkles className="h-5 w-5 animate-spin" />
              Submitting...
            </span>
          ) : (
            <span className="flex items-center gap-2">
              <Sparkles className="h-5 w-5 group-hover:animate-bounce-gentle" />
              Generate Book
            </span>
          )}
        </Button>
      </div>
    </form>
  );
};

export default BookCreationForm;
