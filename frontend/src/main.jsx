import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { BrowserRouter } from "react-router-dom";

import { GoogleOAuthProvider } from '@react-oauth/google';
import { AuthProvider } from './context/AuthContext';
import { QuizProvider } from './context/QuizContext';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <GoogleOAuthProvider clientId={import.meta.env.VITE_GOOGLE_CLIENT_ID || "YOUR_GOOGLE_CLIENT_ID_PLACEHOLDER"}>
      <AuthProvider>
        <QuizProvider>
          <BrowserRouter>
            <App />
          </BrowserRouter>
        </QuizProvider>
      </AuthProvider>
    </GoogleOAuthProvider>
  </React.StrictMode>,
)
