import { createSlice, createAsyncThunk, createAction } from '@reduxjs/toolkit'
import productService from './productService'
import { toast } from 'react-toastify'

const initialState = {
    products: [],
    isError: false,
    isLoading: false,
    isSuccess: false,
    message: ""
}

export const getProducts = createAsyncThunk('product/get-products', async (thunkAPI) => {
    try {
        return await productService.getProducts()
    } catch (error) {
        return thunkAPI.rejectWithValue(error)
    }
})

export const getSingleProduct = createAsyncThunk('product/get-product', async (prodId, thunkAPI) => {
    try {
        return await productService.getSingleProduct(prodId)
    } catch (error) {
        return thunkAPI.rejectWithValue(error)
    }
})

export const ratingProduct = createAsyncThunk('product/rating-product', async (ratingDetail, thunkAPI) => {
    try {
        return await productService.ratingProduct(ratingDetail)
    } catch (error) {
        return thunkAPI.rejectWithValue(error)
    }
})


export const addToWishlist = createAsyncThunk('product/wishlist', async (prodId, thunkAPI) => {
    try {
        return await productService.addToWishlist(prodId)
    } catch (error) {
        return thunkAPI.rejectWithValue(error)
    }
})

export const addToCart = createAsyncThunk('product/cart', async (data, thunkAPI) => {
    try {
        return await productService.addToCart(data)
    } catch (error) {
        return thunkAPI.rejectWithValue(error)
    }
})

export const removeFromCart = createAsyncThunk('product/remove-cart', async (data, thunkAPI) => {
    try {
        return await productService.removeFromCart(data)
    } catch (error) {
        return thunkAPI.rejectWithValue(error)
    }
})

export const updateQuantityFromCart = createAsyncThunk('product/update-cart', async (data, thunkAPI) => {
    try {
        return await productService.updateQuantityFromCart(data)
    } catch (error) {
        return thunkAPI.rejectWithValue(error)
    }
})

export const productSlice = createSlice({
    name: "products",
    initialState: initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(getProducts.pending, (state) => {
                state.isLoading = true
            })
            .addCase(getProducts.fulfilled, (state, action) => {
                state.isLoading = false
                state.isError = false
                state.isSuccess = true
                state.products = action.payload
            })
            .addCase(getProducts.rejected, (state, action) => {
                state.isLoading = false
                state.isError = true
                state.isSuccess = false
                state.message = action.error
            })
            .addCase(getSingleProduct.pending, (state) => {
                state.isLoading = true
            })
            .addCase(getSingleProduct.fulfilled, (state, action) => {
                state.isLoading = false
                state.isError = false
                state.isSuccess = true
                state.product = action.payload
            })
            .addCase(getSingleProduct.rejected, (state, action) => {
                state.isLoading = false
                state.isError = true
                state.isSuccess = false
                state.message = action.error
            })
            .addCase(ratingProduct.pending, (state) => {
                state.isLoading = true
            })
            .addCase(ratingProduct.fulfilled, (state, action) => {
                state.isLoading = false
                state.isError = false
                state.isSuccess = true
                state.ratingProduct = action.payload
                if (state.isSuccess) {
                    toast.success("Rating Product Successfully")
                }
            })
            .addCase(ratingProduct.rejected, (state, action) => {
                state.isLoading = false
                state.isError = true
                state.isSuccess = false
                state.message = action.error
                if (state.isSuccess === false) {
                    toast.error("Something Went Wrong")
                }
            })
            .addCase(addToWishlist.pending, (state) => {
                state.isLoading = true
            })
            .addCase(addToWishlist.fulfilled, (state, action) => {
                state.isLoading = false
                state.isError = false
                state.isSuccess = true
                state.addToWishlist = action.payload
                state.message = "Product Added To Wishlist"
            })
            .addCase(addToWishlist.rejected, (state, action) => {
                state.isLoading = false
                state.isError = true
                state.isSuccess = false
                state.message = action.error
            })
            .addCase(addToCart.pending, (state) => {
                state.isLoading = true
            })
            .addCase(addToCart.fulfilled, (state, action) => {
                state.isLoading = false
                state.isSuccess = true
                state.isError = false
                state.addToCart = action.payload
                if (state.isSuccess) {
                    toast.success("Product Added To Cart")
                }
            })
            .addCase(addToCart.rejected, (state, action) => {
                state.isError = true
                state.isSuccess = false
                state.isLoading = false
                state.message = action.error
            })
            .addCase(removeFromCart.pending, (state) => {
                state.isLoading = true
            })
            .addCase(removeFromCart.fulfilled, (state, action) => {
                state.isLoading = false
                state.isSuccess = true
                state.isError = false
                state.removeFromCart = action.payload
                if (state.isSuccess) {
                    toast.success("Product Removed From Cart")
                }
            })
            .addCase(removeFromCart.rejected, (state, action) => {
                state.isError = true
                state.isSuccess = false
                state.isLoading = false
                state.message = action.error
                if (state.isSuccess === false) {
                    toast.error("Something Went Wrong")
                }
            })
            .addCase(updateQuantityFromCart.pending, (state) => {
                state.isLoading = true
            })
            .addCase(updateQuantityFromCart.fulfilled, (state, action) => {
                state.isLoading = false
                state.isSuccess = true
                state.isError = false
                state.updatedCartProduct = action.payload
            })
            .addCase(updateQuantityFromCart.rejected, (state, action) => {
                state.isError = true
                state.isSuccess = false
                state.isLoading = false
                state.message = action.error
            })
    }
})

export default productSlice.reducer