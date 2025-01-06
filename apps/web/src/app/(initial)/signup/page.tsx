"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter } from 'next/navigation';
import { isAuthenticated } from '../../../utils/auth';

const Signup = () => {
    const router = useRouter();

    useEffect(() => {
        if (isAuthenticated()) {
            router.push('/dashboard');
        }
    }, [router]);

    const [email, setEmail] = useState("");
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [error, setError] = useState("");

    const handleSubmit = async (e: React.MouseEvent<HTMLButtonElement>) => {
        e.preventDefault();
        setError("");

        if (!email || !username || !password || !confirmPassword) {
            setError("all fields are required");
            return;
        }

        if (password !== confirmPassword) {
            setError("passwords don't match");
            return;
        }

        if (password.length < 6) {
            setError("password must be at least 6 characters long");
            return;
        }

        try {
            const response = await fetch("http://localhost:5000/signup", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    email,
                    username,
                    password,
                }),
            });
    
            const data = await response.json();
    
            if (!response.ok) {
                setError(data.error);
                return;
            }
    
            router.push('/login');

        } catch (error) {
            console.error('error: ', error);
            setError('Failed to connect to server');
        }
        
    };

    return (
        <div className="flex h-screen w-screen justify-center items-center">
            <div className="flex justify-center items-center w-1/2 h-full bg-gray-300">
                some cool image or design
            </div>{" "}
            {/*different left margins to align text cuz default padding is wack*/}
            <div className="flex justify-center items-center w-1/2 h-full">
                <div className="flex flex-col w-[70%] bg-gray-300 px-12 pt-12 pb-6">
                    <h1 className="text-3xl font-bold">Create Account</h1>
                    <p className="text-sm mt-4 ml-1">Email</p>
                    <input
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        type="email"
                        className="w-full h-14 p-2 mt-2 ml-1"
                    />
                    <p className="text-sm mt-4 ml-1">Username</p>
                    <input
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        type="text"
                        className="w-full h-14 p-2 mt-2 ml-1"
                    />
                    <p className="text-sm mt-4 ml-1">Password</p>
                    <input
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        type="password"
                        className="w-full h-14 p-2 mt-2 ml-1"
                    />
                    <p className="text-sm mt-4 ml-1">Confirm Password</p>
                    <input
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                        type="password"
                        className="w-full h-14 p-2 mt-2 ml-1"
                    />
                    <Link href="/login" className="text-sm mt-4 ml-2 underline">
                        Already have an account? Sign in here!
                    </Link>
                    <div className="flex flex-row mt-4 w-2/3 h-10 space-x-4 ml-auto">
                        <button className="w-1/2 h-full bg-white text-sm hover:bg-gray-200">
                            Cancel
                        </button>{" "}
                        {/*What should this link to?*/}
                        <button
                            onClick={handleSubmit}
                            className="w-1/2 h-full bg-white text-sm hover:bg-gray-200"
                        >
                            Submit
                        </button>
                    </div>
                    {error && (
                        <div className="text-red-500 rounded relative mt-2 ml-auto">
                        {error}
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default Signup;
