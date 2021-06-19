import { FormHelperText, Box, makeStyles, Typography } from '@material-ui/core';
import FormControl from '@material-ui/core/FormControl';
import OutlinedInput from '@material-ui/core/OutlinedInput';
import { AddCircleOutline, RemoveCircleOutlined } from '@material-ui/icons';
import PropTypes from 'prop-types';
import React, { useState } from 'react';
import { Controller } from 'react-hook-form';
import { IconButton } from '@material-ui/core';

QuantityField.propTypes = {
  form: PropTypes.object.isRequired,
  name: PropTypes.string.isRequired,

  label: PropTypes.string,
  disable: PropTypes.bool,
};

const useStyles = makeStyles((theme) => ({
  root: {
    marginTop: theme.spacing(2),
  },
  box: {
    width: '200px',
    display: 'flex',
    alignItems: 'center',
    flexDirection: 'row nowrap',
  },
}));

function QuantityField(props) {
  const { form, name, label } = props;
  const { errors, setValue, control } = form;
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <Typography>{label}</Typography>
      <Controller
        name={name}
        control={control}
        render={({ field: { onChange, onBlur, value, name, ref }, fieldState: { invalid, isTouched, error } }) => (
          <>
            <FormControl error={isTouched && invalid} fullWidth margin="normal" variant="outlined">
              <Box className={classes.box}>
                <IconButton onClick={() => setValue(name, Number.parseInt(value) > 0 ? Number.parseInt(value) - 1 : 1)}>
                  <RemoveCircleOutlined />
                </IconButton>

                <OutlinedInput
                  id={name}
                  error={invalid}
                  type="number"
                  value={value}
                  onBlur={onBlur}
                  onChange={onChange}
                />
                <IconButton onClick={() => setValue(name, Number.parseInt(value) > 0 ? Number.parseInt(value) + 1 : 1)}>
                  <AddCircleOutline />
                </IconButton>
              </Box>
              <FormHelperText error={invalid}>{error?.message}</FormHelperText>
            </FormControl>
          </>
        )}
      />
    </div>
  );
}

export default QuantityField;
