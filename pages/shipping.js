import React, { useContext, useEffect } from 'react'
import Layout from './components/Layout'
import CheckoutWizard from './components/CheckoutWizard'
import { useForm } from 'react-hook-form'
import { Store } from '@/utils/Store';
import Cookies from 'js-cookie';
import { useRouter } from 'next/router';

export default function ShippingScreen() {
  const router = useRouter()
  const {
    handleSubmit,
    register,
    formState: { errors },
    setValue,

  } = useForm();
  const { state, dispatch } = useContext(Store)
  const { cart } = state;
  const { shippingAddress } = cart;

  useEffect(() => {
    setValue('fullName', shippingAddress.fullName);
    setValue('address', shippingAddress.address);
    setValue('city', shippingAddress.city);
    setValue('postalCode', shippingAddress.postalCode);
    setValue('country', shippingAddress.country);
  }, [setValue, shippingAddress])

  const submitHandler = ({ fullName, address, city, postalCode, country }) => {
    dispatch({
      type: 'SAVE_SHIPPING_ADDRESS',
      payload: { fullName, address, city, postalCode, country }
    });
    Cookies.set('cart',
      JSON.stringify({
        ...cart,
        shippingAddress: {
          fullName,
          address,
          city,
          postalCode,
          country
        }
      })
    )
    router.push('/payment')
  }

  return (
    <Layout title='Shipping address'>
      <CheckoutWizard activeStep={1} />
      <form className='mx-auto max-w-screen-md'
        onSubmit={handleSubmit(submitHandler)}
      >
        <h1 className='mb-4 text-xl'>Shipping Address </h1>
        <div className='mb-4'>
          <div><label htmlFor='fullName'>Full Name</label></div>

          <input id='fullName' autoFocus className='w-full'
            {...register('fullName', { required: 'Please enter full name' })}

          />
          {errors.fullName && (
            <div className='text-red-500'>{errors.fullName.message}</div>
          )}

        </div>

        <div className='mb-4'>
          <div><label htmlFor='address'>Address</label></div>

          <input id='address' autoFocus className='w-full'
            {...register('address', {
              required: 'Please enter address', minLength: {
                value: 3, message: 'Please more than 3 characters'
              }
            })}

          />
          {errors.address && (
            <div className='text-red-500'>{errors.address.message}</div>
          )}

        </div>
        <div className='mb-4'>
          <div><label htmlFor='city'>City</label></div>

          <input id='city' autoFocus className='w-full'
            {...register('city', {
              required: 'Please enter city', minLength: {
                value: 3, message: 'Please more than 3 characters'
              }
            })}

          />
          {errors.address && (
            <div className='text-red-500'>{errors.address.message}</div>
          )}

        </div>
        <div className='mb-4'>
          <div><label htmlFor='postalCode'>Postal Code</label></div>

          <input id='postalCode' autoFocus className='w-full'
            {...register('postalCode', {
              required: 'Please enter postalCode',
            })}

          />
          {errors.postalCode && (
            <div className='text-red-500'>{errors.postalCode.message}</div>
          )}

        </div>
        <div className='mb-4'>
          <div><label htmlFor='country'>Country</label></div>

          <input id='country' autoFocus className='w-full'
            {...register('country', {
              required: 'Please enter country',
            })}

          />
          {errors.country && (
            <div className='text-red-500'>{errors.country.message}</div>
          )}

        </div>
        <div className='mb-4'>
          <button className='primary-button'>Next</button>
        </div>
      </form>
    </Layout>
  )
}
ShippingScreen.auth = true;
