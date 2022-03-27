import React from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Grid";
import PGCard from "../components/PGCard";

const FavoritesScreen = () => {
  return (
    <Box sx={{ m: 4 }}>
      <Typography variant="h4" gutterBottom component="div">
        Favorites
      </Typography>
      <Grid container spacing={4}>
        {[1, 2, 3, 4, 5].map((id) => (
          <Grid key={id} item xs={12} md={3}>
            <PGCard
              photo="https://th.bing.com/th/id/R.cd67f461d656291a1bd4d8d8ff0c50df?rik=SDJuPa3f38AwHg&pid=ImgRaw&r=0"
              name="Aditya PG"
              address="#24 some colony Bangalore, 560078"
              amenities=""
              createdAt={Date.now()}
            />
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};

export default FavoritesScreen;
