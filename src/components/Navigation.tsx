
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Menu, X, BookOpen, User } from 'lucide-react';
import { Button } from '@/components/ui/button';

const Navigation = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <nav className="w-full py-4 px-6 md:px-12 flex items-center justify-between">
      <Link to="/" className="flex items-center gap-2">
        <BookOpen className="h-6 w-6 text-purple" />
        <span className="font-poppins font-semibold text-xl">Prompt2Book</span>
      </Link>

      {/* Desktop Navigation */}
      <div className="hidden md:flex items-center gap-8">
        <Link to="/" className="font-medium hover:text-purple transition-colors">
          Home
        </Link>
        <Link to="/create" className="font-medium hover:text-purple transition-colors">
          Create
        </Link>
        <Link to="/pricing" className="font-medium hover:text-purple transition-colors">
          Pricing
        </Link>
        <Link to="/about" className="font-medium hover:text-purple transition-colors">
          About
        </Link>
        <Link to="/login">
          <Button variant="outline" size="sm" className="flex items-center gap-2">
            <User className="h-4 w-4" />
            Login
          </Button>
        </Link>
      </div>

      {/* Mobile Navigation Toggle */}
      <button 
        className="md:hidden"
        onClick={() => setIsMenuOpen(!isMenuOpen)}
      >
        {isMenuOpen ? (
          <X className="h-6 w-6" />
        ) : (
          <Menu className="h-6 w-6" />
        )}
      </button>

      {/* Mobile Navigation Menu */}
      {isMenuOpen && (
        <div className="md:hidden absolute top-16 left-0 right-0 bg-white shadow-lg z-50 animate-fade-in">
          <div className="flex flex-col p-6 gap-4">
            <Link to="/" className="font-medium hover:text-purple transition-colors">
              Home
            </Link>
            <Link to="/create" className="font-medium hover:text-purple transition-colors">
              Create
            </Link>
            <Link to="/pricing" className="font-medium hover:text-purple transition-colors">
              Pricing
            </Link>
            <Link to="/about" className="font-medium hover:text-purple transition-colors">
              About
            </Link>
            <Link to="/login">
              <Button variant="outline" size="sm" className="flex items-center gap-2 w-full justify-center">
                <User className="h-4 w-4" />
                Login
              </Button>
            </Link>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navigation;
