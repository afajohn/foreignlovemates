'use client'
import React from 'react'
import { Power } from "lucide-react";
import { Button } from "@/components/ui/button";
import { signOut } from "next-auth/react";


const LogoutButton = () => {
    const handleSignout= () =>{
        signOut();
    }
    
  return (
    <div>
        <Button
            variant={"link"}
            className="flex gap-2 items-center p-0"
            type="button"
            onClick={handleSignout}
             >
            <span>Logout</span> <Power size={20} />
            </Button>
    </div>
  )
}

export default LogoutButton