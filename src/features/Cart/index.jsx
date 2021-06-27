import React from 'react';
import { useSelector } from 'react-redux';
import ListPage from './pages/ListPage';
import { cartTotalSelector } from './selector';

CartFeature.propTypes = {};

function CartFeature(props) {
  const cartTotal = useSelector(cartTotalSelector);
  // const items = useSelector((state) => state.cart.cartItems);

  return (
    <div>
      <ListPage />
    </div>
  );
}

export default CartFeature;
