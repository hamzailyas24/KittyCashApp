import { configureStore } from '@reduxjs/toolkit';
import offerReducer from './slices/offerSlice';
import userReducer from './slices/userSlice';

const store = configureStore({
  reducer: {
    offers: offerReducer,
    user: userReducer,
  },
});

export default store;
