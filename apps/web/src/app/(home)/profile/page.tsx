import React from "react";
import { Plus } from "lucide-react";
import Link from "next/link";
import ComponentCard from "@/src/components/ComponentCard";
import UserBanner from "@/src/components/UserBanner";

const Profile = () => {
  return (
    <div className="flex flex-col h-screen p-8">
      {" "}
      {/* maybe make padding consistent across pages */}
      <UserBanner
        username="@USERNAME"
        totalLikes={23193}
        totalDownloads={492102}
      />
      <div className="flex justify-between mt-10 ml-1">
        <h1 className="text-3xl font-bold">Your components</h1>
        <Link
          href="/create"
          className="flex items-center gap-1 bg-gray-200 px-4 py-2"
        >
          <Plus className="h-4 w-4" /> new component
        </Link>
      </div>
      <div className="grid grid-cols-3 gap-4 mt-8">
        {" "}
        {/* only 2 rows fit on my screen... */}
        {[...Array(6)].map((_, i) => (
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

export default Profile;
