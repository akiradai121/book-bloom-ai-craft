
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { BookOpen, Mail, Lock, User, ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { toast } from 'sonner';

const AuthPage = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!email || !password || (!isLogin && !name)) {
      toast.error("Please fill in all fields");
      return;
    }
    
    setIsSubmitting(true);
    
    // Simulate API call
    setTimeout(() => {
      setIsSubmitting(false);
      
      if (isLogin) {
        toast.success("Logged in successfully!");
      } else {
        toast.success("Account created successfully!");
        setIsLogin(true);
      }
    }, 1500);
  };
  
  return (
    <div className="min-h-screen flex flex-col">
      <header className="p-6">
        <Link to="/" className="flex items-center gap-2">
          <BookOpen className="h-6 w-6 text-purple" />
          <span className="font-poppins font-semibold text-xl">Prompt2Book</span>
        </Link>
      </header>
      
      <main className="flex-grow flex items-center justify-center p-6">
        <div className="max-w-md w-full">
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold mb-2">
              {isLogin ? 'Welcome Back' : 'Create Account'}
            </h1>
            <p className="text-muted-foreground">
              {isLogin 
                ? 'Sign in to access your AI-generated books'
                : 'Join Prompt2Book to create amazing books with AI'}
            </p>
          </div>
          
          <div className="card">
            <form onSubmit={handleSubmit} className="space-y-4">
              {!isLogin && (
                <div className="space-y-2">
                  <Label htmlFor="name" className="text-sm flex items-center gap-2">
                    <User className="h-4 w-4 text-purple" />
                    Full Name
                  </Label>
                  <Input
                    id="name"
                    type="text"
                    placeholder="Enter your name"
                    className="input-field"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                  />
                </div>
              )}
              
              <div className="space-y-2">
                <Label htmlFor="email" className="text-sm flex items-center gap-2">
                  <Mail className="h-4 w-4 text-purple" />
                  Email
                </Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="Enter your email"
                  className="input-field"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="password" className="text-sm flex items-center gap-2">
                  <Lock className="h-4 w-4 text-purple" />
                  Password
                </Label>
                <Input
                  id="password"
                  type="password"
                  placeholder="Enter your password"
                  className="input-field"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>
              
              {isLogin && (
                <div className="text-right">
                  <Link to="#" className="text-sm text-purple hover:underline">
                    Forgot password?
                  </Link>
                </div>
              )}
              
              <Button 
                type="submit" 
                className="w-full btn-primary"
                disabled={isSubmitting}
              >
                {isSubmitting ? (
                  <span className="flex items-center gap-2">
                    <div className="animate-spin h-4 w-4 border-2 border-white border-t-transparent rounded-full"></div>
                    {isLogin ? 'Signing In...' : 'Creating Account...'}
                  </span>
                ) : (
                  <span className="flex items-center gap-2">
                    {isLogin ? 'Sign In' : 'Create Account'}
                    <ArrowRight className="h-4 w-4" />
                  </span>
                )}
              </Button>
            </form>
            
            <div className="mt-6 text-center text-sm">
              <p className="text-muted-foreground">
                {isLogin ? "Don't have an account? " : "Already have an account? "}
                <button 
                  type="button"
                  className="text-purple font-medium hover:underline"
                  onClick={() => setIsLogin(!isLogin)}
                >
                  {isLogin ? 'Sign Up' : 'Sign In'}
                </button>
              </p>
            </div>
          </div>
          
          <div className="mt-8 text-center">
            <Link to="/" className="text-sm text-muted-foreground hover:text-purple">
              Return to home page
            </Link>
          </div>
        </div>
      </main>
    </div>
  );
};

export default AuthPage;
