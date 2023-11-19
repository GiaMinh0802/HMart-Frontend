import { configureStore } from '@reduxjs/toolkit'
import authReducer from '../features/auth/authSlice'
import productReducer from '../features/product/productSlice'
import userReducer from '../features/user/userSlice'
import categoryReducer from '../features/category/categorySlice'

export const store = configureStore({
  reducer: {
    auth: authReducer,
    product: productReducer,
    user: userReducer,
    category: categoryReducer
  },
})