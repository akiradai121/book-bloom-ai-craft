
import { Link } from 'react-router-dom';
import { BookOpen, Sparkles, Download, BookText } from 'lucide-react';
import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';
import { Button } from '@/components/ui/button';

const LandingPage = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Navigation />
      
      <main className="flex-grow">
        {/* Hero Section */}
        <section className="py-16 md:py-24">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col md:flex-row items-center gap-12">
              <div className="md:w-1/2 text-center md:text-left animate-fade-in">
                <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight mb-6">
                  Turn a Prompt into a <span className="text-purple">Full Book</span> Instantly
                </h1>
                <p className="text-lg md:text-xl text-muted-foreground mb-8 max-w-xl">
                  Our AI-powered platform transforms your ideas into beautifully crafted books complete with chapters, content, and stunning visuals.
                </p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center md:justify-start">
                  <Link to="/create">
                    <Button size="lg" className="btn-primary w-full sm:w-auto">
                      Create Your Book
                    </Button>
                  </Link>
                  <Link to="/about">
                    <Button variant="outline" size="lg" className="w-full sm:w-auto">
                      Learn More
                    </Button>
                  </Link>
                </div>
              </div>
              
              <div className="md:w-1/2 animate-fade-in animation-delay-200">
                <div className="relative">
                  <div className="absolute -top-6 -left-6 w-24 h-24 bg-purple/10 rounded-full"></div>
                  <div className="absolute -bottom-6 -right-6 w-32 h-32 bg-blue-light/30 rounded-full"></div>
                  
                  <div className="relative bg-white rounded-2xl shadow-xl p-8 border border-border">
                    <div className="grid grid-cols-2 gap-6">
                      <div className="aspect-[3/4] bg-gradient-to-br from-purple-dark to-purple rounded-lg shadow-lg flex items-center justify-center">
                        <BookOpen className="h-12 w-12 text-white" />
                      </div>
                      <div className="space-y-4">
                        <div className="h-6 w-24 bg-muted rounded-full"></div>
                        <div className="h-4 w-full bg-muted rounded-full"></div>
                        <div className="h-4 w-3/4 bg-muted rounded-full"></div>
                        <div className="h-10 w-full bg-purple/20 rounded-lg flex items-center justify-center">
                          <Sparkles className="h-5 w-5 text-purple" />
                        </div>
                      </div>
                      <div className="col-span-2 space-y-3">
                        <div className="h-4 w-full bg-muted rounded-full"></div>
                        <div className="h-4 w-5/6 bg-muted rounded-full"></div>
                        <div className="h-4 w-4/6 bg-muted rounded-full"></div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
        
        {/* Feature Section */}
        <section className="py-16 bg-accent/30">
          <div className="container px-4 md:px-6">
            <h2 className="text-3xl font-bold text-center mb-12">How It Works</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="card animate-fade-in animation-delay-100">
                <div className="w-12 h-12 rounded-full bg-purple/10 flex items-center justify-center mb-6">
                  <Sparkles className="h-6 w-6 text-purple" />
                </div>
                <h3 className="text-xl font-semibold mb-3">1. Enter Your Idea</h3>
                <p className="text-muted-foreground">
                  Describe your book idea, select a genre, and choose your preferred image style.
                </p>
              </div>
              
              <div className="card animate-fade-in animation-delay-200">
                <div className="w-12 h-12 rounded-full bg-purple/10 flex items-center justify-center mb-6">
                  <BookText className="h-6 w-6 text-purple" />
                </div>
                <h3 className="text-xl font-semibold mb-3">2. AI Creates Your Book</h3>
                <p className="text-muted-foreground">
                  Our AI generates a complete book with chapters, content, and matching images.
                </p>
              </div>
              
              <div className="card animate-fade-in animation-delay-300">
                <div className="w-12 h-12 rounded-full bg-purple/10 flex items-center justify-center mb-6">
                  <Download className="h-6 w-6 text-purple" />
                </div>
                <h3 className="text-xl font-semibold mb-3">3. Download Your Book</h3>
                <p className="text-muted-foreground">
                  Preview your new book and download it as a beautifully formatted PDF.
                </p>
              </div>
            </div>
          </div>
        </section>
        
        {/* CTA Section */}
        <section className="py-20">
          <div className="container px-4 md:px-6">
            <div className="bg-gradient-to-r from-purple-dark via-purple to-purple-light rounded-2xl p-8 md:p-12 text-white text-center">
              <h2 className="text-3xl md:text-4xl font-bold mb-6">Ready to Create Your Book?</h2>
              <p className="text-lg md:text-xl mb-8 max-w-2xl mx-auto">
                Join thousands of authors who have already transformed their ideas into complete books with our AI platform.
              </p>
              <Link to="/create">
                <Button size="lg" variant="default" className="bg-white text-purple hover:bg-white/90">
                  Start Creating Now
                </Button>
              </Link>
            </div>
          </div>
        </section>
      </main>
      
      <Footer />
    </div>
  );
};

export default LandingPage;
