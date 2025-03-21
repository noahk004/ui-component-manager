import { cookies } from "next/headers";
import { decode, JwtPayload } from "jsonwebtoken";

import Sidebar from "@/src/components/Sidebar";
import TopBar from "@/src/components/TopBar";

import "../../globals.css";

export default async function HomeLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    const cookieStore = await cookies();
    const token = cookieStore.get("token")?.value;

    let user = null;

    if (token) {
        try {
            user = decode(token) as JwtPayload;
        } catch (error) {
            console.error("Error decoding token:", error);
        }
    }

    return (
        <div className="flex flex-col h-screen">
            <div className="sticky top-0 z-10">
                <TopBar />
            </div>
            <div className="flex flex-1">
                <Sidebar user={user} />
                <div className="flex-1 ms-64">{children}</div>
            </div>
        </div>
    );
}
