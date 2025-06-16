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

// **Update a user by email**
export async function PUT(req: Request, { params }: { params: Promise< { email: string }> }) {
  try {
    const { email } = await params; 
    const updatedData = await req.json(); 
    const users = await readUsers();

    const decodedEmail = decodeURIComponent(email);
    const index = users.findIndex((user: User) => user.email === decodedEmail);

    if (index === -1) {
      return NextResponse.json({ message: "User not found" }, { status: 404 });
    }

    users[index] = { 
      ...users[index], 
      ...updatedData,
      name: users[index].name || "", 
      id: users[index].id || "" 
    };
    
    await writeUsers(users);

    return NextResponse.json(users[index]);
  } catch (error) {
    console.error("PUT Error:", error);
    return NextResponse.json({ error: "Failed to update user" }, { status: 500 });
  }
}
