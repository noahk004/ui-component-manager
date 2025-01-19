import request from "supertest";
import { app } from "../../src/app";
import { fetchComponentWithRelations } from "../../src/lib/data"; 

jest.mock("../../src/lib/data"); // Mock the fetch function

const mockFetchComponentWithRelations = fetchComponentWithRelations as jest.Mock;

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
        mockFetchComponentWithRelations.mockResolvedValue(null);

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

        mockFetchComponentWithRelations.mockResolvedValue(mockComponent);

        const response = await request(app).get("/api/components/1");
        expect(response.status).toBe(200);
        expect(response.body).toEqual(mockComponent);
    });

    it("returns 500 on server error", async () => {
        mockFetchComponentWithRelations.mockImplementation(() => {
            throw new Error("Database error");
        });

        const response = await request(app).get("/api/components/1");
        expect(response.status).toBe(500);
        expect(response.body).toEqual({ error: "Internal server error" });
    });
});
