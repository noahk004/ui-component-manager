import { Router, Request, Response } from "express";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import prisma from "../lib/prisma";

const authRouter = Router();

authRouter.post("/login", async (req: Request, res: Response) => {
    try {
        const { username, password } = req.body;

        if (!username || !password) {
            res.status(400).json({
                error: "Username and password are required",
            });
            return;
        }

        const user = await prisma.user.findUnique({
            where: { username },
        });

        if (!user) {
            res.status(401).json({ error: "Invalid credentials" });
            return;
        }

        const isValidPassword = await bcrypt.compare(password, user.password);

        if (!isValidPassword) {
            res.status(401).json({ error: "Invalid credentials" });
            return;
        }

        const token = jwt.sign(
            { userId: user.id, username: user.username },
            process.env.JWT_SECRET!,
            { expiresIn: "24h" }
        );

        res.cookie("token", token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
            sameSite: "none",
            maxAge: 24 * 60 * 60 * 1000,
        });

        res.json({
            message: "Login successful",
        });
    } catch (error) {
        console.error("Login error:", error);
        res.status(500).json({ error: "Internal server error" });
    }
});

authRouter.post("/signup", async (req: Request, res: Response) => {
    try {
        const { email, username, password } = req.body;

        if (!email || !username || !password) {
            res.status(400).json({ error: "All fields are required" });
            return;
        }

        const existingUser = await prisma.user.findFirst({
            where: {
                OR: [{ email }, { username }],
            },
        });

        if (existingUser) {
            res.status(400).json({
                error:
                    existingUser.email === email
                        ? "Email already in use"
                        : "Username already taken",
            });
            return;
        }

        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        const user = await prisma.user.create({
            data: {
                email,
                username,
                password: hashedPassword,
                salt,
            },
        });

        res.status(201).json({
            message: "User created successfully",
            user: {
                id: user.id,
                username: user.username,
                email: user.email,
            },
        });
    } catch (error) {
        console.error("Signup error:", error);
        res.status(500).json({ error: "Internal server error" });
    }
});

export default authRouter;
