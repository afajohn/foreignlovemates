import React from "react";
import Link from "next/link";

export const sidebarNavlinks = [
    { name: "Dating", href: "/blog/dating" },
    { name: "Success Stories", href: "/blog/success_stories" },
    { name: "Culture", href: "/blog/culture" },
    { name: "Psychology", href: "/blog/psychology" },
    { name: "Travel", href: "/blog/travel" },
    { name: "Realities", href: "/blog/realities" },
];

const LeftSidebar = () => {
    return (
        <>
        <section className="custom-scrollbar background-light900_dark200 light-border sticky left-0 top-0 h-screen flex flex-col justify-between border-r pt-6 p-6 shadow-light-300 dark:shadow-none max-sm:hidden lg:w-[266px]">
            <h1 className="font-medium whitespace-nowrap text-2xl">Article Categories</h1>
            <ul className="flex flex-1 flex-col gap-6 pt-6">
                {sidebarNavlinks.map(({ name, href }) => {
                    return (
                        <li key={name}>
                            <Link
                                href={`${href}`}
                                className="block w-full py-2 px-4 rounded-md transition-colors duration-200 text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-800"
                            >
                                {name}
                            </Link>
                        </li>
                    );
                })}
            </ul>
        </section>
        </>
    );
};
export default LeftSidebar;