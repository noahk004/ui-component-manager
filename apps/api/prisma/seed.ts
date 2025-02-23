import { PrismaClient } from "@prisma/client";
import bcrypt from "bcrypt";

const prisma = new PrismaClient();

async function main() {
    console.log("Deleting existing data...");
    await prisma.download.deleteMany({});
    await prisma.like.deleteMany({});
    await prisma.componentTag.deleteMany({});
    await prisma.component.deleteMany({});
    await prisma.tag.deleteMany({});
    await prisma.user.deleteMany({});

    console.log("Creating tags...");
    const tags = await prisma.$transaction([
        prisma.tag.create({ data: { name: "Button" } }),
        prisma.tag.create({ data: { name: "Modal" } }),
        prisma.tag.create({ data: { name: "Card" } }),
        prisma.tag.create({ data: { name: "Input" } }),
        prisma.tag.create({ data: { name: "Navigation" } }),
        prisma.tag.create({ data: { name: "Dark Mode" } }),
        prisma.tag.create({ data: { name: "Sleek" } }),
        prisma.tag.create({ data: { name: "Utility" } }),
        prisma.tag.create({ data: { name: "Form" } }),
        prisma.tag.create({ data: { name: "UI" } }),
    ]);

    console.log("Creating users...");
    const users = await Promise.all(
        Array.from({ length: 200 }, async (_, i) => {
            const salt = await bcrypt.genSalt(10);
            const hash = await bcrypt.hash(`password${i + 1}`, salt);
            return prisma.user.create({
                data: {
                    username: `user${i + 1}`,
                    email: `user${i + 1}@example.com`,
                    password: hash,
                    salt,
                    profileImage: null,
                },
            });
        })
    );

    console.log("Creating components...");
    const components = await Promise.all(
        Array.from({ length: 200 }, async (_, i) => {
            const user = users[i % users.length]; // Assign components to different users
            const selectedTags = [tags[i % tags.length], tags[(i + 1) % tags.length]];
            return prisma.component.create({
                data: {
                    title: `Component ${i + 1}`,
                    alias: `comp${i + 1}`,
                    description: `A reusable component ${i + 1}.`,
                    codeSource: `dev/code-modules/users/${user.username}/${i + 1}/Component.tsx`,
                    isPrivate: false,
                    userId: user.id,
                    componentTags: {
                        create: selectedTags.map((tag) => ({ tagId: tag.id })),
                    },
                },
            });
        })
    );

    console.log("Creating likes...");
    await Promise.all(
        Array.from({ length: 100 }, async () => {
            const user = users[Math.floor(Math.random() * users.length)];
            const component = components[Math.floor(Math.random() * components.length)];
            return prisma.like.create({
                data: {
                    userId: user.id,
                    componentId: component.id,
                },
            });
        })
    );

    console.log("Creating downloads...");
    await Promise.all(
        Array.from({ length: 100 }, async () => {
            const user = users[Math.floor(Math.random() * users.length)];
            const component = components[Math.floor(Math.random() * components.length)];
            return prisma.download.create({
                data: {
                    userId: user.id,
                    componentId: component.id,
                },
            });
        })
    );

    console.log("Seeding completed!");
}

main()
    .then(async () => {
        await prisma.$disconnect();
    })
    .catch(async (e) => {
        console.error(e);
        await prisma.$disconnect();
        process.exit(1);
    });
