import Sidebar from "@/src/components/Sidebar";

import "../../globals.css"

export default function HomeLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <div className="flex h-screen">
            <Sidebar />
            <div className="flex-1 ms-64">{children}</div>
        </div>
    );
}
