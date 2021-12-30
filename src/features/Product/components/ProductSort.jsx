import React from 'react';
import PropTypes from 'prop-types';
import { makeStyles, Tab, Tabs } from '@material-ui/core';

ProductSort.propTypes = {
  currentSort: PropTypes.string.isRequired,
  onChange: PropTypes.func,
};

const useStyles = makeStyles((theme) => ({
  tabText: {
    [theme.breakpoints.between('xs', 'md')]: {
      fontSize: 10,
    },
    [theme.breakpoints.between('md', 'lg')]: {
      fontSize: 14,
    },
  },
}));

function ProductSort({ currentSort, onChange }) {
  const classes = useStyles();
  const handleSortChange = (event, newValue) => {
    if (onChange) {
      onChange(newValue);
    }
  };

  return (
    <Tabs value={currentSort} onChange={handleSortChange} indicatorColor="primary" textColor="primary">
      <Tab className={classes.tabText} label="Sắp xếp theo giá tăng dần" value="salePrice:ASC"></Tab>
      <Tab className={classes.tabText} label="Sắp xếp theo giá giảm dần" value="salePrice:DESC"></Tab>
    </Tabs>
  );
}

export default ProductSort;
