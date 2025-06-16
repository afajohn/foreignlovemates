'use client'

import React, { useEffect, useState } from 'react'
import { Button } from '../ui/button';
import { toast } from 'sonner';
  import {
	CircleHelp,
	Flame,
	Images,
	MenuIcon,
	Video,
	Wrench,
	X,
    CircleCheckBig,
    Ellipsis,
    Check,
    Minus,
    Loader,
    CircleX, 
    ChevronDown
} from "lucide-react";
import {
    Collapsible,
    CollapsibleContent,
    CollapsibleTrigger,
  } from "@/components/ui/collapsible"
  import { Tooltip, TooltipTrigger, TooltipContent, TooltipProvider } from "@/components/ui/tooltip";
  import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
  } from "@/components/ui/dropdown-menu"
  import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
  } from "@/components/ui/alert-dialog"
import LogoConfig from './config/branding-config/LogoConfig';
import Colors from './config/branding-config/Colors';
import { useConfigStore } from '@/store/useConfigStore';
import RotatorConfig from './config/branding-config/RotatorConfig';
import {
  Card,
} from "@/components/ui/card"
import HeaderNav from './config/navigations-config/HeaderNav';
import SearchTools from './config/navigations-config/SearchTools';
import SideBarNav from './config/navigations-config/SideBarNav';

  

const Configuration = () => {

  return (
    <div>

      <div className='flex items-center pl-5 pt-5'>
      <h1 className=' text-2xl '>Branding Configuration</h1> 
      </div>

      <div className='flex gap-5'>
     <div className='flex flex-col gap-5'>
      
     <div className='flex gap-5 ml-5'>
      {/* LOGO */}
    <div>
    <LogoConfig/>
    <RotatorConfig/>
    </div>
      <div>
      <Colors/>
      </div>
     </div>
<h1  className='text-2xl ml-7'>Navigations</h1>
{/* SIDEBAR */}
<div className='flex ml-7 gap-5'>
  <div>
 <SideBarNav/>
  </div>

  {/* Header Nav */}
<div>
<HeaderNav/>
<SearchTools/>
</div>
</div>


</div>

     </div>
     </div>

  )
}

export default Configuration
