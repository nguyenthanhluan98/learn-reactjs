import React from 'react';
import PropTypes from 'prop-types';
import { TextField } from '@material-ui/core';
import { Controller, useForm } from 'react-hook-form';

InputField.propTypes = {
  form: PropTypes.object.isRequired,
  name: PropTypes.string.isRequired,

  label: PropTypes.string,
  disabled: PropTypes.bool,
};

function InputField(props) {
  const { form, name, label } = props;
  const { formState } = form;
  const { errors } = formState;
  // const { isValid, isDirty } = formState;
  //  const hasError = isDirty && errors.title === undefined;

  return (
    <div>
      <Controller
        name={name}
        render={({ field }) => (
          <TextField
            {...field}
            error={errors?.title === undefined ? false : true}
            helperText={errors.title?.message}
            label={label}
            name={name}
          />
        )}
        control={form.control}
      />
    </div>
  );
}

export default InputField;
