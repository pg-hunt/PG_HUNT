import React from 'react';
import SearchComponent from './../components/SearchComponent';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import CoverImage from './../assets/pghunt-landing.svg';

const HomeScreen = () => {
  return (
    <Box sx={{ my: 4, mx: 2 }}>
      <Typography
        variant="h2"
        gutterBottom
        component="div"
        sx={{
          textAlign: 'center',
          fontSize: {
            xs: '1.5rem',
            sm: '2rem',
            md: '2.5rem',
          },
        }}
      >
        Stay closer to Home, While you are away
      </Typography>
      <SearchComponent isHome={true} />
      <img
        src={CoverImage}
        style={{
          position: 'fixed',
          bottom: 0,
          height: '50vh',
          zIndex: -1,
          left: '50%',
          right: '50%',
          transform: 'translateX(-50%)',
        }}
        alt="landing page cover"
      />
    </Box>
  );
};

export default HomeScreen;
