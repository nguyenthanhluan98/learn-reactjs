import { configureStore } from '@reduxjs/toolkit';
import userSlice from 'features/Auth/userSlice';
import counterSlice from '../features/Counter/counterSlice';

const rootReducer = {
  count: counterSlice,
  user: userSlice,
};

const store = configureStore({
  reducer: rootReducer,
});

export default store;
