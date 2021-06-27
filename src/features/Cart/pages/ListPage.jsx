import { Box, Container } from '@material-ui/core';
import React from 'react';
import CartList from '../components/CartList';

ListPage.propTypes = {};

function ListPage(props) {
  return (
    <Box>
      <Container>
        <CartList />
        {/* Payments form */}
      </Container>
    </Box>
  );
}

export default ListPage;
