import React from 'react';
import { Route, Routes } from 'react-router-dom'
import Home from './pages/home';
import PublicQuizzes from './pages/publicQuizzes';

import LoginPage from './pages/LoginPage';
import PrivacyPolicy from './pages/PrivacyPolicy';
import TermsOfService from './pages/TermsOfService';
import Footer from './components/Footer';

function App() {

  return (
    <div className="drop-container" style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column', margin: 0, width: '100%', padding: 0 }}>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/publicQuizzes" element={<PublicQuizzes />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/privacy" element={<PrivacyPolicy />} />
        <Route path="/terms" element={<TermsOfService />} />
      </Routes>
      <Footer />
    </div>
  )

}

export default App
