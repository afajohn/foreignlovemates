import NextAuth from "next-auth"
import GitHub from "next-auth/providers/github"
import { handleRequest } from "./api";

export const { handlers, signIn, signOut, auth } = NextAuth({
    callbacks: {
        authorized: async ({ auth }) => {
          return !!auth
        },
        async signIn({ user }) {
          try {
              if (!process.env.NEXTAUTH_URL) {
                  console.error("NEXTAUTH_URL is not set");
                  return false; 
              }
      
              const response = await fetch(`${process.env.NEXTAUTH_URL}/api/users`);
              if (!response.ok) {
                  console.error("Failed to fetch users:", response.statusText);
                  return false; 
              }
      
              const data = await response.json();
              const userExists = Array.isArray(data) && data.some((u: { email: string }) => u.email === user.email);
              
              if (!userExists) {
                  return false;
              }
      
              const updateResponse = await handleRequest(
                  `${process.env.NEXTAUTH_URL}/api/users/${user.email}`,
                  "PUT",
                  { name: user.name, id: user.id }
              );
      
              if (updateResponse.error) {
                  console.error("Failed to update user:", updateResponse.message);
                  return false;
              }
      
              return true;
          } catch (error) {
              console.error("SignIn error:", error);
              return false; 
          }
      }
      },
  providers: [GitHub],


  pages: {
    signIn: "/signin",
    error:"/verify",
  },
  


})

