
import { useEffect, useState } from 'react';
import { Sparkles, Wand2 } from 'lucide-react';
import { Progress } from '@/components/ui/progress';

interface LoadingAnimationProps {
  message?: string;
}

const LoadingAnimation = ({ message = "Generating your book magic... hold tight!" }: LoadingAnimationProps) => {
  const [progress, setProgress] = useState(0);
  
  useEffect(() => {
    const timer = setTimeout(() => {
      setProgress(30);
    }, 800);
    
    const timer2 = setTimeout(() => {
      setProgress(60);
    }, 2000);
    
    const timer3 = setTimeout(() => {
      setProgress(90);
    }, 3500);
    
    return () => {
      clearTimeout(timer);
      clearTimeout(timer2);
      clearTimeout(timer3);
    };
  }, []);
  
  return (
    <div className="text-center max-w-md mx-auto">
      <div className="relative w-24 h-24 mx-auto mb-6">
        <div className="absolute inset-0 rounded-full bg-purple/10 animate-pulse"></div>
        <div className="absolute inset-0 flex items-center justify-center">
          <Wand2 className="h-10 w-10 text-purple animate-bounce-gentle" />
        </div>
        <div className="absolute -top-1 -right-1">
          <Sparkles className="h-6 w-6 text-purple animate-spin-slow" />
        </div>
      </div>
      
      <h3 className="font-medium text-xl mb-6">{message}</h3>
      
      <div className="space-y-2">
        <Progress value={progress} className="h-2" />
        <p className="text-sm text-muted-foreground">Creating your masterpiece...</p>
      </div>
    </div>
  );
};

export default LoadingAnimation;
