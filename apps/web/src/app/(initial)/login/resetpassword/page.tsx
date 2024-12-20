import React from "react";
import Link from "next/link";

const ResetPassword = () => {
    return (
        <div className="flex h-screen w-screen justify-center items-center">
            <div className="flex flex-col w-[35%] h-1/2 bg-gray-300 px-12 pt-12 pb-6">
                <h1 className="text-3xl font-bold mt-10">Reset Password</h1>
                <p className="text-sm mt-8 ml-1">Enter your account email</p>
                <input type="email" className="w-full h-14 p-2 mt-3 ml-1" />
                <Link href="/login" className="text-sm mt-4 ml-2 underline">
                    I remember my password
                </Link>
                <div className="flex flex-row mt-8 w-3/5 h-10 space-x-4 ml-auto">
                    <button className="w-1/2 h-full bg-white text-sm hover:bg-gray-200">
                        Cancel
                    </button>
                    <button className="w-1/2 h-full bg-white text-sm hover:bg-gray-200">
                        Submit
                    </button>{" "}
                    {/*Should this stay on the same page?*/}
                </div>
            </div>
        </div>
    );
};

export default ResetPassword;
