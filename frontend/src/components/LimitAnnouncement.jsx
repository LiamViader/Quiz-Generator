import React from 'react';
import { Box, Typography, Button, Fade } from '@mui/material';
import LoginIcon from '@mui/icons-material/Login';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import { GoogleLogin } from '@react-oauth/google';

function LimitAnnouncement({ user, login }) {
  return (
    <Fade in={true} timeout={1000}>
      <Box
        sx={{
          position: 'fixed',
          bottom: '2rem',
          right: '2rem',
          padding: '0.8rem',
          borderRadius: '1rem',
          background: '#051923',
          border: '1px solid',
          borderColor: user ? '#7fffd4' : 'rgba(255, 255, 255, 0.1)',
          maxWidth: '300px', // Smaller width
          boxShadow: '0px 4px 10px rgba(0, 0, 0, 0.5)',
          backdropFilter: 'blur(5px)',
          width: 'fit-content',
          zIndex: 9999, // Ensure it's on top
        }}
      >
        {user ? (
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
            <CheckCircleIcon sx={{ color: '#7fffd4', fontSize: '1.2rem' }} />
            <Typography variant="body2" sx={{ color: 'white', fontSize: '0.8rem' }}>
              You have <b>{Math.max(0, (user.personalLimit || 10) - (user.dailyPersonalUsage || 0))}</b> generations left today.
            </Typography>
          </Box>
        ) : (
          <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 1 }}>
            <Typography variant="caption" sx={{ color: '#e0e0e0', fontSize: '0.8rem', textAlign: 'center' }}>
              Global Daily Limit: <b>10</b> quizzes/day across all guests.
            </Typography>
            <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 0.5 }}>
              <Typography variant="caption" sx={{ color: '#7fffd4', fontWeight: 'bold', fontSize: '0.85rem', textAlign: 'center' }}>
                Login to unlock <b>5</b> guaranteed generations just for you!
              </Typography>
              <Box sx={{ marginTop: '0.2rem', transform: 'scale(0.8)' }}>
                <GoogleLogin
                  onSuccess={login}
                  onError={() => {
                    console.log('Login Failed');
                  }}
                  theme="outline"
                  shape="pill"
                  size="medium"
                  sx={{ backgroundColor: '#7fffd4' }}
                />
              </Box>
            </Box>

          </Box>
        )}
      </Box>
    </Fade >
  );
}

export default LimitAnnouncement;
