"use client";

import Link from "next/link";
import Image from "next/image";
import { usePathname, useRouter } from "next/navigation";
import clsx from "clsx";
import { Star, Layers3, Palette, LucideFileText, LucideType, LucideMap } from "lucide-react";


export default function Sidebar() {
    const pathname = usePathname();
    const router = useRouter();
    
    const uiFilters = ["Buttons", "Cards", "Headers", "Modals"]
    const formFilters = ["Input", "Select", "Checkbox"]

    return (
        <div className="w-64 flex flex-col fixed h-full border-r border-foreground">
            <h2 className="text-xl font-semibold ml-6 mt-6 mb-2">Categories</h2>
            <div className="flex gap-2 w-full pl-6 py-3 items-center hover:bg-white hover:text-black">
                <Star className="h-4 w-4" /> Favorites
            </div>
            <div className="flex gap-2 w-full pl-6 py-3 items-center hover:bg-white hover:text-black">
                <Layers3 className="h-4 w-4" /> All Components
            </div>
            <div className="flex gap-2 w-full pl-6 py-3 items-center hover:bg-white hover:text-black">
                <Palette className="h-4 w-4" /> UI Elements
            </div>
            {uiFilters.map((filter, index) => (
                <div 
                    key={`ui-filter-${index}`} 
                    className="flex gap-2 w-full pl-14 py-3 items-center hover:bg-white hover:text-black"
                >
                    {filter}
                </div>
            ))}
            <div className="flex gap-2 w-full pl-6 py-3 items-center hover:bg-white hover:text-black">
                <LucideFileText className="h-4 w-4" /> Forms
            </div>
            {formFilters.map((filter, index) => (
                <div 
                    key={`form-filter-${index}`} 
                    className="flex gap-2 w-full pl-14 py-3 items-center hover:bg-white hover:text-black"
                >
                    {filter}
                </div>
            ))}
            <div className="flex gap-2 w-full pl-6 py-3 items-center hover:bg-white hover:text-black">
                <LucideMap className="h-4 w-4" /> Layouts
            </div>
            <div className="flex gap-2 w-full pl-6 py-3 items-center hover:bg-white hover:text-black">
                <LucideType className="h-4 w-4" /> Typography
            </div>
        </div>
    );
}
