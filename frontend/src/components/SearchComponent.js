import React, { useState } from 'react';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid';
import TextField from '@mui/material/TextField';
import InputAdornment from '@mui/material/InputAdornment';
import IconButton from '@mui/material/IconButton';
import SearchIcon from '@mui/icons-material/Search';
import Button from '@mui/material/Button';
import FilterAltIcon from '@mui/icons-material/FilterAlt';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { searchAction } from '../redux/actions/postActions';

function SearchComponent({ isHome }) {
  const dispatch = useDispatch();
  const history = useNavigate();
  const [data, setData] = useState('');
  const handleSearch = (e) => {
    dispatch(searchAction({ searchText: data }));
    console.log({ searchText: data });
    if (isHome) history('/pgs/');
  };
  const handleSearchByKeyDown = (e) => {
    if (e.keyCode === 13) handleSearch();
  };
  return (
    <Paper
      elevation={3}
      sx={{
        margin: {
          xs: 1,
          md: 4,
        },
        padding: 2,
      }}
    >
      <Grid container spacing={2}>
        <Grid item xs={12} md={11}>
          <TextField
            autoFocus
            id="search-for-pgs"
            label="Search by City or PG Name"
            placeholder="Search by City or PG Name...."
            variant="outlined"
            fullWidth
            size="small"
            value={data}
            onChange={(e) => setData(e.target.value)}
            onKeyDown={handleSearchByKeyDown}
            InputProps={{
              endAdornment: (
                <InputAdornment onClick={handleSearch}>
                  <IconButton>
                    <SearchIcon />
                  </IconButton>
                </InputAdornment>
              ),
            }}
          />
        </Grid>
        <Grid item xs={12} md={1}>
          <Button
            variant="contained"
            endIcon={<FilterAltIcon />}
            fullWidth
            disabled
          >
            Filter
          </Button>
        </Grid>
      </Grid>
    </Paper>
  );
}
export default SearchComponent;
