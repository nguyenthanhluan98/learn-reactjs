import { unwrapResult } from '@reduxjs/toolkit';
import { login } from 'features/Auth/userSlice';

import { useSnackbar } from '../../../../../node_modules/notistack/dist';
import PropTypes from 'prop-types';
import React from 'react';
import { useDispatch } from 'react-redux';
import LoginForm from '../LoginForm';
import { supabase } from 'supabaseClient';
import { signInWithGoogle } from 'features/Firebase/config/firebase';

Login.propTypes = {
  closeDialog: PropTypes.func,
};

function Login(props) {
  const dispatch = useDispatch();

  const { enqueueSnackbar } = useSnackbar();
  // const classes = useStyles();
  // const handleSubmit = async (values) => {
  //   console.log('login values: ', values);
  //   try {
  //     const action = login(values);
  //     const resultAction = await dispatch(action);
  //     unwrapResult(resultAction);

  //     const { closeDialog } = props;

  //     if (closeDialog) {
  //       closeDialog();
  //     }

  //     enqueueSnackbar('Login successfully', { variant: 'success' });
  //   } catch (error) {
  //     enqueueSnackbar(error.message, { variant: 'error' });
  //   }
  // };

  const handleSubmitSupaBase = async (values) => {
    try {
      const email = values.identifier;
      const { user, error } = await supabase.auth.signIn({ email: email, password: values.password });

      const { closeDialog } = props;
      if (closeDialog) {
        closeDialog();
      }
      if (user) {
        enqueueSnackbar('Login successfully', { variant: 'success' });
      } else {
        throw error;
      }
    } catch (error) {
      enqueueSnackbar(error.message, { variant: 'error' });
    }
  };

  return (
    <div>
      <LoginForm onSubmit={signInWithGoogle} />
    </div>
  );
}

export default Login;
