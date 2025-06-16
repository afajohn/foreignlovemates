'use client'

import React, { useEffect } from 'react'
import { Session } from 'next-auth'
import { toast } from 'sonner'

let hasToastBeenShown = false

const Dashboard: React.FC<{ session: Session | null }> = ({ session }) => {
  useEffect(() => {
    if (session?.user && !hasToastBeenShown) {
      setTimeout(() => {
        toast.success(`Signed in as ${session?.user?.email}`)
      }, 0) 
      hasToastBeenShown = true 
    }
  }, [session])

  return <div>Dashboard</div>
}

export default Dashboard
