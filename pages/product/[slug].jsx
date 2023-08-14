import { Store } from '../../utils/Store';
import Image from 'next/image';
import Link from 'next/link';
import React, { useContext } from 'react'
import Layout from '../components/Layout'
import axios from 'axios';
import db from '@/utils/db';
import Product from '@/models/Product';
import { toast } from 'react-toastify';


export const convertDocToObject = (doc) => {
    doc._id = doc._id.toString()
    doc.createdAt = doc.createdAt.toString()
    doc.updatedAt = doc.updatedAt.toString()
    return doc
}



export default function ProductScreen({ product }) {
    //const router = useRouter();
    const { state, dispatch } = useContext(Store)

    if (!product) {
        return <div>Product not find</div>
    }

    const addToCartHandler = async () => {

        const existItem = state.cart.cartItems.find(x => x.slug === product.slug)
        const quantity = existItem ? existItem.quantity + 1 : 1
        
        // api call 
        const { data } = await axios.get(`/api/products/${product._id}`)
        if (data.countInStock < quantity) {
            toast.info('Product is out of stock')
            return
        }
        dispatch({ type: 'CART_ADD_ITEM', payload: { ...product, quantity } });

    }



    return (
        <Layout title={product.name}>
            <div className='py-2'>
                <Link href='/'>Back to Products</Link>
            </div>
            <div className='grid md:grid-cols-4 md:gap-3'>
                <div className='md:col-span-2'>
                    <Image src={product.image}
                        alt={product.name}
                        width={640}
                        height={640}
                    >

                    </Image>
                </div>
                <ul>
                    <li>
                        <div className='text-lg'>{product.name}</div>
                    </li>
                    <li>Category : {product.category}</li>
                    <li>Brand : {product.brand}</li>
                    <li>{product.rating} of {product.numReviews}</li>
                    <li>Description:{product.description}</li>
                </ul>
                <div className='card p-2'>
                    <div className='mb-2 flex justify-between'>
                        <div>Status</div>
                        <div>{product.countInStock > 0 ? 'In stock' : 'Unavailable'}</div>
                    </div>
                    <button className='primary-button hover:bg-amber-500 w-full' onClick={addToCartHandler}>Add to cart</button>
                </div>
            </div>

        </Layout >

    )
}

export async function getServerSideProps(context) {
    const { params } = context;
    const { slug } = params
    await db.connect();
    const product = await Product.findOne({ slug }).lean();
    db.disconnect();

    return {
        props: { product: product ? convertDocToObject(product) : null }
    }

}
