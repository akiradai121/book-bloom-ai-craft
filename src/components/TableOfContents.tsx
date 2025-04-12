
import { ChevronRight } from 'lucide-react';

interface ChapterItem {
  id: number;
  title: string;
}

interface TableOfContentsProps {
  chapters: ChapterItem[];
  activeChapter: number;
  onChapterClick: (chapterId: number) => void;
}

const TableOfContents = ({ chapters, activeChapter, onChapterClick }: TableOfContentsProps) => {
  return (
    <div className="bg-accent/50 rounded-xl p-4">
      <h3 className="font-medium mb-3">Table of Contents</h3>
      <ul className="space-y-1">
        {chapters.map((chapter) => (
          <li key={chapter.id}>
            <button
              className={`w-full text-left px-3 py-2 rounded-lg flex items-center text-sm transition-colors ${
                activeChapter === chapter.id
                  ? "bg-purple text-white font-medium"
                  : "hover:bg-accent"
              }`}
              onClick={() => onChapterClick(chapter.id)}
            >
              <ChevronRight className={`h-4 w-4 mr-2 ${
                activeChapter === chapter.id ? "text-white" : "text-purple"
              }`} />
              <span>Chapter {chapter.id}: {chapter.title}</span>
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default TableOfContents;
