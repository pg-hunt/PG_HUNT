import * as React from 'react';
import LocalLaundryServiceIcon from '@mui/icons-material/LocalLaundryService';
import KitchenIcon from '@mui/icons-material/Kitchen';
import TvIcon from '@mui/icons-material/Tv';
import NetworkWifiIcon from '@mui/icons-material/NetworkWifi';
import KingBedIcon from '@mui/icons-material/KingBed';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';

export default function AmenitiesTable({
  laundry,
  refrigirator,
  tv,
  wifi,
  bed,
}) {
  return (
    <Box sx={{ p: 4, backgroundColor: '#2f2f2f', color: 'white' }}>
      <Typography variant="h5" gutterBottom sx={{ mt: 2 }}>
        Amenities Available:
      </Typography>
      <Grid container spacing={4} sx={{ my: 2 }}>
        {laundry && (
          <Grid item xs={4} md={3}>
            <LocalLaundryServiceIcon sx={{ fontSize: '2rem' }} />
          </Grid>
        )}
        {refrigirator && (
          <Grid item xs={4} md={3}>
            <KitchenIcon sx={{ fontSize: '2rem' }} />
          </Grid>
        )}
        {tv && (
          <Grid item xs={4} md={3}>
            <TvIcon sx={{ fontSize: '2rem' }} />
          </Grid>
        )}
        {wifi && (
          <Grid item xs={4} md={3}>
            <NetworkWifiIcon sx={{ fontSize: '2rem' }} />
          </Grid>
        )}
        {bed && (
          <Grid item xs={4} md={3}>
            <KingBedIcon sx={{ fontSize: '3rem' }} />
          </Grid>
        )}
      </Grid>
    </Box>
  );
}
