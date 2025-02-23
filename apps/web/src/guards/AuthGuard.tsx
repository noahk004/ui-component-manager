import { redirect } from "next/navigation";
import { cookies } from "next/headers";

export default async function AuthGuard({
    children,
}: {
    children: React.ReactNode;
}) {
    const cookieStore = await cookies();
    const token = cookieStore.get("token");

    if (!token) {
        redirect("/login");
    }

    return <>{children}</>;
}
