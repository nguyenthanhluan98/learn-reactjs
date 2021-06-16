import React, { useEffect, useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';

import productApi from 'api/productApi';
import ProductListSkeleton from '../components/ProductListSkeleton';
import { Box, Container, Grid, Paper } from '@material-ui/core';
import ProductList from '../components/ProductList';
import { Pagination } from '@material-ui/lab';
import ProductSort from '../components/ProductSort';
import ProductFilters from '../components/ProductFilters';
import CategoryListSkeleton from '../components/CategoryListSkeleton';
import FilterViewer from './../components/FilterViewer';
import { useHistory, useLocation } from 'react-router-dom';

import queryString from 'query-string';

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
  freeShip: {
    position: 'absolute',
    top: '10px',
    left: '10px',

    padding: '5px',
    backgroundColor: 'white',
    border: '2px solid red',
  },
}));

function ListPage(props) {
  const classes = useStyles();

  const history = useHistory();
  const location = useLocation();
  const queryParams = queryString.parse(location.search);

  const [productList, setProductList] = useState([]);
  const [loading, setLoading] = useState(true);

  const [filters, setFilters] = useState(() => ({
    ...queryParams,
    _page: Number.parseInt(queryParams._page) || 1,
    _limit: Number.parseInt(queryParams._limit) || 9,
    _sort: queryParams._sort || 'salePrice:ASC',
  }));

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
      } catch (error) {
        console.log('Failed to loading product list');
      }
      setLoading(false);
    })();
  }, [filters]);

  useEffect(() => {
    history.push({
      pathname: history.location.path,
      search: queryString.stringify(filters),
    });
  }, [history, filters]);

  const handlePageChange = (e, page) => {
    setFilters((prevFilters) => ({
      ...prevFilters,
      _page: page,
    }));
  };

  const handleSortChange = (newSortValue) => {
    setFilters((prevFilters) => ({
      ...prevFilters,
      _sort: newSortValue,
    }));
  };

  const handleFiltersChange = (newFilters) => {
    setFilters((prevFilters) => ({
      ...prevFilters,
      ...newFilters,
      _page: 1,
    }));
  };

  const handleNewFilterChange = (newFilters) => {
    setFilters(newFilters);
  };

  return (
    <Box className={classes.root}>
      <Container>
        <Grid spacing={1} container>
          <Grid className={classes.left} item>
            <Paper elevation={0}>
              <ProductFilters filters={filters} onChange={handleFiltersChange} />
            </Paper>
          </Grid>
          <Grid className={classes.right} item>
            <Paper elevation={0}>
              <ProductSort currentSort={filters._sort} onChange={handleSortChange} />
              <FilterViewer filters={filters} onChange={handleNewFilterChange} />
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
