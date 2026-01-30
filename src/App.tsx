import { Routes, Route, Navigate } from "react-router-dom";
import "./App.css";
import { useAuth } from "./contexts/AuthContext";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import HomePage from "./pages/HomePage";
import EventPage from "./pages/EventPage";
import TournamentPage from "./pages/TournamentPage";
import ProtectedRoute from "./components/ProtectedRoute";

function App() {
  const { isAuthenticated } = useAuth();

  return (
    <Routes>
      <Route
        path="/login"
        element={isAuthenticated ? <Navigate to="/" replace /> : <LoginPage />}
      />
      <Route
        path="/register"
        element={
          isAuthenticated ? <Navigate to="/" replace /> : <RegisterPage />
        }
      />
      <Route
        path="/"
        element={
          <ProtectedRoute>
            <HomePage />
          </ProtectedRoute>
        }
      />
      <Route
        path="/events"
        element={
          <ProtectedRoute>
            <EventPage />
          </ProtectedRoute>
        }
      />
      <Route
        path="/tournaments"
        element={
          <ProtectedRoute>
            <TournamentPage />
          </ProtectedRoute>
        }
      />
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}

export default App;
