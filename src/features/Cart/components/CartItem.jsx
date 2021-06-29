import { yupResolver } from '@hookform/resolvers/yup';
import { Box, Grid, makeStyles, Paper } from '@material-ui/core';
import IconButton from '@material-ui/core/IconButton';
import DeleteIcon from '@material-ui/icons/Delete';
import QuantityField from 'components/form-controls/QuantityField';
import ProductThumbnail from 'features/Product/components/ProductThumbnail';
import { PropTypes } from 'prop-types';
import React from 'react';
import { useForm } from 'react-hook-form';
import { formatPrice } from 'utils';
import * as yup from 'yup';
import { removeFromCart, setQuantity } from '../cartSlice';
import { useDispatch } from 'react-redux';

CartItem.propTypes = {
  onChange: PropTypes.func,
};

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    flexFlow: 'row',
    listStyleType: 'none',
    padding: '10px',
    margin: theme.spacing(2, 0),

    '& > li': {
      margin: 0,
      padding: theme.spacing(1),
    },
  },
  cartThumbnail: {
    width: '200px',
  },
  title: {
    marginTop: theme.spacing(2),
    fontSize: theme.typography.h5.fontSize,
    padding: theme.spacing(1),
    fontWeight: 'bold',
    width: '250px',
  },
  priceBox: {
    marginTop: theme.spacing(8),
    marginLeft: theme.spacing(2),
    width: '250px',
  },
  salePrice: {
    marginRight: theme.spacing(3),
    fontSize: theme.typography.h5.fontSize,
  },
  originalPrice: {
    fontSize: '14px',
    marginRight: theme.spacing(1),
    textDecoration: 'line-through',
  },
  deleteBtn: {
    marginTop: theme.spacing(8),
    marginLeft: theme.spacing(2),
  },
}));

const schema = yup.object().shape({
  quantity: yup
    .number()
    .required('Please enter quantity')
    .min(1, 'Minimum value is 1')
    .typeError('Please enter a number'),
});

function CartItem({ item }) {
  const classes = useStyles();

  const { id, name, originalPrice, promotionPercent, salePrice } = item.product;
  const { quantity } = item;
  const dispatch = useDispatch();

  const form = useForm({
    defaultValues: {
      quantity: quantity,
    },
    mode: 'onSubmit',
    reValidateMode: 'onChange',
    resolver: yupResolver(schema),
  });

  /* 
    1. Product thumbnail
    2. Price and original price
    3. QuantityField
    4. Total
    5. Delete button      
  */

  const handleSubmit = (newValues) => {
    console.log(newValues);
  };

  const handleQuantityChange = (newValue) => {
    console.log(newValue);
    // const { id, name } = item;
    // console.log(event.target.value);
    const action = setQuantity({
      id: id,
      quantity: newValue,
    });
    dispatch(action);
  };

  const handleRemoveCartItem = (event) => {
    const action = removeFromCart({
      id: id,
    });
    console.log(action);
    dispatch(action);
  };

  return (
    <Paper elevation={0}>
      <Grid container className={classes.root} spacing={3}>
        <Grid item className={classes.cartThumbnail}>
          <ProductThumbnail product={item.product} />
        </Grid>
        <Box className={classes.title} component="span">
          {name}
        </Box>
        <Grid item className={classes.priceBox}>
          <Box className={classes.salePrice} component="span">
            {formatPrice(salePrice)}
          </Box>
          <Box className={classes.originalPrice} component="span">
            {formatPrice(originalPrice)}
          </Box>
          <Box className={classes.promotionPercent} component="span">
            {promotionPercent > 0 ? `-${promotionPercent}%` : ''}
          </Box>
        </Grid>
        <Grid item>
          <form onSubmit={form.handleSubmit(handleSubmit)}>
            <QuantityField name="quantity" label="" form={form} onChange={handleQuantityChange} />
          </form>
        </Grid>
        <Grid item className={classes.deleteBtn}>
          <IconButton onClick={handleRemoveCartItem} className={classes.closeButton}>
            <DeleteIcon />
          </IconButton>
        </Grid>
      </Grid>
    </Paper>
  );
}

export default CartItem;
