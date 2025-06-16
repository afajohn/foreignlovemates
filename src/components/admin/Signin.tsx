'use client'
import { signIn } from 'next-auth/react'
import { Session } from 'next-auth'
import React, { useEffect, useState } from 'react'
import {
    Card,
    CardContent,
    CardFooter,
  } from "@/components/ui/card"
import Logo from '../client/logo/Logo'
import Image from 'next/image'
import { Button } from "@/components/ui/button"
import { Github } from 'lucide-react';
import Link from 'next/link'


interface SigninProps {
  session: Session | null;
}

const Signin = ({ session }: SigninProps) => {
  const [loading, setLoading] = useState(true);


  useEffect(() => {
    if (session) {
      window.location.href = '/afa-admin';
    } else {
      setLoading(false);
    }
  }, [session]);

    const handleSignin=()=>{
        signIn('github', {
            redirectTo:'/afa-admin'
        })
    }

    if (loading) {
      return <div>
         <div className="flex flex-col justify-center items-center h-screen text-center">
    <Image
      aria-hidden
      src="/images/love_is_art.gif"
      alt="Globe icon"
      width={200}
      height={200}
      unoptimized
    />
  </div>
      </div>;
    }

  return (
    <div className='flex flex-col items-center h-screen justify-center'>
     <Card className='flex flex-col w-[400px] items-center shadow-lg'>
     <CardContent className='flex flex-col items-center mt-5'>
     <Logo 
        src={'/images/loveme-v1.png'} 
        alt={'Love Me Logo'} 
        width={150} 
        height={150} 
      />
          <h1 className="text-3xl font-bold">Love me Admin Page</h1>
       <Image
          aria-hidden
          src="/images/love_is_art.gif"
          alt="Globe icon"
          width={200}
          height={200}
          unoptimized
        />
  </CardContent>
  <CardFooter className='flex flex-col'>
  <Button variant="outline" onClick={handleSignin} className='w-[300px] h-[60px] text-lg'>
    <span className='bg-black rounded-full w-[30px] h-[30px] flex items-center justify-center'><Github className='text-white text-3xl' /></span>
    Login with GitHub </Button>
    <p className='mt-2'>Don&apos;t have an account yet? <Link href={'https://github.com/signup'} className='text-red-500'>Sign up</Link></p>
  </CardFooter>
        </Card>

    </div>
  )
}

export default Signin