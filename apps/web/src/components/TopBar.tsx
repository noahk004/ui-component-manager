import Link from "next/link";
import Image from "next/image";

// Define a User type for the prop
type User = {
  username: string;
  profilePicture?: string;
};

// Update component to accept user prop
export default function TopBar({ user }: { user?: User }) {

    const links = [
        { href: "/dashboard", label: "Components" },
        { href: "/docs", label: "Documentation" },
        //{ href: "/create", label: "Create" },
    ];

    return (
        <div className="py-4 bg-black border-b border-border w-full">
            <div className="flex items-center justify-between h-full px-6">
                <div className="flex items-center gap-12">
                    <h1 className="text-4xl">UICM</h1>
                    {links.map((link) => (
                        <Link key={link.href} href={link.href} className="text-md">
                            {link.label}
                        </Link>
                    ))}
                </div>
                
                {/* Conditional rendering based on user authentication */}
                <div className="flex items-center gap-2">
                    {user ? (
                        // User is logged in - show profile info
                        <div className="flex items-center gap-3">
                            <span className="text-white">{user.username}</span>
                            {user.profilePicture ? (
                                <Image 
                                    src={user.profilePicture} 
                                    alt={`${user.username}'s profile`}
                                    width={32}
                                    height={32}
                                    className="rounded-full"
                                />
                            ) : (
                                // Fallback if no profile picture
                                <div className="w-8 h-8 bg-white text-black rounded-full flex items-center justify-center">
                                    {user.username.charAt(0).toUpperCase()}
                                </div>
                            )}
                        </div>
                    ) : (
                        // User is not logged in - show login/signup buttons
                        <>
                            <Link href={"/login"} className="text-white border-border border px-3 py-1 rounded-md">
                                Log in
                            </Link>
                            <Link href={"/signup"} className="text-black border-border bg-white border px-3 py-1 rounded-md">
                                Sign up
                            </Link>
                        </>
                    )}
                </div>
            </div>
        </div>
    );
}
