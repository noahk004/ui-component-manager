import { redirect } from "next/navigation";
import { cookies } from "next/headers";
import Link from "next/link";

import LoginForm from "@/src/components/LoginForm";
import TopBar from "@/src/components/TopBar";

const Login = async () => {
    const cookieStore = await cookies();

    const token = cookieStore.get("token");

    if (token) {
        redirect("/dashboard");
    }

    return (
        <div className="w-full h-full flex flex-col items-center">
            <TopBar />
            <h1 className="text-4xl mb-8 mt-20">
                <Link href="/">UICM</Link>
            </h1>
            <LoginForm />
        </div>
    );
};

export default Login;
