import AppBar from '@material-ui/core/AppBar';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogContent from '@material-ui/core/DialogContent';
import IconButton from '@material-ui/core/IconButton';
import Popover from '@material-ui/core/Popover';
import { makeStyles } from '@material-ui/core/styles';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import { AccountCircle, ShoppingCart } from '@material-ui/icons';
import AdbIcon from '@material-ui/icons/Adb';
import CloseIcon from '@material-ui/icons/Close';
import Login from 'features/Auth/components/Login';
import Register from 'features/Auth/components/Register';
import { logout } from 'features/Auth/userSlice';
import { hideMiniCart, showMiniCart } from 'features/Cart/cartSlice';
import { cartItemsCountSelector } from 'features/Cart/selector';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useHistory } from 'react-router-dom';
import { Badge, Box } from '../../../node_modules/@material-ui/core';
import { Menu, MenuItem } from '../../../node_modules/@material-ui/core/index';

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  img: {},
  menuButton: {
    marginRight: theme.spacing(2),
    position: 'relative',
  },
  logoImage: {
    pointerEvents: 'none',
  },
  image: {
    position: 'absolute',
    filter: 'brightness(0) invert(1)',
    width: '150px',
  },
  title: {
    flexGrow: 1,
  },
  closeButton: {
    position: 'absolute',
    top: theme.spacing(1),
    right: theme.spacing(1),
    color: theme.palette.grey[500],
    zIndex: 1,
  },
  tabLink: {
    textDecoration: 'none',
    color: theme.palette.common.white,
  },
  textLink: {
    fontSize: 12.5,
  },
  dialogPaper: {
    minHeight: '80vh',
    maxHeight: '80vh',
  },
  miniCart: {
    marginTop: theme.spacing(4),
  },
  cartContent: {
    display: 'flex',
    flexFlow: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: theme.spacing(4),
    padding: theme.spacing(2),
  },
  cartBtn: {
    marginTop: theme.spacing(2),
  },
}));

const MODE = {
  LOGIN: 'login',
  REGISTER: 'register',
};

function Header(props) {
  const classes = useStyles();
  const dispatch = useDispatch();

  const [open, setOpen] = useState(false);
  const [mode, setMode] = useState(MODE.LOGIN);

  const history = useHistory();

  const loggedInUser = useSelector((state) => state.user.current);
  const cartItemsCount = useSelector(cartItemsCountSelector);
  const isMiniCartVisible = useSelector((state) => state.cart.showMiniCart);

  console.log('items count change: ', cartItemsCount);

  useEffect(() => {
    if (cartItemsCount > 0) {
      const action = showMiniCart();
      console.log('running');
      dispatch(action);
    }
  }, [cartItemsCount]);

  const isLoggedIn = !!loggedInUser.id;

  const [anchorEl, setAnchorEl] = useState(null);

  const [anchorEl1, setAnchorEl1] = useState(null);

  const handleClickCart = (event) => {
    setAnchorEl1(event.currentTarget);
  };

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleClickOpenMenu = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClickCloseMenu = () => {
    setAnchorEl(null);
  };

  const handleLogout = () => {
    const action = logout();
    dispatch(action);
    setAnchorEl(null);
  };

  const handleCartClick = () => {
    history.push('/cart');
  };

  const handleCloseMiniCart = () => {
    const action = hideMiniCart();
    console.log('hide: ', action);
    dispatch(action);
  };

  return (
    <div>
      <AppBar position="static">
        <Toolbar>
          {/* <Button className={classes.logoImage}>
            <img className={classes.image} src={process.env.PUBLIC_URL + '/images/logo.png'} alt="My logo" />
          </Button> */}
          {/* <IconButton edge="start" className={classes.menuButton} aria-label="menu">
            <img
              className={classes.image}
              src={process.env.PUBLIC_URL + '/images/logo.png'}
              alt="My logo"
              width="100%"
            />
          </IconButton> */}

          <Typography variant="h6" className={classes.title}>
            <Link className={classes.tabLink} to="/">
              <IconButton aria-label="show 4 new mails" onClick={handleCartClick} color="inherit">
                <Badge color="secondary">
                  <AdbIcon />
                </Badge>
              </IconButton>
              My shop
            </Link>
          </Typography>
          <Button color="inherit">
            <Link className={classes.tabLink} to="/todo-list">
              To do list
            </Link>
          </Button>
          <Button color="inherit">
            <Link className={classes.tabLink} to="/products">
              Product list
            </Link>
          </Button>
          <Button color="inherit">
            <Link className={classes.tabLink} to="/album">
              Album
            </Link>
          </Button>
          <Button color="inherit">
            <Link className={classes.tabLink} to="/blog">
              Blog
            </Link>
          </Button>

          {isLoggedIn && <AccountCircle aria-haspopup="true" onClick={handleClickOpenMenu} color="inherit" />}
          {!isLoggedIn && (
            <Button color="inherit" onClick={handleClickOpen}>
              Login
            </Button>
          )}
          <IconButton aria-label="show 4 new mails" onClick={handleCartClick} color="inherit">
            <Badge badgeContent={cartItemsCount} color="secondary">
              <ShoppingCart />
            </Badge>
          </IconButton>
          <Popover
            className={classes.miniCart}
            open={isMiniCartVisible}
            onClose={handleCloseMiniCart}
            anchorEl={null}
            anchorOrigin={{
              vertical: 'top',
              horizontal: 'right',
            }}
            transformOrigin={{
              vertical: 'top',
              horizontal: 'right',
            }}
          >
            <Box className={classes.cartBox}>
              <IconButton className={classes.closeButton} onClick={handleCloseMiniCart}>
                <CloseIcon />
              </IconButton>
              <Box className={classes.cartContent}>
                <Typography className={classes.typography}>The content of the Popover.</Typography>
                <Button
                  className={classes.cartBtn}
                  fullWidth
                  color="secondary"
                  variant="contained"
                  onClick={handleCartClick}
                >
                  Go to your cart
                </Button>
              </Box>
            </Box>
          </Popover>
        </Toolbar>
      </AppBar>

      <Menu
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'right',
        }}
        transformOrigin={{
          vertical: 'top',
          horizontal: 'right',
        }}
        getContentAnchorEl={null}
        id="simple-menu"
        anchorEl={anchorEl}
        keepMounted
        open={Boolean(anchorEl)}
        onClose={handleClickCloseMenu}
      >
        <MenuItem onClick={handleClickCloseMenu}>Profile</MenuItem>
        <MenuItem onClick={handleClickCloseMenu}>My account</MenuItem>
        <MenuItem onClick={handleLogout}>Logout</MenuItem>
      </Menu>
      <Dialog maxWidth="sm" fullWidth open={open} onClose={handleClose} aria-labelledby="form-dialog-title">
        <IconButton className={classes.closeButton} onClick={handleClose}>
          <CloseIcon />
        </IconButton>
        <DialogContent style={{ overflow: 'hidden' }}>
          {mode === MODE.REGISTER && (
            <>
              <Register closeDialog={handleClose} />
              <Box textAlign="right">
                <Button className={classes.textLink} color="primary" onClick={() => setMode(MODE.LOGIN)}>
                  Already an account. Login here
                </Button>
              </Box>
            </>
          )}
          {mode === MODE.LOGIN && (
            <>
              <Login closeDialog={handleClose} />
              <Box textAlign="right">
                <Button className={classes.textLink} color="primary" onClick={() => setMode(MODE.REGISTER)}>
                  Don't have account. Register here
                </Button>
              </Box>
            </>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}

export default Header;
