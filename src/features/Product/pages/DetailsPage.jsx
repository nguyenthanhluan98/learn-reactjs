import { Box, Container, Grid, LinearProgress, Paper } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { addToCart } from 'features/Cart/cartSlice';
import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { Route, useRouteMatch } from 'react-router-dom';
import ProductAdditional from '../components/ProductAdditional';
import ProductReview from '../components/ProductReview';
import useProductDetails from '../hooks/useProductDetails';
import AddToCartForm from './../components/AddToCartForm';
import ProductDescription from './../components/ProductDescription';
import ProductInformation from './../components/ProductInformation';
import ProductMenu from './../components/ProductMenu';
import ProductThumbnail from './../components/ProductThumbnail';

const useStyles = makeStyles((theme) => ({
  root: {
    paddingBottom: theme.spacing(3),
  },
  left: {
    width: '400px',
    padding: theme.spacing(1.5),
    borderRight: `1px solid ${theme.palette.grey[300]}`,
  },
  right: {
    flex: '1 1 0',
    padding: theme.spacing(1.5),
  },
  loading: {
    position: 'absolute',
    top: 0,
    left: 0,
    width: '100%',
  },
}));

function DetailsPage() {
  const classes = useStyles();

  const {
    params: { productId },
    url,
  } = useRouteMatch();

  // issue: scroll down --> details page then vertical scroll still on the bottom --> scroll on the top
  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: 'smooth' });
  }, []);

  const { product, loading } = useProductDetails(productId);
  const dispatch = useDispatch();
  if (loading) {
    return (
      <Box className={classes.loading}>
        <LinearProgress color="secondary"></LinearProgress>
      </Box>
    );
  }

  const handleAddToCartSubmit = ({ quantity }) => {
    const action = addToCart({
      id: product.id,
      product,
      quantity,
    });
    dispatch(action);
  };

  return (
    <Box className={classes.root}>
      <Container>
        <Paper elevation={0}>
          <Grid container>
            <Grid className={classes.left} item>
              <ProductThumbnail product={product} />
            </Grid>
            <Grid className={classes.right} item>
              <ProductInformation product={product} />
              <AddToCartForm onSubmit={handleAddToCartSubmit} />
            </Grid>
          </Grid>
        </Paper>
        <ProductMenu />
        <Route exact path={url}>
          <ProductDescription product={product} />
        </Route>
        <Route path={`${url}/additional`} product={product} component={ProductAdditional}></Route>
        <Route path={`${url}/reviews`} product={product} component={ProductReview}></Route>
      </Container>
    </Box>
  );
}

export default DetailsPage;
