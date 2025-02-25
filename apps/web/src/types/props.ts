import { Dispatch, SetStateAction } from "react";
import { Selection } from "react-aria-components";

import { ComponentData } from "./types";
import { JwtPayload } from "jsonwebtoken";

export interface SearchBarProps {
    tags: Selection;
    searchTerm: string;
    setSearchTerm: Dispatch<SetStateAction<string>>;
    setComponentData: Dispatch<SetStateAction<ComponentData>>;
}

export interface PaginationProps {
    searchTerm: string;
    tags: Selection;
    setComponentData: Dispatch<SetStateAction<ComponentData>>;
    currentPage: number;
    totalPages: number;
}

export interface TagSelectorProps {
    allTags: Selection;
    selectedTags: Selection;
    setSelectedTags: Dispatch<SetStateAction<Selection>>;
}

export interface ComponentCardProps {
    id: number;
    title: string;
    type: string;
    description: string;
    username: string;
    likes: number;
    downloads: number;
}

export interface DashboardProps {
    allTags: Selection;
    initialComponentData: ComponentData;
}

export interface SidebarProps {
    user: null | JwtPayload;
}
