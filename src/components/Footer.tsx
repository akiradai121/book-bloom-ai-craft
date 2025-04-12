
import { Link } from 'react-router-dom';
import { BookOpen, Github, Twitter, Mail } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="bg-white border-t border-border py-8 px-6 md:px-12">
      <div className="container mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Logo and Description */}
          <div className="md:col-span-2">
            <Link to="/" className="flex items-center gap-2">
              <BookOpen className="h-6 w-6 text-purple" />
              <span className="font-poppins font-semibold text-xl">Prompt2Book</span>
            </Link>
            <p className="mt-4 text-sm text-muted-foreground">
              Turn your ideas into beautifully crafted books in seconds with our AI-powered platform.
              Create, preview, and download your book with just a few clicks.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-medium mb-4">Quick Links</h4>
            <ul className="space-y-2">
              <li>
                <Link to="/" className="text-sm text-muted-foreground hover:text-purple transition-colors">
                  Home
                </Link>
              </li>
              <li>
                <Link to="/create" className="text-sm text-muted-foreground hover:text-purple transition-colors">
                  Create Book
                </Link>
              </li>
              <li>
                <Link to="/login" className="text-sm text-muted-foreground hover:text-purple transition-colors">
                  Login / Signup
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="font-medium mb-4">Connect</h4>
            <div className="flex space-x-4">
              <a href="#" className="text-muted-foreground hover:text-purple transition-colors">
                <Twitter className="h-5 w-5" />
              </a>
              <a href="#" className="text-muted-foreground hover:text-purple transition-colors">
                <Github className="h-5 w-5" />
              </a>
              <a href="#" className="text-muted-foreground hover:text-purple transition-colors">
                <Mail className="h-5 w-5" />
              </a>
            </div>
          </div>
        </div>

        <div className="border-t border-border mt-8 pt-8 text-center text-sm text-muted-foreground">
          <p>© {new Date().getFullYear()} Prompt2Book. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
