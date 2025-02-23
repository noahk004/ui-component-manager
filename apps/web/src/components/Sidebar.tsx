"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import clsx from "clsx";

const links = [
    { href: "/dashboard", label: "Search" },
    { href: "/docs", label: "Docs" },
    { href: "/liked", label: "Liked" },
    { href: "/create", label: "Create" },
];

export default function Sidebar() {
    const pathname = usePathname();
    const router = useRouter();

    const handleLogout = () => {
        // TODO: make logout route on api and handle frontend logic
        router.push("/login");
    };

    return (
        <div className="w-64 p-6 flex flex-col fixed h-full border-r border-foreground">
            <h1 className="text-4xl mb-4">UICM</h1>
            <nav className="flex flex-col gap-1">
                {links.map(({ href, label }) => (
                    <Link
                        key={href}
                        href={href}
                        className={clsx({
                            "font-semibold": href === pathname,
                        })}
                    >
                        {label}
                    </Link>
                ))}
            </nav>
            <div className="flex flex-row gap-4 items-center mt-auto">
                <img
                    src="https://placehold.co/400"
                    alt="Profile photo"
                    className="w-12 h-12 rounded-full"
                />
                <div className="flex flex-col text-sm">
                    <p>
                        @
                        <Link
                            href="/profile"
                            className="underline underline-offset-2"
                        >
                            USERNAME
                        </Link>
                    </p>
                    <button onClick={handleLogout} className="font-semibold text-left">
                        Log Out
                    </button>
                </div>
            </div>
        </div>
    );
}
