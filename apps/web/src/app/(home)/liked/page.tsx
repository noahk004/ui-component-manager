import React from "react";
import Link from "next/link";
import { Plus } from "lucide-react";
import ComponentCard from "@/src/components/ComponentCard";

const Liked = () => {
    return (
        <div className="flex flex-col h-screen p-8">
            <div className="flex justify-between mt-6 ml-1">
                <h1 className="text-3xl font-bold">Liked components</h1>
                <Link
                    href="/create"
                    className="flex items-center gap-1 bg-gray-200 px-4 py-2"
                >
                    {" "}
                    {/* why is this button here??? */}
                    <Plus className="h-4 w-4" /> new component
                </Link>
            </div>
            {/* maybe add filtering here? */}

            <div className="grid grid-cols-3 gap-4 mt-8">
                {[...Array(12)].map((_, i) => (
                    <ComponentCard
                        key={i}
                        title="My Awesome Button"
                        type="Button"
                        description="This is the button description. I'm describing what the button is. or not."
                        username="@somerandomuser"
                        likes={293}
                        downloads={293}
                        href="/view"
                    />
                ))}
            </div>

            {/*TODO: add pagination*/}
        </div>
    );
};

export default Liked;
