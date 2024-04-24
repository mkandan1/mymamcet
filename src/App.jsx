import React, { useState, useEffect, lazy, Suspense } from 'react';
import { BrowserRouter, Route, Routes, useNavigate } from 'react-router-dom';
import './App.css';
import { Login } from './v2/pages/Login'
import TopBarLoading from './v2/components/Loading/TopBarLoading';
import { FullScreenLoading } from './v2/components/Loading/FullScreenLoading';
import Auth from './v2/apis/auth/Auth';
import { Dashboard } from './v2/pages/Dashboard/Dashboard';
import { hideTopBarLoading, showTopBarLoading } from './v2/constant/LoadingIndicator';
import { useDispatch } from 'react-redux';

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(null);
  const [isCheckingAuthCompleted, setIsCheckingAuthCompleted] = useState(false);
  const dispatch = useDispatch();

  useEffect(() => {
    showTopBarLoading(dispatch)
    localStorage.getItem('mamcet_auth') ? setIsLoggedIn(true) : setIsLoggedIn(false);

    Auth.Authorization(dispatch)
      .then(status => {
        setIsLoggedIn(true);
      })
      .catch(err => {
        console.log(location.pathname);
        localStorage.removeItem('mamcet_auth')
        setIsLoggedIn(false);
      })
      .finally(() => {
        hideTopBarLoading(dispatch)
        setIsCheckingAuthCompleted(true)
      })
  })

  if (!isCheckingAuthCompleted) {
    return
  }

  return (
    <BrowserRouter>
      <div className='w-screen h-screen'>
        <TopBarLoading />
        {isLoggedIn ?
          <Routes>
            <Route path='/' element={<Dashboard />} />
            <Route path='/courses' element={<Dashboard />} />
            <Route path='/subjects' element={<Login />} />
          </Routes> :
          <Routes>
            <Route path='/*' element={<Login />} />
          </Routes>
        }
      </div>
    </BrowserRouter>
  );
}

export default App;
