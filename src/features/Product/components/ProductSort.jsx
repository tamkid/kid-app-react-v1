import React from 'react';
import PropTypes from 'prop-types';
import { Box } from '@mui/system';
import { Tab, Tabs } from '@mui/material';

ProductSort.propTypes = {
  currentValue: PropTypes.string.isRequired,
  onChange: PropTypes.func,
};

function ProductSort({ currentValue, onChange = null }) {
  const handleChange = (event, newValue) => {
    if (!onChange) return;
    onChange(newValue);
  };
  return (
    <Box>
      <Tabs value={currentValue} onChange={handleChange}>
        <Tab label="Giá thấp đến cao" value="salePrice:ASC" />
        <Tab label="Giá cao đến thấp" value="salePrice:DESC" />
      </Tabs>
    </Box>
  );
}

export default ProductSort;
