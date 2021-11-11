import { configureStore } from '@reduxjs/toolkit';
import userReducer from '../features/Auth/userSlice';
import categoryReducer from '../features/Product/categorySlice';

const rootReducer = {
  user: userReducer,
  category: categoryReducer,
};

const store = configureStore({
  reducer: rootReducer,
});

export default store;
