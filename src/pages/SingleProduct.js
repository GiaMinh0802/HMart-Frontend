import React, { useEffect, useState } from 'react'
import ReactStars from 'react-rating-stars-component'
import BreadCrumb from '../components/BreadCrumb'
import Meta from '../components/Meta'
import ProductCard from '../components/ProductCard'
import ReactImageZoom from 'react-image-zoom'
import Color from '../components/Color'
import { TbGitCompare } from 'react-icons/tb'
import { AiOutlineHeart } from 'react-icons/ai'
import Container from '../components/Container'
import { useLocation, useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { getSingleProduct, addToCart, ratingProduct } from '../features/product/productSlice'
import { toast } from "react-toastify"
import { getUserCart, getUserOrder } from '../features/user/userSlice'

const SingleProduct = () => {
    const [color, setColor] = useState(null)
    const [quantity, setQuantity] = useState(1)
    const [star, setStar] = useState(0)
    const [comment, setComment] = useState("")
    const [alreadyAdded, setAlreadyAdded] = useState(false)
    const [orderedProduct, setorderedProduct] = useState(false)
    const location = useLocation()
    const ProductId = location.pathname.split("/")[2]
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const productState = useSelector((state) => state?.product?.product)
    const cartState = useSelector(state => state?.user?.cart)
    const orderState = useSelector(state => state?.user?.order)
    const userId = useSelector(state => state?.auth?.user?._id)

    useEffect(() => {
        dispatch(getSingleProduct(ProductId))
        dispatch(getUserCart())
        dispatch(getUserOrder())
    }, [])

    useEffect(() => {
        for (let index = 0; index < cartState.length; index++) {
            if (ProductId === cartState[index]?.productId?._id) {
                setAlreadyAdded(true)
            }
        }
    })

    useEffect(() => {
        for (let i = 0; i < orderState.length; i++) {
            let order = orderState[i]
            for (let j = 0; j < order.orderItems.length; j++) {
                let products = order?.orderItems[j]
                if (ProductId === products.product._id) {
                    setorderedProduct(true)
                }
            }
        }
    })

    const uploadCart = () => {
        if (color === null) {
            toast.error("Please Choose Color!")
            return false
        } else {
            dispatch(addToCart({ productId: productState?._id, quantity, color, price: productState?.price }))
            navigate('/cart')
        }
    }

    const RatingProduct = () => {
        if (star === 0) {
            toast.error("Please Choose Star!")
            return false
        } else {
            dispatch(ratingProduct({ prodId: ProductId, star, comment }))
        }
    }

    const linkimg = "https://images.pexels.com/photos/190819/pexels-photo-190819.jpeg?cs=srgb&dl=pexels-fernando-arcos-190819.jpg&fm=jpg"
    const props = {
        width: 400,
        height: 600,
        zoomWidth: 600,
        img: productState?.images[0]?.url ? productState?.images[0]?.url : linkimg
    }
    const copyToCClipboard = (text) => {
        var textField = document.createElement("textarea")
        textField.innerText = text
        document.body.appendChild(textField)
        textField.select()
        document.execCommand("copy")
        textField.remove()
    }
    return (
        <>
            <Meta title={"Product Name"} />
            <BreadCrumb title='Product Name' />
            <Container class1="main-product-wrapper py-5 home-wrapper-2">
                <div className="row">
                    <div className="col-6">
                        <div className="main-product-image">
                            <div>
                                <ReactImageZoom {...props} />
                            </div>
                        </div>
                        <div className="other-product-images d-flex flex-wrap gap-15">
                            {productState?.images.map((item, index) => {
                                return (
                                    <div>
                                        <img src={item?.url} className='img-fluid' alt="watch" />
                                    </div>
                                )
                            })}
                        </div>
                    </div>
                    <div className="col-6">
                        <div className="main-product-details">
                            <div className="border-bottom">
                                <h3 className='title'>{productState?.title}</h3>
                            </div>
                            <div className="border-bottom py-3">
                                <p className='price'>$ {productState?.price}</p>
                                <div className="d-flex align-items-center gap-10">
                                    <ReactStars count={5} size={24} value={productState?.totalrating ? productState?.totalrating : 0} edit={false} activeColor='#ffd700' />
                                    <p className='mb-0 t-review'>({productState?.ratings?.length} Reviews)</p>
                                </div>
                                {
                                    orderedProduct && (<a className='review-btn' href="#review">Write a Review</a>)
                                }

                            </div>
                            <div className="py-3">
                                <div className='d-flex gap-10 align-items-center my-2'>
                                    <h3 className='product-heading'>Brand :</h3>
                                    <p className='product-data'>{productState?.brand}</p>
                                </div>
                                <div className='d-flex gap-10 align-items-center my-2'>
                                    <h3 className='product-heading'>Category :</h3>
                                    <p className='product-data'>{productState?.category}</p>
                                </div>
                                <div className='d-flex gap-10 align-items-center my-2'>
                                    <h3 className='product-heading'>Availablity :</h3>
                                    <p className='product-data'>In Stock</p>
                                </div>
                                {
                                    alreadyAdded === false &&
                                    <>
                                        <div className='d-flex gap-10 flex-column mt-2 mb-3'>
                                            <h3 className='product-heading'>Color :</h3>
                                            <Color setColor={setColor} colorData={productState?.color} />
                                        </div>
                                    </>
                                }
                                <div className='d-flex align-items-center gap-15 flex-row mt-2 mb-3'>
                                    {
                                        alreadyAdded === false &&
                                        <>
                                            <h3 className='product-heading'>Quantity :</h3>
                                            <div className=''>
                                                <input type="number" name='' min={1} max={999} className='form-control' style={{ width: "70px" }} id='' value={quantity} onChange={(e) => setQuantity(e.target.value)} />
                                            </div>
                                        </>
                                    }
                                    <div className={alreadyAdded ? "ms-0" : "ms-5" + 'd-flex align-items-center gap-30 ms-5'}>
                                        <button className='button border-0' type='submit' onClick={() => { alreadyAdded ? navigate('/cart') : uploadCart() }}>
                                            {alreadyAdded ? "Go To Cart" : "Add To Cart"}
                                        </button>
                                    </div>
                                </div>
                                <div className='d-flex align-items-center gap-15'>
                                    <div>
                                        <a href="/compare-product">
                                            <TbGitCompare className='fs-5 me-2' />
                                            Add to Compare
                                        </a>
                                    </div>
                                    <div>
                                        <a href="/wishlist">
                                            <AiOutlineHeart className='fs-5 me-2' />
                                            Add to Wishlist
                                        </a>
                                    </div>
                                </div>
                                <div className='d-flex gap-10 flex-column my-3'>
                                    <h3 className='product-heading'>Shipping & Returns :</h3>
                                    <p className='product-data'>
                                        Free shipping and returns available on all orders! <br />
                                        We ship all US domestic orders within <b>5-10 business days!</b>
                                    </p>
                                </div>
                                <div className='d-flex gap-10 align-items-center my-3'>
                                    <h3 className='product-heading'>Product Link :</h3>
                                    <a href='#/' onClick={() => { copyToCClipboard(window.location.href) }}>
                                        Copy Product Link
                                    </a>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </Container>
            <Container class1="description-wrapper py-5 home-wrapper-2">
                <div className="row">
                    <div className="col-12">
                        <h4>Description</h4>
                        <div className="bg-white p-3">
                            <p dangerouslySetInnerHTML={{
                                __html: productState?.description
                            }}>
                            </p>
                        </div>
                    </div>
                </div>
            </Container>
            <Container class1="reviews-wrapper home-wrapper-2">
                <div className="row">
                    <div className="col-12">
                        <h3 id="review">Reviews</h3>
                        <div className="review-inner-wrapper">
                            <div className="review-head d-flex justify-content-between align-items-end">
                                <div>
                                    <h4 className='mb-2'>Customer Reviews</h4>
                                    <div className='d-flex align-items-center gap-10'>
                                        <ReactStars count={5} size={24} value={productState?.totalrating ? productState?.totalrating : 0} edit={false} activeColor='#ffd700' />
                                        <p className='mb-0'>Based on {productState?.ratings?.length} Reviews</p>
                                    </div>
                                </div>
                                {
                                    orderedProduct && (
                                        <div>
                                            <a className='text-dark text-dec' href="#review">Write a Review</a>
                                        </div>
                                    )
                                }
                            </div>
                            {
                                orderedProduct && (
                                    <div className="review-form py-4">
                                        <h4>Write a Review</h4>
                                        <form className='d-flex flex-column gap-15'>
                                            <div>
                                                <ReactStars type='number' name='star' value={star} onChange={(e) => setStar(e)} count={5} size={24} edit={true} activeColor='#ffd700' />
                                            </div>
                                            <div>
                                                <textarea type='text' name="comment" value={comment} onChange={(e) => setComment(e.target.value)} className='w-100 form-control' cols="30" rows="4" placeholder='Comments'></textarea>
                                            </div>
                                            <div className='d-flex justify-content-end'>
                                                <button className='button border-0' onClick={() => RatingProduct()}>Submit Review</button>
                                            </div>
                                        </form>
                                    </div>
                                )
                            }
                            <div className="reviews mt-4">
                                {
                                    productState?.ratings && productState?.ratings?.map((item, index) => {
                                        return (
                                            <div className="review" key={index}>
                                                <div className="d-flex gap-10 align-items-center">
                                                    <h6 className='mb-0'>{item?.postedby === userId ? "Me" : item?.postedby}</h6>
                                                    <ReactStars count={5} size={24} value={item?.star} edit={false} activeColor='#ffd700' />
                                                </div>
                                                <p className='mt-3'>{item?.comment}</p>
                                            </div>
                                        )
                                    })
                                }
                            </div>
                        </div>
                    </div>
                </div>
            </Container>
            <Container class1="popular-wrapper py-5 home-wrapper-2">
                <div className="row">
                    <div className="col-12">
                        <h3 className="section-heading">Our Popular Products</h3>
                    </div>
                    <div className="row">
                        <ProductCard />
                        <ProductCard />
                        <ProductCard />
                        <ProductCard />
                    </div>
                </div>
            </Container>
        </>
    )
}

export default SingleProduct