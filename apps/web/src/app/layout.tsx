import { Analytics } from "@vercel/analytics/next";
import { Anek_Latin } from 'next/font/google'

import "./globals.css";

const anek = Anek_Latin({ subsets: ['latin'] })

export const metadata = {
    title: "UICM",
    description: "An online platform for users to share and download UI components made by the community.",
};

export default function RootLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <html lang="en">
            <body className={anek.className}>
                {children}
                <Analytics />
            </body>
        </html>
    );
}
