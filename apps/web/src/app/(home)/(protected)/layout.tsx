import Sidebar from "@/src/components/Sidebar";
import AuthGuard from "@/src/guards/AuthGuard";

import "../../globals.css"

export default function HomeLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <AuthGuard>
            <div className="flex h-screen">
                <Sidebar />
                <div className="flex-1">{children}</div>
            </div>
        </AuthGuard>
    );
}
