import React, { useEffect } from 'react'
import Container from '../components/Container'
import Meta from '../components/Meta'
import BreadCrumb from '../components/BreadCrumb'
import { useDispatch, useSelector } from 'react-redux'
import { getUserOrder } from '../features/user/userSlice'
import { useNavigate } from 'react-router-dom'

const Orders = () => {
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const orderState = useSelector(state => state.user.order)
    useEffect(() => {
        dispatch(getUserOrder())
    }, [])
    return (
        <>
            <Meta title={"My Orders"} />
            <BreadCrumb title='My Orders' />
            <Container class1="cart-wrapper home-wrapper-2 py-5">
                <div className="row">
                    <div className="col-12">
                        <div className="row">
                            <div className="col-4">
                                <h5>Order ID</h5>
                            </div>
                            <div className="col-4">
                                <h5>Total Amount</h5>
                            </div>
                            <div className="col-4">
                                <h5>Status</h5>
                            </div>
                        </div>
                    </div>
                    <div className="col-12 mt-3">
                        {
                            orderState && orderState?.map((item, index) => {
                                return (
                                    <div style={{ backgroundColor: "#febd69" }} className="row pt-3 my-3" key={index}>
                                        <div className="col-4">
                                            <p>{item?._id}</p>
                                        </div>
                                        <div className="col-4">
                                            <p>{item?.totalPrice}</p>
                                        </div>
                                        <div className="col-4">
                                            <p>{item?.orderStatus}</p>
                                        </div>
                                        <div className='col-12'>
                                            <div style={{ backgroundColor: "#232f3e" }} className="row p-3">
                                                <div className="col-5">
                                                    <h6 className='text-white'>Product Name</h6>
                                                </div>
                                                <div className="col-2">
                                                    <h6 className='text-white'>Quantity</h6>
                                                </div>
                                                <div className="col-2">
                                                    <h6 className='text-white'>Price</h6>
                                                </div>
                                                <div className="col-2">
                                                    <h6 className='text-white'>Color</h6>
                                                </div>
                                                <div className="col-1">
                                                    <h6 className='text-white'>Action</h6>
                                                </div>
                                                {
                                                    item?.orderItems?.map((i, index) => {
                                                        return (
                                                            <div className='col-12'>
                                                                <div className="row p-3">
                                                                    <div className="col-5">
                                                                        <p className='text-white'>{i?.product?.title}</p>
                                                                    </div>
                                                                    <div className="col-2">
                                                                        <p className='text-white'>{i?.quantity}</p>
                                                                    </div>
                                                                    <div className="col-2">
                                                                        <p className='text-white'>{i?.price}</p>
                                                                    </div>
                                                                    <div className="col-2">
                                                                        <p className='text-white'>{i?.color?.title}</p>
                                                                    </div>
                                                                    <div className="col-1">
                                                                        <p onClick={() => navigate('/product/' + i?.product?._id)} className='text-white'>Review</p>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        )
                                                    })
                                                }
                                            </div>
                                        </div>
                                    </div>
                                )
                            })
                        }
                    </div>
                </div>
            </Container>
        </>

    )
}

export default Orders