import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import userService from './userService'

const getUserfromLocalStorage = localStorage.getItem('user')? JSON.parse(localStorage.getItem('user')) : null

const initialState = {
    user: getUserfromLocalStorage,
    isError: false,
    isLoading: false,
    isSuccess: false,
    message: ""
}

export const getUserWishlist = createAsyncThunk('user/wishlist', async (thunkAPI) => {
    try {
        return await userService.getUserWishlist()
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
    }
})

export default userSlice.reducer