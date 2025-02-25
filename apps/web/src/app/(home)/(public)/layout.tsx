import { cookies } from "next/headers";
import { decode, JwtPayload } from "jsonwebtoken";

import Sidebar from "@/src/components/Sidebar";

import "../../globals.css";

export default async function HomeLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    const cookieStore = await cookies()
    const token = cookieStore.get("token")?.value

    let user = null;
    
    if (token) {
        try {
            user = decode(token) as JwtPayload;
        } catch (error) {
            console.error("Error decoding token:", error);
        }
    }

    return (
        <div className="flex h-screen">
            <Sidebar user={user} />
            <div className="flex-1 ms-64">{children}</div>
        </div>
    );
}
