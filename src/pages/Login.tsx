
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from '@/hooks/use-toast';
import Camera from '@/components/Camera';

const Login = () => {
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    
    // Simulate API call with timeout
    setTimeout(() => {
      if (password === 'Dragon') {
        toast({
          title: "Login successful",
          description: "Welcome to Dragon Proctoring System"
        });
        navigate('/exam');
      } else {
        setError('Invalid password. Please try again.');
        toast({
          title: "Login Failed",
          description: "Invalid password. Please try again.",
          variant: "destructive",
        });
      }
      setIsLoading(false);
    }, 800);
  };

  const handleCameraError = (error: string) => {
    setError(error);
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-4 sm:p-6">
      <div className="w-full max-w-md px-6 py-8 bg-white/90 backdrop-blur-sm rounded-2xl shadow-sm border border-gray-100 animate-fade-in">
        <div className="text-center mb-8 animate-slide-down">
          <h1 className="text-3xl font-semibold mb-2">Dragon Proctoring System</h1>
          <p className="text-muted-foreground">Secure exam monitoring for academic integrity</p>
        </div>
        
        <div className="mb-8">
          <Camera 
            onError={handleCameraError} 
            className="h-[200px] w-full rounded-xl mb-4 shadow-sm animate-fade-in" 
          />
          <p className="text-sm text-muted-foreground text-center">
            Your camera feed is required for exam proctoring.
          </p>
        </div>
        
        <form onSubmit={handleLogin} className="space-y-6 animate-slide-up">
          <div className="space-y-2">
            <label htmlFor="password" className="text-sm font-medium">
              Password
            </label>
            <input
              id="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="auth-input"
              placeholder="Enter password"
              autoComplete="current-password"
              required
            />
            {error && <p className="text-sm text-destructive mt-1">{error}</p>}
          </div>
          
          <button 
            type="submit" 
            className="btn-primary w-full flex items-center justify-center"
            disabled={isLoading}
          >
            {isLoading ? (
              <span className="inline-block w-5 h-5 border-2 border-t-primary-foreground rounded-full animate-spin mr-2"></span>
            ) : null}
            {isLoading ? 'Authenticating...' : 'Continue to Exam'}
          </button>
        </form>
      </div>
    </div>
  );
};

export default Login;
