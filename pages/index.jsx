import db from '@/utils/db'
import Layout from './components/Layout'
import ProductItem from './components/ProductItem'
import Product from '@/models/Product'
import { useContext } from 'react'
import { Store } from '@/utils/Store'
import axios from 'axios'

export const convertDocToObject = (doc) => {
  doc._id = doc._id.toString()
  doc.createdAt = doc.createdAt.toString()
  doc.updatedAt = doc.updatedAt.toString()
  return doc
}

export default function Home({ products }) {

  const { state, dispatch } = useContext(Store)

  const addToCartHandler = async (product) => {

    const existItem = state.cart.cartItems.find(x => x.slug === product.slug)
    const quantity = existItem ? existItem.quantity + 1 : 1
    const { data } = await axios.get(`/api/products/${product._id}`)
    if (data.countInStock < quantity) {
      return alert('Product is out of stock')

    }
    dispatch({ type: 'CART_ADD_ITEM', payload: { ...product, quantity } });
  }


  return (
    <>

      <Layout title="Home Page">
        <div className='grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4'>
          {products.map(product => {

            return <ProductItem product={product} key={product.slug}
              addToCartHandler={addToCartHandler} />
          })}
        </div>
      </Layout>
    </>

  )
}

export async function getServerSideProps() {
  await db.connect();
  const products = await Product.find().lean();
  return {
    props: { products: products.map(convertDocToObject), }
  }
}
