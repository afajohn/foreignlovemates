import React from 'react'
import Configuration from '@/components/admin/Configuration'
import { auth } from '@/_lib/auth';
import { redirect } from 'next/navigation';

const brandingConfig = async() => {
     const session= await auth();
        const email=session?.user?.email;
        
      async function getUser() {
          const res = await fetch(`${process.env.NEXTAUTH_URL}/api/users/${email}`, {
            next:{revalidate:7200}
          });
          if (!res.ok) throw new Error("Failed to fetch configuration");
          return res.json();
        }
    
        const _user=await getUser();
        const role= _user.role;
  
        if (role !== 'Developer' && role !== 'Admin') {
          redirect('/afa-admin/dashboard');
        }
       
  return (
    <div>
      <Configuration/>
    </div>
  )
}

export default brandingConfig
