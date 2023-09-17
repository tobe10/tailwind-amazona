import React from 'react'
import Link from 'next/link'
import Image from 'next/image'

export default function ProductItem({ product, addToCartHandler }) {
    return (
        <div className='card'>
            <Link href={`/product/${product.slug}`}
            >
                <Image width={500} height={500} src={product.image}
                    alt={product.name}
                    className='rounded shadow'
                />

            </Link>
            <div className='flex flex-col items-center justify-center p-5'>
                <Link href={`/product/${product.slug}`} className="text-lg">
                    <div className=''>{product.name} </div>
                </Link>
                <p className='mb-2'>{product.brand} </p>
                <p >${product.price} </p>
                <button className='primary-button hover:bg-amber-500'
                    type='button'
                    onClick={() => addToCartHandler(product)}>Add to Cart</button>



            </div>

        </div>
    )
}
