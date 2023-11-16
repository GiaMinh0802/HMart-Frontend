import axios from 'axios'
import { base_url } from '../../utils/base_url'
import { config } from "../../utils/axiosconfig"

const getProducts = async (data) => {
    const response = await axios.get(`${base_url}product?${data?.brand ? `brand=${data?.brand}&&` : ""}${data?.category ? `category=${data?.category}&&` : ""}${data?.minPrice ? `price[gte]=${data?.minPrice}&&` : ""}${data?.maxPrice ? `price[lte]=${data?.maxPrice}&&` : ""}${data?.sort ? `sort=${data?.sort}` : ""}${data?.page ? `page=${data?.page}&&` : ""}${data?.limit ? `limit=${data?.limit}&&` : ""}`)
    if (response.data) {
        return response.data
    }
}

const getProductsForRecommenders = async (data) => {
    const response = await axios.get(`${base_url}product/recommenders`, config)
    if (response.data) {
        return response.data
    }
}

const getSingleProduct = async (prodId) => {
    const response = await axios.get(`${base_url}product/${prodId}`)
    if (response.data) {
        return response.data
    }
}

const addToWishlist = async (prodId) => {
    const response = await axios.put(`${base_url}product/wishlist`, { prodId }, config)
    if (response.data) {
        return response.data
    }
}

const ratingProduct = async (ratingDetail) => {
    const response = await axios.put(`${base_url}product/rating`, ratingDetail, config)
    if (response.data) {
        return response.data
    }
}

const addToCart = async (cartData) => {
    const response = await axios.post(`${base_url}user/cart`, cartData, config)
    if (response.data) {
        return response.data
    }
}

const removeFromCart = async (cartItemId) => {
    const response = await axios.delete(`${base_url}user/cart/${cartItemId}`, config)
    if (response.data) {
        return response.data
    }
}

const updateQuantityFromCart = async (cartDetail) => {
    const response = await axios.put(`${base_url}user/cart/${cartDetail.cartItemId}/${cartDetail.quantity}`, "", config)
    if (response.data) {
        return response.data
    }
}

const productService = {
    getProducts,
    getProductsForRecommenders,
    getSingleProduct,
    ratingProduct,
    addToWishlist,
    addToCart,
    removeFromCart,
    updateQuantityFromCart,

}

export default productService