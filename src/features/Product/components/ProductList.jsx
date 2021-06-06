import { makeStyles } from '@material-ui/core/styles';
import { Box, Grid } from '@material-ui/core';
import PropTypes from 'prop-types';
import React from 'react';
import Product from './Product';

ProductList.propTypes = {
  data: PropTypes.array,
};

ProductList.defaultProps = {
  data: [],
};

const useStyles = makeStyles((theme) => ({
  product: {
    transition: 'all .25s linear',
    borderRadius: '5px',

    '&:hover': {
      cursor: 'pointer',
      boxShadow: '-1px 5px 10px 0px rgba(0,0,0,0.3)',
    },
  },
}));

function ProductList({ data }) {
  const classes = useStyles();
  return (
    <Box>
      <Grid container>
        {data.map((product) => (
          <Grid item key={product.id} xs={12} sm={6} md={3} lg={4}>
            <Box className={classes.product} padding={1}>
              <Product product={product} />
            </Box>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
}

export default ProductList;
