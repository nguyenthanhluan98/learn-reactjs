import React from 'react';
import PropTypes from 'prop-types';

import { Skeleton } from '@material-ui/lab';
import { Box, Grid } from '@material-ui/core';

ProductListSkeleton.propTypes = {
  length: PropTypes.number,
};

ProductListSkeleton.defaultProps = {
  length: 9,
};

function ProductListSkeleton({ length }) {
  return (
    <Box>
      <Grid container>
        {Array.from(new Array(length)).map((x, index) => (
          <Grid item key={index} xs={12} sm={6} md={3} lg={4}>
            <Box padding={1}>
              <Skeleton variant="rect" width="100%" height={200} />
              <Skeleton />
              <Skeleton width="60%" />
            </Box>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
}

export default ProductListSkeleton;
