import { PrismaClient, Component } from "@prisma/client";

import { uploadOne, deleteOne, getS3Path } from "./s3";

export async function fetchComponents(
    prisma: PrismaClient,
    search?: string,
    tags?: string[],
    page: number = 1, // ✅ Default to page 1
    limit: number = 10 // ✅ Default 10 items per page
) {
    const skip = (page - 1) * limit; // ✅ Calculate items to skip

    const components = await prisma.component.findMany({
        where: {
            AND: [
                search
                    ? {
                          OR: [
                              {
                                  title: {
                                      contains: search,
                                      mode: "insensitive",
                                  },
                              },
                              {
                                  alias: {
                                      contains: search,
                                      mode: "insensitive",
                                  },
                              },
                              {
                                  description: {
                                      contains: search,
                                      mode: "insensitive",
                                  },
                              },
                              {
                                  user: {
                                      username: {
                                          contains: search,
                                          mode: "insensitive",
                                      },
                                  },
                              },
                          ],
                      }
                    : {},
                tags && tags.length > 0
                    ? {
                          AND: tags.map((tagName) => ({
                              componentTags: {
                                  some: {
                                      tag: {
                                          name: tagName, // Search by name instead of ID
                                      },
                                  },
                              },
                          })),
                      }
                    : {},
            ],
        },

        select: {
            id: true,
            title: true,
            description: true,
            user: {
                select: {
                    id: true,
                    username: true,
                },
            },
            componentTags: {
                select: {
                    tag: {
                        select: {
                            id: true,
                            name: true,
                        },
                    },
                },
            },
            _count: {
                select: {
                    likes: true,
                    downloads: true,
                },
            },
        },

        skip, // Skip previous pages
        take: limit, // Limit results per page
    });

    // ✅ Get total count of components matching criteria
    const totalCount = await prisma.component.count({
        where: {
            AND: [
                search
                    ? {
                          OR: [
                              {
                                  title: {
                                      contains: search,
                                      mode: "insensitive",
                                  },
                              },
                              {
                                  alias: {
                                      contains: search,
                                      mode: "insensitive",
                                  },
                              },
                              {
                                  description: {
                                      contains: search,
                                      mode: "insensitive",
                                  },
                              },
                              {
                                  user: {
                                      username: {
                                          contains: search,
                                          mode: "insensitive",
                                      },
                                  },
                              },
                          ],
                      }
                    : {},
                tags && tags.length > 0
                    ? {
                          AND: tags.map((tagName) => ({
                              componentTags: {
                                  some: {
                                      tag: {
                                          name: tagName, 
                                      },
                                  },
                              },
                          })),
                      }
                    : {},
            ],
        },
    });

    return {
        components,
        pagination: {
            totalItems: totalCount,
            totalPages: Math.ceil(totalCount / limit),
            currentPage: page,
            itemsPerPage: limit,
        },
    };
}

export async function fetchComponentById(
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

export async function createComponent(
    prisma: PrismaClient,
    fileName: string,
    title: string,
    alias: string,
    tagIds: number[],
    fileBuffer: Buffer,
    isPrivate: boolean,
    userId: number,
    description?: string
) {
    let componentId: null | number = null;

    // Check if there are duplicate tags
    if (new Set(tagIds).size !== tagIds.length) {
        throw new Error("Duplicate tags in tagIds.");
    }

    try {
        // Create the component entry in the database
        const component = await prisma.component.create({
            data: {
                title,
                alias,
                description,
                codeSource: "", // Temporary placeholder
                isPrivate,
                userId,
            },
        });

        componentId = component.id; // Store in case of S3 error

        for (let tagId of tagIds) {
            await prisma.componentTag.create({
                data: {
                    componentId,
                    tagId,
                },
            });
        }

        // Generate the S3 file path including component ID
        const filePath = getS3Path(
            "code-modules",
            "users",
            String(userId),
            String(componentId),
            fileName
        );

        // Upload the file to S3
        await uploadOne(filePath, fileBuffer);

        // Update the component with the correct codeSource
        const updatedComponent = await prisma.component.update({
            where: { id: component.id },
            data: { codeSource: filePath },
        });

        return updatedComponent;
    } catch (error) {
        console.error("Error creating component:", error);

        // If prisma creation works and S3 creation fails, then delete the component.
        if (componentId) {
            await prisma.component.delete({
                where: { id: componentId },
            });
        }

        throw error;
    }
}

export async function deleteComponent(
    prisma: PrismaClient,
    component: Component
) {
    await deleteOne(component.codeSource);

    await prisma.component.deleteMany({
        where: { id: component.id },
    });
}

export async function getTags(prisma: PrismaClient) {
    const data = await prisma.tag.findMany({
        select: { name: true },
    });

    return data.map((tag) => tag.name);
}
