import { useState, useEffect } from 'react';
import { BrowserRouter, Route, Routes, useNavigate } from 'react-router-dom';
import { Login } from './pages/auth/Login';
import './App.css';
import { ForgotPassword } from './pages/auth/ForgotPassword';
import { Dashboard } from './pages/dashboard/Dashboard';
import { Header } from './components/Header';
import { Navigation } from './components/Navigation';
import { EmployeesOnboarding } from './pages/employees/EmployeesOnboarding';
import { authorization } from './apis/auth/authorization';
import { useDispatch, useSelector } from 'react-redux';
import { MyProfile } from './pages/accounts/MyProfile';
import { Course } from './pages/courses/Course';
import { Employees } from './pages/employees/Employees';

function App() {
  const [showHeaderAndNavigation, setShowHeaderAndNavigation] = useState(true);
  const [loading, setLoading] = useState(true); // Added loading state
  const dispatch = useDispatch();
  const [loggedIn, setLoggedIn] = useState(useSelector((state) => state.auth.loggedin));


  useEffect(() => {
    handleAuthRoutes();

    const checkAuth = async () => {
      try {
        const result = await authorization(dispatch);
        setLoggedIn(result)
      } finally {
        setTimeout(()=> {
          setLoading(false); 
        },1000)// Set loading to false after authorization completes
      }
    };

    console.log(loggedIn);

    checkAuth();
  }, [loggedIn]);

  const handleAuthRoutes = () => {
    const currentPath = window.location.pathname;

    if (currentPath === '/v1/auth/login' || currentPath === '/v1/auth/forgot-password') {
      setShowHeaderAndNavigation(false);
    } else {
      setShowHeaderAndNavigation(true);
    }
  };

  if (loading) {
    // Render loading indicator here
    return <div>Loading...</div>;
  }

  return (
    <BrowserRouter>
      {loggedIn ? (
        <Routes>
          <Route path="/web" element={<Dashboard />} />
          <Route path="/web/employees/onboarding" element={<EmployeesOnboarding />} />
          <Route path="/web/employees/all" element={<Employees />} />
          <Route path="/web/user/profile" element={<MyProfile />} />
          <Route path="/web/admissions/registry" element={<Course />} />
          <Route path="/web/courses/all" element={<Course />} />
          <Route path="/web/courses/subject-mapping" element={<Course />} />
          <Route path="/web/settings" element={<Course />} />
        </Routes>
      ) : (
        <Routes>
        <Route
            path="/v1/auth/login"
            element={<Login onEnter={() => handleAuthRoutes()} />}
          />
          <Route
            path="*"
            element={<Login onEnter={() => handleAuthRoutes()} />}
          />
          <Route
            path="/v1/auth/forgot-password"
            element={<ForgotPassword onEnter={() => handleAuthRoutes()} />}
          />
        </Routes>
      )}
    </BrowserRouter>
  );
}

export default App;
