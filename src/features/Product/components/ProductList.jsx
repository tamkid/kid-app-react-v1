import { Grid } from '@mui/material';
import { Box } from '@mui/system';
import PropTypes from 'prop-types';
import React from 'react';
import Product from './Product';

ProductList.propTypes = {
  data: PropTypes.array,
};

function ProductList({ data = [] }) {
  return (
    <Box>
      <Grid container>
        {data.map((product, idx) => (
          <Grid item key={product.id} xs={12} sm={6} md={4} lg={3}>
            <Product product={product} />
          </Grid>
        ))}
      </Grid>
    </Box>
  );
}

export default ProductList;
