import React, { useContext, useEffect, useState } from 'react'
import Layout from './components/Layout'
import CheckoutWizard from './components/CheckoutWizard'
import { useRouter } from 'next/router'
import { Store } from '@/utils/Store'
import { toast } from 'react-toastify'
import Cookies from 'js-cookie'

export default function Screen() {
    const router = useRouter()
    const [selectPaymentMethod, setSelectPaymentMethod] = useState('');
    const { state, dispatch } = useContext(Store);
    const { cart } = state;
    const { shippingAddress, paymentMethod } = cart;

    const submitHandler = (e) => {
        //console.log('submiting....')
        e.preventDefault();
        if (!selectPaymentMethod) { return toast.error('Select payment Method'); }
        dispatch({ type: 'SAVE_PAYMENT_METHOD', payload: selectPaymentMethod });
        Cookies.set('cart', JSON.stringify({
            ...cart,
            paymentMethod: selectPaymentMethod

        }));
        router.push('/placeorder');

    }

    useEffect(() => {
        if (!shippingAddress.address) { return router.push('/shipping'); }
        setSelectPaymentMethod(paymentMethod || '');
    }, [paymentMethod, router, shippingAddress.address])

    return (
        <Layout title='Payment Method'>
            <CheckoutWizard activeStep={2} />
            <form className='mx-auto max-w-screen-md'>
                <h1 className='mb-4 text-xl'>Payment Method</h1>
                {['Paypal', 'Stripe', 'CashOnDelivry'].map(payment =>
                    <div key={payment} className='mb-4'>
                        <input type='radio' id={payment} name='PaymentMethod'
                            className='p-2 focus:ring-0 outline-none'
                            checked={selectPaymentMethod == payment}
                            onChange={() => setSelectPaymentMethod(payment)
                            }
                        />
                        <label htmlFor={payment} className='p-2'>{payment}</label>

                    </div>

                )

                }
                <div className='mb-4 flex justify-between'>
                    <button className='default-button hover:bg-gray-300'
                        onClick={() => router.push('/shipping')}
                        type='button'>
                        Back
                    </button>
                    <button className='primary-button hover:bg-amber-200'
                        onClick={submitHandler}
                        type='button'>
                        Next
                    </button>
                </div></form>

        </Layout>
    )
}
Screen.auth = true