import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { makeStyles, Box, Chip } from '@material-ui/core';

FilterViewer.propTypes = {
  filters: PropTypes.object,
  onChange: PropTypes.func,
};

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    flexFlow: 'row wrap',
    alignItems: 'center',
    listStyleType: 'none',
    padding: 0,
    margin: theme.spacing(2, 0),

    '& > li': {
      margin: 0,
      padding: theme.spacing(1),
    },
  },
}));

function FilterViewer({ filters = {}, onChange = null }) {
  const classes = useStyles();

  console.log('Filter viewer: ', filters);

  const FILTER_LIST = [
    {
      id: '1',
      getLabel: () => 'Miễn phí giao hàng',
      isActive: (filters) => filters.isFreeShip,
      isVisible: () => true,
      isRemovable: false,
      onRemove: () => {},
      onToggle: (filters) => {
        const newFilters = { ...filters };
        if (newFilters.isFreeShip) {
          delete newFilters.isFreeShip;
          delete filters.isFreeShip;
        } else {
          newFilters.isFreeShip = true;
        }
        return newFilters;
      },
    },
    {
      id: '2',
      getLabel: () => 'Có khuyến mãi',
      isActive: () => true,
      isVisible: (filters) => filters.isPromotion,
      isRemovable: true,
      onRemove: (filters) => {
        const newFilters = { ...filters };
        if (newFilters.isPromotion) {
          delete newFilters.isPromotion;
          delete filters.isPromotion;
        } else {
          newFilters.isPromotion = false;
        }

        return newFilters;
      },
      onToggle: () => null,
    },
    {
      id: '3',
      getLabel: (filters) => `Từ ${filters.salePrice_gte} đến ${filters.salePrice_lte}`,
      isActive: () => true,
      isVisible: (filters) =>
        Object.keys(filters).includes('salePrice_gte') && Object.keys(filters).includes('salePrice_lte'),
      isRemovable: true,
      onRemove: (filters) => {
        const newFilters = { ...filters };
        delete newFilters.salePrice_gte;
        delete newFilters.salePrice_lte;
        delete filters.salePrice_gte;
        delete filters.salePrice_lte;
        return newFilters;
      },
      onToggle: () => null,
    },
    {
      id: '4',
      getLabel: (filters) => `${filters['category.name']}`,
      isActive: () => true,
      isVisible: (filters) => filters['category.name'],
      isRemovable: true,
      onRemove: (filters) => {
        const newFilters = { ...filters };
        delete newFilters['category.id'];
        delete newFilters['category.name'];
        delete filters['category.id'];
        delete filters['category.name'];
        return newFilters;
      },
      onToggle: () => null,
    },
  ];

  return (
    <Box component="ul" className={classes.root}>
      {FILTER_LIST.filter((x) => x.isVisible(filters)).map((x) => (
        <li key={x.id}>
          <Chip
            label={x.getLabel(filters)}
            color={x.isActive(filters) ? 'primary' : 'default'}
            clickable={!x.isRemovable}
            onClick={
              x.isRemovable
                ? null
                : () => {
                    if (!onChange) return;
                    const newFilters = x.onToggle(filters);
                    onChange(newFilters);
                  }
            }
            onDelete={
              x.isRemovable
                ? () => {
                    if (!onChange) return;
                    const newFilters = x.onRemove(filters);
                    onChange(newFilters);
                  }
                : null
            }
          />
        </li>
      ))}
    </Box>
  );
}

export default FilterViewer;
