import { PrismaClient } from "@prisma/client";

export async function fetchComponentWithRelations(
    prisma: PrismaClient,
    componentId: number
) {
    const component = await prisma.component.findUnique({
        where: { id: componentId },
        include: {
            likes: {
                include: {
                    user: true, // Include the user who liked the component
                },
            },
            downloads: {
                include: {
                    user: true, // Include the user who downloaded the component
                },
            },
            componentTags: {
                include: {
                    tag: true, // Include the tags associated with the component
                },
            },
            user: true, // Include the user who owns the component
        },
    });

    return component;
}
