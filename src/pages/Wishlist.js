import React, { useEffect } from 'react'
import { useDispatch, useSelector } from "react-redux"
import BreadCrumb from '../components/BreadCrumb'
import Meta from '../components/Meta'
import cross from '../images/cross.svg'
import watch from '../images/watch-1.jpg'
import Container from '../components/Container'
import { getUserWishlist } from "../features/user/userSlice"
import { addToWishlist } from '../features/product/productSlice'

const Wishlist = () => {
    const dispatch = useDispatch()
    useEffect(() => {
        GetUserWishlist()
    }, [])
    const GetUserWishlist = () => {
        dispatch(getUserWishlist())
    }
    const wishlistState = useSelector((state) => state?.user?.wishlist)
    const removeFromWishlist = (id) => {
        dispatch(addToWishlist(id))
        setTimeout(() => {
            dispatch(getUserWishlist())
        }, 300)
    }
    return (
        <>
            <Meta title={"Wishlist"} />
            <BreadCrumb title='Wishlist' />
            <Container class1="wishlist-wrapper py-5 home-wrapper-2">
                <div className="row">
                    {wishlistState && wishlistState?.length === 0 && (<div className='text-center fs-3'>No Data</div>)}
                    {
                        wishlistState && wishlistState?.map((item, index) => {
                            return (
                                <div className="col-3" key={index}>
                                    <div className="wishlist-card position-relative">
                                        <img onClick={() => { removeFromWishlist(item?._id) }} src={cross} alt="cross" className="position-absolute cross img-fluid" />
                                        <div className="wishlist-card-image bg-white">
                                            <img src={item?.images[0]?.url ? item?.images[0].url : watch} className='img-fluid d-block mx-auto' width={160} alt="watch" />
                                        </div>
                                        <div className='py-3 px-3'>
                                            <h5 className='title'>{item?.title}</h5>
                                            <h6 className='price'>${item?.price}</h6>
                                        </div>
                                    </div>
                                </div>
                            )
                        })
                    }
                </div>
            </Container>
        </>
    )
}

export default Wishlist