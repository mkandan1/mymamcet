import React, { useState, useEffect, lazy, Suspense } from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './App.css';
import { Login } from './v2/pages/Login'

function App() {
  return (
    <BrowserRouter>
      <div className='w-screen h-screen grid grid-cols-12 grid-rows-12'>
        <Routes>
          <Route path='/' element={<Login />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
