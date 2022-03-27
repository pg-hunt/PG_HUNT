import React, { useState, useEffect } from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import AddIcon from '@mui/icons-material/Add';
// import { createTeamAction } from "./../actions/teamActions";
import { useDispatch, useSelector } from 'react-redux';
import MapsHomeWorkIcon from '@mui/icons-material/MapsHomeWork';
import FormGroup from '@mui/material/FormGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import { editPost, viewPost } from '../redux/actions/postActions';
import { useParams } from 'react-router-dom';

function EditPostScreen() {
  const dispatch = useDispatch();
  let params = useParams();
  const { current_post } = useSelector((state) => state.posts?.viewPost);

  const [name, setName] = useState('');
  const [location, setLocation] = useState(''); //lat:"",long:""
  const [description, setDescription] = useState('');
  const [address, setAddress] = useState('');
  const [types, setTypes] = useState(''); //[{ share: '', price: '' }]
  const [gender, setGender] = useState('');
  // const [meal, setMeal] = useState({ weekdays: [], weekends: [] });
  const [weekdays, setWeekdays] = useState('');
  const [weekends, setWeekends] = useState('');
  const [options, setOptions] = useState(null); // 'Veg-Only'|'Non-Veg'
  const [maintenance, setMaintenance] = useState(null);
  const [gateOpen, setGateOpen] = useState('00:00');
  const [gateClose, setGateClose] = useState('23:59');
  const [amenities, setAmenities] = useState({
    laundry: false,
    refrigerator: false,
    tv: false,
    wifi: false,
    bed: false,
  });
  const [contact, setContact] = useState('');
  const [media, setMedia] = useState('');

  useEffect(() => {
    dispatch(viewPost(params.id));
  }, []);

  useEffect(() => {
    if (current_post) {
      setName(current_post.name);
      setLocation(
        `${current_post.location?.lat},${current_post.location?.long}`
      );
      setDescription(current_post.description);
      setAddress(current_post.address);
      let tempTypes = '';
      current_post.types.forEach((type) => {
        tempTypes += type.share + ':' + type.price + ',';
      });
      tempTypes = tempTypes.slice(0, tempTypes.length - 1);
      setTypes(tempTypes);
      setGender(current_post.gender);
      setWeekdays(current_post.meal?.weekdays?.join(','));
      setWeekends(current_post.meal?.weekends?.join(','));
      setOptions(current_post.meal?.options);
      setMaintenance(current_post.maintenance);
      setGateOpen(current_post.gateOpen);
      setGateClose(current_post.gateClose);
      setAmenities(current_post.amenities);
      setContact(current_post.contact?.join(','));
      setMedia(current_post.media?.join(','));
    }
  }, [current_post]);

  const handleSubmit = (e) => {
    e.preventDefault();
    const postFormat = {
      name,
      location: {
        lat: location.split(',')[0].trim(),
        long: location.split(',')[1].trim(),
      },
      description,
      address,
      types: types.split(',').map((type) => {
        let data = { share: type.split(':')[0], price: type.split(':')[1] };
        return data;
      }),
      gender: gender.trim(),
      meal: {
        weekdays: weekdays.split(','),
        weekends: weekends.split(','),
        options,
      },

      maintenance,
      gateOpen,
      gateClose,
      amenities,
      contact: contact.split(',').map((c) => c.trim()),
      media: media.split(',').map((m) => m.trim()),
    };
    dispatch(editPost(params.id, postFormat));
  };
  return (
    <Box
      sx={{
        m: 3,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
      }}
    >
      <Avatar sx={{ m: 1, bgcolor: 'secondary.main', width: 70, height: 70 }}>
        <MapsHomeWorkIcon fontSize="large" />
      </Avatar>
      <Typography component="h1" variant="h5">
        Edit a PG Post
      </Typography>
      <Box component="form" onSubmit={handleSubmit} sx={{ mt: 1 }}>
        <TextField
          margin="normal"
          required
          fullWidth
          id="name"
          label="PG Name"
          name="pg-name"
          autoComplete="pg-name"
          autoFocus
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <TextField
          margin="normal"
          required
          fullWidth
          id="location"
          label="PG Location Coordinates"
          name="location"
          autoComplete="location"
          helperText="Enter comma separated lat,long ex: 12.9,77.5"
          value={location}
          onChange={(e) => setLocation(e.target.value)}
        />
        <TextField
          margin="normal"
          fullWidth
          id="description"
          label="PG Description"
          name="pg-description"
          autoComplete="pg-description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          multiline
        />
        <TextField
          margin="normal"
          required
          fullWidth
          id="address"
          label="PG address"
          name="pg-address"
          autoComplete="pg-address"
          value={address}
          onChange={(e) => setAddress(e.target.value)}
        />
        <TextField
          margin="normal"
          required
          fullWidth
          id="types"
          label="Room Sharing Types with Price"
          name="types"
          autoComplete="types"
          value={types}
          onChange={(e) => setTypes(e.target.value)}
          helperText="Enter comma separated types in format share:price ex: 1:8000,2:5000,3:3000"
        />
        <TextField
          margin="normal"
          required
          fullWidth
          id="gender"
          label="Gender"
          name="pg-gender"
          autoComplete="pg-gender"
          value={gender}
          onChange={(e) => setGender(e.target.value)}
          helperText="Boys or Girls or Both"
        />
        <TextField
          margin="normal"
          required
          fullWidth
          id="weekday-meal"
          label="Meals Provided on Weekdays"
          name="pg-weekday-meal"
          autoComplete="pg-weekday-meal"
          value={weekdays}
          onChange={(e) => setWeekdays(e.target.value)}
          helperText="Enter Comma Separated Values: Breakfast,Lunch,Dinner"
        />
        <TextField
          margin="normal"
          required
          fullWidth
          id="weekend-meal"
          label="Meals Provided on Weekends"
          name="pg-weekend-meal"
          autoComplete="pg-weekend-meal"
          value={weekends}
          onChange={(e) => setWeekends(e.target.value)}
          helperText="Enter Comma Separated Values: Breakfast,Lunch,Dinner"
        />
        <TextField
          margin="normal"
          required
          fullWidth
          id="options"
          label="Meal Type"
          name="pg-options"
          autoComplete="pg-options"
          value={options}
          onChange={(e) => setOptions(e.target.value)}
          helperText="Veg-Only or Non-Veg"
        />
        <TextField
          margin="normal"
          required
          fullWidth
          id="maintenance"
          label="Enter the Maintenance Period"
          name="pg-maintenance"
          autoComplete="pg-maintenance"
          value={maintenance}
          onChange={(e) => setMaintenance(e.target.value)}
          helperText="Every 10 days or 15 days etc."
          type="number"
        />
        <TextField
          margin="normal"
          fullWidth
          id="gateOpen"
          label="Gate Opening Time"
          name="pg-gateOpen"
          autoComplete="pg-gateOpen"
          value={gateOpen}
          onChange={(e) => setGateOpen(e.target.value)}
        />
        <TextField
          margin="normal"
          fullWidth
          id="gateClose"
          label="Gate Closing Time"
          name="pg-gateClose"
          autoComplete="pg-gateClose"
          value={gateClose}
          onChange={(e) => setGateClose(e.target.value)}
        />
        <FormGroup>
          <FormControlLabel
            control={
              <Checkbox
                checked={amenities.laundry}
                onChange={(e) => {
                  setAmenities((amenity) => {
                    return { ...amenity, laundry: e.target.checked };
                  });
                }}
              />
            }
            label="Laundry"
          />
          <FormControlLabel
            control={
              <Checkbox
                checked={amenities.refrigerator}
                onChange={(e) => {
                  setAmenities((amenity) => {
                    return { ...amenity, refrigerator: e.target.checked };
                  });
                }}
              />
            }
            label="Refrigerator"
          />
          <FormControlLabel
            control={
              <Checkbox
                checked={amenities.tv}
                onChange={(e) => {
                  setAmenities((amenity) => {
                    return { ...amenity, tv: e.target.checked };
                  });
                }}
              />
            }
            label="TV"
          />
          <FormControlLabel
            control={
              <Checkbox
                checked={amenities.wifi}
                onChange={(e) => {
                  setAmenities((amenity) => {
                    return { ...amenity, wifi: e.target.checked };
                  });
                }}
              />
            }
            label="Wi-Fi"
          />
          <FormControlLabel
            control={
              <Checkbox
                checked={amenities.bed}
                onChange={(e) => {
                  setAmenities((amenity) => {
                    return { ...amenity, bed: e.target.checked };
                  });
                }}
              />
            }
            label="Bed"
          />
        </FormGroup>
        <TextField
          margin="normal"
          required
          fullWidth
          id="contact"
          label="contact"
          name="contact"
          autoComplete="contact"
          helperText="Enter comma separated contact numbers ex: 9876543210,9876543211"
          value={contact}
          onChange={(e) => setContact(e.target.value)}
          type="number"
        />
        <TextField
          margin="normal"
          required
          fullWidth
          id="media"
          label="Media"
          name="media"
          autoComplete="media"
          helperText="Enter comma separated media(photo/video) links"
          value={media}
          onChange={(e) => setMedia(e.target.value)}
        />
        <Button
          type="submit"
          fullWidth
          variant="contained"
          sx={{ mt: 3, mb: 2 }}
          startIcon={<AddIcon />}
        >
          Edit a PG Post
        </Button>
      </Box>
    </Box>
  );
}

export default EditPostScreen;
