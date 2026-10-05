import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';
import ErrorBoundary from '../components/ErrorBoundary';
import MainLayout from '../components/layout/MainLayout';
import Login from '../pages/auth/Login';
import StudentHome from '../pages/student/Home';
import ReviewPage from '../pages/review/ReviewPage';
import PracticePage from '../pages/practice/PracticePage';
import MockExamsPage from '../pages/mock-exams/MockExamsPage';
import MistakesPage from '../pages/mistakes/MistakesPage';
import ProgressPage from '../pages/progress/ProgressPage';
import AchievementsPage from '../pages/achievements/AchievementsPage';
import DiagnosticPage from '../pages/diagnostic/DiagnosticPage';
import ProfilePage from '../pages/profile/ProfilePage';
import AdminPage from '../pages/admin/AdminPage';
import NotFound from '../pages/NotFound';
import { AuthProvider, RedirectIfAuthenticated, RequireAuth } from './auth';
import { ProfileProvider } from '../context/ProfileContext';

/**
 * Single flat route tree. MainLayout is a layout route that renders <Outlet />,
 * so it supplies one Header/Footer for every protected page.
 *
 * ProfileProvider sits inside AuthProvider (it is per-student state) and wraps
 * the protected tree, so every page reads the same profile and stats.
 */
const AppRoutes = () => {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          {/* Public */}
          <Route
            path="/login"
            element={
              <RedirectIfAuthenticated>
                <Login />
              </RedirectIfAuthenticated>
            }
          />

          {/* Protected */}
          <Route
            element={
              <RequireAuth>
                <ProfileProvider>
                  <MainLayout />
                </ProfileProvider>
              </RequireAuth>
            }
          >
            <Route index element={<Navigate to="/student/home" replace />} />

            <Route path="student/home" element={<StudentHome />} />
            <Route path="review" element={<ReviewPage />} />
            <Route path="practice" element={<ErrorBoundary><PracticePage /></ErrorBoundary>} />
            <Route path="mock-exams" element={<ErrorBoundary><MockExamsPage /></ErrorBoundary>} />
            <Route path="mistakes" element={<MistakesPage />} />
            <Route path="progress" element={<ProgressPage />} />
            <Route path="achievements" element={<AchievementsPage />} />
            <Route path="diagnostic" element={<ErrorBoundary><DiagnosticPage /></ErrorBoundary>} />
            <Route path="profile" element={<ProfilePage />} />
            <Route path="admin" element={<AdminPage />} />

            {/* Old path kept alive so a bookmark or an old link still lands. */}
            <Route path="quiz" element={<Navigate to="/practice" replace />} />
          </Route>

          {/* Unknown URL: 404 rather than a bounce back to /login */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
};

export default AppRoutes;
