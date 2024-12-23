import React from "react";
import Link from "next/link";

const Hero = () => {
    return (
        <div className="flex flex-col w-screen h-screen justify-center items-center bg-gray-300">
            <p className="text-2xl font-bold">Hero</p>
            <Link
                href="/login"
                className="mt-4 px-4 py-2 bg-white text-sm hover:bg-gray-200"
            >
                Log In
            </Link>
        </div>
    );};

export default Hero;
