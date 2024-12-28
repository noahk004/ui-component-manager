import {
    S3Client,
    GetObjectCommand,
    DeleteObjectCommand,
} from "@aws-sdk/client-s3";
import { getSignedUrl } from "@aws-sdk/s3-request-presigner";

require("dotenv").config();

/**
 * Get a pre-signed URL for an object in S3.
 * @param key - The key (path) of the object in the bucket.
 * @param expiresIn - URL expiration time in seconds (default is 3600 seconds or 1 hour).
 * @returns A pre-signed URL string.
 */
export const getOnePresigned = async (
    key: string,
    expiresIn: number = 3600
): Promise<string> => {
    // Initialize the S3 client
    const client = new S3Client({
        region: process.env.AWS_S3_REGION,
        credentials: {
            accessKeyId: process.env.AWS_S3_ACCESS_KEY!,
            secretAccessKey: process.env.AWS_S3_SECRET_KEY!,
        },
    });

    try {
        // Create the command for the object
        const command = new GetObjectCommand({
            Bucket: process.env.AWS_S3_BUCKET,
            Key: key,
        });

        // Generate the signed URL
        const signedUrl = await getSignedUrl(client, command, { expiresIn });

        return signedUrl;
    } catch (error) {
        console.error("Error generating presigned URL:", error);
        throw error;
    }
};

/**
 * Delete a given object in S3.
 * @param key - The key (path) of the object in the bucket.
 */
export const deleteOne = async (key: string): Promise<void> => {
    // Initialize the S3 client
    const client = new S3Client({
        region: process.env.AWS_S3_REGION,
        credentials: {
            accessKeyId: process.env.AWS_S3_ACCESS_KEY!,
            secretAccessKey: process.env.AWS_S3_SECRET_KEY!,
        },
    });

    try {
        // Create the command for the object
        const command = new DeleteObjectCommand({
            Bucket: process.env.AWS_S3_BUCKET,
            Key: key,
        });

        await client.send(command);

    } catch (error) {
        console.error("Error generating presigned URL:", error);
        throw error;
    }
};
