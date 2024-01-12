import {
  GetObjectCommand,
  S3Client,
  PutObjectCommand,
} from "@aws-sdk/client-s3";
import { getSignedUrl } from "@aws-sdk/s3-request-presigner";

const s3Client = new S3Client({
  region: "ap-south-1",
  credentials: {
    // accessKeyId: process.env.AWS_S3_bUCKET_USER_ACCESS_KEY,
    // secretAccessKey: process.env.AWS_S3_bUCKET_USER_SECRET_KEY,
    accessKeyId: "AKIAYO4SVNT4QBZWK5K6",
    secretAccessKey: "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",
  },
});

async function getS3ObjectURL(key) {
  const command = new GetObjectCommand({
    // Bucket: process.env.AWS_BUCKET_NAME,
    Bucket: "bucket.yt-backend-mern",
    Key: key,
  });

  const url = await getSignedUrl(s3Client, command);
  return url;
}

async function putObject(fileName, contentType) {
  const command = new PutObjectCommand({
    Bucket: "bucket.yt-backend-mern",
    Key: `uploads/user-uploads/${fileName}`,
    ContentType: contentType,
  });

  const url = await getSignedUrl(s3Client, command);
  return url;
}

async function init() {
  console.log(
    "Url for lambo urus :------> ",
    await getS3ObjectURL("uploads/user-uploads/video-1703660386091.mp4")
  );
  // console.log(
  //   "Url for Uploading :------> ",
  //   await putObject(`video-${Date.now()}.mp4`, "video/mp4")
  // );
}

init();
