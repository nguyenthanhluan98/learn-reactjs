import { Box, Typography } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import categoryApi from 'api/categoryApi';
import PropTypes from 'prop-types';
import React, { useEffect, useState } from 'react';

FilterByCategory.propTypes = {
  onChange: PropTypes.func,
  categoryList: PropTypes.array,
};

const useStyles = makeStyles((theme) => ({
  root: {
    padding: theme.spacing(2),
  },
  menu: {
    padding: 0,
    margin: 0,
    listStyleType: 'none',

    '& > li': {
      marginTop: theme.spacing(1),
      transition: 'all .25s',
      '&:hover': {
        color: theme.palette.primary.dark,
        cursor: 'pointer',
      },
    },
  },
}));

function FilterByCategory({ onChange }) {
  const [categoryList, setCategoryList] = useState([]);
  const classes = useStyles();

  useEffect(() => {
    (async () => {
      try {
        const list = await categoryApi.getAll();
        setCategoryList(
          list.map((category) => ({
            id: category.id,
            name: category.name,
          }))
        );
      } catch (error) {
        console.log('Failed to fetch category list');
      }
    })();
  }, []);

  const handleCategoryChange = (category) => {
    if (onChange) {
      onChange(category);
    }
  };

  return (
    <Box className={classes.root} minHeight="200px">
      <Typography variant="subtitle2">Danh mục sản phẩm</Typography>
      <ul className={classes.menu}>
        {categoryList.map((category) => (
          <li key={category.name} onClick={() => handleCategoryChange(category)}>
            <Typography variant="body2">{category.name}</Typography>
          </li>
        ))}
      </ul>
    </Box>
  );
}

export default FilterByCategory;
