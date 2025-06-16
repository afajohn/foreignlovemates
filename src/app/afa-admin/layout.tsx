import Sidebar from "@/components/admin/shared/sidebar";
import Header from "@/components/admin/shared/header";
import "@/app/globals.css"; 
import { auth } from "@/_lib/auth";
import { Toaster } from "sonner";

export default async function AFAADminLayout({ children }: { children: React.ReactNode }) {

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
   

  return (
    <div >
        <Header session={session} />
        <div className="flex h-screen">
        <Sidebar role={role} />
        <main className="flex-1 container">{children}</main>
        <Toaster richColors/>
      </div>
    </div>
  );
}