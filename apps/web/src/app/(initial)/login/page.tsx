"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter } from 'next/navigation';
import { isAuthenticated } from '../../../utils/auth';

const Login = () => {
    const router = useRouter();

    useEffect(() => {
        if (isAuthenticated()) {
            router.push('/dashboard');
        }
    }, [router]);

    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");

    const handleSubmit = async (e: React.MouseEvent<HTMLButtonElement>) => {
        e.preventDefault();
        setError("");

        if (!username || !password) {
            setError("All fields are required");
            return;
        }

        try {
            const response = await fetch("http://localhost:5000/login", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ username, password }),
            });

            const data = await response.json();

            if (!response.ok) {
                setError(data.error);
                return;
            }

            localStorage.setItem('token', data.token);
            localStorage.setItem('user', JSON.stringify(data.user));

            router.push('/dashboard');

        } catch (error) {
            console.error('Error:', error);
            setError('Failed to connect to server');
        }
    };

    return (
        <div className="flex h-screen w-screen justify-center items-center">
            <div className="flex justify-center items-center w-1/2 h-full bg-gray-300">
                some cool image or design
            </div>
            {/*different left margins to align text cuz default padding is wack*/}
            <div className="flex justify-center items-center w-1/2 h-full">
                <div className="flex flex-col w-[70%] bg-gray-300 px-12 py-16">
                    <h1 className="text-3xl font-bold mt-10">Log In</h1>
                    <p className="text-sm mt-8 ml-1">Username</p>
                    <input
                        type="text"
                        className="w-full h-14 p-2 mt-2 ml-1"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                    />
                    <p className="text-sm mt-8 ml-1">Password</p>
                    <input
                        type="password"
                        className="w-full h-14 p-2 mt-2 ml-1"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />
                    <Link
                        href="/signup"
                        className="text-sm mt-4 ml-2 underline"
                    >
                        Dont have an account? Create one here!
                    </Link>
                    <Link
                        href="/login/resetpassword"
                        className="text-sm mt-2 ml-2 underline"
                    >
                        Forgot password?
                    </Link>
                    <div className="flex flex-row mt-4 w-2/3 h-10 space-x-4 ml-auto">

                        <button className="w-1/2 h-full bg-white text-sm hover:bg-gray-200">
                            Cancel
                        </button>

                        <button
                            onClick={handleSubmit}
                            className="w-full h-full bg-white text-sm hover:bg-gray-200"
                        >
                            Submit
                        </button>
                    </div>
                    {error && <p className="text-red-500 text-sm mt-2 ml-auto mr-2">{error}</p>}
                </div>
            </div>
        </div>
    );
};

export default Login;
