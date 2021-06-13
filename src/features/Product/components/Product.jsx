import { Box, Typography } from '@material-ui/core';
import { STATIC_HOST, THUMBNAIL_URL } from 'constants/index';
import { makeStyles } from '@material-ui/core/styles';
import PropTypes from 'prop-types';
import React from 'react';

Product.propTypes = {
  Product: PropTypes.object,
};

const useStyles = makeStyles((theme) => ({
  myContainer: {
    position: 'relative',
  },
  freeShip: {
    position: 'absolute',
    top: '10px',
    left: '10px',
    color: 'white',
    backgroundColor: 'rgb(0, 153, 0)',
  },
}));

function Product({ product }) {
  const thumbnailUrl = product.thumbnail ? `${STATIC_HOST}${product.thumbnail?.url}` : THUMBNAIL_URL;
  const classes = useStyles();

  return (
    <Box padding={1}>
      <Box className={classes.myContainer} padding={1} minHeight="215px">
        <img src={thumbnailUrl} alt={product.name} width="100%" />
        {product.isFreeShip ? <div className={classes.freeShip}>Free ship</div> : ''}
      </Box>

      <Typography variant="body2">{product.name}</Typography>
      <Typography variant="body2">
        <Box component="span" fontSize="16px" fontWeight="bold" mr={1}>
          {new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(product.salePrice)}
        </Box>
        {product.promotionPercent ? `- ${product.promotionPercent}%` : ''}
      </Typography>
    </Box>
  );
}

export default Product;
