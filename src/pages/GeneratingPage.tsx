
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { BookOpen, Sparkles } from 'lucide-react';
import Navigation from '@/components/Navigation';
import LoadingAnimation from '@/components/LoadingAnimation';

const GeneratingPage = () => {
  const navigate = useNavigate();
  
  useEffect(() => {
    // Simulate book generation time
    const timer = setTimeout(() => {
      navigate('/editor');
    }, 5000);
    
    return () => clearTimeout(timer);
  }, [navigate]);
  
  return (
    <div className="min-h-screen flex flex-col">
      <Navigation />
      
      <main className="flex-grow flex items-center justify-center py-20 px-4">
        <div className="glass-card max-w-md mx-auto w-full text-center">
          <LoadingAnimation />
          
          <div className="mt-6 space-y-4">
            <h2 className="text-2xl font-bold flex items-center justify-center gap-2">
              <BookOpen className="h-6 w-6 text-purple animate-pulse" />
              Your Book is Being Created...
            </h2>
            
            <div className="relative h-2 bg-purple/20 rounded-full overflow-hidden">
              <div className="absolute top-0 left-0 h-full bg-gradient-to-r from-purple to-purple-light animate-pulse rounded-full" 
                   style={{width: '80%'}}></div>
            </div>
            
            <p className="text-muted-foreground">
              Hang tight — we're turning your idea into a beautiful book.
            </p>
            
            <div className="flex justify-center py-2">
              <Sparkles className="text-purple/60 h-7 w-7 animate-spin-slow" />
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default GeneratingPage;
