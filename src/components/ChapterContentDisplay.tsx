
import { Button } from '@/components/ui/button';
import { ChevronLeft, ChevronRight, Edit } from 'lucide-react';

interface Chapter {
  id: number;
  title: string;
  content: string;
  summary?: string;
  imageUrl?: string;
}

interface ChapterContentDisplayProps {
  chapter: Chapter;
  totalChapters: number;
  onNavigate: (direction: 'prev' | 'next') => void;
  onEdit: (chapter: Chapter) => void;
}

const ChapterContentDisplay = ({ 
  chapter, 
  totalChapters, 
  onNavigate, 
  onEdit 
}: ChapterContentDisplayProps) => {
  return (
    <div className="card animate-fade-in">
      <div className="flex justify-between items-center mb-6">
        <Button
          variant="outline"
          size="sm"
          onClick={() => onNavigate('prev')}
          disabled={chapter.id === 1}
          className="hover:scale-105 transition-transform"
        >
          <ChevronLeft className="h-4 w-4 mr-2" />
          Previous
        </Button>
        
        <span className="text-sm text-muted-foreground">
          Chapter {chapter.id} of {totalChapters}
        </span>
        
        <Button
          variant="outline"
          size="sm"
          onClick={() => onNavigate('next')}
          disabled={chapter.id === totalChapters}
          className="hover:scale-105 transition-transform"
        >
          Next
          <ChevronRight className="h-4 w-4 ml-2" />
        </Button>
      </div>
      
      <div className="space-y-6">
        <h2 className="text-2xl font-semibold hover:text-purple transition-colors">
          Chapter {chapter.id}: {chapter.title}
        </h2>
        
        {chapter.imageUrl && (
          <img 
            src={chapter.imageUrl}
            alt={`Chapter ${chapter.id}: ${chapter.title}`}
            className="w-full h-48 object-cover rounded-lg shadow-md hover:shadow-lg transition-shadow"
          />
        )}
        
        {chapter.summary && (
          <p className="text-muted-foreground italic">
            {chapter.summary}
          </p>
        )}
        
        <div className="pt-4 space-y-4 text-muted-foreground">
          {chapter.content.split("\n\n").map((paragraph, i) => (
            <p key={i}>{paragraph}</p>
          ))}
        </div>
        
        <div className="pt-4 flex justify-end">
          <Button 
            variant="outline" 
            size="sm"
            onClick={() => onEdit(chapter)}
            className="hover:bg-purple/10 transition-colors"
          >
            <Edit className="h-4 w-4 mr-2" />
            Edit This Chapter
          </Button>
        </div>
      </div>
    </div>
  );
};

export default ChapterContentDisplay;
