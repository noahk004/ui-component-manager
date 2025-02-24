"use client";

import Link from "next/link";
import { Heart, Download } from "lucide-react";

import { ComponentCardProps } from "../types/props";

export default function ComponentCard({
    id,
    title,
    type,
    description,
    username,
    likes,
    downloads,
}: ComponentCardProps) {
    const href = `/components/${id}`;

    return (
        <Link
            href={href}
            className="px-5 py-4 border-[1px] border-foreground rounded-lg"
        >
            <h3 className="text-xl font-bold">{title}</h3>
            <p className="text-sm">{type}</p>
            <p className="text-sm mt-2">{description}</p>
            <div className="flex items-center justify-between text-sm mt-2">
                <p>@{username}</p>
                <div className="flex space-x-4">
                    <span className="flex items-center gap-1">
                        <Heart className="h-3 w-3" /> {likes}
                    </span>
                    <span className="flex items-center gap-1">
                        <Download className="h-3 w-3" /> {downloads}
                    </span>
                </div>
            </div>
        </Link>
    );
}
