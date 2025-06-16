import React from 'react'
import { useConfigStore } from '@/store/useConfigStore'
import Image from 'next/image';
import {
  Card,
} from "@/components/ui/card"



const LogoConfig = () => {
    const {setLogo, logoUrl}= useConfigStore();
    const {setMiniLogo,miniLogoUrl} = useConfigStore();

  return (
    <div>
      <Card className='rounded-lg w-[650px] mt-5'>
      <h1 className=' text-xl pb-3 pt-1 pl-9'>Page Logo</h1>
      <div className='w-full flex flex-col items-center pb-5'>
                      <div className='flex justify-around w-full px-5'>
                    <div>
                    <label htmlFor="logo_img" className='cursor-pointer text-sm text-gray-500'>Upload Image
                      <Image 
                  src={logoUrl || '/images/upload_area.webp'} 
                  alt='upload' 
                  width={100}
                  height={100}
                  className='border border-gray-400 object-cover w-[370px] h-[100px] p-1' 
              /> 
                      </label>
                      <input onChange={(e)=> { if (e.target.files) setLogo(e.target.files[0]) }}  type="file" hidden name='logo_img' id='logo_img'/>
                    </div>
                    
                    <div>
                    <label htmlFor="minilogo_img" className='cursor-pointer text-sm text-gray-500'>Upload Image
                      <Image 
                  src={miniLogoUrl || '/images/upload_area.webp'} 
                  alt='upload' 
                  width={100} 
                  height={100} 
                  className='border border-gray-400 h-[80px]'
              /> 
                      </label>
                      <input onChange={(e)=> { if (e.target.files) setMiniLogo(e.target.files[0]) }}  type="file" hidden name='logo_img' id='minilogo_img'/>
                    </div>
                      </div>
                      </div>
      </Card>
    </div>
  )
}

export default LogoConfig
