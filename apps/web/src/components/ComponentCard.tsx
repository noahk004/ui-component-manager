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
            className="p-2 border-[1px] border-foreground rounded-lg"
        >
            <div className="w-full h-48 bg-[#2c2c2c] rounded-md mb-4 flex items-center justify-center">
                <button className="bg-white rounded-full text-black px-6 py-2"> Click Me</button>
            </div>
            <div className="pb-2 px-4">
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
            </div>
        </Link>
    );
}
