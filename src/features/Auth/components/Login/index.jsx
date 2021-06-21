import { unwrapResult } from '@reduxjs/toolkit';
import { login } from 'features/Auth/userSlice';

import { useSnackbar } from '../../../../../node_modules/notistack/dist';
import PropTypes from 'prop-types';
import React from 'react';
import { useDispatch } from 'react-redux';
import LoginForm from '../LoginForm';

Login.propTypes = {
  closeDialog: PropTypes.func,
};

function Login(props) {
  const dispatch = useDispatch();

  const { enqueueSnackbar } = useSnackbar();
  // const classes = useStyles();
  const handleSubmit = async (values) => {
    try {
      const action = login(values);
      const resultAction = await dispatch(action);
      unwrapResult(resultAction);

      const { closeDialog } = props;

      if (closeDialog) {
        closeDialog();
      }

      enqueueSnackbar('Login successfully', { variant: 'success' });
    } catch (error) {
      enqueueSnackbar(error.message, { variant: 'error' });
    }
  };

  return (
    <div>
      <LoginForm onSubmit={handleSubmit} />
    </div>
  );
}

export default Login;
