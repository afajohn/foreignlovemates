'use client'
import type React from 'react'
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
    TableCaption,
} from "@/components/ui/table"
import { Button } from "@/components/ui/button"
import { toast } from "sonner"
import { CircleCheckBig, RefreshCcw, X, Search, Pencil, Check, User } from 'lucide-react';
import { useUserDataStates } from '@/hooks/admin'
import { Tooltip, TooltipTrigger, TooltipContent, TooltipProvider } from "@/components/ui/tooltip";
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


const Users = () => {
    const {userData,setUserData, loading, addUser, setAddUser ,newUser ,setNewUser, editingUser, setEditingUser, editedEmail, setEditedEmail,open, setOpen,deletingEmail, searchQuery, setSearchQuery,fetchUserData ,handleEditClick, editedRole, setEditedRole,role, setRole,openDeleteConfirmation} = useUserDataStates();
    

    const handleSubmitUser= async (e: React.FormEvent)=>{
        e.preventDefault();

        if(role === 'select role') {
            toast("Role not selected!", {
                description: "Please select a role for the user.",
                icon: <X className="text-red-500" />,
            });
            return;
        }
    
        const userExists = userData.some(user => user.email === newUser);
        if (userExists) {
            toast("Email already exists!", {
                description: "This email is already in the user list.",
                icon: <X className="text-red-500" />,
            });
            return;
        }

        try{
            const response= await fetch(`${process.env.NEXTAUTH_URL}/api/users`, {
                method:'POST',
                headers:{
                    'Content-Type' : 'application/json'
                },
                body:JSON.stringify({ email: newUser,role:role }),
            })
            const data = await response.json();
            if (data.message === 'User added')
            fetchUserData();
            setNewUser('');
            setRole('select role');
            toast("Email added successfully!", {
                description: "New user's email has been successfully added.",
                icon: <CircleCheckBig className="text-green-500" />,
              });
        }
        catch(err) {
            console.error('error adding data', err);
        }
    }

    const handleSaveEdit = async () => {
        if (!editingUser) return; 
    
        try {
            const response = await fetch(`${process.env.NEXTAUTH_URL}/api/users/${editingUser}`, {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ email: editedEmail, role: editedRole }),
            });
    
            if (!response.ok) {console.log(response); throw new Error("Failed to update user");}

    
            fetchUserData();
            setEditingUser(null);
            setRole('select role');
            toast("Email updated successfully!", {
                description: "The user's email has been updated.",
                icon: <CircleCheckBig className="text-green-500" />,
            });
        } catch (err) {
            console.error('Error updating user', err);
        }
    };



    const handleDeleteUser= async (deletingEmailParams:string) =>{
        if(!deletingEmailParams) return;

        try{
            const response= await fetch(`${process.env.NEXTAUTH_URL}/api/users/${deletingEmailParams}`, {
                method: 'DELETE',
                headers: { 'Content-Type': 'application/json' },
            });

            if (!response.ok) throw new Error("Failed to delete user");

            setUserData(userData.filter(user => user.email !== deletingEmailParams));

            toast("User deleted successfully!", {
                description: `The user with email ${deletingEmailParams} has been removed.`,
                icon: <CircleCheckBig className="text-green-500" />,
            });
            
        }catch (err) {
            console.error('Error: User deletion unsuccessful.', err);
            toast("Error deleting user", {
                description: "Could not remove the user. Try again.",
                icon: <X className="text-red-500" />,
            });
        }


    }
    
    const filteredUsers = userData.filter(user =>
        user.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
        (user.name && user.name.toLowerCase().includes(searchQuery.toLowerCase())) ||
        (user.role && user.role.toLowerCase().includes(searchQuery.toLowerCase()))
    );

    return (
        
        <div className='shadow-md p-4'>
             <TooltipProvider>
            <div className='flex justify-between items-center mb-4'>
                <h1 className='font-bold text-2xl'>Users</h1>
                <div className='flex items-center'>
                <Search className='h-[35px] w-[40px] p-1 border-t border-t-gray-400 border-l border-l-gray-400 border-b border-b-gray-400 rounded-l-md' />
                <input
                type="text"
                placeholder="Search user by email or name"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="h-[35px] w-[250px] pl-2 outline-none border border-gray-400 rounded-r-md"
            />
                </div>
                <div className='flex gap-3'>
                <Tooltip>
      <TooltipTrigger asChild>
      <Button className='border border-green-500' onClick={()=>setAddUser(true)} >+ <User/> </Button>
      </TooltipTrigger>
       <TooltipContent>add user</TooltipContent>
        </Tooltip>
                <Button  
  className="relative border border-purple-500 hover:bg-gradient-to-t hover:from-purple-500 hover:to-violet-500 px-4 py-2 flex items-center gap-2 text-black hover:text-white transition-all duration-300  
  before:absolute before:inset-0 before:-z-20 before:rounded-md before:blur-lg before:opacity-0 before:transition-all before:duration-300 hover:before:opacity-100  
  hover:before:bg-gradient-to-t hover:before:from-purple-500 hover:before:to-violet-500  
  hover:shadow-[0px_0px_15px_rgba(168,85,247,0.7)]"
>  
  <RefreshCcw /> Sync to Database  
</Button>
                </div>
            </div>
            </TooltipProvider>
            {addUser && (
                <form className='mb-4 p-4 border rounded-lg bg-gray-100 flex gap-4' onSubmit={handleSubmitUser}>
                    <input
                        type="email"
                        name='email'
                        placeholder='Enter Email'
                        value={newUser}
                        onChange={(e) => setNewUser(e.target.value)}
                        className='h-[35px] w-[230px] pl-2 outline-none border border-gray-400 rounded-md'
                        required
                    />
                    <select value={role} onChange={(e)=>setRole(e.target.value)}>
                        <option disabled> select role</option>
                        <option value="Admin">Admin</option>
                        <option value="Developer">Developer</option>
                        <option value="Editor">Editor</option>
                    </select>
                    <Button type="submit" className='border border-green-500'>Confirm</Button>
                    <Button type="button" className='bg-red-400 hover:bg-red-500' onClick={() => setAddUser(false)}><X /></Button>
                </form>
            )}
            <TooltipProvider>
           <Table>
                <TableCaption>Only users whose emails are in this list can access this page.</TableCaption>
                <TableHeader>
                    <TableRow>
                        <TableHead>Email</TableHead>
                        <TableHead>Name</TableHead>
                        <TableHead>Role</TableHead>
                        <TableHead>Action</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {loading ? (
                        <TableRow>
                            <TableCell colSpan={4} className="text-center py-4 text-lg font-semibold">
                                Loading...
                            </TableCell>
                        </TableRow>
                    ) : filteredUsers.length > 0 ? (
                        filteredUsers.map((user, index) => (
                            <TableRow key={index}>
                                <TableCell>
                                    {editingUser === user.email ? (
                                        <input
                                            type="email"
                                            value={editedEmail} 
                                            onChange={(e) => setEditedEmail(e.target.value)}
                                            className='h-[35px] w-[230px] pl-2 outline-none border border-gray-400 rounded-md'
                                        />
                                    ) : (
                                        user.email
                                    )}
                                </TableCell>
                                <TableCell>{user.name ? user.name : 'null'}</TableCell>
                                <TableCell>
                                    {editingUser === user.email ? (
                                         <select value={editedRole} onChange={(e)=>setEditedRole(e.target.value)}>
                                         <option disabled> select role</option>
                                         <option value="Admin">Admin</option>
                                         <option value="Developer">Developer</option>
                                         <option value="Editor">Editor</option>
                                     </select>) : (
                                          user.role ? user.role : 'no role'
                                        )
                                    }
                                    </TableCell>
                                <TableCell className='flex gap-10 py-5'>
                                    {editingUser === user.email ? (
                                        <>
                                         <Tooltip>
                                            <TooltipTrigger asChild>
                                            <Check size={20} className='text-green-400 cursor-pointer' onClick={handleSaveEdit} />
                                            </TooltipTrigger>
                                            <TooltipContent>save changes</TooltipContent>
                                                </Tooltip>
    
                                            <Tooltip>
                                            <TooltipTrigger asChild>
                                            <X size={20} className='text-red-400 cursor-pointer' onClick={() => setEditingUser(null)} />
                                            </TooltipTrigger>
                                            <TooltipContent>cancel</TooltipContent>
                                                </Tooltip>
                                        </>
                                    ) : (
                                        <>
                                          <Tooltip>
                                            <TooltipTrigger asChild>
                                            <Pencil size={20} className='text-gray-400 cursor-pointer' onClick={()=>handleEditClick(user.email, user.role)} />
                                            </TooltipTrigger>
                                            <TooltipContent>Edit user</TooltipContent>
                                                </Tooltip>
                                                <Tooltip>
                                            <TooltipTrigger asChild>
                                            <X size={20} className='text-red-400 cursor-pointer'  onClick={() => openDeleteConfirmation(user.email)} />
                                            </TooltipTrigger>
                                            <TooltipContent>remove user</TooltipContent>
                                                </Tooltip>
                                        </>
                                    )}
                                </TableCell>
                            </TableRow>
                        ))
                    ) : (
                        <TableRow>
                            <TableCell colSpan={4} className='text-center py-4 text-lg'>
                                No users found.
                            </TableCell>
                        </TableRow>
                    )}
                </TableBody>
            </Table>
            </TooltipProvider>

            <AlertDialog open={open} onOpenChange={setOpen}>
  <AlertDialogContent>
    <AlertDialogHeader>
      <AlertDialogTitle>Are you sure you want to delete this user?</AlertDialogTitle>
      <AlertDialogDescription>
        {deletingEmail}
      </AlertDialogDescription>
    </AlertDialogHeader>
    <AlertDialogFooter>
      <AlertDialogCancel onClick={() => setOpen(false)}>Cancel</AlertDialogCancel>
      <AlertDialogAction className='bg-red-400 hover:bg-red-500' onClick={()=>handleDeleteUser(deletingEmail)}>Confirm Delete</AlertDialogAction>
    </AlertDialogFooter>
  </AlertDialogContent>
</AlertDialog>


        </div>
    );
};

export default Users;
