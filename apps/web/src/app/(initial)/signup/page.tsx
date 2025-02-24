import SignupForm from "@/src/components/SignupForm";
import TopBar from "@/src/components/TopBar";

import Link from "next/link";

const Signup = () => {
    return (
        <div className="w-full h-full flex flex-col items-center">
            <TopBar />
            <h1 className="text-4xl mb-8 mt-20">
                <Link href="/">UICM</Link>
            </h1>
            <SignupForm />
        </div>
    );
};

export default Signup;
