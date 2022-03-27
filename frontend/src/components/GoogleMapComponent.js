import axios from 'axios';
import React, { useEffect } from 'react';
import GoogleMapReact from 'google-map-react';
import RoomIcon from '@mui/icons-material/Room';

const Marker = () => (
  <div>
    <RoomIcon color="warning" sx={{ fontSize: '3rem' }} />
  </div>
);

const GoogleMapComponent = ({ lat, lng, name }) => {
  const latitude = Number(lat);
  const longitude = Number(lng);
  const [apiKey, setApiKey] = React.useState('');
  const getAPIkey = async () => {
    const { data } = await axios.get('/api/config/google-maps-api-key');
    setApiKey(data);
  };
  useEffect(() => {
    getAPIkey();
  }, []);
  if (!apiKey) return null;
  return (
    <div style={{ width: '100%', height: '50vh' }}>
      <GoogleMapReact
        bootstrapURLKeys={{ key: apiKey }}
        defaultCenter={{ lat: latitude, lng: longitude }}
        defaultZoom={16}
      >
        <Marker lat={latitude} lng={longitude} />
      </GoogleMapReact>
    </div>
  );
};

export default GoogleMapComponent;
