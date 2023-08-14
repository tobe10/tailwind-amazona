import Link from 'next/link'
import React, { useEffect } from 'react'
import Layout from './components/Layout'
import { signIn, useSession } from 'next-auth/react'
import { useForm } from 'react-hook-form'
import { getError } from '@/utils/error'
import { toast } from 'react-toastify'
import { useRouter } from 'next/router'
import axios from 'axios'

export default function LoginScreen() {
    const { data: session } = useSession();
    const router = useRouter()
    const { redirect } = router.query;
    useEffect(() => {
        if (session?.user) {
            router.push(redirect || '/');
        }
    }, [session, redirect, router])
    const { handleSubmit, register, getValues,
        formState: { errors }, } = useForm()

    const submitHandler = async ({ name, email, password }) => {
        try {
            2
            await axios.post('/api/auth/signup', {
                name, email, password,
            });
            const result = await signIn('credentials', {
                redirect: false,
                email,
                password,
            });
            if (result.error) toast.warn("WRONG PASSWORD OR EMAIL")
        } catch (err) {
            toast.error(getError(err));
            console.log(err)
        }
    };

    return (
        <Layout title='Create Account'>
            <form onSubmit={handleSubmit(submitHandler)} className='mx-auto max-w-screen-md '>
                <h1 className='mb-4 text-xl'>Create Account</h1>
                <div className='mb-4'>
                    <label htmlFor='name'>Name</label>
                    <input type='text'
                        {...register('name', {
                            required: 'Please enter name',
                        })}
                        className='w-full focus: ring  c' id='name' autoFocus></input>
                    {errors.name && (<div className='text-red-500'>{errors.name.message}</div>)}
                </div>
                <div className='mb-4'>
                    <label htmlFor='email'>Email</label>
                    <input type='text'
                        {...register('email', {
                            required: 'Please enter email',
                        })}
                        className='w-full focus: ring' id='email' ></input>
                    {errors.email && (<div className='text-red-500'>{errors.email.message}</div>)}
                </div>

                <div className='mb-4'>
                    <label htmlFor='password'>Password</label>
                    <input type='password'
                        {...register('password', {
                            required: 'Please enter password',
                            minLength: { value: 6, message: 'Password must be more than 5 chars' }
                        })}

                        className='w-full focus: ring' id='password' ></input>
                    {errors.password && (<div className='text-red-500'>{errors.password.message}</div>)}

                </div>
                <div className='mb-4'>
                    <label htmlFor='confirmpassword'>Confirmation Password</label>
                    <input type='password'
                        {...register('confirmpassword', {
                            validate: (value) => value === getValues('password'),
                            required: 'Please enter confirmpassword',
                            minLength: { value: 6, message: 'Password must be more than 5 chars' }
                        })}

                        className='w-full focus: ring' id='password' ></input>
                    {errors.password && (<div className='text-red-500'>{errors.confirmpassword.message}</div>)}
                    {errors.password && errors.password.type === 'validate' && (<div className='text-red-500'>Password does not match</div>)}

                </div>
                <div className='mb-4'>
                    <button className='primary-button'>Register</button>
                </div>
                <div className='mb-4'>
                    Don&apos;t have an account ?&nbsp;
                    <Link href={`/register?redirect=${redirect || ' / '}`} className='link'>Register</Link>
                </div>

            </form>

        </Layout>)
}
