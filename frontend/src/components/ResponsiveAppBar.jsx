import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Menu from '@mui/material/Menu';
import MenuIcon from '@mui/icons-material/Menu';
import Container from '@mui/material/Container';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import Tooltip from '@mui/material/Tooltip';
import MenuItem from '@mui/material/MenuItem';
import QuizIcon from '@mui/icons-material/Quiz';
import { NavLink, useLocation, useNavigate } from 'react-router-dom';

import { useAuth } from '../context/AuthContext';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import { GoogleLogin } from '@react-oauth/google';

function ResponsiveAppBar({ pages }) {
  const [anchorElNav, setAnchorElNav] = React.useState(null);
  const [anchorElUser, setAnchorElUser] = React.useState(null);
  const { user, logout, login } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const handleOpenNavMenu = (event) => {
    setAnchorElNav(event.currentTarget);
  };
  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  const handleLogout = () => {
    logout();
    handleCloseUserMenu();
    navigate('/');
  }

  return (
    <AppBar position="sticky" sx={{ backgroundColor: '#051923', borderBottom: '1px solid #7fffd4', boxShadow: '0 4px 6px rgba(0,0,0,0.3)' }} >
      <Container maxWidth={false}>
        <Toolbar disableGutters>

          {/* --- LEFT SECTION: DESKTOP LOGO --- */}
          <Box sx={{ display: { xs: 'none', md: 'flex' }, alignItems: 'center' }}>
            <NavLink to="/" style={{ textDecoration: 'none', color: 'inherit', display: 'flex', alignItems: 'center' }}>
              <QuizIcon sx={{ display: { xs: 'none', md: 'flex' }, mr: 1, color: '#7fffd4', fontSize: '2rem' }} />
            </NavLink>
          </Box>

          {/* --- MOBILE LEFT: MENU (Replacing Logo) --- */}
          <Box sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' }, alignItems: 'center' }}>
            <IconButton
              size="large"
              aria-label="account of current user"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              onClick={handleOpenNavMenu}
              color="inherit"
              sx={{ color: '#7fffd4', pl: 0 }}
            >
              <MenuIcon sx={{ fontSize: '2rem' }} />
            </IconButton>
            <Menu
              id="menu-appbar"
              anchorEl={anchorElNav}
              anchorOrigin={{
                vertical: 'bottom',
                horizontal: 'left',
              }}
              keepMounted
              transformOrigin={{
                vertical: 'top',
                horizontal: 'left',
              }}
              open={Boolean(anchorElNav)}
              onClose={handleCloseNavMenu}
              sx={{
                display: { xs: 'block', md: 'none' },
                '& .MuiPaper-root': {
                  backgroundColor: 'white',
                  color: '#051923',
                  border: '1px solid #e0e0e0',
                  borderRadius: '15px',
                  boxShadow: '0px 4px 20px rgba(0,0,0,0.1)',
                },
                '& .MuiList-root': {
                  padding: 0,
                }
              }}
            >
              {pages.map((page) => {
                const isActive = location.pathname === page.rout;
                return (
                  <MenuItem
                    key={page.name}
                    onClick={handleCloseNavMenu}
                    sx={{
                      backgroundColor: isActive ? 'rgb(235, 235, 235)' : 'white',
                      '&:hover': {
                        backgroundColor: !isActive ? 'rgb(240, 240, 240)' : 'rgb(235, 235, 235)'
                      },
                      padding: '12px 20px',
                    }}
                  >
                    <NavLink to={page.rout} style={{ textDecoration: 'none', color: 'inherit', width: '100%' }}>
                      <Typography textAlign="center" sx={{ fontFamily: 'monospace', fontWeight: isActive ? 700 : 500 }}>{page.name}</Typography>
                    </NavLink>
                  </MenuItem>
                )
              })}
            </Menu>
          </Box>


          {/* --- MIDDLE SECTION: NAV LINKS (Desktop Only) --- */}
          <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' }, justifyContent: 'center', gap: 2 }}>
            {pages.map((page) => {
              const isActive = location.pathname === page.rout;
              return (
                <Button
                  key={page.name}
                  onClick={handleCloseNavMenu}
                  component={NavLink}
                  to={page.rout}
                  sx={{
                    my: 2,
                    color: isActive ? '#7fffd4' : 'white',
                    display: 'block',
                    fontSize: '1rem',
                    fontFamily: 'monospace',
                    fontWeight: isActive ? 700 : 400,
                    '&:hover': {
                      backgroundColor: 'transparent',
                      color: '#7fffd4',
                    }
                  }}
                >
                  <Box component="span" sx={{
                    position: 'relative',
                    display: 'inline-block',
                    '&::after': {
                      content: '""',
                      position: 'absolute',
                      width: isActive ? '100%' : '0',
                      height: '2px',
                      bottom: '-2px',
                      left: '0',
                      backgroundColor: '#7fffd4',
                      transition: 'width 0.3s ease-in-out',
                    },
                    '&:hover::after': {
                      width: '100%',
                    }
                  }}>
                    {page.name}
                  </Box>
                </Button>
              )
            })}
          </Box>

          {/* --- RIGHT SECTION: USER --- */}
          <Box sx={{ flexGrow: 0 }}>
            {user ? (
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                <Typography sx={{ color: '#7fffd4', fontFamily: 'monospace', display: { xs: 'none', sm: 'block' } }}>
                  Remaining: {Math.max(0, (user.personalLimit || 10) - (user.dailyPersonalUsage || 0))}
                </Typography>
                <Tooltip title="Open settings">
                  <IconButton onClick={handleOpenUserMenu} sx={{ p: 0, border: '2px solid transparent', '&:hover': { border: '2px solid #7fffd4', transition: 'border 0.2s' } }}>
                    <Avatar alt={user.name} src={user.picture} />
                  </IconButton>
                </Tooltip>
              </Box>
            ) : (
              <Tooltip title="Login">
                <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                  <AccountCircleIcon sx={{ color: '#7fffd4', fontSize: 40, transition: 'transform 0.2s', '&:hover': { transform: 'scale(1.1)' } }} />
                </IconButton>
              </Tooltip>
            )}
            <Menu
              sx={{
                mt: '45px',
                '& .MuiPaper-root': {
                  backgroundColor: 'white',
                  color: '#051923',
                  border: '1px solid #e0e0e0',
                  borderRadius: '15px',
                  boxShadow: '0px 4px 20px rgba(0,0,0,0.1)',
                },
                '& .MuiList-root': {
                  padding: 0,
                }
              }}
              id="menu-appbar"
              anchorEl={anchorElUser}
              anchorOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
              keepMounted
              transformOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
              open={Boolean(anchorElUser)}
              onClose={handleCloseUserMenu}
            >
              {user ? (
                <MenuItem onClick={handleLogout} sx={{ '&:hover': { backgroundColor: 'rgba(127, 255, 212, 0.1)' }, padding: '12px 20px' }}>
                  <Typography textAlign="center">Logout</Typography>
                </MenuItem>
              ) : (
                <Box sx={{ padding: '10px' }}>
                  <GoogleLogin
                    onSuccess={(credentialResponse) => {
                      handleCloseUserMenu();
                      login(credentialResponse);
                    }}
                    onError={() => {
                      console.log('Login Failed');
                    }}
                    theme="outline"
                    shape="pill"
                    size="large"
                  />
                </Box>
              )}
            </Menu>
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
}

export default ResponsiveAppBar;