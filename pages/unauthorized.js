import { useRouter } from 'next/router'
import React from 'react'
import Layout from '@/components/Layout';


export default function Unauthorize() {
  const router = useRouter()
  const { query } = router;
  const { message } = query;
  return (
    <Layout title='Unauthorized'>
      <div className='text-xl'>Unauthorized Page </div>
      {message && <div className='mb-4 text-red-500'>{message} </div>}
    </Layout>
  )
}
