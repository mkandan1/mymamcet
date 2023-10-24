import { useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import './App.css';
import { LoadingPage } from './pages/LoadingPage';
import { LoginPage } from './pages/LoginPage';
import { DashboardPage } from './pages/DashboardPage';
import { getAuth, onAuthStateChanged } from 'firebase/auth';
import { app } from './FirebaseConfig'
import { useSelector, useDispatch } from 'react-redux'
import { LOGIN, LOGOUT, REMOVE_LOADING } from './actionTypes/actionTypes';
import { ExamManagementPage } from './pages/ExamManagementPage';

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
  const isAuthenticated = useSelector((state) => (state.auth.isAuthenticated))
  const dispatch = useDispatch();
  const isLoading = useSelector((state) => (state.loading.isLoading));

  useEffect(() => {
    const auth = getAuth(app)
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        dispatch(LOGIN());
        dispatch(REMOVE_LOADING());
      }
      else {
        dispatch(LOGOUT());
        dispatch(REMOVE_LOADING());
      }
    }, [])

    return () => {
      unsubscribe();
    };
  });

  if (isLoading) {
    return (
      <>
        <LoadingPage />
      </>
    )
  }

  return (
    <Router>
      <Routes>
        <Route
          path="/v1/auth/login"
          element={<PublicRoute restricted={false} isAuthenticated={isAuthenticated} element={<LoginPage />} />}
        />
        <Route
          path="/v1/auth/signup"
          element={<PublicRoute restricted={false} isAuthenticated={isAuthenticated} element={<LoginPage />} />}
        />
        <Route
          path="/"
          element={<PrivateRoute restricted={true} isAuthenticated={isAuthenticated} element={<DashboardPage />} />}
        />
        <Route
          path="/management/exam"
          element={<PrivateRoute restricted={true} isAuthenticated={isAuthenticated} element={<ExamManagementPage />} />}
        />
      </Routes>
    </Router>
  );
}

export default App;
