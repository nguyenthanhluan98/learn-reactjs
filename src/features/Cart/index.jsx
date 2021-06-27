import React from 'react';
import { useSelector } from 'react-redux';
import CartList from './components/CartList';
import ListPage from './pages/ListPage';
import { cartTotalSelector } from './selector';

CartFeature.propTypes = {};

function CartFeature(props) {
  const cartTotal = useSelector(cartTotalSelector);
  // const items = useSelector((state) => state.cart.cartItems);

  return (
    <div>
      <CartList />
    </div>
  );
}

export default CartFeature;
