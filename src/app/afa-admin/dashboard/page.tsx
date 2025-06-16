import { auth } from "@/_lib/auth";
import Dashboard from "@/components/admin/Dashboard";
import React from "react";

export default async function dashboard(){

  const session= await auth();

  return (
    <h1 className="text-3xl">
      <Dashboard session={session} />
    </h1>
  );
}
