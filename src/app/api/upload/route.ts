import { Storage } from "@google-cloud/storage";
import { NextResponse } from "next/server";


const storage = new Storage({
  projectId: process.env.GOOGLE_CLOUD_PROJECT_ID,
  credentials: {
    client_email: process.env.GOOGLE_CLOUD_CLIENT_EMAIL,
    private_key: process.env.GOOGLE_CLOUD_PRIVATE_KEY?.replace(/\\n/g, "\n"),
  },
});

const bucketName = process.env.GCS_BUCKET_NAME as string;
 if (!bucketName) {
   throw new Error("GCS_BUCKET_NAME environment variable is not defined");
 }

export async function GET() {
  try {
    const [files] = await storage.bucket(bucketName).getFiles();

    const fileUrls = files.map(file => ({
      name: file.name,
      url: `https://storage.googleapis.com/${bucketName}/articles/${file.name}`,
    }));

    return NextResponse.json({ files: fileUrls }, { status: 200 });
  } catch (error) {
    console.error("Error fetching files:", error);
    return NextResponse.json({ error: "Failed to retrieve files" }, { status: 500 });
  }
}

export async function POST(req: Request) {
  try {
    const { imageUrl, newFileName } = await req.json();
    console.log("Received newFileName:", newFileName);
    const bucket = storage.bucket(bucketName);
    const filePath = `articles/${newFileName}`;

    console.log("Uploading to:",filePath)
    

    // Fetch image from URL
    const response = await fetch(imageUrl);
    if (!response.ok) throw new Error("Failed to fetch image from URL");
    const buffer = await response.arrayBuffer();
    const contentType = response.headers.get("content-type") || "image/jpeg"

      // Ensure the file extension matches the detected content type
      let fileExtension = "jpg"; // Default
      if (contentType.includes("png")) fileExtension = "png";
      if (contentType.includes("gif")) fileExtension = "gif";
      if (contentType.includes("webp")) fileExtension = "webp";

       // Rename the file properly
    const finalFileName = `${newFileName.split('.')[0]}.${fileExtension}`;
    const finalFilePath = `articles/${finalFileName}`;

    console.log("File uploaded successfully:", finalFilePath);
     // Upload image to Google Cloud Storage
     const file = bucket.file(finalFilePath);
     await file.save(Buffer.from(buffer), {
       metadata: { contentType },
     });

  
     return NextResponse.json({ newImageUrl: `https://storage.googleapis.com/${bucketName}/${finalFilePath}` }, { status: 200 });
  } catch (error) {
    console.error("Error uploading image:", error);
    return NextResponse.json({ error: "Failed to upload image" }, { status: 500 });
  }
}