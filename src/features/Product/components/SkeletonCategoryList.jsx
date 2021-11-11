import { Skeleton } from '@mui/material';
import { makeStyles } from '@mui/styles';
import PropTypes from 'prop-types';
import React from 'react';

SkeletonCategoryList.propTypes = {
  length: PropTypes.number,
};

const useStyles = makeStyles((theme) => ({
  root: {},

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

function SkeletonCategoryList({ length = 6 }) {
  const classes = useStyles();
  return (
    <ul className={classes.menu}>
      {Array.from(new Array(length)).map((item, idx) => (
        <li key={idx}>
          <Skeleton width="40%" />
        </li>
      ))}
    </ul>
  );
}

export default SkeletonCategoryList;
