import request from "supertest";
import { app } from "../../src/app";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

beforeAll(async () => {
    await prisma.$connect();
});

afterAll(async () => {
    await prisma.$disconnect();
});

jest.mock("@prisma/client", () => {
    const mPrismaClient = {
        user: {
            findUnique: jest.fn(),
            findFirst: jest.fn(),
            create: jest.fn(),
        },
        $connect: jest.fn(),
        $disconnect: jest.fn(),
    };
    return {
        PrismaClient: jest.fn(() => mPrismaClient),
    };
});

jest.mock("bcrypt", () => ({
    compare: jest.fn(),
    genSalt: jest.fn(),
    hash: jest.fn(),
}));

jest.mock("jsonwebtoken", () => ({
    sign: jest.fn(),
}));

describe("POST /api/auth/login", () => {
    afterEach(() => {
        jest.clearAllMocks();
    });

    it("should return 400 if username or password is missing", async () => {
        const response = await request(app).post("/api/auth/login").send({});
        expect(response.status).toBe(400);
        expect(response.body.error).toBe("Username and password are required");
    });

    it("should return 401 if the user is not found", async () => {
        (prisma.user.findUnique as jest.Mock).mockResolvedValue(null);

        const response = await request(app)
            .post("/api/auth/login")
            .send({ username: "testuser", password: "password123" });

        expect(response.status).toBe(401);
        expect(response.body.error).toBe("Invalid credentials");
    });

    it("should return 401 if the password is invalid", async () => {
        (prisma.user.findUnique as jest.Mock).mockResolvedValue({
            id: 1,
            username: "testuser",
            password: "hashedPassword",
        });

        (bcrypt.compare as jest.Mock).mockResolvedValue(false);

        const response = await request(app)
            .post("/api/auth/login")
            .send({ username: "testuser", password: "password123" });

        expect(response.status).toBe(401);
        expect(response.body.error).toBe("Invalid credentials");
    });

    it("should return 200 and set a token if the login is successful", async () => {
        (prisma.user.findUnique as jest.Mock).mockResolvedValue({
            id: 1,
            username: "testuser",
            password: "hashedPassword",
        });

        (bcrypt.compare as jest.Mock).mockResolvedValue(true);
        (jwt.sign as jest.Mock).mockReturnValue("mockToken");

        const response = await request(app)
            .post("/api/auth/login")
            .send({ username: "testuser", password: "password123" });

        expect(response.status).toBe(200);
        expect(response.body.message).toBe("Login successful");
        expect(response.headers["set-cookie"]).toBeDefined();
    });
});

describe("POST /api/auth/signup", () => {
    afterEach(() => {
        jest.clearAllMocks();
    });

    it("should return 400 if required fields are missing", async () => {
        const response = await request(app).post("/api/auth/signup").send({});
        expect(response.status).toBe(400);
        expect(response.body.error).toBe("All fields are required");
    });

    it("should return 400 if email is already in use", async () => {
        (prisma.user.findFirst as jest.Mock).mockResolvedValue({
            email: "test@example.com",
        });

        const response = await request(app).post("/api/auth/signup").send({
            email: "test@example.com",
            username: "testuser",
            password: "password123",
        });

        expect(response.status).toBe(400);
        expect(response.body.error).toBe("Email already in use");
    });

    it("should return 400 if username is already taken", async () => {
        (prisma.user.findFirst as jest.Mock).mockResolvedValue({
            username: "testuser",
        });

        const response = await request(app).post("/api/auth/signup").send({
            email: "unique@example.com",
            username: "testuser",
            password: "password123",
        });

        expect(response.status).toBe(400);
        expect(response.body.error).toBe("Username already taken");
    });

    it("should return 201 and create a new user if data is valid", async () => {
        (prisma.user.findFirst as jest.Mock).mockResolvedValue(null);
        (bcrypt.genSalt as jest.Mock).mockResolvedValue("mockSalt");
        (bcrypt.hash as jest.Mock).mockResolvedValue("mockHashedPassword");
        (prisma.user.create as jest.Mock).mockResolvedValue({
            id: 1,
            email: "newuser@example.com",
            username: "newuser",
            password: "mockHashedPassword",
            salt: "mockSalt",
        });

        const response = await request(app).post("/api/auth/signup").send({
            email: "newuser@example.com",
            username: "newuser",
            password: "password123",
        });

        expect(response.status).toBe(201);
        expect(response.body.message).toBe("User created successfully");
        expect(response.body.user).toEqual({
            id: 1,
            email: "newuser@example.com",
            username: "newuser",
        });
    });

    it("should return 500 if there is a server error", async () => {
        (prisma.user.findFirst as jest.Mock).mockImplementation(() => {
            throw new Error("Database error");
        });

        const response = await request(app).post("/api/auth/signup").send({
            email: "newuser@example.com",
            username: "newuser",
            password: "password123",
        });

        expect(response.status).toBe(500);
        expect(response.body.error).toBe("Internal server error");
    });
});
