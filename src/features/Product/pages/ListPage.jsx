import React, { useEffect, useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';

import productApi from 'api/productApi';
import ProductListSkeleton from '../components/ProductListSkeleton';
import { Box, Container, Grid, Paper } from '@material-ui/core';
import ProductList from '../components/ProductList';
import { Pagination } from '@material-ui/lab';

ListPage.propTypes = {};

const useStyles = makeStyles((theme) => ({
  root: {},
  left: {
    width: '250px',
  },
  right: {
    flex: '1 1 0',
  },
  pagination: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: '20px',
    paddingBottom: '20px',
  },
}));

function ListPage(props) {
  const classes = useStyles();
  const [productList, setProductList] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filters, setFilters] = useState({
    _page: 1,
    _limit: 9,
  });
  const [pagination, setPagination] = useState({
    limit: 9,
    page: 1,
    total: 10,
  });

  useEffect(() => {
    (async () => {
      try {
        const { data, pagination } = await productApi.getAll(filters);
        setPagination(pagination);
        setProductList(data);

        console.log('pagination update filter: ', pagination);
      } catch (error) {
        console.log('Failed to loading product list');
      }

      setLoading(false);
    })();
  }, [filters]);

  const handlePageChange = (e, page) => {
    setFilters((prevFilters) => ({
      ...prevFilters,
      _page: page,
    }));
  };

  return (
    <Box className={classes.root}>
      <Container>
        <Grid spacing={1} container>
          <Grid className={classes.left} item>
            <Paper elevation={0}>Filter form</Paper>
          </Grid>
          <Grid className={classes.right} item>
            <Paper elevation={0}>
              {loading ? <ProductListSkeleton length={9} /> : <ProductList data={productList} />}
              <Box className={classes.pagination}>
                <Pagination
                  count={Math.ceil(pagination.total / pagination.limit)}
                  page={pagination.page}
                  color="primary"
                  onChange={handlePageChange}
                />
              </Box>
            </Paper>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
}

export default ListPage;
