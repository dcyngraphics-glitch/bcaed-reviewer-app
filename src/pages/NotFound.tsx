import { Link } from 'react-router-dom';
import Button from '../components/Button';

const NotFound = () => {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center gap-4 bg-gray-50 p-4 text-center">
      <p className="text-5xl font-bold text-primary-600">404</p>
      <h1 className="text-2xl font-bold text-gray-900">Page not found</h1>
      <p className="text-gray-600">That page does not exist.</p>
      <Link to="/student/home">
        <Button variant="primary">Back to dashboard</Button>
      </Link>
    </div>
  );
};

export default NotFound;