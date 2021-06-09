import { Box, Button, TextField, Typography } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import InputField from 'components/form-controls/InputField';
import PropTypes from 'prop-types';
import React, { useEffect, useState } from 'react';

FilterByPrice.propTypes = {
  onChange: PropTypes.func,
  categoryList: PropTypes.array,
};

const useStyles = makeStyles((theme) => ({
  root: {
    padding: theme.spacing(2),
  },
  menu: {
    padding: 0,
    margin: 0,
    listStyleType: 'none',

    '& > li': {
      marginTop: theme.spacing(1),
      transition: 'all .25s',
      '&:hover': {
        color: theme.palette.primary.dark,
        cursor: 'pointer',
      },
    },
  },
}));

function FilterByPrice({ onChange }) {
  const classes = useStyles();
  const [values, setValues] = useState({
    salePrice_gte: 0,
    salePrice_lte: 0,
  });

  const handleChange = (e) => {
    const { name, value } = e.target;

    setValues((preValues) => ({
      ...preValues,
      [name]: value,
    }));
  };

  const handleSubmit = () => {
    if (onChange) onChange(values);
  };

  return (
    <Box className={classes.root} minHeight="200px">
      <Typography variant="subtitle2">Chọn khoảng giá</Typography>
      <Box>
        <TextField name="salePrice_gte" value={values.salePrice_gte} onChange={handleChange} />
        <span>-</span>
        <TextField name="salePrice_lte" value={values.salePrice_lte} onChange={handleChange} />

        <Button variant="outlined" color="primary" onClick={handleSubmit}>
          Apply price
        </Button>
      </Box>
    </Box>
  );
}

export default FilterByPrice;
