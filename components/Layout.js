import { Store } from '@/utils/Store'
import { Menu } from '@headlessui/react'
import Cookies from 'js-cookie'
import { signOut, useSession } from 'next-auth/react'
import Head from 'next/head'
import Link from 'next/link'
import React, { useContext, useEffect, useState } from 'react'
import { ToastContainer } from 'react-toastify'
import "react-toastify/dist/ReactToastify.css";

export default function Layout({ title, children }) {
    const { state, dispatch } = useContext(Store)
    const { cart } = state
    const [cartItemsCount, setCartItemsCount] = useState(0)
    const { status, data: session } = useSession();
    useEffect(() => {
        setCartItemsCount(cart.cartItems.reduce((a, c) => a + c.quantity, 0))
    }, [cart.cartItems])


    const logoutClickHandler = () => {
        Cookies.remove('cart');
        signOut({ callbackUrl: '/login' })
        dispatch({ type: ' ' })
    }

    return (
        <>
            <Head>
                <title>{title ? title + '-Amazona' : 'Amazona'}</title>
                <meta name="description" content="Ecommerce website" />
                <meta name="viewport" content="width=device-width, initial-scale=1" />
                <link rel="icon" href="/favicon.ico" />
            </Head>
            <ToastContainer position='bottom-center' limit={1} />
            <div className='flex min-h-screen flex-col justify-between  '>
                <header >
                    <nav className='flex h- h-12  justify-between shadow-md items-center px-6 '>
                        <Link href="/" className='link'>
                            <div className='text-lg font-bold'>amazona</div>
                        </Link>
                        <div>
                            <Link href="/cart" className='px-4 link'>
                                Cart
                                {cartItemsCount > 0 && (
                                    <span className='ml-1 rounded-full bg-red-600 px-2 py-1 text-xs text-white  '>
                                        {cartItemsCount}
                                    </span>)}
                            </Link>
                            {status === 'loading' ? ('Loading...') :
                                session?.user ?
                                    (<Menu as='div' className='relative inline-block'>
                                        <Menu.Button className='text-blue-600'>
                                            {session.user.name}
                                        </Menu.Button>
                                        <Menu.Items className='absolute right-0 w-56 origin-top-rightbg-white shadow-lg'>
                                            <Menu.Item>
                                                <Link href='/profile' className=' link dropdown-link link '>
                                                    Profile
                                                </Link>
                                            </Menu.Item>
                                            <Menu.Item>
                                                <Link href='/order-history' className='dropdown-link link hover: bg-gray-200'>
                                                    Order History
                                                </Link>
                                            </Menu.Item>
                                            <Menu.Item >
                                                <Link onClick={logoutClickHandler} href='#' className='dropdown-link hover: bg-gray-200 link '>
                                                    Logout
                                                </Link>
                                            </Menu.Item>
                                        </Menu.Items>
                                    </Menu>)
                                    :
                                    (<Link href="/login" className='px-4 link'> Login</Link>)

                            }
                        </div>
                    </nav>
                </header>
                <main className='container m-auto mt-4 px-4 '>
                    {children}
                </main>
                <footer className='flex justify-center items-center shadow-inner h-10'>
                    CopyRight 2023 @tobeTheBest
                </footer>


            </div>
        </>

    )
}
