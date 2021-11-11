import { Typography } from '@mui/material';
import { makeStyles } from '@mui/styles';
import { Box } from '@mui/system';
import { unwrapResult } from '@reduxjs/toolkit';
import PropTypes from 'prop-types';
import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { fetchCategories } from '../../categorySlice';
import SkeletonCategoryList from '../SkeletonCategoryList';

CategoryFilter.propTypes = {
  onChange: PropTypes.func,
};

const useStyles = makeStyles((theme) => ({
  menu: {
    padding: 0,
    margin: 0,
    listStyleType: 'none',

    '& > li': {
      marginTop: '8px',

      '&:hover': {
        cursor: 'pointer',
        color: 'blue',
      },
    },
  },
}));

function CategoryFilter({ onChange = null }) {
  const classes = useStyles();
  const dispatch = useDispatch();
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    (async () => {
      try {
        setLoading(true);

        const resultAction = await dispatch(fetchCategories());
        const data = unwrapResult(resultAction);

        setCategories(data);
        setLoading(false);
      } catch (error) {
        console.log('ERROR FETCH CATEGORIES', error);
      }
    })();
  }, [dispatch]);

  const handleItemClick = (item) => {
    if (!onChange) return;
    onChange(item.id);
  };

  return (
    <Box padding="16px">
      <Typography variant="subtitle2">DANH MỤC SẢN PHẨM</Typography>
      {loading ? (
        <SkeletonCategoryList />
      ) : (
        <ul className={classes.menu}>
          {categories.map((item) => (
            <li key={item.id} onClick={() => handleItemClick(item)}>
              <Typography variant="body2">{item.name}</Typography>
            </li>
          ))}
        </ul>
      )}
    </Box>
  );
}

export default CategoryFilter;
