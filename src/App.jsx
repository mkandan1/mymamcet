import { useState, lazy } from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import './App.css';
import { HomePage } from './pages/HomePage';
import { LoginPage } from './pages/LoginPage';
import { DashboardPage } from './pages/DashboardPage'

// Allow the user to access Dashboard only if authenticated
const PrivateRoute = ({ element, isAuthenticated }) => {
  const url = window.location.href;
  if (isAuthenticated) {
    return element;
  } else {
    return <Navigate to={`/v1/auth/login?redirect_url=${url}`} />;
  }
};

// Redirect to the Dashboard if the user is authenticated
const PublicRoute = ({ element, isAuthenticated, restricted }) => {
  if (isAuthenticated && restricted) {
    return <Navigate to="/dashboard" />;
  } else {
    return element;
  }
};

function App() {
  const [isAuthenticated, setAuthenticated] = useState(false);

  return (
    <Router>
      <Routes>
        <Route
          path="/v1/auth/login"
          element={<PublicRoute restricted={false} isAuthenticated={isAuthenticated} element={<LoginPage />} />}
        />
        <Route
          path="/dashboard"
          element={<PrivateRoute isAuthenticated={isAuthenticated} element={<DashboardPage />} />}
        />
        <Route path="/"  element={<PrivateRoute restricted={true} isAuthenticated={isAuthenticated} element={<HomePage />} />} />
      </Routes>
    </Router>
  );
}

export default App;
