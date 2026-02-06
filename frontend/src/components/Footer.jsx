import React from 'react';
import { Box, Container, Typography, Link, Stack } from '@mui/material';
import { Link as RouterLink } from 'react-router-dom';

function Footer() {
  return (
    <Box
      component="footer"
      sx={{
        py: 2,
        px: 2,
        mt: 'auto',
        backgroundColor: '#051923',
        color: 'white',
        borderTop: '1px solid rgba(255,255,255,0.1)'
      }}
    >
      <Container maxWidth="lg">
        <Stack
          direction={{ xs: 'column', sm: 'row' }}
          spacing={{ xs: 2, sm: 4 }}
          justifyContent="center"
          alignItems="center"
        >
          <Typography variant="body2" color="#7fffd4" align="center" display={{ xs: 'hidden', sm: 'block' }}>
            © {new Date().getFullYear()} Quiz Generator
          </Typography>
          <Stack direction="row" spacing={3}>
            <Link
              component={RouterLink}
              to="/privacy"
              color="inherit"
              underline="hover"
              sx={{ '&:hover': { color: '#7fffd4' } }}
            >
              Privacy Policy
            </Link>
            <Link
              component={RouterLink}
              to="/terms"
              color="inherit"
              underline="hover"
              sx={{ '&:hover': { color: '#7fffd4' } }}
            >
              Terms of Service
            </Link>
          </Stack>
          <Typography variant="body2" color="#7fffd4" align="center" display={{ xs: 'block', sm: 'hidden' }}>
            © {new Date().getFullYear()} Quiz Generator
          </Typography>
        </Stack>
      </Container>
    </Box>
  );
}

export default Footer;
