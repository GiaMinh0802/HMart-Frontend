import React, { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { IoIosArrowBack } from 'react-icons/io'
import Container from '../components/Container'
import { useDispatch, useSelector } from 'react-redux'
import { useFormik } from 'formik'
import * as yup from 'yup'
import { createOrder, removeCart } from '../features/user/userSlice'

let schema = yup.object().shape({
  firstName: yup.string().required("FirstName is required"),
  lastName: yup.string().required("LastName is required"),
  address: yup.string().required("Address is required"),
  state: yup.string().required("State is required"),
  city: yup.string().required("City is required"),
  country: yup.string().required("Country is required"),
  pincode: yup.string().required("Pincode is required"),
  apartment: yup.string()
})

const Checkout = () => {
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const cartState = useSelector(state => state?.user?.cart)
  const userState = useSelector(state => state?.auth?.user)
  const [totalAmount, setTotalAmount] = useState(null)
  const [cartProductState, setCartProductState] = useState([])
  useEffect(() => {
    let sum = 0
    for (let i = 0; i < cartState?.length; i++) {
      sum = sum + (cartState[i].quantity * cartState[i].price)
    }
    setTotalAmount(sum)
  }, [cartState])

  useEffect(() => {
    let items = []
    for (let i = 0; i < cartState.length; i++) {
      items.push({
        product: cartState[i].productId._id,
        quantity: cartState[i].quantity,
        color: cartState[i].color._id,
        price: cartState[i].price,
      })
    }
    setCartProductState(items)
  }, [])

  const formik = useFormik({
    initialValues: {
      firstName: "",
      lastName: "",
      address: "",
      state: "",
      city: "",
      country: "",
      pincode: "",
      apartment: ""
    },
    validationSchema: schema,
    onSubmit: (values) => {
      dispatch(createOrder({ totalPrice: totalAmount, shippingInfo: values, orderItems: cartProductState }))
      dispatch(removeCart(cartState._id))
      setTimeout(() => {
        navigate('/order')
      }, 500)
    }
  })

  return (
    <>
      <Container class1="checkout-wrapper py-5 home-wrapper-2">
        <div className="row">
          <div className="col-7">
            <div className="checkout-left-data">
              <h3 className="website-name">HMart</h3>
              <nav style={{ "--bs-breadcumb-divider": ">" }} aria-label='breadcrumb'>
                <ol className='breadcrumb'>
                  <li className='breadcrumb-item'>
                    <Link className='text-dark total-price' to="/cart">Cart</Link>
                  </li>
                  <li className='breadcrumb-item total-price active' aria-current="page">
                    Information
                  </li>
                  <li className='breadcrumb-item total-price active' aria-current="page">
                    Shipping
                  </li>
                  <li className='breadcrumb-item total-price active' aria-current="page">
                    Payment
                  </li>
                </ol>
              </nav>
              <h4 className="title total">Contact Information</h4>
              <p className="user-details total">{userState?.firstname + " " + userState?.lastname + " (" + userState?.email + ")"}</p>
              <h4 className='mb-3'>Shipping Address</h4>
              <form onSubmit={formik.handleSubmit} action="" className='d-flex gap-15 flex-wrap justify-content-between'>
                <div className='w-100'>
                  <select name='country' value={formik.values.country} onChange={formik.handleChange("country")} onBlur={formik.handleBlur("country")} className="form-control form-select" id=''>
                    <option value="" disabled>Select Country</option>
                    <option value="Vietnam">Vietnam</option>
                  </select>
                  <div className="error ms-2 my-1">
                    {formik.touched.country && formik.errors.country}
                  </div>
                </div>
                <div className='flex-grow-1'>
                  <input name='country' value={formik.values.firstName} onChange={formik.handleChange("firstName")} onBlur={formik.handleBlur("firstName")} type="text" placeholder='First Name' className='form-control' />
                  <div className="error ms-2 my-1">
                    {formik.touched.firstName && formik.errors.firstName}
                  </div>
                </div>
                <div className='flex-grow-1'>
                  <input name='lastName' value={formik.values.lastName} onChange={formik.handleChange("lastName")} onBlur={formik.handleBlur("lastName")} type="text" placeholder='Last Name' className='form-control' />
                  <div className="error ms-2 my-1">
                    {formik.touched.lastName && formik.errors.lastName}
                  </div>
                </div>
                <div className='w-100'>
                  <input name='address' value={formik.values.address} onChange={formik.handleChange("address")} onBlur={formik.handleBlur("address")} type="text" placeholder='Address' className='form-control' />
                  <div className="error ms-2 my-1">
                    {formik.touched.address && formik.errors.address}
                  </div>
                </div>
                <div className='w-100'>
                  <input name='apartment' value={formik.values.apartment} onChange={formik.handleChange("apartment")} onBlur={formik.handleBlur("apartment")} type="text" placeholder='Apartment, suite, etc. (optional)' className='form-control' />
                  <div className="error ms-2 my-1">
                    {formik.touched.apartment && formik.errors.apartment}
                  </div>
                </div>
                <div className='flex-grow-1'>
                  <input name='city' value={formik.values.city} onChange={formik.handleChange("city")} onBlur={formik.handleBlur("city")} type="text" placeholder='City' className='form-control' />
                  <div className="error ms-2 my-1">
                    {formik.touched.city && formik.errors.city}
                  </div>
                </div>
                <div className='flex-grow-1'>
                  <select name='state' value={formik.values.state} onChange={formik.handleChange("state")} onBlur={formik.handleBlur("state")} className="form-control form-select" id=''>
                    <option value="" disabled>Select State</option>
                    <option value="Thu Duc">Thu Duc</option>
                  </select>
                  <div className="error ms-2 my-1">
                    {formik.touched.state && formik.errors.state}
                  </div>
                </div>
                <div className='flex-grow-1'>
                  <input name='pincode' value={formik.values.pincode} onChange={formik.handleChange("pincode")} onBlur={formik.handleBlur("pincode")} type="text" placeholder='Zipcode' className='form-control' />
                  <div className="error ms-2 my-1">
                    {formik.touched.pincode && formik.errors.pincode}
                  </div>
                </div>

                <div className="w-100">
                  <div className="d-flex justify-content-between align-items-center">
                    <Link to='/cart' className='text-dark'>
                      <IoIosArrowBack className='me-2' />
                      Return to Cart
                    </Link>
                    {cartState.length !== 0 ? (<button className='button' type="submit">Place Order</button>) : null}
                  </div>
                </div>
              </form>
            </div>
          </div>
          <div className="col-5">
            <div className='border-bottom py-4'>
              {
                cartState && cartState?.map((item, index) => {
                  return (
                    <div key={index} className="d-flex gap-10 mb-2 align-items-center">
                      <div className='w-75 d-flex gap-10'>
                        <div className='w-25 position-relative'>
                          <span style={{ "top": "-5px", "right": "-5px" }} className="badge bg-secondary text-white rounded-circle p-2 position-absolute">{item?.quantity}</span>
                          <img className='img-fluid' width={100} height={100} src={item?.productId?.images[0].url} alt="productimg" />
                        </div>
                        <div>
                          <h5 className="total-price">{item?.productId?.title}</h5>
                          <p className="total-price">{item?.color?.title}</p>
                        </div>
                      </div>
                      <div className='flex-grow-1'>
                        <h5 className='total'>$ {item?.price * item?.quantity}</h5>
                      </div>
                    </div>
                  )
                })
              }
            </div>
            <div className='border-bottom py-4'>
              <div className='d-flex justify-content-between align-items-center'>
                <p className='total'>Subtotal</p>
                <p className='total-price'>$ {totalAmount ? totalAmount : 0}</p>
              </div>
              <div className='d-flex justify-content-between align-items-center'>
                <p className='mb-0 total'>Shipping</p>
                <p className='mb-0 total-price'>$ {totalAmount ? 5 : 0}</p>
              </div>
            </div>
            <div className='d-flex justify-content-between align-items-center py-4'>
              <h4 className='total'>Total</h4>
              <h5 className='total-price'>$ {totalAmount ? totalAmount + 5 : 0}</h5>
            </div>
          </div>
        </div>
      </Container>
    </>
  )
}

export default Checkout