import { useState, useEffect } from 'react';
import { useSearchParams, Link, useNavigate } from 'react-router-dom';
import { useAuthStore } from '../store/authStore';
import { FileText, User, Lock, Mail, Loader } from 'lucide-react';

export default function Auth() {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const { signIn, signUp, user } = useAuthStore();

  const [isRegister, setIsRegister] = useState(searchParams.get('register') === 'true');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (user) {
      navigate('/dashboard');
    }
  }, [user, navigate]);

  useEffect(() => {
    setIsRegister(searchParams.get('register') === 'true');
  }, [searchParams]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      if (isRegister) {
        if (password.length < 6) {
          throw new Error('Password must be at least 6 characters');
        }
        await signUp(email, password, name);
      } else {
        await signIn(email, password);
      }
      navigate('/dashboard');
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred');
    } finally {
      setLoading(false);
    }
  };

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
            {isRegister
              ? 'Start managing your documents for free'
              : 'Sign in to access your dashboard'}
          </p>

          {error && (
            <div className="bg-error-50 border border-error-200 text-error-700 px-4 py-3 rounded-lg mb-6">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            {isRegister && (
              <div>
                <label className="block text-sm font-medium text-secondary-700 mb-1">
                  Full Name
                </label>
                <div className="relative">
                  <User className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-secondary-400" />
                  <input
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="John Doe"
                    required
                    className="input pl-10"
                  />
                </div>
              </div>
            )}

            <div>
              <label className="block text-sm font-medium text-secondary-700 mb-1">
                Email Address
              </label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-secondary-400" />
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="you@example.com"
                  required
                  className="input pl-10"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-secondary-700 mb-1">
                Password
              </label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-secondary-400" />
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder={isRegister ? '6+ characters' : 'Enter password'}
                  required
                  className="input pl-10"
                />
              </div>
            </div>

            {!isRegister && (
              <div className="flex justify-end">
                <button type="button" className="text-sm text-primary-600 hover:text-primary-700">
                  Forgot password?
                </button>
              </div>
            )}

            <button
              type="submit"
              disabled={loading}
              className="btn btn-primary w-full"
            >
              {loading ? (
                <Loader className="w-5 h-5 animate-spin" />
              ) : isRegister ? (
                'Create Account'
              ) : (
                'Sign In'
              )}
            </button>
          </form>

          {/* Divider */}
          <div className="my-6 flex items-center">
            <div className="flex-1 border-t border-secondary-200" />
            <span className="px-4 text-sm text-secondary-500">or</span>
            <div className="flex-1 border-t border-secondary-200" />
          </div>

          {/* Toggle */}
          <p className="text-center text-secondary-600">
            {isRegister ? (
              <>
                Already have an account?{' '}
                <button
                  onClick={() => setIsRegister(false)}
                  className="text-primary-600 hover:text-primary-700 font-medium"
                >
                  Sign in
                </button>
              </>
            ) : (
              <>
                Don't have an account?{' '}
                <button
                  onClick={() => setIsRegister(true)}
                  className="text-primary-600 hover:text-primary-700 font-medium"
                >
                  Create one
                </button>
              </>
            )}
          </p>
        </div>

        {/* Guest Link */}
        <p className="text-center mt-6">
          <Link to="/" className="text-secondary-500 hover:text-secondary-700">
            Continue as guest
          </Link>
        </p>
      </div>
    </div>
  );
}
