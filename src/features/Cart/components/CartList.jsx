import { makeStyles } from '@material-ui/core';
import React from 'react';
import { useSelector } from 'react-redux';
import CartItem from './CartItem';

CartList.propTypes = {};

const useStyles = makeStyles((theme) => ({
  cartItem: {
    borderBottom: `1px solid ${theme.palette.grey[500]}`,
  },
}));

function CartList(props) {
  // show all items add to cart  --> get cart items
  const cartItems = useSelector((state) => state.cart.cartItems);
  const classes = useStyles();

  return (
    <div>
      {cartItems.map((item) => (
        <CartItem key={item.id} className={classes.cartItem} item={item} />
      ))}
    </div>
  );
}

export default CartList;
