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

LoginForm.propTypes = {
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
  identifier: yup.string().required('Please enter your email').email('Please enter valid email'),
  password: yup.string().required('Please enter your password').min(6, 'Please enter at least 6 characters'),
});

function LoginForm(props) {
  const classes = useStyles();

  const form = useForm({
    defaultValues: {
      identifier: '',
      password: '',
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

  const handleSubmitWithGoogle = async (values) => {
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
          Sign in
        </Typography>
      </div>

      <form className={classes.form} onSubmit={form.handleSubmit(handleSubmit)}>
        <InputField name="identifier" label="Email" form={form} />
        <PasswordField name="password" label="Password" form={form} />
        <Button
          disabled={isSubmitting}
          type="submit"
          className={classes.submit}
          color="primary"
          variant="contained"
          fullWidth
        >
          Sign in
        </Button>

        <Button
          disabled={isSubmitting}
          type="button"
          onClick={() => handleSubmitWithGoogle()}
          className={classes.submit}
          color="secondary"
          variant="contained"
          fullWidth
        >
          Sign in with Google
        </Button>
      </form>
    </div>
  );
}

export default LoginForm;
