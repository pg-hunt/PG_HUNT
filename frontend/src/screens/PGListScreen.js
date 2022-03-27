import React from 'react';
import Box from '@mui/material/Box';
import SearchComponent from './../components/SearchComponent';
import { useSelector } from 'react-redux';
import MyPGPostCard from './../components/MyPGPostCard';
import Grid from '@mui/material/Grid';

const PGListScreen = () => {
  const { all_posts } = useSelector((state) => state.posts.search);
  //   if (!all_posts) return null;
  return (
    <>
      <Box sx={{ my: 4, mx: 2 }}>
        <SearchComponent />
      </Box>
      <Box sx={{ m: 3 }}>
        <Grid container spacing={2} alignItems="stretch">
          {all_posts?.map((post) => (
            <Grid
              item
              xs={12}
              sm={6}
              md={3}
              sx={{ display: 'flex' }}
              key={post.postid}
            >
              <MyPGPostCard
                postid={post.postid}
                name={post.name}
                address={post.address}
                photo={post.photo}
                isSearch={true}
              />
            </Grid>
          ))}
        </Grid>
      </Box>
    </>
  );
};

export default PGListScreen;
