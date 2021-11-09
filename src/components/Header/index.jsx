import CloseIcon from '@mui/icons-material/Close';
import CodeIcon from '@mui/icons-material/Code';
import { IconButton, Menu, MenuItem } from '@mui/material';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogContent from '@mui/material/DialogContent';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import { makeStyles } from '@mui/styles';
import * as React from 'react';
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, NavLink } from 'react-router-dom';
import Login from '../../features/Auth/components/Login';
import Register from '../../features/Auth/components/Register';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import { logout } from '../../features/Auth/userSlice';

const useStyles = makeStyles((theme) => ({
  link: {
    textDecoration: 'none',
    color: '#fff',
  },

  linkChangeMode: {
    textTransform: 'none',
  },
}));

const MODE = {
  LOGIN: 'login',
  REGISTER: 'register',
};

export default function Header() {
  const classes = useStyles();
  const dispatch = useDispatch();

  const [open, setOpen] = useState(false);
  const [mode, setMode] = useState(MODE.LOGIN);
  const [anchorEl, setAnchorEl] = useState(null);
  const openMenu = Boolean(anchorEl);

  const currentUser = useSelector((state) => state.user.current);
  const isLoggedIn = !!currentUser.id;

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleLogout = () => {
    setAnchorEl(null);
    dispatch(logout());
  };

  return (
    <div>
      <Box sx={{ flexGrow: 1 }}>
        <AppBar position="static">
          <Toolbar>
            <CodeIcon sx={{ mr: 2 }} />
            <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
              <Link to="/" className={classes.link}>
                Kid-App
              </Link>
            </Typography>

            <NavLink to="/todos" className={classes.link}>
              <Button color="inherit">Todos</Button>
            </NavLink>
            <NavLink to="/albums" className={classes.link}>
              <Button color="inherit">Albums</Button>
            </NavLink>

            {!isLoggedIn && (
              <Button color="inherit" onClick={handleClickOpen}>
                Login
              </Button>
            )}

            {isLoggedIn && (
              <IconButton color="inherit" onClick={(event) => setAnchorEl(event.currentTarget)}>
                <AccountCircleIcon />
              </IconButton>
            )}
          </Toolbar>
        </AppBar>
      </Box>

      <Menu
        id="basic-menu"
        anchorEl={anchorEl}
        open={openMenu}
        onClose={() => setAnchorEl(null)}
        MenuListProps={{
          'aria-labelledby': 'basic-button',
        }}
      >
        <MenuItem>Profile</MenuItem>
        <MenuItem onClick={handleLogout}>Logout</MenuItem>
      </Menu>

      <Dialog open={open}>
        <IconButton sx={{ position: 'absolute', top: 1, right: 1 }} onClick={handleClose}>
          <CloseIcon />
        </IconButton>
        <DialogContent>
          {mode === MODE.LOGIN && (
            <>
              <Login onCloseDialog={handleClose} />
              <Box textAlign="right">
                <Button
                  sx={{ textTransform: 'none' }}
                  color="primary"
                  onClick={() => setMode(MODE.REGISTER)}
                >
                  Don't have an account? Sign Up
                </Button>
              </Box>
            </>
          )}

          {mode === MODE.REGISTER && (
            <>
              <Register onCloseDialog={handleClose} />
              <Box textAlign="right">
                <Button
                  sx={{ textTransform: 'none' }}
                  color="primary"
                  onClick={() => setMode(MODE.LOGIN)}
                >
                  Already have an account? Sign in
                </Button>
              </Box>
            </>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}
