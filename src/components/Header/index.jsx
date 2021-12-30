import AppBar from '@material-ui/core/AppBar';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogContent from '@material-ui/core/DialogContent';
import IconButton from '@material-ui/core/IconButton';
import { makeStyles } from '@material-ui/core/styles';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import { AccountCircle, ShoppingCart } from '@material-ui/icons';
import AdbIcon from '@material-ui/icons/Adb';
import CloseIcon from '@material-ui/icons/Close';
import Login from 'features/Auth/components/Login';
import { hideMiniCart } from 'features/Cart/cartSlice';
import { cartItemsCountSelector } from 'features/Cart/selector';
import { PropTypes } from 'prop-types';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useHistory } from 'react-router-dom';
import { supabase } from 'supabaseClient';
import { Badge, Box } from '../../../node_modules/@material-ui/core';
import { Menu, MenuItem } from '../../../node_modules/@material-ui/core/index';
import Register from './../../features/AuthSupaBase/Register/Register';
import ShowMiniCart from './../../features/Cart/components/ShowMiniCart';
import { useAuthState } from 'react-firebase-hooks/auth';
import { auth } from 'features/Firebase/config/firebase';
import { Hidden } from '@material-ui/core';
import SideDrawer from 'components/Side/SideDrawer';

Header.propTypes = {
  cartItemsCount: PropTypes.number,
};

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
    [theme.breakpoints.between('xs', 'md')]: {
      fontSize: 10,
    },
    [theme.breakpoints.between('md', 'lg')]: {
      fontSize: 14,
    },
  },
  textLink: {
    fontSize: 12.5,
  },
  dialogPaper: {
    minHeight: '80vh',
    maxHeight: '80vh',
  },
  cartBox: {
    height: '100%',
    width: '250px',
  },
  miniCart: {
    position: 'absolute',

    top: theme.spacing(6),
    right: theme.spacing(3),
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
  const [user, loading, error] = useAuthState(auth);
  const navLinks = [
    { title: `Product list`, path: `/products` },
    { title: `login`, path: `/product` },
    { title: `blog`, path: `/blog` },
    { title: `contact`, path: `/contact` },
    { title: `faq`, path: `/faq` },
  ];

  useEffect(() => {
    if (loading) return;
    if (user) {
      console.log(user);
    }
  }, [user, loading]);

  const history = useHistory();

  //  const loggedInUser = useSelector((state) => state.user.current);
  const cartItemsCount = useSelector(cartItemsCountSelector);
  const showMiniCart = useSelector((state) => state.cart.showMiniCart);

  //  const isLoggedIn = !!loggedInUser.id;

  const isLoggedInSupaBase = supabase.auth.user();

  console.log('is logged in: ', isLoggedInSupaBase);

  const [anchorEl, setAnchorEl] = useState(null);

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
    // const action = logout();
    // dispatch(action);
    // setAnchorEl(null);

    auth.signOut();
  };

  // const handleLogoutSupaBase = async () => {
  //   try {
  //     const { error } = await supabase.auth.signOut();
  //     if (error) throw error;
  //     alert('Sign out.....');
  //     setAnchorEl(null);
  //   } catch (error) {
  //     console.log(error);
  //   }
  // };

  const handleCartClick = () => {
    history.push('/cart');
  };

  const handleCloseMiniCart = () => {
    const action = hideMiniCart();
    dispatch(action);
  };

  return (
    <div>
      <AppBar position="static">
        <Toolbar>
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

          <Hidden smDown>
            {navLinks.map(({ title, path }) => (
              <Button color="inherit">
                {title === 'login' && (
                  <Link className={classes.tabLink} onClick={handleClickOpen}>
                    {title}
                  </Link>
                )}

                {title !== 'login' && (
                  <Link className={classes.tabLink} to={path}>
                    {title}
                  </Link>
                )}
              </Button>
            ))}
          </Hidden>
          <Hidden mdUp>
            <SideDrawer navLinks={navLinks} />
          </Hidden>

          {/* <Button color="inherit">
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

          {user && <AccountCircle aria-haspopup="true" onClick={handleClickOpenMenu} color="inherit" />}
          {!user && (
            <Button color="inherit" onClick={handleClickOpen}>
              Login
            </Button>
          )}
          <IconButton aria-label="show 4 new mails" onClick={handleCartClick} color="inherit">
            <Badge badgeContent={cartItemsCount} color="secondary">
              <ShoppingCart />
            </Badge>
          </IconButton> */}
          <Box className={classes.miniCart}>{showMiniCart && <ShowMiniCart onClose={handleCloseMiniCart} />}</Box>
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
        <MenuItem onClick={handleClickCloseMenu}>{user && user.displayName}</MenuItem>
        <MenuItem onClick={handleClickCloseMenu}>My account</MenuItem>
        <MenuItem onClick={handleLogout}>Logout</MenuItem>
      </Menu>
      {/* Registration and login form */}
      <Dialog maxWidth="sm" fullWidth open={open} onClose={handleClose} aria-labelledby="form-dialog-title">
        <IconButton className={classes.closeButton} onClick={handleClose}>
          <CloseIcon />
        </IconButton>
        <DialogContent style={{ overflow: 'hidden' }}>
          {mode === MODE.REGISTER && (
            <>
              {/* <Register closeDialog={handleClose} /> */}
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
