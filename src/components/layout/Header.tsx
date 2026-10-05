import Button from '../Button';
import { useAuth } from '../../routes/auth';

const Header = () => {
  const { logout } = useAuth();

  return (
    <header className="bg-white shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex items-center justify-between gap-4">
        <h1 className="text-2xl font-bold text-gray-900">BCAED Reviewer App</h1>
        {/* There was no way to sign out anywhere in the app. */}
        <Button variant="outline" size="sm" onClick={logout}>
          Sign out
        </Button>
      </div>
    </header>
  );
};

export default Header;