
import { Book, Sparkles } from 'lucide-react';

interface BookCoverProps {
  title?: string;
  genre?: string;
  className?: string;
  size?: 'sm' | 'md' | 'lg';
  style?: 'purple' | 'blue' | 'green' | 'warm';
  onClick?: () => void;
}

const BookCover = ({ 
  title = "Your Amazing Book", 
  genre = "Fiction", 
  className = "", 
  size = "md",
  style = "purple",
  onClick
}: BookCoverProps) => {
  const sizeClasses = {
    sm: "w-32 h-48",
    md: "w-48 h-64",
    lg: "w-64 h-96"
  };
  
  const styleGradients = {
    purple: "bg-gradient-to-br from-purple-dark via-purple to-blue-light",
    blue: "bg-gradient-to-br from-blue-600 via-blue-500 to-cyan-400",
    green: "bg-gradient-to-br from-emerald-700 via-emerald-500 to-lime-300",
    warm: "bg-gradient-to-br from-amber-700 via-orange-500 to-yellow-300",
  };
  
  return (
    <div 
      className={`relative ${sizeClasses[size]} rounded-xl shadow-xl overflow-hidden transition-all hover:shadow-2xl cursor-pointer ${className}`}
      onClick={onClick}
    >
      <div className={`absolute inset-0 ${styleGradients[style]}`}></div>
      
      {/* Texture overlay */}
      <div className="absolute inset-0 opacity-10 mix-blend-overlay bg-[url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSI1IiBoZWlnaHQ9IjUiPgo8cmVjdCB3aWR0aD0iNSIgaGVpZ2h0PSI1IiBmaWxsPSIjZmZmIj48L3JlY3Q+CjxyZWN0IHdpZHRoPSIxIiBoZWlnaHQ9IjEiIGZpbGw9IiNjY2MiPjwvcmVjdD4KPC9zdmc+')]"></div>
      
      {/* Spine effect */}
      <div className="absolute left-0 top-0 bottom-0 w-[12px] bg-black/20"></div>
      
      {/* Cover shine effect */}
      <div className="absolute inset-0 bg-gradient-to-br from-white/20 to-transparent opacity-30"></div>
      
      {/* Cover Decoration */}
      <div className="absolute top-4 right-4">
        <Sparkles className="text-white/60 h-6 w-6" />
      </div>
      
      <div className="absolute inset-0 flex flex-col items-center justify-center p-6 text-white">
        <Book className="mb-4 h-10 w-10 drop-shadow-md" />
        <h3 className="text-center font-bold text-lg mb-2 line-clamp-3 drop-shadow-md">{title}</h3>
        <span className="text-xs px-3 py-1.5 bg-white/20 backdrop-blur-sm rounded-full drop-shadow">{genre}</span>
      </div>
    </div>
  );
};

export default BookCover;
