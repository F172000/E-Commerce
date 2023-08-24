import { configureStore } from '@reduxjs/toolkit';
import productReducer from '../features/Product-list/productSlice';
import authReducer from '../features/auth/authSlice';
import cartReducer from '../features/cart/cartSlice';
import orderReducer from '../features/Orders/orderSlice';
export const store = configureStore({
  reducer: {
    product: productReducer,
    auth:authReducer,
    cart:cartReducer,
    order:orderReducer
  },
});
