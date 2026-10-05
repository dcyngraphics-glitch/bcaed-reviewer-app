import { motion } from 'framer-motion';
import Button from '../../components/Button';
import Avatar from '../../components/Avatar';
import { useAuth } from '../../routes/auth';
import { useLocation, useNavigate } from 'react-router-dom';

interface LocationState {
  from?: string;
}

const Login = () => {
  const { login } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const redirectTo = (location.state as LocationState | null)?.from ?? '/student/home';

  const handleLogin = () => {
    // Previously set no auth flag and used window.location.href, which
    // full-reloaded the SPA and left RequireAuth bouncing straight back here.
    login();
    navigate(redirectTo, { replace: true });
  };

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="bg-white rounded-lg shadow-md w-full max-w-xs p-8"
      >
        <div className="mb-6 text-center">
          <Avatar
            src="https://api.dicebear.com/7.x/avataaars/svg?seed=BCAED"
            alt="BCAED Reviewer"
            className="w-16 h-16 mx-auto"
          />
          <h2 className="mt-4 text-xl font-bold text-gray-900">
            BCAED Reviewer App
          </h2>
          <p className="mt-2 text-gray-600">
            Sign in to continue
          </p>
        </div>
        <form className="space-y-4" onSubmit={(e) => {
          e.preventDefault();
          handleLogin();
        }}>
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
              Email address
            </label>
            <input
              id="email"
              type="email"
              required
              className="block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm px-3 py-2"
            />
          </div>
          <div>
            <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1">
              Password
            </label>
            <input
              id="password"
              type="password"
              required
              className="block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm px-3 py-2"
            />
          </div>
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <input
                id="remember-me"
                type="checkbox"
                className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
              />
              <label htmlFor="remember-me" className="ml-2 block text-sm text-gray-900">
                Remember me
              </label>
            </div>
            <div className="text-sm">
              <a href="#" className="font-medium text-blue-600 hover:text-blue-500">
                Forgot password?
              </a>
            </div>
          </div>
          <Button
            type="submit"
            variant="primary"
            className="w-full"
          >
            Sign in
          </Button>
          <p className="mt-4 text-center text-sm text-gray-500">
            Don't have an account? <a href="#" className="font-medium text-blue-600 hover:text-blue-500">Sign up</a>
          </p>
        </form>
        <p className="mt-6 text-center text-sm text-gray-500">
          © {new Date().getFullYear()} BCAED Reviewer App. All rights reserved.
        </p>
      </motion.div>
    </div>
  );
};

export default Login;