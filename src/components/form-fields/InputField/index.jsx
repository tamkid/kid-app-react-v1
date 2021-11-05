import React from 'react';
import PropTypes from 'prop-types';
import TextField from '@mui/material/TextField';
import { Controller } from 'react-hook-form';

InputField.propTypes = {
  name: PropTypes.string.isRequired,
  control: PropTypes.object.isRequired,
  errors: PropTypes.object,

  label: PropTypes.string,
};

function InputField(props) {
  const { name, control, label, errors } = props;
  const isError = errors && !!errors[name];
  const errorMsg = (isError && errors[name].message) || '';

  return (
    <Controller
      name={name}
      control={control}
      render={({ field }) => (
        <TextField
          {...field}
          label={label}
          variant="outlined"
          margin="normal"
          fullWidth
          error={isError}
          helperText={errorMsg}
        />
      )}
      defaultValue=""
    />
  );
}

export default InputField;
