import React from "react";
import Link from "next/link";

const HeroPage = () => {
    return (
        <div className="flex flex-col w-screen h-screen justify-center items-center">
            <h1 className="text-5xl mb-2">
                <Link href="/">UICM</Link>
            </h1>
            <h2 className="text-xl font-light mb-6">
                Build and import UI components. It’s that simple.
            </h2>
            <Link
                href="/dashboard"
                className="px-4 py-2 bg-foreground text-background rounded-md"
            >
                Get Started
            </Link>
        </div>
    );
};

export default HeroPage;
