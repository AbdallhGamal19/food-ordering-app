import cloudinary from "@/lib/cloudinary";
import { NextResponse } from "next/server";

type FormDataFile = Blob & {
  name?: string;
};

export async function POST(request: Request) {
  console.log("UPLOAD API HIT ✅");
  try {
    const formData = await request.formData();
    const file = formData.get("file") as FormDataFile | null;
    const pathName = formData.get("pathName") as string;

    if (!file) {
      return NextResponse.json({ error: "No file provided" }, { status: 400 });
    }

    if (!pathName) {
      return NextResponse.json({ error: "Missing pathName" }, { status: 400 });
    }

    const fileBuffer = await file.arrayBuffer();
    const base64File = Buffer.from(fileBuffer).toString("base64");

    let uploadResponse;
    try {
      uploadResponse = await cloudinary.uploader.upload(
        `data:${file.type};base64,${base64File}`,
        {
          folder: pathName,
          transformation: [
            { width: 200, height: 200, crop: "fill", gravity: "face" },
          ],
        }
      );
    } catch (uploadError) {
      console.error("Cloudinary upload failed:", uploadError);
      return NextResponse.json(
        { error: "Failed to upload image to Cloudinary" },
        { status: 500 }
      );
    }

    return NextResponse.json({ url: uploadResponse.secure_url });
  } catch (error) {
    console.error("Error uploading file:", error);
    return NextResponse.json(
      { error: "Failed to upload image" },
      { status: 500 }
    );
  }
}
