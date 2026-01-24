import React from 'react';
import { GoogleLogin } from '@react-oauth/google';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import ResponsiveAppBar from '../components/ResponsiveAppBar';
import { Typography, Paper } from '@mui/material';

function LoginPage() {
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSuccess = (credentialResponse) => {
    login(credentialResponse);
    navigate('/'); // Redirect to home after login
  };

  return (
    <>
      <ResponsiveAppBar pages={[{ name: 'Home', rout: '/' }, { name: 'Public Quizzes', rout: '/publicQuizzes' }]} />
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', height: '80vh' }}>
        <Paper elevation={3} style={{ padding: '3rem', display: 'flex', flexDirection: 'column', alignItems: 'center', borderRadius: '15px' }}>
          <Typography variant="h4" gutterBottom style={{ color: '#051923', marginBottom: '2rem' }}>
            Login with Google
          </Typography>
          <Typography variant="body1" style={{ marginBottom: '2rem', textAlign: 'center', color: 'gray' }}>
            Sign in to get 10 extra daily quiz generations!
          </Typography>
          <GoogleLogin
            onSuccess={handleSuccess}
            onError={() => {
              console.log('Login Failed');
            }}
          />
        </Paper>
      </div>
    </>
  );
}

export default LoginPage;
