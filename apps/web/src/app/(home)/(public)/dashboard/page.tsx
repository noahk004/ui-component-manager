import Dashboard from "@/src/components/Dashboard";

import { getComponents, getTags } from "@/src/services/dataService";

const DashboardPage = async () => {
    const components = await getComponents({
        limit: "30",
    });
    const tags = await getTags();

    if (tags === null || components === null) {
        return (
            <div className="flex justify-center items-center h-full">
                Internal Server Error
            </div>
        );
    }

    const tagData = await tags.json();
    const componentData = await components.json();

    return <Dashboard allTags={tagData} initialComponentData={componentData} />;
};

export default DashboardPage;
