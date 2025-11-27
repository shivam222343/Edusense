import { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import LandingPage from './pages/LandingPage';
import Dashboard from './pages/Dashboard';
import AskDoubt from './pages/AskDoubt';
import DoubtsHistory from './pages/DoubtsHistory';
import Leaderboard from './pages/Leaderboard';
import Profile from './pages/Profile';
import Settings from './pages/Settings';
import UploadPage from './pages/UploadPage';
import ProtectedRoute from './components/ProtectedRoute';
import LoginModal from './components/LoginModal';
import SignupModal from './components/SignupModal';
import SetPasswordModal from './components/SetPasswordModal';
import MainLayout from './components/MainLayout';
import useAuthStore from './store/useAuthStore';

function App() {
  const { isAuthenticated, fetchUser } = useAuthStore();

  useEffect(() => {
    // Try to fetch user on app load (only once)
    fetchUser();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []); // Empty dependency array - only run once on mount

  return (
    <Router>
      <div className="App">
        {/* Auth Modals */}
        <LoginModal />
        <SignupModal />
        <SetPasswordModal />

        {/* Routes */}
        <Routes>
          <Route
            path="/"
            element={isAuthenticated ? <Navigate to="/dashboard" replace /> : <LandingPage />}
          />

          {/* Protected Routes with Layout */}
          <Route
            element={
              <ProtectedRoute>
                <MainLayout />
              </ProtectedRoute>
            }
          >
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/leaderboard" element={<Leaderboard />} />
            <Route path="/ask" element={<AskDoubt />} />
            <Route path="/doubts" element={<DoubtsHistory />} />
            <Route path="/upload" element={<UploadPage />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/settings" element={<Settings />} />
          </Route>

          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;