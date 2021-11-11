import React from 'react';
import PropTypes from 'prop-types';
import ProductParams from '../../../constances/product-params';
import { Box } from '@mui/system';
import { Grid, Skeleton } from '@mui/material';

SkeletonProductList.propTypes = {
  length: PropTypes.number,
};

function SkeletonProductList({ length = ProductParams.LIMIT_DEFAULT }) {
  return (
    <Box>
      <Grid container>
        {Array.from(new Array(length)).map((x, idx) => (
          <Grid item key={idx} xs={12} sm={6} md={4} lg={3}>
            <Box padding={1}>
              <Skeleton variant="rectangular" width="100%" height={200} />
              <Skeleton />
              <Skeleton width="60%" />
            </Box>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
}

export default SkeletonProductList;
