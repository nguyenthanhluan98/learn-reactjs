import React from 'react';
import { Route, Switch, useRouteMatch } from 'react-router';
import { Box } from '../../../node_modules/@material-ui/core/index';
import DetailsPage from './pages/DetailsPage';
import ListPage from './pages/ListPage';

function ProductFeature(props) {
  const match = useRouteMatch();
  return (
    <Box pt={4}>
      <Switch>
        <Route path={match.url} exact component={ListPage} />
        <Route path={`${match.url}/:productId`} component={DetailsPage} />
      </Switch>
    </Box>
  );
}

export default ProductFeature;
