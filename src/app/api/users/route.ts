import fs from "node:fs";
import path from "node:path";
import { NextResponse } from "next/server";
import type { User } from "@/app/types/user";

const filePath = path.join(process.cwd(), "src/app/data/users/users.json");

const getUsers = () => {
	try {
		const data = fs.readFileSync(filePath, "utf-8");
		return JSON.parse(data);
	} catch {
		return [];
	}
};

const saveUsers = (users: User[]) => {
	fs.writeFileSync(filePath, JSON.stringify(users, null, 2));
};

// **GET**: Fetch all users
export async function GET() {
	const users = getUsers();
	return NextResponse.json(users);
}


export async function POST(req: Request) {
	try {
		const {
            id,
            name,
            email,
			role,
		} = await req.json();
		if (!email && !role) {
			return NextResponse.json({ message: "Missing fields" }, { status: 400 });
		}

		const users = getUsers();

		const newUsers: User = {
			id,
            name,
            email,
			role,
		};

		users.push(newUsers);
		saveUsers(users);

		return NextResponse.json({ message: "User added", users: newUsers });
	} catch {
		return NextResponse.json(
			{ message: "Error saving user" },
			{ status: 500 },
		);
	}
}
