import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Box, Container, Paper, Grid } from '@material-ui/core';
import ProductThumbnail from './../components/ProductThumbnail';
import { Route, useRouteMatch } from 'react-router-dom';
import useProductDetails from '../hooks/useProductDetails';
import ProductInformation from './../components/ProductInformation';
import AddToCartForm from './../components/AddToCartForm';
import ProductMenu from './../components/ProductMenu';
import ProductDescription from './../components/ProductDescription';
import ProductAdditional from '../components/ProductAdditional';
import ProductReview from '../components/ProductReview';

const useStyles = makeStyles((theme) => ({
  root: {},
  left: {
    width: '400px',
    padding: theme.spacing(1.5),
    borderRight: `1px solid ${theme.palette.grey[300]}`,
  },
  right: {
    flex: '1 1 0',
    padding: theme.spacing(1.5),
  },
}));

function DetailsPage() {
  const classes = useStyles();
  const {
    params: { productId },
    url,
  } = useRouteMatch();

  const { product, loading } = useProductDetails(productId);

  if (loading) {
    return (
      <Box>
        <p>Loading...........</p>
      </Box>
    );
  }

  const handleAddToCartSubmit = (formValues) => {
    console.log(formValues);
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
          <ProductDescription />
        </Route>
        <Route path={`${url}/additional`} component={ProductAdditional}></Route>
        <Route path={`${url}/reviews`} component={ProductReview}></Route>
      </Container>
    </Box>
  );
}

export default DetailsPage;
