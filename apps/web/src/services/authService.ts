import { LoginCredentials, SignupCredentials } from "../types/authTypes";
import { getPath } from "../utils/routes";

export async function login(data: LoginCredentials): Promise<void | Response> {
    try {
        const path = getPath("auth", "login");

        const response = await fetch(path, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            credentials: "include",
            body: JSON.stringify(data),
        });

        return response;
    } catch (error) {
        console.error("Something went wrong while logging in:", error);
        return;
    }
}

export async function logout(): Promise<void | Response> {
    try {
        const path = getPath("auth", "logout");

        const response = await fetch(path, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            credentials: "include",
        });

        return response;
    } catch (error) {
        console.error("Something went wrong while logging out:", error);
        return;
    }
}

export async function signUp(
    data: SignupCredentials
): Promise<void | Response> {
    try {
        const path = getPath("auth", "signup");
        console.log("Sending signup request to:", path, "with data:", data);

        const response = await fetch(path, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            credentials: "include",
            body: JSON.stringify(data),
        });
        
        console.log("Signup response:", response.status);
        if (!response.ok) {
            const errorData = await response.json();
            console.error("Signup error:", errorData);
        }
        
        return response;
    } catch (error) {
        console.error("Something went wrong while signing up:", error);
        return;
    }
}
