
import { Book, Sparkles } from 'lucide-react';

interface BookCoverProps {
  title?: string;
  genre?: string;
  className?: string;
  size?: 'sm' | 'md' | 'lg';
}

const BookCover = ({ title = "Your Amazing Book", genre = "Fiction", className = "", size = "md" }: BookCoverProps) => {
  const sizeClasses = {
    sm: "w-32 h-48",
    md: "w-48 h-64",
    lg: "w-64 h-96"
  };
  
  return (
    <div 
      className={`relative ${sizeClasses[size]} rounded-lg shadow-xl overflow-hidden ${className}`}
    >
      <div className="absolute inset-0 bg-gradient-to-br from-purple-dark via-purple to-blue-light"></div>
      
      {/* Cover Decoration */}
      <div className="absolute top-4 right-4">
        <Sparkles className="text-white/40 h-6 w-6" />
      </div>
      
      <div className="absolute inset-0 flex flex-col items-center justify-center p-4 text-white">
        <Book className="mb-4 h-10 w-10" />
        <h3 className="text-center font-bold text-lg mb-2 line-clamp-3">{title}</h3>
        <span className="text-xs px-2 py-1 bg-white/20 rounded-full">{genre}</span>
      </div>
    </div>
  );
};

export default BookCover;
