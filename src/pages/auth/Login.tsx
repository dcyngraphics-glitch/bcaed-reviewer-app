import { useState } from 'react';
import { motion } from 'framer-motion';
import Button from '../../components/Button';
import { useAuth } from '../../routes/auth';
import { useLocation, useNavigate } from 'react-router-dom';

interface LocationState {
  from?: string;
}

/**
 * Sign-in screen.
 *
 * There is no backend yet, so this is a local gate rather than a real login:
 * the plan's Google sign-in and admin approval need a server. The page says so
 * instead of pretending to authenticate, and it is the single place that needs
 * changing when the backend arrives.
 */
const Login = () => {
  const { login } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const [name, setName] = useState('');
  const [error, setError] = useState('');

  const redirectTo = (location.state as LocationState | null)?.from ?? '/student/home';

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();

    const trimmed = name.trim();
    if (trimmed.length < 2) {
      setError('Enter the name you want shown on your dashboard.');
      return;
    }

    // Stored before the profile provider mounts, so the first render of the
    // dashboard already has the name.
    try {
      window.localStorage.setItem('bcaed.pendingName', trimmed);
    } catch {
      // Storage disabled — the profile falls back to a default name.
    }

    login();
    navigate(redirectTo, { replace: true });
  };

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        className="bg-white rounded-xl shadow-md w-full max-w-md p-8"
      >
        <div className="mb-6 text-center">
          <div
            className="w-16 h-16 mx-auto rounded-full bg-primary-600 text-white flex items-center justify-center text-2xl font-bold"
            aria-hidden="true"
          >
            BA
          </div>
          <h1 className="mt-4 text-xl font-bold text-gray-900">BCAED Reviewer</h1>
          <p className="mt-1 text-sm text-gray-600">
            Licensure preparation for Culture and Arts Education
          </p>
        </div>

        <form className="space-y-4" onSubmit={handleSubmit}>
          <div>
            <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
              Your name
            </label>
            <input
              id="name"
              type="text"
              value={name}
              onChange={(event) => {
                setName(event.target.value);
                setError('');
              }}
              placeholder="Juan Dela Cruz"
              autoComplete="name"
              className="block w-full rounded-md border border-gray-300 px-3 py-2 text-sm focus:border-primary-500 focus:ring-primary-500"
            />
            {error ? (
              <p className="mt-1 text-sm text-red-600" role="alert">
                {error}
              </p>
            ) : null}
          </div>

          <Button type="submit" variant="primary" className="w-full">
            Continue
          </Button>
        </form>

        <div className="mt-6 rounded-lg bg-amber-50 border border-amber-200 p-3">
          <p className="text-xs text-amber-900">
            <strong>Not yet a real sign-in.</strong> Accounts, Google login and administrator
            approval need a backend, which is not built yet. Your progress is stored on this device
            only, and nobody else can see it.
          </p>
        </div>
      </motion.div>
    </div>
  );
};

export default Login;
