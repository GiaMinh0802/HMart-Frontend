import axios from 'axios'
import { base_url } from '../../utils/base_url'
import { config } from "../../utils/axiosconfig"

const getProducts = async () => {
    const response = await axios.get(`${base_url}product`)
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

const productService = {
    getProducts,
    getSingleProduct,
    addToWishlist
}

export default productService