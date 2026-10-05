import { Outlet } from 'react-router-dom';
import Header from './Header';
import Footer from './Footer';
import Sidebar from './Sidebar';
import OfflineBanner from './OfflineBanner';

/**
 * Renders its own Header and Footer. AppRoutes must NOT also render them or
 * every protected page shows two of each.
 *
 * Children come through <Outlet /> because this is used as a layout route.
 */
const MainLayout = () => {
  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <OfflineBanner />
      <Header />
      <div className="flex flex-1">
        <Sidebar />
        <main className="flex-1 p-6 overflow-y-auto">
          <Outlet />
        </main>
      </div>
      <Footer />
    </div>
  );
};

export default MainLayout;