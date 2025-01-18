import { getOne, uploadOne, deleteOne } from "../../lib/s3";

test("getOnePresigned does not return null", async () => {
    let url = null;
    url = await getOne("dev/profile-images/users/1877385915/1-intro-photo-final.jpg");
    console.log(url);

    expect(url).not.toBe(null);
});

test("getting non-existent s3 object throws error", async () => {
    await expect(
        getOne("dev/code-modules/users/001/001/somenonexistentobject.tsx")
    ).rejects.toThrow();
});

test("upload test.txt module to s3", async () => {
    const url = "dev/code-modules/users/001/004/test.txt";
    await uploadOne(url, Buffer.from("Hello world!"));

    // Try getting the newly added data
    let textData = null;
    try {
        const presigned = await getOne(url);
        const response = await fetch(presigned);

        textData = await response.text();
    } catch (error) {
        console.log(`Something went wrong: ${error}`);
    }

    expect(textData).toBe("Hello world!");
});

test("deleting s3 objects", async () => {
    // Upload new test module
    const url = "dev/code-modules/users/001/005/test.txt";
    await uploadOne(url, Buffer.from("Hello world!"));

    // Try getting the newly added data
    let textData = null;
    try {
        const presigned = await getOne(url);
        const response = await fetch(presigned);

        textData = await response.text();
    } catch (error) {
        console.log(`Something went wrong: ${error}`);
    }

    // Delete newly added data
    await deleteOne(url);

    // Expect that the deleted url no longer exists
    await expect(getOne(url)).rejects.toThrow();
});
