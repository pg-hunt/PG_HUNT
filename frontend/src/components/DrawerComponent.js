import * as React from 'react';
import Box from '@mui/material/Box';
import SwipeableDrawer from '@mui/material/SwipeableDrawer';
import Button from '@mui/material/Button';
import List from '@mui/material/List';
import Divider from '@mui/material/Divider';
import ListItem from '@mui/material/ListItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import InboxIcon from '@mui/icons-material/MoveToInbox';
import MailIcon from '@mui/icons-material/Mail';
import Toolbar from '@mui/material/Toolbar';
import FavoriteIcon from '@mui/icons-material/Favorite';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import DynamicFeedIcon from '@mui/icons-material/DynamicFeed';
import AddIcon from '@mui/icons-material/Add';
import LogoutIcon from '@mui/icons-material/Logout';
import LoginIcon from '@mui/icons-material/Login';
import { useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { logout } from '../redux/actions/userActions';

export default function DrawerComponent({ open, toggleDrawer }) {
  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;
  const dispatch = useDispatch();
  const navigator = useNavigate();

  const handleLogout = () => {
    toggleDrawer(false);
    dispatch(logout());
  };

  const handleLogin = () => {
    toggleDrawer(false);
    navigator('/login');
  };

  const list = () => (
    <Box
      sx={{ width: 250 }}
      role="presentation"
      onClick={toggleDrawer(false)}
      onKeyDown={toggleDrawer(false)}
    >
      {userInfo ? (
        <>
          <List dense={true}>
            <ListItem
              button
              onClick={() => {
                navigator('/create');
              }}
            >
              <ListItemIcon>
                <AddIcon />
              </ListItemIcon>
              <ListItemText primary="Create Post" />
            </ListItem>
            <ListItem
              button
              onClick={() => {
                navigator('/myPosts');
              }}
            >
              <ListItemIcon>
                <DynamicFeedIcon />
              </ListItemIcon>
              <ListItemText primary="My Posts" />
            </ListItem>
          </List>
          <Box
            role="presentation"
            // sx={{
            //   marginTop: 'auto',
            //   position: 'absolute',
            //   bottom: 0,
            //   right: 0,
            //   left: 0,
            //   zIndex: 2,
            // }}
            keepMounted
          >
            <Divider />
            <List dense={true}>
              <ListItem
                button
                onClick={() => {
                  navigator('/favorites');
                }}
              >
                <ListItemIcon>
                  <FavoriteIcon />
                </ListItemIcon>
                <ListItemText primary="Favorites" />
              </ListItem>
              <ListItem
                button
                onClick={() => {
                  navigator('/profile');
                }}
              >
                <ListItemIcon>
                  <AccountCircleIcon />
                </ListItemIcon>
                <ListItemText primary="Profile" />
              </ListItem>
              <ListItem button onClick={handleLogout}>
                <ListItemIcon>
                  <LogoutIcon />
                </ListItemIcon>
                <ListItemText primary="Logout" />
              </ListItem>
            </List>
          </Box>
        </>
      ) : (
        <List dense={true}>
          <ListItem button onClick={handleLogin}>
            <ListItemIcon>
              <LoginIcon />
            </ListItemIcon>
            <ListItemText primary="Login" />
          </ListItem>
        </List>
      )}
    </Box>
  );

  return (
    <div>
      <SwipeableDrawer
        anchor={'left'}
        open={open}
        onClose={toggleDrawer(false)}
        onOpen={toggleDrawer(true)}
      >
        <Toolbar />
        <Divider />
        {list()}
      </SwipeableDrawer>
    </div>
  );
}
