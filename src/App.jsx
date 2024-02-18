import { useState, useEffect } from 'react';
import { BrowserRouter, Route, Routes, useNavigate } from 'react-router-dom';
import { Login } from './pages/auth/Login';
import './App.css';
import { ForgotPassword } from './pages/auth/ForgotPassword';
import { Dashboard } from './pages/dashboard/Dashboard';
import { EmployeesOnboarding } from './pages/employees/EmployeesOnboarding';
import { useDispatch, useSelector } from 'react-redux';
import { MyProfile } from './pages/accounts/MyProfile';
import { Settings } from './pages/accounts/Settings';
import { Course } from './pages/courses/Course';
import { SubjectMapping } from './pages/courses/SubjectMapping';
import { Employees } from './pages/employees/Employees';
import { Notifications } from './pages/accounts/Notification';
import { NewCourses } from './pages/courses/NewCourses';
import { EditCourses } from './pages/courses/EditCourse';
import { Subjects } from './pages/courses/Subjects';
import { Icon } from '@iconify/react';
import { NewSubject } from './pages/courses/NewSubject';
import { EditSubject } from './pages/courses/EditSubject';
import { Students } from './pages/students/Students';
import { Batches } from './pages/courses/Batch';
import { NewBatch } from './pages/courses/NewBatch';
import { EditBatch } from './pages/courses/EditBatch';
import { MarkAllocation } from './pages/exam/MarkAllocation';
import { Auth } from './apis/auth/Auth';

function App() {
  const [showHeaderAndNavigation, setShowHeaderAndNavigation] = useState(true);
  const [loading, setLoading] = useState(true);
  const dispatch = useDispatch();
  const loggedIn = useSelector((state) => state.auth.loggedin);


  useEffect(() => {
    const checkLoggedIn = async () => {
      try {
        await Auth.init(dispatch);
        setLoading(false);
      } catch (error) {
        console.error('Error checking login status:', error);
        setLoading(false);
      }
    };

    checkLoggedIn();

    // Return a cleanup function if necessary
    return () => {
      // Clean-up code
    };
  }, []);


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
    return <div className='w-screen h-screen flex justify-center items-center'>
      <Icon icon={'eos-icons:three-dots-loading'} className='text-8xl' />
    </div>;
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
          <Route path="/web/courses/course/new" element={<NewCourses />} />
          <Route path="/web/courses/course/:id" element={<EditCourses />} />
          <Route path="/web/courses/subjects" element={<Subjects />} />
          <Route path="/web/courses/batches" element={<Batches />} />
          <Route path="/web/courses/batches/batch/new" element={<NewBatch />} />
          <Route path="/web/courses/batches/batch/:id" element={<EditBatch />} />
          <Route path="/web/courses/subjects/subject/new" element={<NewSubject />} />
          <Route path="/web/courses/subjects/subject/:id" element={<EditSubject />} />
          <Route path="/web/courses/subject-mapping" element={<SubjectMapping />} />
          <Route path="/web/students/all" element={<Students />} />
          <Route path="/web/exam/mark-allocation" element={<MarkAllocation />} />
          <Route path="/web/settings" element={<Settings />} />
          <Route path="/web/notifications" element={<Notifications />} />
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
