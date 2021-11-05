import { yupResolver } from '@hookform/resolvers/yup';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Avatar from '@mui/material/Avatar';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Grid from '@mui/material/Grid';
import LinearProgress from '@mui/material/LinearProgress';
import Typography from '@mui/material/Typography';
import PropTypes from 'prop-types';
import React from 'react';
import { useForm } from 'react-hook-form';
import * as yup from 'yup';
import InputField from '../../../../components/form-fields/InputField';
import PasswordField from '../../../../components/form-fields/PasswordField';

RegisterForm.propTypes = {
  formSubmit: PropTypes.func,
};

function RegisterForm(props) {
  const schema = yup.object({
    fullName: yup
      .string()
      .required('Please enter your full name')
      .test('Should has at lease 2 word', 'Please enter at least 2 word for full name', (value) => {
        return value.split(' ').length >= 2;
      }),
    email: yup.string().required('Please enter your email').email('Please enter a valid email'),
    password: yup
      .string()
      .required('Please enter password')
      .min(6, 'Password must be at lease 6 characters'),
    retypePassword: yup
      .string()
      .required('Please enter retype password')
      .oneOf([yup.ref('password')], 'Retype password must be same password'),
  });

  const { formSubmit } = props;
  const {
    handleSubmit,
    control,
    reset,
    formState: { errors, isSubmitting },
  } = useForm({
    defaultValues: {
      fullName: '',
      email: '',
      password: '',
      retypePassword: '',
    },
    resolver: yupResolver(schema),
  });

  const handleFormSubmit = async (data) => {
    if (formSubmit) {
      await formSubmit(data);
    }
    reset();
  };

  return (
    <Box
      sx={{
        marginTop: 1,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
      }}
    >
      {isSubmitting && <LinearProgress sx={{ width: 200 }} />}

      <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
        <LockOutlinedIcon />
      </Avatar>

      <Typography component="h1" variant="h5">
        Sign up
      </Typography>

      <Box component="form" onSubmit={handleSubmit(handleFormSubmit)} sx={{ mt: 3 }}>
        <Grid container>
          <Grid item xs={12}>
            <InputField name="fullName" control={control} errors={errors} label="Full Name" />
          </Grid>
          <Grid item xs={12}>
            <InputField name="email" control={control} errors={errors} label="Email" />
          </Grid>
          <Grid item xs={12}>
            <PasswordField name="password" control={control} errors={errors} label="Password" />
          </Grid>
          <Grid item xs={12}>
            <PasswordField
              name="retypePassword"
              control={control}
              errors={errors}
              label="Retype Password"
            />
          </Grid>
        </Grid>
        <Button type="submit" fullWidth variant="contained" sx={{ mt: 2 }}>
          Sign Up
        </Button>
      </Box>
    </Box>
  );
}

export default RegisterForm;
