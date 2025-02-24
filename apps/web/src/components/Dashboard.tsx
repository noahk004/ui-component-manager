"use client";

import { useState } from "react";

import ComponentCard from "@/src/components/ComponentCard";
import SearchBar from "@/src/components/SearchBar";
import Pagination from "@/src/components/Pagination";
import TagSelector from "@/src/components/TagSelector";

import { Selection } from "react-aria-components";

import { ComponentData } from "../types/types";
import { DashboardProps } from "../types/props";

const Dashboard = ({ allTags, initialComponentData }: DashboardProps) => {
    const [selectedTags, setSelectedTags] = useState<Selection>(new Set());
    const [searchTerm, setSearchTerm] = useState<string>("");
    const [componentData, setComponentData] =
        useState<ComponentData>(initialComponentData);

    return (
        <div className="flex flex-col h-screen p-20">
            <h1 className="text-3xl font-bold mb-4">Find a component</h1>

            <SearchBar
                tags={selectedTags}
                searchTerm={searchTerm}
                setSearchTerm={setSearchTerm}
                setComponentData={setComponentData}
            />

            <TagSelector
                allTags={allTags}
                selectedTags={selectedTags}
                setSelectedTags={setSelectedTags}
            />

            <p className="my-4 ml-1">
                Displaying {componentData.components.length} out of{" "}
                {componentData.pagination.totalItems} components
            </p>

            <div className="grid grid-cols-3 gap-4 mb-6">
                {componentData.components?.map((component) => (
                    <ComponentCard
                        key={component.id}
                        id={component.id}
                        title={component.title}
                        type={"Button"}
                        description={component.description}
                        username={component.user.username}
                        likes={component._count.likes}
                        downloads={component._count.downloads}
                    />
                ))}
            </div>

            <Pagination
                tags={selectedTags}
                searchTerm={searchTerm}
                setComponentData={setComponentData}
                currentPage={componentData.pagination.currentPage}
                totalPages={componentData.pagination.totalPages}
            />
        </div>
    );
};

export default Dashboard;
