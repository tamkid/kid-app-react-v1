import { Checkbox, FormControlLabel, FormGroup, Typography } from '@mui/material';
import { Box } from '@mui/system';
import PropTypes from 'prop-types';
import React from 'react';

ServiceFilter.propTypes = {
  onChange: PropTypes.func,
  filters: PropTypes.object.isRequired,
};

function ServiceFilter({ onChange = null, filters }) {
  const handleChange = (e) => {
    if (!onChange) return;
    const { name, checked } = e.target;
    onChange({ [name]: checked });
  };

  return (
    <Box sx={{ padding: '16px', borderTop: '1px solid', borderTopColor: '#e0e0e0' }}>
      <Typography variant="subtitle2">DỊCH VỤ</Typography>
      <Box sx={{ display: 'flex', flexFlow: 'column nowrap', marginBottom: '16px' }}>
        <FormGroup>
          {[
            { value: 'isPromotion', label: 'Khuyến mãi' },
            { value: 'isFreeShip', label: 'Miến phí giao hàng' },
          ].map((item) => (
            <FormControlLabel
              key={item.value}
              control={
                <Checkbox
                  size="small"
                  checked={Boolean(filters[item.value])}
                  onChange={handleChange}
                  name={item.value}
                />
              }
              label={item.label}
            />
          ))}
        </FormGroup>
      </Box>
    </Box>
  );
}

export default ServiceFilter;
