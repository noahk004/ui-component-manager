export interface Tag {
    id: number;
    name: string;
}

export interface Component {
    id: number;
    title: string;
    description: string;
    user: {
        id: number;
        username: string;
    };
    componentTags: {
        tag: Tag;
    }[];
    _count: {
        likes: number;
        downloads: number;
    };
}

export interface Pagination {
    totalItems: number;
    totalPages: number;
    currentPage: number;
    itemsPerPage: number;
}

export interface ComponentData {
    components: Component[];
    pagination: Pagination;
}
