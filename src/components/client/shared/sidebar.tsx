"use client";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
  SheetClose,
  SheetDescription,
} from "@/components/ui/sheet";
import {
  CircleHelp,
  Flame,
  Home,
  Images,
  MenuIcon,
  Video,
  Wrench,
  X,
} from "lucide-react";
import Image from "next/image";
import { useConfigNavlink, useConfigMiniLogo } from "@/contexts/ConfigProvider";
import Link from "next/link";

// type SubMenuItem = {
// 	id: number;
// 	label: string;
// 	href: string;
// };

// type MenuItem = {
// 	id: number;
// 	label: string;
// 	href?: string;
// 	icon: React.ReactNode;
// 	subMenu?: SubMenuItem[];
// };

const iconMap: { [key: string]: React.ReactNode } = {
  CircleHelp: <CircleHelp size={20} />,
  Flame: <Flame size={20} />,
  Images: <Images size={20} />,
  Wrench: <Wrench size={20} />,
  Home: <Home size={20} />,
  Video: <Video size={20} />,
};

// const menuItems: MenuItem[] = [
// 	{
// 		id: 1,
// 		label: "How Our Services Works",
// 		icon: <CircleHelp size={20} />,
// 		subMenu: [
// 			{ id: 1, label: "Signup For Free", href: "/#" },
// 			{ id: 2, label: "Upgrade to Platinum Membership", href: "/#" },
// 			{ id: 3, label: "Matchmaker Services", href: "/#" },
// 		],
// 	},
// 	{
// 		id: 2,
// 		label: "See Foreign Women's Profiles",
// 		icon: <Images size={20} />,
// 		subMenu: [
// 			{ id: 1, label: "Newest Foreign Women's Profiles", href: "/#" },
// 			{ id: 2, label: "Ukrainian Women Profiles", href: "/#" },
// 			{ id: 3, label: "Asian Women Profiles", href: "/#" },
// 			{ id: 4, label: "Latin Women Profiles", href: "/#" },
// 		],
// 	},
// 	{
// 		id: 3,
// 		label: "Book a Tour, Travel & Meet Her",
// 		icon: <Flame size={20} />,
// 		subMenu: [
// 			{ id: 1, label: "European Tours", href: "/#services/web-development" },
// 			{ id: 2, label: "Asian Tours", href: "/#services/mobile-development" },
// 			{ id: 3, label: "Latin Tours", href: "/#services/ui-ux-design" },
// 			{ id: 4, label: "Club Tours", href: "/#services/seo" },
// 			{
// 				id: 5,
// 				label: "One-on-one Introductions",
// 				href: "/#services/cloud-solutions",
// 			},
// 		],
// 	},
// 	{
// 		id: 4,
// 		label: "Service Options We Offer",
// 		icon: <Wrench size={20} />,
// 		subMenu: [
// 			{
// 				id: 1,
// 				label: "Virtual Phone / Video Translation",
// 				href: "/#services/web-development",
// 			},
// 			{
// 				id: 2,
// 				label: "Executive Plan Package",
// 				href: "/#services/mobile-development",
// 			},
// 			{ id: 3, label: "Gift Sending", href: "/#services/ui-ux-design" },
// 			{ id: 4, label: "IMBRA Request", href: "/#services/seo" },
// 			{ id: 5, label: "Fiancee Visa Kit", href: "/#services/cloud-solutions" },
// 		],
// 	},
// 	{
// 		id: 5,
// 		label: "Media & Client",
// 		icon: <Video size={20} />,
// 		subMenu: [
// 			{ id: 1, label: "Tour Videos", href: "/#services/web-development" },
// 			{
// 				id: 2,
// 				label: "Testimonial Videos",
// 				href: "/#services/mobile-development",
// 			},
// 			{ id: 3, label: "Informational Videos", href: "/#services/ui-ux-design" },
// 			{ id: 4, label: "Client Reviews", href: "/#services/seo" },
// 			{ id: 5, label: "Blogs", href: "/#services/cloud-solutions" },
// 		],
// 	},
// ];

export default function Sidebar() {
  const navlinks = useConfigNavlink();
  const mini_logo = useConfigMiniLogo();

  return (
    <Sheet modal={false}>
      <SheetTrigger asChild>
        <button
          type="button"
          className="flex flex-col focus:outline-none items-center ml-3 text-gray-700"
        >
          <MenuIcon size={32} />
          <span className="text-sm text-gray-700 font-medium">Menu</span>
        </button>
      </SheetTrigger>
      <SheetContent side={"left"} className="px-0 pt-0 z-40 overflow-auto">
        <SheetHeader className="items-center flex-row justify-between shadow-sm p-3">
          <SheetTitle>Main Menu</SheetTitle>
          <Image
            src={mini_logo || "/images/loveme-icon.png"}
            alt="logo"
            width={35}
            height={35}
          />
          <SheetClose
            className="rounded-full opacity-70 ring-offset-background transition-opacity hover:opacity-100 focus:outline-none disabled:pointer-events-none data-[state=open]:bg-secondary flex items-center gap-2"
            title="Close"
          >
            Close
            <span className="sr-only">(Close)</span>
            <X size={24} />
          </SheetClose>
        </SheetHeader>

        <SheetDescription className="p-3" asChild>
          <div className="space-y-4">
            <ul className="space-y-4">
              {navlinks?.map((menu) => {
                  return (
                    <li key={menu.title} className="text-foreground">
                      <div className="text-md font-semibold flex items-center gap-2">
                        <span> {iconMap?.[menu.icon]} </span>
                        {menu.title}
                      </div>
                      {menu.items && (
                        <ul className="ml-7 mt-2 space-y-2">
                          {menu.items.map((items) => (
                            <li key={items.name}>
                              <Link
                                href={`/${items.link.replace(/^\/+/, "")}`}
                                className="text-sm text-muted-foreground hover:text-primary"
                              >
                                {items.name}
                              </Link>
                            </li>
                          ))}
                        </ul>
                      )}
                    </li>
                  );
                })}
            </ul>
          </div>
        </SheetDescription>
      </SheetContent>
    </Sheet>
  );
}
