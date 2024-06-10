import React from 'react';
import { Route, Routes } from 'react-router-dom'
import Home from './pages/home';
import PublicQuizzes from './pages/publicQuizzes';

function App() {

  return (
    <Routes>
      <Route path="/" element={<Home/>}/>
      <Route path="/publicQuizzes" element={<PublicQuizzes />} />
    </Routes>
  )
  
}

export default App
