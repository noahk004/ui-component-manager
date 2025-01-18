import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

async function main() {
    // Create Tags
    const tag1 = await prisma.tag.create({ data: { name: "JavaScript" } });
    const tag2 = await prisma.tag.create({ data: { name: "React" } });
    const tag3 = await prisma.tag.create({ data: { name: "CSS" } });

    // Create Users
    const user1 = await prisma.user.create({
        data: {
            username: "user1",
            email: "user1@example.com",
            password: "hashedpassword1",
            salt: "salt1",
            profileImage: null,
        },
    });

    const user2 = await prisma.user.create({
        data: {
            username: "user2",
            email: "user2@example.com",
            password: "hashedpassword2",
            salt: "salt2",
            profileImage: null,
        },
    });

    // Create Components
    const component1 = await prisma.component.create({
        data: {
            title: "React Button",
            description: "A reusable React button component.",
            type: "UI",
            codeSource: "<button>Click Me</button>",
            isPrivate: false,
            userId: user1.id,
            componentTags: {
                create: [{ tagId: tag1.id }, { tagId: tag2.id }],
            },
        },
    });

    const component2 = await prisma.component.create({
        data: {
            title: "CSS Grid",
            description: "A template for a CSS grid layout.",
            type: "Layout",
            codeSource: ".grid { display: grid; }",
            isPrivate: false,
            userId: user2.id,
            componentTags: {
                create: [{ tagId: tag3.id }],
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
