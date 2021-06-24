import React from 'react';
import { useSelector } from 'react-redux';
import { cartTotalSelector } from './selector';

CartFeature.propTypes = {};

function CartFeature(props) {
  const cartTotal = useSelector(cartTotalSelector);
  const items = useSelector((state) => state.cart.cartItems);

  return (
    <div>
      Cart feature {cartTotal} | {items[0].id}
    </div>
  );
}

export default CartFeature;
