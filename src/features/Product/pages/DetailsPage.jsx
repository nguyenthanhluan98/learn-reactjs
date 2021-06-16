import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Box, Container, Paper, Grid } from '@material-ui/core';
import ProductThumbnail from './../components/ProductThumbnail';
import { useRouteMatch } from 'react-router-dom';
import useProductDetails from '../hooks/useProductDetails';
import ProductInformation from './../components/ProductInformation';

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
  } = useRouteMatch();

  const { product, loading } = useProductDetails(productId);

  if (loading) {
    return (
      <Box>
        <p>Loading...........</p>
      </Box>
    );
  }

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
            </Grid>
          </Grid>
        </Paper>
      </Container>
    </Box>
  );
}

export default DetailsPage;
