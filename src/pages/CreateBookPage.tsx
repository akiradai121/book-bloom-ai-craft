
import { Book } from 'lucide-react';
import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';
import BookCreationForm from '@/components/BookCreationForm';

const CreateBookPage = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Navigation />
      
      <main className="flex-grow py-12">
        <div className="container px-4 md:px-6 max-w-3xl mx-auto">
          <div className="text-center mb-10 animate-slide-down">
            <div className="flex justify-center mb-4">
              <div className="bg-purple/10 p-3 rounded-full">
                <Book className="h-8 w-8 text-purple" />
              </div>
            </div>
            <h1 className="text-3xl md:text-4xl font-bold mb-4">Create Your Book</h1>
            <p className="text-muted-foreground max-w-xl mx-auto">
              Start with your book idea, and our AI will generate a complete book structure for you. 
              You'll be able to edit everything before finalizing.
            </p>
          </div>
          
          <div className="card p-8 shadow-lg transition-all hover:shadow-xl bg-white">
            <BookCreationForm />
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default CreateBookPage;
