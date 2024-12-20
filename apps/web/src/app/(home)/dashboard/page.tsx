"use client";

import React from "react";
import { Filter } from "lucide-react";
import ComponentCard from "@/src/components/ComponentCard";
import FilterTag from "@/src/components/FilterTag";
import SearchBar from "@/src/components/SearchBar";

const Dashboard = () => {
  return (
    <div className="flex flex-col h-screen p-12">
      <h1 className="text-3xl font-bold mt-4">Find a component</h1>
      <SearchBar onSubmit={() => console.log("clicked")} />

      <div className="flex items-center justify-between mt-3 pr-2">
        <div className="flex space-x-2">
          <FilterTag
            label="Button"
            onRemove={() => console.log("Remove Button filter")}
          />
          <FilterTag
            label="Sleek"
            onRemove={() => console.log("Remove Sleek filter")}
          />
        </div>

        <div className="px-4 py-0.5 bg-gray-200 rounded-xl flex items-center text-sm">
          Filters <Filter className="ml-2 h-4 w-4" />
        </div>
      </div>

      <p className="my-4 ml-1">Displaying n out of n components</p>

      <div className="grid grid-cols-3 gap-4">
        {[...Array(9)].map((_, i) => (
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

      {/*TODO: add meaningful pagination*/}
      {/*TODO: figure out why pr-3 is needed for centering*/}
      <div className="flex justify-center space-x-4 my-auto pr-3 w-full mt-6">
        <button>1</button>
        <button>2</button>
        <button>3</button>
      </div>
    </div>
  );
};

export default Dashboard;
