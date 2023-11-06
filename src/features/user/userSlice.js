import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import userService from './userService'
import { toast } from 'react-toastify'

const initialState = {
    wishlist: [],
    cart: [],
    order: [],
    isError: false,
    isLoading: false,
    isSuccess: false,
    message: ""
}

export const updateUser = createAsyncThunk('user/update-profile', async (userDetail, thunkAPI) => {
    try {
        return await userService.updateUser(userDetail)
    } catch (error) {
        return thunkAPI.rejectWithValue(error)
    }
})

export const getUserWishlist = createAsyncThunk('user/wishlist', async (thunkAPI) => {
    try {
        return await userService.getUserWishlist()
    } catch (error) {
        return thunkAPI.rejectWithValue(error)
    }
})

export const getUserCart = createAsyncThunk('user/cart', async (thunkAPI) => {
    try {
        return await userService.getUserCart()
    } catch (error) {
        return thunkAPI.rejectWithValue(error)
    }
})

export const removeCart = createAsyncThunk('user/remove-cart', async (cartId, thunkAPI) => {
    try {
        return await userService.removeCart(cartId)
    } catch (error) {
        return thunkAPI.rejectWithValue(error)
    }
})

export const createOrder = createAsyncThunk('user/create-order', async (orderDetail, thunkAPI) => {
    try {
        return await userService.createOrder(orderDetail)
    } catch (error) {
        return thunkAPI.rejectWithValue(error)
    }
})

export const getUserOrder = createAsyncThunk('user/order', async (thunkAPI) => {
    try {
        return await userService.getUserOrder()
    } catch (error) {
        return thunkAPI.rejectWithValue(error)
    }
})

export const userSlice = createSlice({
    name: "users",
    initialState: initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(getUserWishlist.pending, (state) => {
                state.isLoading = true
            })
            .addCase(getUserWishlist.fulfilled, (state, action) => {
                state.isLoading = false
                state.isSuccess = true
                state.isError = false
                state.wishlist = action.payload
            })
            .addCase(getUserWishlist.rejected, (state, action) => {
                state.isError = true
                state.isSuccess = false
                state.isLoading = false
                state.message = action.error
            })
            .addCase(getUserCart.pending, (state) => {
                state.isLoading = true
            })
            .addCase(getUserCart.fulfilled, (state, action) => {
                state.isLoading = false
                state.isSuccess = true
                state.isError = false
                state.cart = action.payload
            })
            .addCase(getUserCart.rejected, (state, action) => {
                state.isError = true
                state.isSuccess = false
                state.isLoading = false
                state.message = action.error
            })
            .addCase(createOrder.pending, (state) => {
                state.isLoading = true
            })
            .addCase(createOrder.fulfilled, (state, action) => {
                state.isLoading = false
                state.isSuccess = true
                state.isError = false
                state.orderedProduct = action.payload
                if (state.isSuccess) {
                    toast.success("Ordered Successfully")
                }
            })
            .addCase(createOrder.rejected, (state, action) => {
                state.isError = true
                state.isSuccess = false
                state.isLoading = false
                state.message = action.error
                if (state.isSuccess !== false) {
                    toast.error("Something Went Wrong")
                }
            })
            .addCase(getUserOrder.pending, (state) => {
                state.isLoading = true
            })
            .addCase(getUserOrder.fulfilled, (state, action) => {
                state.isLoading = false
                state.isSuccess = true
                state.isError = false
                state.order = action.payload
            })
            .addCase(getUserOrder.rejected, (state, action) => {
                state.isError = true
                state.isSuccess = false
                state.isLoading = false
                state.message = action.error
            })
            .addCase(updateUser.pending, (state) => {
                state.isLoading = true
            })
            .addCase(updateUser.fulfilled, (state, action) => {
                state.isLoading = false
                state.isSuccess = true
                state.isError = false
                state.updatedProfile = action.payload
                if (state.isSuccess) {
                    toast.success("Updated Profile Successfully")
                }
            })
            .addCase(updateUser.rejected, (state, action) => {
                state.isError = true
                state.isSuccess = false
                state.isLoading = false
                state.message = action.error
                if (state.isSuccess !== false) {
                    toast.error("Something Went Wrong")
                }
            })
    }
})

export default userSlice.reducer