import React from 'react';
import { Route, Routes } from 'react-router-dom'
import Home from './pages/home';
import PublicQuizzes from './pages/publicQuizzes';

import LoginPage from './pages/LoginPage';

function App() {

  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/publicQuizzes" element={<PublicQuizzes />} />
      <Route path="/login" element={<LoginPage />} />
    </Routes>
  )

}

export default App
