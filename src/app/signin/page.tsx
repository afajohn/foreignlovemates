import { auth } from '@/_lib/auth'
import Signin from '@/components/admin/Signin'
import React from 'react'


const login = async () => {
  const session= await auth();
  return (
    <div>
      <Signin  session={session} />
    </div>
  )
}

export default login