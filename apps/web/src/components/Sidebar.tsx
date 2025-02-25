"use client";

import Link from "next/link";
import Image from "next/image"
import { usePathname, useRouter } from "next/navigation";
import clsx from "clsx";
import { SidebarProps } from "../types/props";
import { logout } from "../services/authService";

const links = [
    { href: "/dashboard", label: "Search" },
    { href: "/docs", label: "Docs" },
    { href: "/liked", label: "Liked" },
    { href: "/create", label: "Create" },
];

export default function Sidebar({ user }: SidebarProps) {
    const pathname = usePathname();
    const router = useRouter();

    const handleLogout = async () => {
        await logout();
        router.push("/login");
    };

    return (
        <div className="w-64 p-8 flex flex-col fixed h-full border-r border-foreground">
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
            <div className="mt-auto">
                {user ? (
                    <div className="flex flex-row gap-3 items-center mt-auto">
                        <Image
                            src="https://placehold.co/400"
                            alt="Profile photo"
                            width={50}
                            height={50}
                            className="rounded-full"
                            unoptimized      // TODO: add user profile images and remove unoptimized
                        />
                        <div className="flex flex-col text-sm">
                            <p>
                                @
                                <Link
                                    href={`/profile/${user.userId}`}
                                    className="underline underline-offset-2"
                                >
                                    {user.username}
                                </Link>
                            </p>
                            <button
                                onClick={handleLogout}
                                className="font-semibold text-left"
                            >
                                Log Out
                            </button>
                        </div>
                    </div>
                ) : (
                    <Link href="/login">Log In</Link>
                )}
            </div>
        </div>
    );
}
