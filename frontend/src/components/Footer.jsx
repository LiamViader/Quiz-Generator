import React from 'react';
import { Box, Container, Typography, Link, Stack } from '@mui/material';
import { Link as RouterLink } from 'react-router-dom';

function Footer() {
  return (
    <Box
      component="footer"
      sx={{
        py: 3,
        px: 2,
        mt: 'auto',
        backgroundColor: '#051923',
        color: 'white',
        borderTop: '1px solid #7fffd4'
      }}
    >
      <Container maxWidth="lg">
        <Stack
          direction={{ xs: 'column', sm: 'row' }}
          spacing={{ xs: 2, sm: 4 }}
          justifyContent="center"
          alignItems="center"
        >
          <Typography variant="body2" color="#7fffd4" align="center">
            © {new Date().getFullYear()} Quiz Generator. All rights reserved.
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
        </Stack>
      </Container>
    </Box>
  );
}

export default Footer;
