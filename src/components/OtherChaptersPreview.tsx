
import ChapterPreview from '@/components/ChapterPreview';

interface Chapter {
  id: number;
  title: string;
  summary?: string;
  imageUrl?: string;
}

interface OtherChaptersPreviewProps {
  chapters: Chapter[];
  activeChapter: number;
  onChapterClick: (chapterId: number) => void;
}

const OtherChaptersPreview = ({ 
  chapters, 
  activeChapter, 
  onChapterClick 
}: OtherChaptersPreviewProps) => {
  const otherChapters = chapters
    .filter(chapter => chapter.id !== activeChapter)
    .slice(0, 3);
    
  return (
    <div className="mt-8">
      <h3 className="font-medium mb-4">Other Chapters</h3>
      <div className="space-y-3">
        {otherChapters.map(chapter => (
          <ChapterPreview 
            key={chapter.id}
            number={chapter.id}
            title={chapter.title}
            summary={chapter.summary || ''}
            imageUrl={chapter.imageUrl}
            onClick={() => onChapterClick(chapter.id)}
          />
        ))}
      </div>
    </div>
  );
};

export default OtherChaptersPreview;
