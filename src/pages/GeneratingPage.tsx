
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import LoadingAnimation from '@/components/LoadingAnimation';
import Navigation from '@/components/Navigation';

const GeneratingPage = () => {
  const navigate = useNavigate();
  
  useEffect(() => {
    // Simulate book generation time
    const timer = setTimeout(() => {
      navigate('/preview');
    }, 5000);
    
    return () => clearTimeout(timer);
  }, [navigate]);
  
  return (
    <div className="min-h-screen flex flex-col">
      <Navigation />
      
      <main className="flex-grow flex items-center justify-center py-20 px-4">
        <div className="glass-card max-w-md mx-auto w-full">
          <LoadingAnimation />
        </div>
      </main>
    </div>
  );
};

export default GeneratingPage;
