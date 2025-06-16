import { NextResponse } from "next/server";
import fs from "node:fs/promises";
import path from "node:path";
import type { User } from "@/app/types/user";

const filePath = path.join(process.cwd(), "src/app/data/users/users.json");

const readUsers = async () => {
  try {
    const fileData = await fs.readFile(filePath, "utf8");
    return JSON.parse(fileData);
  } catch (error) {
    console.error("Error reading users:", error);
    return [];
  }
};

const writeUsers = async (users: User[]) => {
  try {
    await fs.writeFile(filePath, JSON.stringify(users, null, 2));
  } catch (error) {
    console.error("Error writing users:", error);
  }
};


// **Get a user by email**
export async function GET(req: Request, { params }: { params: Promise<{ email: string }> }) {
  try {
    const { email } =await params;
    const users: User[] = await readUsers();
    
    const decodedEmail = decodeURIComponent(email);
    const user = users.find((user: User) => user.email === decodedEmail);
    
    if (!user) {
      return NextResponse.json({ message: "User not found" }, { status: 404 });
    }

    return NextResponse.json(user);
  } catch (error) {
    console.error("GET Error:", error);
    return NextResponse.json({ error: "Failed to fetch user" }, { status: 500 });
  }
}

// **Update a user by email**
export async function PUT(req: Request, { params }: { params: Promise<{ email: string;}> }) {
  try {

    const { email } = await params;
    const updatedData = await req.json();
    const users: User[] = await readUsers();

    // Decode email in case it's URL-encoded
    const decodedEmail = decodeURIComponent(email);

    // Find user by email 
    const index = users.findIndex((user: User) => user.email === decodedEmail);

    if (index === -1) {
      return NextResponse.json({ message: "User not found" }, { status: 404 });
    }

    // Update user data 
    users[index] = { ...users[index], ...updatedData };

    await writeUsers(users);

    return NextResponse.json(users[index]);
  } catch (error) {
    console.error("PUT Error:", error);
    return NextResponse.json({ error: "Failed to update user" }, { status: 500 });
  }
}


export async function DELETE(req: Request, { params }: { params: Promise<{ email: string }> }) {
    try {
      const { email } = await params; 
      const users = await readUsers();
  
      const decodedEmail = decodeURIComponent(email);
      const filteredUsers = users.filter((user: User) => user.email !== decodedEmail);
  
      if (users.length === filteredUsers.length) {
        return NextResponse.json({ message: "User not found" }, { status: 404 });
      }
  
      await writeUsers(filteredUsers);
  
      return NextResponse.json({ message: "User deleted successfully" });
    } catch (error) {
      console.error("DELETE Error:", error);
      return NextResponse.json({ error: "Failed to delete user" }, { status: 500 });
    }
  }