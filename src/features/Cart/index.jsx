import { Container, Typography } from '@material-ui/core';
import { cartItemsCountSelector } from 'features/Cart/selector';
import React from 'react';
import { useSelector } from 'react-redux';
import { formatPrice } from 'utils';
import ListPage from './pages/ListPage';
import { cartTotalSelector } from './selector';

CartFeature.propTypes = {};

function CartFeature(props) {
  const cartTotal = useSelector(cartTotalSelector);
  const cartItemsCount = useSelector(cartItemsCountSelector);

  return (
    <div>
      <Container>
        <Typography variant="h5" style={{ marginLeft: '20px' }}>
          Giỏ hàng có {cartItemsCount} sản phẩm
        </Typography>
      </Container>
      <Container>
        <ListPage />
      </Container>
      <Container>
        <Typography variant="h5" style={{ marginLeft: '20px' }}>
          Tổng tiền = {formatPrice(cartTotal)}
        </Typography>
      </Container>
    </div>
  );
}

export default CartFeature;
