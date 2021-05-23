import React from 'react';
import PropTypes from 'prop-types';
import InputField from '../../../form-controls/InputField';
import TextField from '@material-ui/core/TextField';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';

ToDoForm.propTypes = {
  onSubmit: PropTypes.func,
};

function ToDoForm(props) {
  const schema = yup.object().shape({
    title: yup.string().required('Please enter title'),
  });
  const form = useForm({
    defaultValues: {
      title: '',
    },
    mode: 'onSubmit',
    resolver: yupResolver(schema),
  });

  const handleSubmit = (values) => {
    const { onSubmit } = props;
    if (onSubmit) {
      onSubmit(values);
    }
    form.reset();
  };

  return (
    <form onSubmit={form.handleSubmit(handleSubmit)}>
      <InputField name="title" label="Enter todo" form={form} />
    </form>
  );
}

export default ToDoForm;
