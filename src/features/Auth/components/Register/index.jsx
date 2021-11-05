import React from 'react';
import { useDispatch } from 'react-redux';
import { registerUser } from '../../userSlice';
import RegisterForm from '../RegisterForm';
import { unwrapResult } from '@reduxjs/toolkit';
import { useSnackbar } from 'notistack';
import { PropTypes } from 'prop-types';

Register.propTypes = {
  onCloseDialog: PropTypes.func,
};

function Register(props) {
  const dispatch = useDispatch();
  const { enqueueSnackbar } = useSnackbar();

  const handleFormSubmit = async (data) => {
    try {
      data.username = data.email;
      const resultAction = await dispatch(registerUser(data));
      const user = unwrapResult(resultAction);
      console.log('New user', user);

      const { onCloseDialog } = props;
      if (onCloseDialog) {
        onCloseDialog();
      }

      enqueueSnackbar('Register successfully.', { variant: 'success' });
    } catch (error) {
      console.log('Fail to register user', error);
    }
  };
  return (
    <div>
      <RegisterForm formSubmit={handleFormSubmit} />
    </div>
  );
}

export default Register;
