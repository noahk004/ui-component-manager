"use client";

import { TagGroup, TagList, Tag } from "react-aria-components";

import { TagSelectorProps } from "../types/props";

export default function TagSelector({
    allTags,
    selectedTags,
    setSelectedTags,
}: TagSelectorProps) {
    return (
        <TagGroup
            selectedKeys={selectedTags}
            selectionMode="multiple"
            onSelectionChange={setSelectedTags}
            aria-label="Filter tags"
        >
            <TagList
                aria-label="Filter tags"
                className="flex gap-2 focus-visible:none"
            >
                {Array.from(allTags).map((item) => {
                    return (
                        <Tag
                            key={item}
                            id={item}
                            className="rounded-full ring-1 ring-foreground px-3 flex items-center selected:bg-gray-300"
                        >
                            {item}
                        </Tag>
                    );
                })}
            </TagList>
        </TagGroup>
    );
}
