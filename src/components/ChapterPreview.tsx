
import { useState } from 'react';
import { ChevronDown, ChevronUp } from 'lucide-react';

interface ChapterPreviewProps {
  number: number;
  title: string;
  summary: string;
  imageUrl?: string;
}

const ChapterPreview = ({ number, title, summary, imageUrl }: ChapterPreviewProps) => {
  const [isExpanded, setIsExpanded] = useState(false);
  
  return (
    <div className="border border-border rounded-xl overflow-hidden mb-4 transition-all hover:shadow-md">
      <div 
        className="flex items-center justify-between p-4 cursor-pointer"
        onClick={() => setIsExpanded(!isExpanded)}
      >
        <div className="flex items-center gap-3">
          <span className="w-7 h-7 rounded-full bg-purple/10 text-purple flex items-center justify-center text-sm font-medium">
            {number}
          </span>
          <h4 className="font-medium">{title}</h4>
        </div>
        <button>
          {isExpanded ? (
            <ChevronUp className="h-5 w-5 text-gray-400" />
          ) : (
            <ChevronDown className="h-5 w-5 text-gray-400" />
          )}
        </button>
      </div>
      
      {isExpanded && (
        <div className="p-4 pt-0 border-t border-border animate-slide-down">
          <div className="flex flex-col md:flex-row gap-4">
            {imageUrl && (
              <div className="w-full md:w-1/3">
                <img 
                  src={imageUrl} 
                  alt={`Chapter ${number}: ${title}`} 
                  className="w-full h-32 object-cover rounded-lg"
                />
              </div>
            )}
            <div className={`${imageUrl ? 'w-full md:w-2/3' : 'w-full'}`}>
              <p className="text-sm text-muted-foreground">{summary}</p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ChapterPreview;
