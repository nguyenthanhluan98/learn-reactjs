import React from 'react';
import PropTypes from 'prop-types';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';

import { Avatar, Button, Typography } from '@material-ui/core';
import LockOutlined from '@material-ui/icons/LockOutlined';
import InputField from 'components/form-controls/InputField';
import { makeStyles } from '@material-ui/core/styles';
import PasswordField from 'components/form-controls/PasswordField';
import { LinearProgress } from '../../../../../node_modules/@material-ui/core/index';

RegisterForm.propTypes = {
  onSubmit: PropTypes.func,
};

const useStyles = makeStyles((theme) => ({
  paper: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: '100%', // Fix IE 11 issue.
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
  progress: {
    position: 'absolute',
    marginTop: theme.spacing(1),
    left: 0,
    right: 0,
  },
}));

const schema = yup.object().shape({
  fullName: yup
    .string()
    .required('Please enter title')
    .test('should has at least two words', 'Please enter at least two words', (value) => {
      return value.split(' ').length >= 2;
    }),
  email: yup.string().required('Please enter your email').email('Please enter valid email'),
  password: yup.string().required('Please enter your password').min(6, 'Please enter at least 6 characters'),
  retypePassword: yup
    .string()
    .required('Please enter your password')
    .oneOf([yup.ref('password')], 'Password does not match'),
});

function RegisterForm(props) {
  const classes = useStyles();

  const form = useForm({
    defaultValues: {
      fullName: '',
      email: '',
      password: '',
      retypePassword: '',
    },
    mode: 'onSubmit',
    resolver: yupResolver(schema),
  });

  const handleSubmit = async (values) => {
    const { onSubmit } = props;
    if (onSubmit) {
      await onSubmit(values);
    }
    // form.reset();
  };

  const { isSubmitting } = form.formState;

  return (
    <div className={classes.form}>
      {isSubmitting && <LinearProgress />}
      <div className={classes.paper}>
        <Avatar className={classes.avatar}>
          <LockOutlined></LockOutlined>
        </Avatar>

        <Typography component="h1" variant="h5">
          Create an account
        </Typography>
      </div>

      <form className={classes.form} onSubmit={form.handleSubmit(handleSubmit)}>
        <InputField name="fullName" label="Full name" form={form} />
        <InputField name="email" label="Email" form={form} />
        <PasswordField name="password" label="Password" form={form} />
        <PasswordField name="retypePassword" label="Retype Password" form={form} />
        <Button
          disabled={isSubmitting}
          type="submit"
          className={classes.submit}
          color="primary"
          variant="contained"
          fullWidth
        >
          Create an account
        </Button>
      </form>
    </div>
  );
}

export default RegisterForm;
