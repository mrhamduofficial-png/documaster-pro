import { useState, useEffect } from 'react';
import { useSearchParams, Link, useNavigate } from 'react-router-dom';
import { useAuthStore } from '../store/authStore';
import { FileText, User, Lock, Mail, Loader, Chrome, CircleCheck as CheckCircle } from 'lucide-react';

export default function Auth() {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const { signIn, signUp, signInWithGoogle, user, initialized } = useAuthStore();

  const [isRegister, setIsRegister] = useState(searchParams.get('register') === 'true');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [loading, setLoading] = useState(false);
  const [googleLoading, setGoogleLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);

  useEffect(() => {
    if (initialized && user) {
      navigate('/dashboard');
    }
  }, [user, initialized, navigate]);

  useEffect(() => {
    setIsRegister(searchParams.get('register') === 'true');
  }, [searchParams]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setSuccess(null);

    try {
      if (isRegister) {
        if (password.length < 6) {
          throw new Error('Password must be at least 6 characters');
        }
        if (!name.trim()) {
          throw new Error('Please enter your name');
        }

        const { error: signUpError } = await signUp(email, password, name);

        if (signUpError) {
          throw signUpError;
        }

        setSuccess('Account created successfully! Redirecting...');
        setTimeout(() => navigate('/dashboard'), 1500);
      } else {
        const { error: signInError } = await signIn(email, password);

        if (signInError) {
          throw signInError;
        }

        navigate('/dashboard');
      }
    } catch (err) {
      const message = err instanceof Error ? err.message : 'An error occurred';
      setError(message);
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleSignIn = async () => {
    setGoogleLoading(true);
    setError(null);

    try {
      const { error: googleError } = await signInWithGoogle();

      if (googleError) {
        throw googleError;
      }
      // OAuth will redirect automatically
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Google sign-in failed');
      setGoogleLoading(false);
    }
  };

  // Show loading while checking auth state
  if (!initialized) {
    return (
      <div className="min-h-[calc(100vh-4rem)] flex items-center justify-center">
        <Loader className="w-8 h-8 animate-spin text-primary-600" />
      </div>
    );
  }

  return (
    <div className="min-h-[calc(100vh-4rem)] flex items-center justify-center py-12 px-4">
      <div className="w-full max-w-md">
        {/* Logo */}
        <div className="text-center mb-8">
          <Link to="/" className="inline-flex items-center gap-2">
            <div className="w-12 h-12 bg-gradient-to-br from-primary-600 to-accent-600 rounded-xl flex items-center justify-center">
              <FileText className="w-7 h-7 text-white" />
            </div>
            <span className="text-2xl font-bold text-secondary-900">DocuMaster</span>
          </Link>
        </div>

        {/* Card */}
        <div className="card">
          <h1 className="text-2xl font-bold text-secondary-900 text-center mb-2">
            {isRegister ? 'Create Account' : 'Welcome Back'}
          </h1>
          <p className="text-secondary-600 text-center mb-6">
            {isRegister ? 'Start managing your documents for free' : 'Sign in to access your dashboard'}
          </p>

          {error && (
            <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg mb-6 text-sm">
              {error}
            </div>
          )}

          {success && (
            <div className="bg-green-50 border border-green-200 text-green-700 px-4 py-3 rounded-lg mb-6 flex items-center gap-2">
              <CheckCircle className="w-5 h-5" />
              {success}
            </div>
          )}

          {/* Google Sign In */}
          <button
            onClick={handleGoogleSignIn}
            disabled={googleLoading}
            className="w-full flex items-center justify-center gap-3 px-4 py-3 border-2 border-secondary-200 rounded-lg hover:bg-secondary-50 transition-colors mb-4 disabled:opacity-50"
          >
            {googleLoading ? (
              <Loader className="w-5 h-5 animate-spin" />
            ) : (
              <>
                <Chrome className="w-5 h-5 text-red-500" />
                <span className="font-medium text-secondary-700">Continue with Google</span>
              </>
            )}
          </button>

          <div className="relative mb-6">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-secondary-200" />
            </div>
            <div className="relative flex justify-center text-sm">
              <span className="px-2 bg-white text-secondary-500">Or continue with email</span>
            </div>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            {isRegister && (
              <div>
                <label className="block text-sm font-medium text-secondary-700 mb-1">Full Name</label>
                <div className="relative">
                  <User className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-secondary-400" />
                  <input
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="John Doe"
                    required
                    className="input pl-10"
                    autoComplete="name"
                  />
                </div>
              </div>
            )}

            <div>
              <label className="block text-sm font-medium text-secondary-700 mb-1">Email Address</label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-secondary-400" />
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="you@example.com"
                  required
                  className="input pl-10"
                  autoComplete="email"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-secondary-700 mb-1">Password</label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-secondary-400" />
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder={isRegister ? '6+ characters' : 'Enter password'}
                  required
                  minLength={isRegister ? 6 : undefined}
                  className="input pl-10"
                  autoComplete={isRegister ? 'new-password' : 'current-password'}
                />
              </div>
            </div>

            <button type="submit" disabled={loading} className="btn btn-primary w-full py-3">
              {loading ? (
                <><Loader className="w-5 h-5 animate-spin mr-2" />Please wait...</>
              ) : isRegister ? (
                'Create Account'
              ) : (
                'Sign In'
              )}
            </button>
          </form>

          <div className="mt-6 pt-6 border-t border-secondary-200 text-center">
            <p className="text-secondary-600">
              {isRegister ? (
                <>
                  Already have an account?{' '}
                  <button onClick={() => { setIsRegister(false); setError(null); }} className="text-primary-600 hover:text-primary-700 font-medium">
                    Sign in
                  </button>
                </>
              ) : (
                <>
                  Don't have an account?{' '}
                  <button onClick={() => { setIsRegister(true); setError(null); }} className="text-primary-600 hover:text-primary-700 font-medium">
                    Create one
                  </button>
                </>
              )}
            </p>
          </div>
        </div>

        <p className="text-center mt-6">
          <Link to="/" className="text-secondary-500 hover:text-secondary-700">
            Continue as guest
          </Link>
        </p>
      </div>
    </div>
  );
}
