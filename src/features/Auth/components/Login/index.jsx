import { unwrapResult } from '@reduxjs/toolkit';
import { useSnackbar } from 'notistack';
import { PropTypes } from 'prop-types';
import React from 'react';
import { useDispatch } from 'react-redux';
import { loginUser } from '../../userSlice';
import LoginForm from '../LoginForm';

Login.propTypes = {
  onCloseDialog: PropTypes.func,
};

function Login(props) {
  const dispatch = useDispatch();
  const { enqueueSnackbar } = useSnackbar();

  const handleFormSubmit = async (data) => {
    try {
      const resultAction = await dispatch(loginUser(data));
      const user = unwrapResult(resultAction);
      console.log('New user', user);

      const { onCloseDialog } = props;
      if (onCloseDialog) {
        onCloseDialog();
      }

      enqueueSnackbar('Login successfully.', { variant: 'success' });
    } catch (error) {
      enqueueSnackbar(error.message, { variant: 'error' });
    }
  };
  return (
    <div>
      <LoginForm formSubmit={handleFormSubmit} />
    </div>
  );
}

export default Login;
