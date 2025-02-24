"use client";

import { Button } from "react-aria-components";

import { ChevronLeft, ChevronRight } from "lucide-react";

import { getComponents } from "../services/dataService";
import { PaginationProps } from "../types/props";

export default function Pagination({
    tags,
    searchTerm,
    setComponentData,
    currentPage,
    totalPages,
}: PaginationProps) {
    const pageNumbers = Array.from({ length: totalPages }, (_, i) => i + 1);

    const handleClick = async (page: number) => {
        const response = await getComponents({
            search: searchTerm,
            page: page.toString(),
            tags: Array.from(tags).join(","),
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
        totalPages > 0 && (
            <div className="flex gap-1 w-full justify-center pb-8">
                <Button
                    onPress={() => handleClick(currentPage - 1)}
                    isDisabled={currentPage === 1}
                >
                    <ChevronLeft strokeWidth={1} />
                </Button>
                {pageNumbers.map((page) => (
                    <Button
                        key={page}
                        onPress={() => handleClick(page)}
                        className={`p-1 ${currentPage === page && "underline underline-offset-2"}`}
                    >
                        {page}
                    </Button>
                ))}
                <Button
                    onPress={() => handleClick(currentPage + 1)}
                    isDisabled={currentPage === totalPages}
                >
                    <ChevronRight strokeWidth={1} />
                </Button>
            </div>
        )
    );
}
