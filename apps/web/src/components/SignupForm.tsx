"use client";

import { redirect } from "next/navigation";
import Link from "next/link";

import { useState } from "react";

import {
    Button,
    FieldError,
    Form,
    Input,
    Label,
    TextField,
    Group,
} from "react-aria-components";

import { signUp } from "../services/authService";
import { SignupCredentials } from "../types/authTypes";

const SignupForm = () => {
    const [errorMessage, setErrorMessage] = useState<string>("");

    const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        setErrorMessage("");

        const formData = Object.fromEntries(new FormData(e.currentTarget));

        // Separate passwordConfirmation and SignupCredentials object
        const { passwordConfirmation, ...data } = formData;

        if (formData.password !== passwordConfirmation) {
            setErrorMessage("Passwords do not match.");
            return;
        }

        const response = await signUp(data as unknown as SignupCredentials);

        if (!response) {
            setErrorMessage("Unknown error. Please try again later.");
            return;
        }

        if (response.ok) {
            redirect("/login");
        } else if (response.status === 400) {
            setErrorMessage("Email or username already in use.");
        } else if (response.status === 500) {
            setErrorMessage("Internal server error. Please try again later.");
        } else {
            setErrorMessage("Unknown error. Please try again later.");
        }
    };

    return (
        <Form
            onSubmit={onSubmit}
            className="px-6 max-w-80 ring-[.5px] ring-foreground rounded-xl pt-6 pb-4 animate-in fade-in duration-500"
        >
            <h1 className="text-2xl mb-2">Create Account</h1>

            <Group className="flex flex-col gap-3 mb-1 font-light">
                <TextField name="email" isRequired className="flex flex-col">
                    <Label>Email</Label>
                    <Input className="ring-[.5px] ring-foreground rounded-md p-2" />
                    <FieldError className="text-red-500">
                        Email missing or invalid.
                    </FieldError>
                </TextField>

                <TextField name="username" isRequired className="flex flex-col">
                    <Label>Username</Label>
                    <Input className="ring-[.5px] ring-foreground rounded-md p-2" />
                    <FieldError className="text-red-500">
                        Username missing or invalid.
                    </FieldError>
                </TextField>

                <TextField
                    name="password"
                    type="password"
                    isRequired
                    className="flex flex-col"
                >
                    <Label>Password</Label>
                    <Input className="ring-[.5px] ring-foreground rounded-md p-2" />
                    <FieldError className="text-red-500">
                        Password missing or invalid.
                    </FieldError>
                </TextField>

                <TextField
                    name="passwordConfirmation"
                    type="password"
                    isRequired
                    className="flex flex-col"
                >
                    <Label>Confirm Password</Label>
                    <Input className="ring-[.5px] ring-foreground rounded-md p-2" />
                    <FieldError className="text-red-500">
                        Password confirmation missing.
                    </FieldError>
                </TextField>

                <p className="text-red-500">{errorMessage}</p>
            </Group>
            <Link
                href="/login"
                className="font-light text-sky-400 hover:text-sky-500 underline underline-offset-2"
            >
                Already have an account? Sign in.
            </Link>
            <Button
                type="submit"
                className="bg-foreground text-background rounded-md py-1 px-3 font-light mt-3"
            >
                Submit
            </Button>
        </Form>
    );
};

export default SignupForm;
