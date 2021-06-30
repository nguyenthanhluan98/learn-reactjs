import { Box, Button, makeStyles } from '@material-ui/core';
import CloseIcon from '@material-ui/icons/Close';
import React from 'react';
import { useHistory } from 'react-router-dom';

ShowMiniCart.propTypes = {};

const useStyles = makeStyles((theme) => ({
  root: {
    minWidth: '220px',
    minHeight: '100px',
    backgroundColor: 'white',
    color: 'black',
    display: 'flex',
    flexFlow: 'column',
    justifyContent: 'center',
    padding: theme.spacing(1),
    marginTop: theme.spacing(1),
    position: 'relative',
    borderRadius: '5px',
    boxShadow: '0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19)',
    zIndex: 1,

    '&::before': {
      content: '""',
      position: 'absolute',
      borderStyle: 'solid',
      top: theme.spacing(-2.1),
      right: '14px',
      borderWidth: '8px 10px',
      borderColor: 'transparent transparent white transparent',
    },
  },
  message: {
    textAlign: 'center',
    paddingBottom: theme.spacing(2),
  },
  action: {
    display: 'inline-block',
    padding: 0,
    margin: '0 auto',
  },
  closeBtn: {
    zIndex: 1,
    position: 'absolute',
    top: theme.spacing(1),
    right: theme.spacing(1),
    fontSize: '20px',
    cursor: 'pointer',
    opacity: '0.5',
  },
}));

function ShowMiniCart(props) {
  const history = useHistory();
  const { onClose } = props;

  const moveToCartPage = () => {
    history.push('/cart');
    onClose();
  };

  const handleClose = () => {
    if (!onClose) return;
    onClose();
  };

  const classes = useStyles();
  return (
    <div>
      <Box className={classes.root}>
        <Box className={classes.message}>Add to cart successfully</Box>
        <Box className={classes.action}>
          <Button onClose={handleClose} onClick={moveToCartPage} variant="contained" color="secondary" size="small">
            Go to your cart and pay
          </Button>
        </Box>
        <CloseIcon onClick={handleClose} className={classes.closeBtn} />
      </Box>
    </div>
  );
}

export default ShowMiniCart;
