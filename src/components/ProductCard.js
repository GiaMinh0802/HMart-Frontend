import React from 'react'
import { useDispatch } from "react-redux"
import ReactStars from 'react-rating-stars-component'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import prodcompare from '../images/prodcompare.svg'
import wish from '../images/wish.svg'
import view from '../images/view.svg'
import addcart from '../images/add-cart.svg'
import { addToWishlist } from '../features/product/productSlice'
import noProduct from '../images/noproduct.png'

const ProductCard = (props) => {
    const { grid, data } = props
    let location = useLocation()
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const AddToWishlist = (id) => {
        dispatch(addToWishlist(id))
    }
    return (
        <>
            {
                data?.map((item, index) => {
                    return (
                        <div key={index} className={` ${location.pathname === "/product" ? `gr-${grid}` : "col-3"}`} style={{ marginBottom: '20px'}}>
                            <div className="product-card position-relative">
                                <div className="wishlist-icon position-absolute">
                                    <button className='border-0 bg-transparent' onClick={(e) => { AddToWishlist(item?._id) }}>
                                        <img src={wish} alt="wishlist" />
                                    </button>
                                </div>
                                <div className="product-image">
                                    <img src={item?.images[1]?.url ? item?.images[1]?.url : noProduct} className='img-fluid mx-auto' alt="productimg" />
                                    <img src={item?.images[0]?.url ? item?.images[0]?.url : noProduct} className='img-fluid mx-auto' alt="productimg" />
                                </div>
                                <div className="product-details">
                                    <h6 className="brand">{item?.brand}</h6>
                                    <h5 className="product-title">
                                        {item?.title}
                                    </h5>
                                    <ReactStars count={5} size={24} value={item?.totalrating} edit={false} activeColor='#ffd700' />
                                    <p className={`description ${grid === 12 ? "d-block" : "d-none"}`}
                                        dangerouslySetInnerHTML={{ __html: item?.description }}>
                                    </p>
                                    <p className="price">${item?.price}</p>
                                </div>
                                <div className="action-bar position-absolute">
                                    <div className="d-flex flex-column gap-15">
                                        <button className='border-0 bg-transparent'>
                                            <img src={prodcompare} alt="compare" />
                                        </button>
                                        <button className='border-0 bg-transparent'>
                                            <img onClick={() => navigate('/product/'+item?._id)} src={view} alt="view" />
                                        </button>
                                        <button className='border-0 bg-transparent'>
                                            <img src={addcart} alt="addcart" />
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    )
                })
            }

        </>
    )
}

export default ProductCard