import { getPath, getSearchParams } from "../utils/routes";

export async function getComponents(
    searchParams?: Record<string, string>
): Promise<null | Response> {
    try {
        const path = getPath("components");
        const params = getSearchParams(searchParams);

        const response = await fetch(`${path}?${params}`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
            },
            credentials: "include",
        });

        return response;
    } catch (error) {
        console.error("Something went wrong while fetching components:", error);
        return null;
    }
}

export async function getTags(): Promise<null | Response> {
    try {
        const path = getPath("tags");

        const response = await fetch(path, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
            },
            credentials: "include",
        });

        return response;
    } catch (error) {
        console.error("Something went wrong while fetching tags:", error);
        return null;
    }
}
