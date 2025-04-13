
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Edit } from 'lucide-react';
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

interface BookEditorPanelProps {
  book: Book;
  editingTitle: string;
  setEditingTitle: (title: string) => void;
  onStartEditingChapter: (chapter: Chapter) => void;
  onSaveBookChanges: () => void;
}

const BookEditorPanel = ({ 
  book, 
  editingTitle, 
  setEditingTitle, 
  onStartEditingChapter, 
  onSaveBookChanges 
}: BookEditorPanelProps) => {
  return (
    <div className="bg-accent/30 rounded-xl p-6 space-y-6 animate-accordion-down">
      <div className="space-y-4">
        <h2 className="text-xl font-semibold">Edit This Book</h2>
        
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
          <h3 className="text-sm font-medium mb-2">Edit Table of Contents</h3>
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
                  onClick={() => onStartEditingChapter(chapter)}
                >
                  <Edit className="h-3.5 w-3.5" />
                </Button>
              </div>
            ))}
          </div>
        </div>
        
        <div className="pt-2 flex justify-end">
          <Button onClick={onSaveBookChanges}>
            <Edit className="h-4 w-4 mr-2" />
            Save Book Changes
          </Button>
        </div>
      </div>
    </div>
  );
};

export default BookEditorPanel;
