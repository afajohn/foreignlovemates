import { auth } from '@/_lib/auth';
import Users from '@/components/admin/Users'
import React from 'react'
import { redirect } from 'next/navigation';

const users =async () => {
  
      const session= await auth();
      const email=session?.user?.email;
      
    async function getUser() {
        const res = await fetch(`${process.env.NEXTAUTH_URL}/api/users/${email}`, {
          next:{revalidate:7200}
        }
      );
        if (!res.ok) throw new Error("Failed to fetch configuration");
        return res.json();
      }
  
      const _user=await getUser();
      const role= _user.role;

      if (role !== 'Admin') {
        redirect('/afa-admin/dashboard');
      }
     
  return (
    <div>
      <Users/>
    </div>
  )
}

export default users