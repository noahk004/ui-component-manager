import { getOne, uploadOne, deleteOne } from "../../src/lib/s3";

describe("S3 Module", () => {
    it("returns a valid presigned URL for an existing S3 object", async () => {
        let url = null;
        url = await getOne(
            "dev/profile-images/users/1877385915/1-intro-photo-final.jpg"
        );
        console.log(url);

        expect(url).not.toBe(null);
    });

    it("throws an error when trying to get a non-existent S3 object", async () => {
        await expect(
            getOne("dev/code-modules/users/001/001/somenonexistentobject.tsx")
        ).rejects.toThrow();
    });

    it("successfully uploads and retrieves text data from S3", async () => {
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

    it("successfully deletes an S3 object and ensures it no longer exists", async () => {
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
});
