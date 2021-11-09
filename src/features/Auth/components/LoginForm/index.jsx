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

LoginForm.propTypes = {
  formSubmit: PropTypes.func,
};

function LoginForm(props) {
  const schema = yup.object({
    identifier: yup.string().required('Please enter your user id/email'),
    password: yup.string().required('Please enter password'),
  });

  const { formSubmit } = props;
  const {
    handleSubmit,
    control,
    formState: { errors, isSubmitting },
  } = useForm({
    defaultValues: {
      identifier: '',
      password: '',
    },
    resolver: yupResolver(schema),
  });

  const handleFormSubmit = async (data) => {
    if (formSubmit) {
      await formSubmit(data);
    }
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
        Sign in
      </Typography>

      <Box component="form" onSubmit={handleSubmit(handleFormSubmit)} sx={{ mt: 3 }}>
        <Grid container>
          <Grid item xs={12}>
            <InputField name="identifier" control={control} errors={errors} label="User Id/Email" />
          </Grid>
          <Grid item xs={12}>
            <PasswordField name="password" control={control} errors={errors} label="Password" />
          </Grid>
        </Grid>
        <Button type="submit" fullWidth variant="contained" sx={{ mt: 2 }}>
          Sign In
        </Button>
      </Box>
    </Box>
  );
}

export default LoginForm;
