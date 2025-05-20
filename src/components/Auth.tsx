import React, { useState } from 'react';
import { supabase } from '../lib/supabase';

interface AuthProps {
  onSuccess?: () => void;
}

const Auth: React.FC<AuthProps> = ({ onSuccess }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [inviteCode, setInviteCode] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [mode, setMode] = useState<'signin' | 'signup' | 'reset'>('signin');
  const [showForm, setShowForm] = useState(false);
  const [resetEmailSent, setResetEmailSent] = useState(false);

  const handleShowForm = () => {
    setShowForm(true);
  };

  const handleCloseForm = () => {
    setShowForm(false);
  };

  const validateInviteCode = async (code: string): Promise<boolean> => {
    const { data, error } = await supabase
      .from('invite_codes')
      .select('code')
      .eq('code', code)
      .single();

    if (error || !data) {
      return false;
    }

    const { data: useResult } = await supabase
      .rpc('use_invite_code', { invite_code: code });

    return !!useResult;
  };

  const handleResetPassword = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setLoading(true);

    try {
      const { error } = await supabase.auth.resetPasswordForEmail(email, {
        redirectTo: 'https://usesaltcreative.com/reset-password'
      });

      if (error) throw error;
      setResetEmailSent(true);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred');
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setLoading(true);

    try {
      if (mode === 'signup') {
        if (!inviteCode) {
          throw new Error('Invite code is required');
        }

        const isValidCode = await validateInviteCode(inviteCode);
        if (!isValidCode) {
          throw new Error('Invalid or expired invite code');
        }

        const { error } = await supabase.auth.signUp({
          email,
          password,
        });
        if (error) throw error;
      } else {
        const { error } = await supabase.auth.signInWithPassword({
          email,
          password,
        });
        if (error) throw error;
      }

      onSuccess?.();
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred');
    } finally {
      setLoading(false);
    }
  };

  if (mode === 'reset') {
    return (
      <div className="w-full max-w-md mx-auto p-6">
        <div className="text-center mb-8">
          <h2 className="text-2xl font-bold text-secondary-900">
            Reset Your Password
          </h2>
          <p className="mt-2 text-secondary-600">
            Enter your email address and we'll send you a link to reset your password
          </p>
        </div>

        {resetEmailSent ? (
          <div className="bg-green-50 border border-green-200 rounded-lg p-4 text-green-700">
            <p>Check your email for the password reset link!</p>
            <button
              onClick={() => {
                setMode('signin');
                setResetEmailSent(false);
              }}
              className="mt-4 text-sm text-green-600 hover:text-green-800"
            >
              Return to sign in
            </button>
          </div>
        ) : (
          <form onSubmit={handleResetPassword} className="space-y-4">
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-secondary-700">
                Email
              </label>
              <input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="input-field mt-1"
                required
              />
            </div>

            {error && (
              <div className="p-3 bg-red-50 border border-red-200 text-red-700 rounded-lg">
                {error}
              </div>
            )}

            <button
              type="submit"
              disabled={loading}
              className="btn-primary w-full flex justify-center items-center"
            >
              {loading ? (
                <>
                  <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  Sending Reset Link...
                </>
              ) : (
                'Send Reset Link'
              )}
            </button>

            <div className="text-center mt-4">
              <button
                type="button"
                onClick={() => setMode('signin')}
                className="text-sm text-secondary-600 hover:text-secondary-900"
              >
                Back to sign in
              </button>
            </div>
          </form>
        )}
      </div>
    );
  }

  return (
    <div className="w-full max-w-md mx-auto p-6">
      <div className="text-center mb-8">
        <p className="text-secondary-600 mb-6">
          SALT Creative is currently in beta and only accepting new accounts by private invite. 
          If you're interested in using Salt,{' '}
          <button 
            onClick={handleShowForm}
            className="text-primary-600 hover:text-primary-700 font-medium"
          >
            Click Here
          </button>
          {' '}to schedule a time for us to speak with you and to learn more about using Salt.
        </p>
        <h2 className="text-2xl font-bold text-secondary-900">
          {mode === 'signin' ? 'Welcome Back' : 'Create Your Account'}
        </h2>
        <p className="mt-2 text-secondary-600">
          {mode === 'signin' 
            ? 'Sign in to create your sermon artwork' 
            : 'Sign up to start creating sermon artwork'}
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label htmlFor="email" className="block text-sm font-medium text-secondary-700">
            Email
          </label>
          <input
            id="email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="input-field mt-1"
            required
          />
        </div>

        <div>
          <label htmlFor="password" className="block text-sm font-medium text-secondary-700">
            Password
          </label>
          <input
            id="password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="input-field mt-1"
            required
          />
        </div>

        {mode === 'signup' && (
          <div>
            <label htmlFor="inviteCode" className="block text-sm font-medium text-secondary-700">
              Invite Code
            </label>
            <input
              id="inviteCode"
              type="text"
              value={inviteCode}
              onChange={(e) => setInviteCode(e.target.value)}
              className="input-field mt-1"
              required
              placeholder="Enter your invite code"
            />
          </div>
        )}

        {error && (
          <div className="p-3 bg-red-50 border border-red-200 text-red-700 rounded-lg">
            {error}
          </div>
        )}

        <button
          type="submit"
          disabled={loading}
          className="btn-primary w-full flex justify-center items-center"
        >
          {loading ? (
            <>
              <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
              Processing...
            </>
          ) : (
            mode === 'signin' ? 'Sign In' : 'Sign Up'
          )}
        </button>

        <div className="text-center mt-4 space-y-2">
          {mode === 'signin' && (
            <button
              type="button"
              onClick={() => setMode('reset')}
              className="text-sm text-secondary-600 hover:text-secondary-900 block w-full"
            >
              Forgot your password?
            </button>
          )}
          <button
            type="button"
            onClick={() => setMode(mode === 'signin' ? 'signup' : 'signin')}
            className="text-sm text-secondary-600 hover:text-secondary-900 block w-full"
          >
            {mode === 'signin' 
              ? "Don't have an account? Sign up" 
              : 'Already have an account? Sign in'}
          </button>
        </div>
      </form>

      {showForm && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white w-full max-w-3xl h-[80vh] rounded-lg relative">
            <button
              onClick={handleCloseForm}
              className="absolute top-4 right-4 text-gray-500 hover:text-gray-700"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
            <iframe
              src="https://api.leadconnectorhq.com/widget/form/GeeGU9WJM8gIAjaSgAD7"
              className="w-full h-full rounded-lg"
              style={{ border: 'none' }}
              title="Salt Sign-Up Form"
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default Auth;