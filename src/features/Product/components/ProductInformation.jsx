import React from 'react';
import PropTypes from 'prop-types';
import { makeStyles, Box, Typography } from '@material-ui/core';
import { formatPrice } from 'utils';

ProductInformation.propTypes = {};

const useStyles = makeStyles((theme) => ({
  root: {
    paddingBottom: theme.spacing(2),
    borderBottom: `1px solid ${theme.palette.grey[200]}`,
  },
  description: {
    margin: theme.spacing(2, 0),
  },
  priceBox: {
    backgroundColor: theme.palette.grey[100],
    padding: theme.spacing(2),
  },
  salePrice: {
    marginRight: theme.spacing(3),
    fontSize: theme.typography.h4.fontSize,
    fontWeight: 'bold',
  },
  originalPrice: {
    fontSize: '14px',
    marginRight: theme.spacing(1),
    textDecoration: 'line-through',
  },
  promotionPercent: {
    fontSize: '14px',
  },
}));

function ProductInformation({ product }) {
  const classes = useStyles();
  const { name, originalPrice, promotionPercent, salePrice, shortDescription } = product;

  console.log(product);

  return (
    <Box className={classes.root}>
      <Typography component="h1" variant="h4">
        {name}
      </Typography>
      <Box className={classes.description}>
        <Typography variant="body2">{shortDescription}</Typography>
      </Box>
      <Box className={classes.priceBox}>
        <Box className={classes.salePrice} component="span">
          {formatPrice(salePrice)}
        </Box>
        <Box className={classes.originalPrice} component="span">
          {formatPrice(originalPrice)}
        </Box>
        <Box className={classes.promotionPercent} component="span">
          {promotionPercent > 0 ? `-${promotionPercent}%` : ''}
        </Box>
      </Box>
    </Box>
  );
}

export default ProductInformation;
