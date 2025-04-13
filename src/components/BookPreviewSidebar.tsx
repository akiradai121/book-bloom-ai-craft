
import { Button } from '@/components/ui/button';
import { Download } from 'lucide-react';
import BookCover from '@/components/BookCover';
import TableOfContents from '@/components/TableOfContents';

interface Chapter {
  id: number;
  title: string;
}

interface BookPreviewSidebarProps {
  title: string;
  genre?: string;
  chapters: Chapter[];
  activeChapter: number;
  onChapterClick: (chapterId: number) => void;
  format: string;
  onDownload: () => void;
}

const BookPreviewSidebar = ({
  title,
  genre,
  chapters,
  activeChapter,
  onChapterClick,
  format,
  onDownload
}: BookPreviewSidebarProps) => {
  return (
    <div className="lg:col-span-1 space-y-6">
      <div className="flex flex-col items-center">
        <BookCover title={title} genre={genre} className="mb-4 shadow-lg hover:shadow-xl transition-shadow" />
        <Button 
          className="w-full btn-primary"
          onClick={onDownload}
        >
          <Download className="mr-2 h-4 w-4" />
          Download in {format}
        </Button>
      </div>
      
      <div className="mt-8 hidden lg:block">
        <TableOfContents 
          chapters={chapters.map(chapter => ({ id: chapter.id, title: chapter.title }))}
          activeChapter={activeChapter}
          onChapterClick={onChapterClick}
        />
      </div>
    </div>
  );
};

export default BookPreviewSidebar;
