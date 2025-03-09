
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useToast } from '@/hooks/use-toast';
import { Mail, Loader2 } from 'lucide-react';

const Auth = () => {
  const [email, setEmail] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [emailSent, setEmailSent] = useState(false);
  const { signInWithEmail, user } = useAuth();
  const { toast } = useToast();
  const navigate = useNavigate();

  // If already logged in, redirect to homepage
  useEffect(() => {
    if (user) {
      navigate('/');
    }
  }, [user, navigate]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!email || !email.includes('@')) {
      toast({
        title: "Invalid email",
        description: "Please enter a valid email address",
        variant: "destructive"
      });
      return;
    }
    
    setIsSubmitting(true);
    
    try {
      const { error } = await signInWithEmail(email);
      
      if (!error) {
        setEmailSent(true);
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  if (emailSent) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center px-4 bg-gradient-to-b from-blue-50 to-white">
        <div className="max-w-md w-full bg-white p-8 rounded-xl shadow-md">
          <div className="text-center mb-6">
            <Mail className="w-12 h-12 text-primary mx-auto mb-4" />
            <h1 className="text-2xl font-bold text-gray-800">Check your inbox</h1>
            <p className="text-gray-600 mt-2">
              We've sent a login link to <span className="font-medium">{email}</span>
            </p>
          </div>
          
          <div className="space-y-4">
            <p className="text-sm text-gray-500">
              Click the link in the email to sign in. If you don't see it, check your spam folder.
            </p>
            
            <Button 
              variant="outline" 
              className="w-full" 
              onClick={() => setEmailSent(false)}
            >
              Try again with a different email
            </Button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col items-center justify-center px-4 bg-gradient-to-b from-blue-50 to-white">
      <div className="max-w-md w-full bg-white p-8 rounded-xl shadow-md">
        <div className="text-center mb-6">
          <h1 className="text-2xl font-bold text-gray-800">Sign in / Sign up</h1>
          <p className="text-gray-600 mt-2">
            Enter your email to access your CX checklist
          </p>
        </div>
        
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Input
              type="email"
              placeholder="your@email.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="w-full"
            />
          </div>
          
          <Button 
            type="submit" 
            className="w-full" 
            disabled={isSubmitting}
          >
            {isSubmitting ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Sending link...
              </>
            ) : (
              "Send magic link"
            )}
          </Button>
          
          <p className="text-xs text-gray-500 text-center mt-4">
            We'll email you a magic link for a password-free sign in.
            <br />Your checklist progress will be saved to your account.
          </p>
        </form>
      </div>
    </div>
  );
};

export default Auth;
