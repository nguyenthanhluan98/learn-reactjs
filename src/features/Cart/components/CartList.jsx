import React from 'react';
import PropTypes from 'prop-types';
import { useSelector } from 'react-redux';
import CartItem from './CartItem';

CartList.propTypes = {};

function CartList(props) {
  // show all items add to cart  --> get cart items
  const cartItems = useSelector((state) => state.cart.cartItems);
  console.log('cart Items: ', cartItems);
  return (
    <div>
      {cartItems.map((item) => (
        <CartItem item={item} />
      ))}
    </div>
  );
}

export default CartList;
