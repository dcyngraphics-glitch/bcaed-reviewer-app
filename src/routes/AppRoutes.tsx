import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';
import MainLayout from '../components/layout/MainLayout';
import Login from '../pages/auth/Login';
import QuizPage from '../pages/quiz/QuizPage';
import StudentHome from '../pages/student/Home';
import NotFound from '../pages/NotFound';
import { AuthProvider, RedirectIfAuthenticated, RequireAuth } from './auth';

/**
 * Single flat route tree. The previous version nested <Routes> inside a
 * pathless layout <Route> with absolute child paths, so no protected route ever
 * matched and React Router warned about it at runtime.
 *
 * MainLayout renders <Outlet /> and supplies its own Header/Footer.
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

          {/* Protected: MainLayout is the layout route, children come via Outlet */}
          <Route
            element={
              <RequireAuth>
                <MainLayout />
              </RequireAuth>
            }
          >
            <Route index element={<Navigate to="/student/home" replace />} />
            <Route path="student/home" element={<StudentHome />} />
            <Route path="quiz" element={<QuizPage />} />
          </Route>

          {/* Unknown URL: 404 rather than a bounce back to /login */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
};

export default AppRoutes;