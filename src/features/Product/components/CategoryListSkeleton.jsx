import React from 'react';
import PropTypes from 'prop-types';
import { Box, Grid, Typography } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { Skeleton } from '@material-ui/lab';

CategoryListSkeleton.propTypes = {
  length: PropTypes.number,
};
CategoryListSkeleton.defaultProps = {
  length: 6,
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

function CategoryListSkeleton({ length }) {
  const classes = useStyles();
  return (
    <Box className={classes.root} minHeight="150px">
      <ul className={classes.menu}>
        {Array.from(new Array(length)).map((index) => (
          <Box padding={1}>
            <Skeleton minHeight="100px" />
          </Box>
        ))}
      </ul>
    </Box>
  );
}

export default CategoryListSkeleton;
