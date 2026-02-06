import React, { useState } from 'react';
import { Box, Typography, Button, Fade, IconButton } from '@mui/material';
import LoginIcon from '@mui/icons-material/Login';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import CloseIcon from '@mui/icons-material/Close';
import { GoogleLogin } from '@react-oauth/google';

function LimitAnnouncement({ user, login }) {
  const [open, setOpen] = useState(true);

  return (
    <Fade in={open} timeout={500} unmountOnExit>
      <Box
        sx={{
          position: 'fixed',
          bottom: '10%',
          right: '2rem',
          padding: '0.8rem',
          paddingRight: '2rem',
          borderRadius: '1rem',
          background: '#051923',
          border: '1px solid',
          borderColor: 'rgba(255, 255, 255, 0.1)',
          maxWidth: '300px', // Smaller width
          boxShadow: '0px 4px 10px rgba(0, 0, 0, 0.5)',
          backdropFilter: 'blur(5px)',
          width: 'fit-content',
          zIndex: 100, // Ensure it's below modals (usually 1300)
        }}
      >
        <IconButton
          size="small"
          onClick={() => setOpen(false)}
          sx={{
            position: 'absolute',
            top: 4,
            right: 4,
            color: 'rgba(255, 255, 255, 0.5)',
            '&:hover': { color: 'white' }
          }}
        >
          <CloseIcon fontSize="small" />
        </IconButton>

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
                  size="large"
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
