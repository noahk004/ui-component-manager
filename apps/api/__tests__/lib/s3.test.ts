import { getOnePresigned } from "../../lib/s3";

test("get presigned url aws test", async () => {
    let url = null;

    url = await getOnePresigned(
        "profile-images/users/001/98511ee98a1930b8938e42caf0904d2d.jpg"
    );

    console.log(url);

    expect(url).not.toBe(null);
});
