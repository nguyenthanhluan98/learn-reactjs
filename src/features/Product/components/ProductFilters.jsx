import React from 'react';
import PropTypes from 'prop-types';
import { Box } from '@material-ui/core';
import FilterByCategory from './Filter/FilterByCategory';
import FilterByPrice from './Filter/FilterByPrice';
import FilterByService from './Filter/FilterByService';

ProductFilters.propTypes = {
  filters: PropTypes.object.isRequired,
  onChange: PropTypes.func,
};

function ProductFilters({ filters, onChange }) {
  const handleFilterChange = (category) => {
    if (!onChange) return;

    const newFilters = {
      ...filters,
      'category.id': category.id,
      'category.name': category.name,
    };
    onChange(newFilters);
  };

  const handlePriceChange = (values) => {
    if (onChange) {
      onChange(values);
    }
  };

  const handleChange = (values) => {
    if (onChange) {
      onChange(values);
    }
  };

  return (
    <Box>
      <FilterByCategory onChange={handleFilterChange} />
      <FilterByPrice onChange={handlePriceChange} />
      <FilterByService filters={filters} onChange={handleChange} />
    </Box>
  );
}

export default ProductFilters;
