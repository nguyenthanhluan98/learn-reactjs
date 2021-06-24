import { configureStore } from '@reduxjs/toolkit';
import userSlice from 'features/Auth/userSlice';
import counterSlice from '../features/Counter/counterSlice';
import cartSlice from '../features/Cart/cartSlice';

const rootReducer = {
  count: counterSlice,
  user: userSlice,
  cart: cartSlice,
};

const store = configureStore({
  reducer: rootReducer,
});

export default store;
