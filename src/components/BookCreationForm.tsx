
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { BookText, ImageIcon, Sparkles } from 'lucide-react';
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
import { 
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger 
} from '@/components/ui/tooltip';

const BookCreationForm = () => {
  const navigate = useNavigate();
  const [bookIdea, setBookIdea] = useState('');
  const [format, setFormat] = useState('');
  const [pageSize, setPageSize] = useState('');
  const [enableImages, setEnableImages] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!bookIdea.trim()) {
      toast.error("Please enter a prompt before generating your book");
      return;
    }
    
    if (!format) {
      toast.error("Please select a file format");
      return;
    }
    
    if (!pageSize) {
      toast.error("Please select a page size");
      return;
    }
    
    setIsSubmitting(true);
    
    // Store form data in session storage
    sessionStorage.setItem('bookDetails', JSON.stringify({
      bookIdea,
      format,
      pageSize,
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
          What's your book about?
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
        <TooltipProvider>
          <div className="space-y-2">
            <label htmlFor="format" className="text-sm font-medium flex items-center gap-2">
              <BookText className="h-4 w-4 text-purple" />
              Choose a file format:
            </label>
            <Tooltip>
              <TooltipTrigger asChild>
                <div>
                  <Select value={format} onValueChange={setFormat}>
                    <SelectTrigger id="format" className="input-field">
                      <SelectValue placeholder="Select a format" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="pdf">PDF</SelectItem>
                      <SelectItem value="epub">EPUB</SelectItem>
                      <SelectItem value="docx">DOCX</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </TooltipTrigger>
              <TooltipContent>
                <p>Pick your book's final file type. PDF works great for printing.</p>
              </TooltipContent>
            </Tooltip>
          </div>
        </TooltipProvider>
        
        <TooltipProvider>
          <div className="space-y-2">
            <label htmlFor="pageSize" className="text-sm font-medium flex items-center gap-2">
              <BookText className="h-4 w-4 text-purple" />
              Select a page size:
            </label>
            <Tooltip>
              <TooltipTrigger asChild>
                <div>
                  <Select value={pageSize} onValueChange={setPageSize}>
                    <SelectTrigger id="pageSize" className="input-field">
                      <SelectValue placeholder="Select a size" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="a4">A4</SelectItem>
                      <SelectItem value="a5">A5</SelectItem>
                      <SelectItem value="letter">Letter</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </TooltipTrigger>
              <TooltipContent>
                <p>Select the page dimensions for your final book.</p>
              </TooltipContent>
            </Tooltip>
          </div>
        </TooltipProvider>
      </div>
      
      <p className="text-xs text-muted-foreground py-1">
        Choose how your book will be exported and formatted.
      </p>
      
      <TooltipProvider>
        <div className="flex items-center space-x-2 pt-2">
          <Tooltip>
            <TooltipTrigger asChild>
              <div className="flex items-center space-x-2">
                <Switch 
                  id="enable-images" 
                  checked={enableImages}
                  onCheckedChange={setEnableImages}
                />
                <label 
                  htmlFor="enable-images" 
                  className="text-sm font-medium cursor-pointer flex items-center gap-2"
                >
                  <ImageIcon className="h-4 w-4 text-purple" />
                  Add images to your book?
                </label>
              </div>
            </TooltipTrigger>
            <TooltipContent>
              <p>Decide whether to add AI-generated images to your book.</p>
            </TooltipContent>
          </Tooltip>
        </div>
      </TooltipProvider>
      
      <div className="pt-6">
        <Button 
          type="submit" 
          className="w-full btn-primary h-14 text-lg group"
          disabled={isSubmitting}
        >
          {isSubmitting ? (
            <span className="flex items-center gap-2">
              <Sparkles className="h-5 w-5 animate-spin" />
              Generating...
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
