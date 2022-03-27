import * as React from 'react';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { deletePost } from './../redux/actions/postActions';
import Box from '@mui/material/Box';

export default function MyPGPostCard({
  postid,
  name,
  address,
  photo,
  isSearch,
}) {
  const navigator = useNavigate();
  const dispatch = useDispatch();
  const handleDelete = () => {
    dispatch(deletePost(postid));
  };
  const handleView = () => {
    navigator(`/post/${postid}`);
  };
  return (
    <Card sx={{ display: 'flex', flexDirection: 'column' }}>
      <CardMedia
        component="img"
        alt="green iguana"
        height="140"
        image={photo}
        onClick={handleView}
      />
      <CardContent onClick={handleView}>
        <Typography gutterBottom variant="h5" component="div">
          {name}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          <b>Address: </b>
          {address}
        </Typography>
      </CardContent>
      <Box sx={{ marginTop: 'auto' }} />
      {!isSearch && (
        <CardActions>
          <Button size="small" onClick={() => navigator(`/edit/${postid}`)}>
            Edit
          </Button>
          <Button size="small" onClick={handleDelete}>
            Delete
          </Button>
        </CardActions>
      )}
    </Card>
  );
}
