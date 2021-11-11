import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Box } from '@mui/system';
import { Button, TextField, Typography } from '@mui/material';

PriceFilter.propTypes = {
  onChange: PropTypes.func,
};

function PriceFilter({ onChange = null }) {
  const [values, setValues] = useState({
    salePrice_lte: 0,
    salePrice_gte: 0,
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setValues((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleClick = () => {
    if (!onChange) return;
    console.log({ values });
    if (
      (values.salePrice_gte || values.salePrice_lte) &&
      Number.parseInt(values.salePrice_gte) <= Number.parseInt(values.salePrice_lte) &&
      Number.parseInt(values.salePrice_lte) > 0
    ) {
      onChange(values);
    }

    setValues({
      salePrice_lte: 0,
      salePrice_gte: 0,
    });
  };

  return (
    <Box sx={{ padding: '16px', borderTop: '1px solid', borderTopColor: '#e0e0e0' }}>
      <Typography variant="subtitle2">LỌC THEO KHOẢNG GIÁ</Typography>
      <Box
        sx={{ display: 'flex', flexFlow: 'row nowrap', marginTop: '16px', marginBottom: '16px' }}
      >
        <TextField
          type="number"
          variant="standard"
          size="small"
          name="salePrice_gte"
          value={values.salePrice_gte}
          onChange={handleChange}
        />
        <Typography sx={{ marginLeft: '16px', marginRight: '16px' }}>-</Typography>
        <TextField
          type="number"
          variant="standard"
          size="small"
          name="salePrice_lte"
          value={values.salePrice_lte}
          onChange={handleChange}
        />
      </Box>
      <Button variant="outlined" size="small" onClick={handleClick}>
        Áp dụng
      </Button>
    </Box>
  );
}

export default PriceFilter;
