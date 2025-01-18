import { PrismaClient } from "@prisma/client";

import bcrypt from "bcrypt";

const prisma = new PrismaClient();

async function main() {
    // Create Tags
    const tag1 = await prisma.tag.create({ data: { name: "Button" } });
    const tag2 = await prisma.tag.create({ data: { name: "Sleek" } });
    const tag3 = await prisma.tag.create({ data: { name: "Modal" } });

    const salt1 = await bcrypt.genSalt(10);
    const salt2 = await bcrypt.genSalt(10);
    const hash1 = await bcrypt.hash("password", salt1);
    const hash2 = await bcrypt.hash("password", salt2);

    // Create Users
    const user1 = await prisma.user.create({
        data: {
            username: "user1",
            email: "user1@example.com",
            password: hash1,
            salt: salt1,
            profileImage: null,
        },
    });

    const user2 = await prisma.user.create({
        data: {
            username: "user2",
            email: "user2@example.com",
            password: hash2,
            salt: salt2,
            profileImage: null,
        },
    });

    // Create Components
    const component1id = 1;
    const component1 = await prisma.component.create({
        data: {
            id: component1id,
            title: "React Button",
            description: "A reusable React button component.",
            codeSource: `dev/code-modules/users/${user1.username}/${component1id}/Button.tsx`,
            isPrivate: false,
            userId: user1.id,
            componentTags: {
                create: [{ tagId: tag1.id }, { tagId: tag2.id }],
            },
        },
    });

    const component2id = 2;
    const component2 = await prisma.component.create({
        data: {
            id: component2id,
            title: "React Modal",
            description: "A simple modal using React.",
            codeSource: `dev/code-modules/users/${user2.username}/${component2id}/Button.tsx`,
            isPrivate: false,
            userId: user2.id,
            componentTags: {
                create: [{ tagId: tag2.id }, { tagId: tag3.id }],
            },
        },
    });

    // Create Likes
    await prisma.like.create({
        data: {
            userId: user1.id,
            componentId: component2.id,
        },
    });

    await prisma.like.create({
        data: {
            userId: user2.id,
            componentId: component1.id,
        },
    });

    // Create Downloads
    await prisma.download.create({
        data: {
            userId: user1.id,
            componentId: component2.id,
        },
    });

    await prisma.download.create({
        data: {
            userId: user2.id,
            componentId: component1.id,
        },
    });

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
