import fs from "node:fs";
import path from "node:path";
import { NextResponse } from "next/server";
import type { Configuration } from "@/app/types/configuration";

const filePath = path.join(process.cwd(), "src/app/data/configuration/configuration.json");

const getConfig = () => {
    try {
        const data = fs.readFileSync(filePath, "utf-8");
        return JSON.parse(data);
    } catch {
        return [];
    }
};

const saveConfig = (config: Configuration[]) => {
    fs.writeFileSync(filePath, JSON.stringify(config, null, 2));
};

// **GET**: Fetch all users
export async function GET() {
    const config = getConfig();
    return NextResponse.json(config);
}


export async function PUT(req: Request) {
    try {
        const formData = await req.formData();
        const logo = formData.get("logo");
        const miniLogo = formData.get("miniLogo");
        const newColor = formData.get("color");
        const navlink = formData.get("navlink"); //Sidebar
        const website = formData.get("website");
        const headerNavs = formData.get("headerNavs");
        const searchTools = formData.get("searchTools");



        if (!miniLogo && !newColor && !logo && !navlink) {
            return NextResponse.json({ message: "Missing required fields" }, { status: 400 });
        }

        const configuration = getConfig();

        if (configuration.length === 0) {
            return NextResponse.json({ message: "No configuration found to update" }, { status: 404 });
        }

        if (newColor) {
            try {
                const parsedColor = JSON.parse(newColor.toString());
                if (parsedColor.primary && parsedColor.secondary && parsedColor.accent) {
                    configuration[0].color = parsedColor; 
                } else {
                    return NextResponse.json({ message: "Invalid color format" }, { status: 400 });
                }
            } catch (error) {
                return NextResponse.json({ message: "Error parsing color data", error }, { status: 400 });
            }
        }
        if (navlink) {
            try {
                const parsedNavlink = JSON.parse(navlink.toString());
                if (Array.isArray(parsedNavlink)) {
                    configuration[0].navlink = parsedNavlink;
                } else {
                    return NextResponse.json({ message: "Invalid navlink format" }, { status: 400 });
                }
            } catch (error) {
                return NextResponse.json({ message: "Error parsing navlink", error }, { status: 400 });
            }
        }

        if (logo && logo instanceof Blob) {
            const imageByteData = await logo.arrayBuffer();
            const buffer = Buffer.from(imageByteData);
            const filePath = path.join(process.cwd(), "public/images", logo.name);

            await fs.promises.writeFile(filePath, buffer);
            configuration[0].logo = `/images/${logo.name}`;
        }
        if (miniLogo && miniLogo instanceof Blob) {
            const imageByteData = await miniLogo.arrayBuffer();
            const buffer = Buffer.from(imageByteData);
            const filePath = path.join(process.cwd(), "public/images", miniLogo.name);

            await fs.promises.writeFile(filePath, buffer);
            configuration[0].miniLogo = `/images/${miniLogo.name}`;
        }
        if(website) {
            configuration[0].website = website.toString();
        }

        if (headerNavs) {
            try {
                const parsedHeaderNavs = JSON.parse(headerNavs.toString());
                if (Array.isArray(parsedHeaderNavs)) {
                    configuration[0].headerNavs = parsedHeaderNavs;
                } else {
                    return NextResponse.json({ message: "Invalid headerNavs format" }, { status: 400 });
                }
            } catch (error) {
                return NextResponse.json({ message: "Error parsing headerNavs", error }, { status: 400 });
            }
        }     
        
        if (searchTools) {
            try {
                const parsedSearchTools = JSON.parse(searchTools.toString());
                if (
                    parsedSearchTools &&
                    Array.isArray(parsedSearchTools.tours) &&
                    Array.isArray(parsedSearchTools.services) &&
                    Array.isArray(parsedSearchTools.media)
                ) {
                    configuration[0].searchTools = parsedSearchTools;
                } else {
                    return NextResponse.json({ message: "Invalid searchTools format" }, { status: 400 });
                }
            } catch (error) {
                return NextResponse.json({ message: "Error parsing searchTools", error }, { status: 400 });
            }
        }

        saveConfig(configuration);

        return NextResponse.json({ message: "Configuration updated", configuration });
    } catch (error) {
        console.error("Error updating configuration:", error);
        return NextResponse.json({ message: "Error updating configuration" }, { status: 500 });
    }
}

export async function DELETE(req: Request) {
    try {
        const { title, name, headerNav } = await req.json();
        const configuration = getConfig();

        if (configuration.length === 0) {
            return NextResponse.json({ message: "No configuration found to delete from" }, { status: 404 });
        }

        if (!title && !name && !headerNav) {
            return NextResponse.json({ message: "Missing required fields (title or name)" }, { status: 400 });
        }

        const updatedNavlink = configuration[0].navlink
            .filter((nav: { title: string, items: { name: string }[] }) => {
                if (title && nav.title === title) {
                    return false;
                }
                if (name) {
                    nav.items = nav.items.filter((item: { name: string }) => item.name !== name);
                }

                return true; 
            });
            configuration[0].navlink = updatedNavlink;
              
        if (headerNav) {
            configuration[0].headerNavs = configuration[0].headerNavs.filter((navItem: { name: string }) => navItem.name !== headerNav);
        }

        
        saveConfig(configuration);

        return NextResponse.json({ message: "Configuration updated", configuration });
    } catch (error) {
        console.error("Error deleting configuration:", error);
        return NextResponse.json({ message: "Error deleting configuration" }, { status: 500 });
    }
}

