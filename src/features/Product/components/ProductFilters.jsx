import React from 'react';
import PropTypes from 'prop-types';
import { Box } from '@mui/system';
import CategoryFilter from './Filters/CategoryFilter';
import PriceFilter from './Filters/PriceFilter';
import ServiceFilter from './Filters/ServiceFilter';

ProductFilters.propTypes = {
  currentFilters: PropTypes.object.isRequired,
  onChange: PropTypes.func,
};

function ProductFilters({ currentFilters, onChange = null }) {
  const handleCategoryChange = (newCategoryId) => {
    if (!onChange) return;
    const newFilters = {
      ...currentFilters,
      'category.id': newCategoryId,
    };
    onChange(newFilters);
  };

  const handlePriceChange = (newPrices) => {
    if (!onChange) return;
    onChange(newPrices);
  };

  const handleServiceChange = (newServices) => {
    if (!onChange) return;
    onChange(newServices);
  };

  return (
    <Box>
      <CategoryFilter onChange={handleCategoryChange} />
      <PriceFilter onChange={handlePriceChange} />
      <ServiceFilter filters={currentFilters} onChange={handleServiceChange} />
    </Box>
  );
}

export default ProductFilters;
