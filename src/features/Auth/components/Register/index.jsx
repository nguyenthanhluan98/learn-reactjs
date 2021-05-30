import { unwrapResult } from '@reduxjs/toolkit';
import { register } from 'features/Auth/userSlice';
import React from 'react';
import { useDispatch } from 'react-redux';
import { useSnackbar } from '../../../../../node_modules/notistack/dist/index';
import RegisterForm from '../RegisterForm';
import PropTypes from 'prop-types';

Register.propTypes = {
  closeDialog: PropTypes.func,
};

function Register(props) {
  const dispatch = useDispatch();

  const { enqueueSnackbar } = useSnackbar();
  // const classes = useStyles();
  const handleSubmit = async (values) => {
    console.log(values);
    try {
      values.username = values.email;
      const action = register(values);
      const resultAction = await dispatch(action);
      unwrapResult(resultAction);

      const { closeDialog } = props;

      if (closeDialog) {
        closeDialog();
      }

      enqueueSnackbar('Register successfully', { variant: 'success' });
    } catch (error) {
      enqueueSnackbar('Failed to register', { variant: 'error' });
    }
  };

  return (
    <div>
      <RegisterForm onSubmit={handleSubmit} />
    </div>
  );
}

export default Register;
