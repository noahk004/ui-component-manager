export function getPath(...args: string[]) {
    let result = "";

    if (process.env.NEXT_PUBLIC_ENVIRONMENT === "DEVELOPMENT") {
        result += "http://localhost:5000";
    } else {
        result += "INSERTURLHERE";
    }

    result += "/api";

    for (const str of args) {
        result += `/${str}`;
    }

    return result;
}

export function getSearchParams(params: undefined | Record<string, string>): string {
    if (!params) {
        return "";
    }

    const searchParams = new URLSearchParams(params);
    return searchParams.toString();
}
