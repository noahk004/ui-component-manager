import request from "supertest";
import { app } from "../../src/app";
import { fetchComponents, fetchComponentById } from "../../src/lib/data";

jest.mock("../../src/lib/data"); // Mock the fetch function

const mockFetchComponents = fetchComponents as jest.Mock;

const mockFetchComponentById = fetchComponentById as jest.Mock;

describe("GET /api/components", () => {
    afterEach(() => {
        jest.clearAllMocks();
    });

    it("returns 200 and a list of components", async () => {
        const mockComponents = [
            {
                id: 1,
                title: "Component 1",
                likes: [],
                downloads: [],
                componentTags: [],
                user: { id: 1, username: "testuser1" },
            },
            {
                id: 2,
                title: "Component 2",
                likes: [],
                downloads: [],
                componentTags: [],
                user: { id: 2, username: "testuser2" },
            },
        ];

        mockFetchComponents.mockResolvedValue(mockComponents);

        const response = await request(app).get("/api/components");
        expect(response.status).toBe(200);
        expect(response.body).toEqual(mockComponents);
    });

    it("returns 500 on server error", async () => {
        mockFetchComponents.mockImplementation(() => {
            throw new Error("Database error");
        });

        const response = await request(app).get("/api/components");
        expect(response.status).toBe(500);
        expect(response.body).toEqual({ error: "Internal server error" });
    });
});

describe("GET /api/components/:id", () => {
    afterEach(() => {
        jest.clearAllMocks();
    });

    it("returns 400 for invalid component ID", async () => {
        const response = await request(app).get("/api/components/invalid-id");
        expect(response.status).toBe(400);
        expect(response.body).toEqual({ error: "Invalid component ID" });
    });

    it("returns 404 if the component is not found", async () => {
        mockFetchComponentById.mockResolvedValue(null);

        const response = await request(app).get("/api/components/999");
        expect(response.status).toBe(404);
        expect(response.body).toEqual({ error: "Component not found" });
    });

    it("returns 200 and the component for a valid ID", async () => {
        const mockComponent = {
            id: 1,
            title: "Sample Component",
            likes: [],
            downloads: [],
            componentTags: [],
            user: { id: 1, username: "testuser" },
        };

        mockFetchComponentById.mockResolvedValue(mockComponent);

        const response = await request(app).get("/api/components/1");
        expect(response.status).toBe(200);
        expect(response.body).toEqual(mockComponent);
    });

    it("returns 500 on server error", async () => {
        mockFetchComponentById.mockImplementation(() => {
            throw new Error("Database error");
        });

        const response = await request(app).get("/api/components/1");
        expect(response.status).toBe(500);
        expect(response.body).toEqual({ error: "Internal server error." });
    });
});
