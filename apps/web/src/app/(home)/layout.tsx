"use client";

import Sidebar from "@/src/components/Sidebar";
import ProtectedRoute from "@/src/components/ProtectedRoute";

export default function HomeLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <ProtectedRoute>
            <div className="flex h-screen">
                <Sidebar />
                <div className="flex-1">{children}</div>
            </div>
        </ProtectedRoute>
    );
}
