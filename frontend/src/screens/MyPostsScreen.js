import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { viewAllPosts } from './../redux/actions/postActions';
import Grid from '@mui/material/Grid';
import MyPGPostCard from './../components/MyPGPostCard';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';

const MyPostsScreen = () => {
  const dispatch = useDispatch();
  const { all_posts } = useSelector((state) => state.posts?.viewAllPosts);
  useEffect(() => {
    dispatch(viewAllPosts());
  }, [dispatch]);
  return (
    <Box sx={{ m: 3 }}>
      <Typography variant="h4" gutterBottom>
        My Posts
      </Typography>
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
            {post && (
              <MyPGPostCard
                postid={post.postid}
                name={post.name}
                address={post.address}
                photo={post.photo}
              />
            )}{' '}
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};

export default MyPostsScreen;
