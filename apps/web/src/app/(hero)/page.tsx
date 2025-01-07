'use client';

import React from "react";
import { isAuthenticated } from '../../utils/auth';
import { useRouter } from 'next/navigation';


const Hero = () => {
    const router = useRouter();

    const handleClick = () => {
        if (isAuthenticated()) {
            router.push("/dashboard");
        } else {
            router.push("/login");
        }
    };
    return (
        <div className="flex flex-col w-screen h-screen justify-center items-center bg-gray-300">
            <p className="text-2xl font-bold">Hero</p>
            <button
                onClick={handleClick}
                className="mt-4 px-4 py-2 bg-white text-sm hover:bg-gray-200"
            >
                Log In
            </button>
        </div>
    );
};

export default Hero;
