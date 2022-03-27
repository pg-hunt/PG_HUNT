import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { viewPost } from '../redux/actions/postActions';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import ImageSlider from '../components/ImageSlider';
import Typography from '@mui/material/Typography';
import dayjs from 'dayjs';
import Stack from '@mui/material/Stack';
import LocalLaundryServiceIcon from '@mui/icons-material/LocalLaundryService';
import KitchenIcon from '@mui/icons-material/Kitchen';
import TvIcon from '@mui/icons-material/Tv';
import NetworkWifiIcon from '@mui/icons-material/NetworkWifi';
import KingBedIcon from '@mui/icons-material/KingBed';
// import GoogleMapComponent from '../components/GoogleMapComponent';

const ViewPostByIdScreen = () => {
  const dispatch = useDispatch();
  let params = useParams();
  const { current_post } = useSelector((state) => state.posts?.viewPost);

  useEffect(() => {
    dispatch(viewPost(params.id));
  }, [dispatch, params.id]);
  if (!current_post) return null;
  return (
    <Box sx={{ m: 2 }}>
      <Grid container spacing={4}>
        <Grid item xs={12} md={6}>
          <ImageSlider images={current_post.media} />
        </Grid>
        <Grid item xs={12} md={6}>
          <Box sx={{ p: 2 }}>
            <Typography variant="caption" gutterBottom>
              <b>Created At :</b>{' '}
              {dayjs(current_post.createdAt).format('hh:mm A, DD MMM YYYY')}
            </Typography>
            <Typography variant="h4" gutterBottom>
              {current_post.name}
            </Typography>
            <Typography variant="body1" gutterBottom>
              <b>Address: </b> {current_post.address}
            </Typography>
            <Typography variant="body1" gutterBottom>
              <b>Allowed Gender: </b> {current_post.gender}
            </Typography>
            <Typography variant="body1" gutterBottom>
              <b>Meals on Weekdays : </b>{' '}
              {current_post.meal?.weekdays?.join(', ')}
            </Typography>
            <Typography variant="body1" gutterBottom>
              <b>Meals on Weekends : </b>{' '}
              {current_post.meal?.weekends?.join(', ')}
            </Typography>
            <Typography variant="body1" gutterBottom>
              <b>Meals Type : </b> {current_post.meal?.options}
            </Typography>
            <Typography variant="body1" gutterBottom>
              <b>Maintenance</b> : {current_post.maintenance}
            </Typography>
            <Typography variant="body1" gutterBottom>
              <b>Gate Open Timings</b> : {current_post.gateOpen}
            </Typography>
            <Typography variant="body1" gutterBottom>
              <b>Gate Close Timings</b> : {current_post.gateClose}
            </Typography>
            <Stack sx={{ mt: 2 }}>
              {current_post.types?.map((type) => (
                <>
                  <Typography variant="h4" gutterBottom key={type}>
                    ₹{type.price}/
                    <Typography variant="overline" gutterBottom key={type}>
                      {type.share} person room
                    </Typography>
                  </Typography>
                </>
              ))}
            </Stack>
          </Box>
        </Grid>
      </Grid>
      <Box sx={{ p: 4, backgroundColor: '#2f2f2f', color: 'white' }}>
        <Typography variant="h5" gutterBottom sx={{ mt: 2 }}>
          Amenities Available:
        </Typography>
        <Grid container spacing={4} sx={{ my: 2 }}>
          {current_post.amenities?.laundry && (
            <Grid item xs={3} md={2}>
              <LocalLaundryServiceIcon sx={{ fontSize: '2rem' }} />
            </Grid>
          )}
          {current_post.amenities?.refrigirator && (
            <Grid item xs={3} md={2}>
              <KitchenIcon sx={{ fontSize: '2rem' }} />
            </Grid>
          )}
          {current_post.amenities?.tv && (
            <Grid item xs={3} md={2}>
              <TvIcon sx={{ fontSize: '2rem' }} />
            </Grid>
          )}
          {current_post.amenities?.wifi && (
            <Grid item xs={3} md={2}>
              <NetworkWifiIcon sx={{ fontSize: '2rem' }} />
            </Grid>
          )}
          {current_post.amenities?.bed && (
            <Grid item xs={3} md={2}>
              <KingBedIcon sx={{ fontSize: '3rem' }} />
            </Grid>
          )}
        </Grid>
      </Box>
      <Grid container spacing={4}>
        <Grid item xs={12} md={6}>
          {/* <GoogleMapComponent
            lat={current_post.location?.lat}
            lng={current_post.location?.long}
            text={current_post.name}
          /> */}
        </Grid>
        <Grid item xs={12} md={6}>
          <Typography variant="h5" gutterBottom sx={{ mt: 2 }}>
            Contact Numbers:
          </Typography>
          <Typography variant="body1" gutterBottom sx={{ mt: 2 }}>
            {current_post.contact?.map((number) => number + ', ')}
          </Typography>
        </Grid>
      </Grid>
    </Box>
  );
};

export default ViewPostByIdScreen;
