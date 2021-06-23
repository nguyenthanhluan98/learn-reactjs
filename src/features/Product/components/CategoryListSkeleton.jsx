// import { Box } from '@material-ui/core';
// import { makeStyles } from '@material-ui/core/styles';
// import { Skeleton } from '@material-ui/lab';
// import PropTypes from 'prop-types';
// import React from 'react';

// CategoryListSkeleton.propTypes = {
//   length: PropTypes.number,
// };
// CategoryListSkeleton.defaultProps = {
//   length: 6,
// };

// const useStyles = makeStyles((theme) => ({
//   root: {
//     padding: theme.spacing(2),
//   },
//   menu: {
//     padding: 0,
//     margin: 0,
//     listStyleType: 'none',

//     '& > li': {
//       marginTop: theme.spacing(1),
//       transition: 'all .25s',
//       '&:hover': {
//         color: theme.palette.primary.dark,
//         cursor: 'pointer',
//       },
//     },
//   },
// }));

// function CategoryListSkeleton({ length }) {
//   const classes = useStyles();
//   return (
//     <Box className={classes.root}>
//       <ul className={classes.menu}>
//         {Array.from(new Array(length)).map((_, value) => (
//           <Box key={value} padding={1}>
//             <Skeleton key={value} minHeight="100px" />
//           </Box>
//         ))}
//       </ul>
//     </Box>
//   );
// }

// export default CategoryListSkeleton;
