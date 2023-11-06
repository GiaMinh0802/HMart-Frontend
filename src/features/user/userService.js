import axios from 'axios'
import { base_url } from '../../utils/base_url'
import { config } from "../../utils/axiosconfig"

const updateUser = async (userDetail) => {
    const response = await axios.put(`${base_url}user`, userDetail, config)
    if (response.data) {
        return response.data
    }
}

const getUserWishlist = async () => {
    const response = await axios.get(`${base_url}user/wishlist`, config)
    if (response.data) {
        return response.data
    }
}

const getUserCart = async () => {
    const response = await axios.get(`${base_url}user/cart`, config)
    if (response.data) {
        return response.data
    }
}

const removeCart = async () => {
    const response = await axios.delete(`${base_url}user/cart`, config)
    if (response.data) {
        return response.data
    }
}

const createOrder = async (orderDetail) => {
    const response = await axios.post(`${base_url}user/order`, orderDetail, config)
    if (response.data) {
        return response.data
    }
}

const getUserOrder = async () => {
    const response = await axios.get(`${base_url}user/order`, config)
    if (response.data) {
        return response.data
    }
}

const userService = {
    updateUser,
    getUserWishlist,
    getUserCart,
    createOrder,
    getUserOrder,
    removeCart
}

export default userService