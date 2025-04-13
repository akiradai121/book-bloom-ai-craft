
import { useState } from 'react';
import { RefreshCw, Save, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';

interface Chapter {
  id: number;
  title: string;
  content: string;
  summary?: string;
  imageUrl?: string;
}

interface ChapterEditorModalProps {
  chapter: Chapter | null;
  onCancel: () => void;
  onSave: (chapter: Chapter) => void;
  saving: boolean;
}

const ChapterEditorModal = ({ chapter, onCancel, onSave, saving }: ChapterEditorModalProps) => {
  const [editingChapter, setEditingChapter] = useState<Chapter | null>(chapter);

  if (!editingChapter) return null;

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50 animate-fade-in">
      <div className="bg-white rounded-xl w-full max-w-2xl max-h-[80vh] overflow-y-auto p-6 space-y-4">
        <div className="flex justify-between items-center">
          <h3 className="text-xl font-semibold">Edit Chapter</h3>
          <Button variant="ghost" size="sm" onClick={onCancel}>
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
              placeholder="Edit chapter content here..."
            />
          </div>
        </div>
        
        <div className="pt-4 flex justify-end gap-2">
          <Button variant="outline" onClick={onCancel}>
            Cancel
          </Button>
          <Button 
            onClick={() => onSave(editingChapter)}
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
  );
};

export default ChapterEditorModal;
