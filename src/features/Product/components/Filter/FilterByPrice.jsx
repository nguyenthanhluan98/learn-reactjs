import { Box, Button, TextField, Typography } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import PropTypes from 'prop-types';
import React, { useEffect, useState } from 'react';

FilterByPrice.propTypes = {
  onChange: PropTypes.func,
  categoryList: PropTypes.array,
};

const useStyles = makeStyles((theme) => ({
  root: {
    padding: theme.spacing(2),
    borderTop: `1px solid ${theme.palette.grey[300]}`,
  },
  range: {
    display: 'flex',
    flexFlow: 'row nowrap',
    alignItems: 'center',

    marginTop: theme.spacing(1),
    marginBottom: theme.spacing(1),

    '& > span': {
      marginLeft: theme.spacing(1),
      marginRight: theme.spacing(1),
    },
  },
}));

function numberWithCommas(x) {
  var parts = x.toString().split('.');
  parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ',');
  return parts.join('.');
}

function FilterByPrice({ onChange }) {
  const classes = useStyles();
  const [values, setValues] = useState({
    salePrice_gte: 0.0,
    salePrice_lte: 0.0,
  });

  const onKeyPress = (e) => {
    const { name, value } = e.target;
    setValues((preValues) => ({
      ...preValues,
      [name]: value <= 0 ? '' : value,
    }));
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setValues((preValues) => ({
      ...preValues,
      [name]: value.replace(/,/g, ''),
    }));
  };

  const handleSubmit = () => {
    if (onChange) onChange(values);
  };

  return (
    <div className={classes.root}>
      <Typography variant="subtitle2">Chọn khoảng giá</Typography>
      <Box className={classes.range}>
        <TextField
          name="salePrice_gte"
          onKeyPress={onKeyPress}
          value={numberWithCommas(values.salePrice_gte)}
          onChange={handleChange}
        />
        <span>-</span>
        <TextField
          name="salePrice_lte"
          onKeyPress={onKeyPress}
          value={numberWithCommas(values.salePrice_lte)}
          onChange={handleChange}
        />
      </Box>
      <Box>
        <Button size="small" variant="outlined" color="primary" onClick={handleSubmit}>
          Apply price
        </Button>
      </Box>
    </div>
  );
}

export default FilterByPrice;
