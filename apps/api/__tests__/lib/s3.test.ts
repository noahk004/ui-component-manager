import { getOnePresigned } from "../../lib/s3";


test("get presigned url aws test", async () => {
    let url = null;
    url = await getOnePresigned("code-modules/users/001/001/Button.tsx");
    console.log(url);

    expect(url).not.toBe(null);
});
