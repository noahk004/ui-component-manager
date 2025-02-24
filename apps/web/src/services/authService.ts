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

export async function signUp(
    data: SignupCredentials
): Promise<void | Response> {
    try {
        const path = getPath("auth", "signup");

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
        console.error("Something went wrong while signing up:", error);
        return;
    }
}
