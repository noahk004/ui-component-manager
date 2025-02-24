"use client";

import { Form, TextField, Input, Button } from "react-aria-components";

import { getComponents } from "../services/dataService";
import { SearchBarProps } from "../types/props";

const SearchBar = ({
    tags,
    searchTerm,
    setSearchTerm,
    setComponentData,
}: SearchBarProps) => {
    const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        const tagString = Array.from(tags).join(",");

        const response = await getComponents({
            search: searchTerm,
            tags: tagString,
            limit: "30",
        });

        if (response === null) {
            // TODO: Do some error
            return;
        }
        const newComponentData = await response.json();

        setComponentData(newComponentData);
    };

    return (
        <Form onSubmit={onSubmit} className="flex justify-between gap-4 mb-3">
            <TextField
                name="search"
                className="w-full"
                aria-label="Search components"
            >
                <Input
                    placeholder="Search components..."
                    onChange={(e) => setSearchTerm(e.target.value)}
                    value={searchTerm}
                    className="ring-1 ring-foreground w-full px-4 py-2 rounded-lg"
                />
            </TextField>
            <Button
                type="submit"
                className="rounded-lg bg-foreground text-background px-5"
            >
                Search
            </Button>
        </Form>
    );

    return (
        <div className="flex space-x-8 mt-6">
            <input
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder="Search"
                className="flex-1 px-8 py-4 text-xl bg-gray-200 rounded-2xl placeholder:text-black"
            />
            <button
                onClick={() => console.log("Submitted search:", searchTerm)}
                className="bg-gray-200 px-10 text-xl py-4 rounded-2xl"
            >
                Submit
            </button>
        </div>
    );
};

export default SearchBar;
