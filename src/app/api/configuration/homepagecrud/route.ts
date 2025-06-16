import fs from "node:fs";
import path from "node:path";
import { NextResponse } from "next/server";
import type { Configuration } from "@/app/types/configuration";

const filePath = path.join(
  process.cwd(),
  "src/app/data/homepage-crud/homepagecrud.json",
);

// **GET** START
const getArrayData = () => {
  try {
    const data = fs.readFileSync(filePath, "utf-8");
    return JSON.parse(data);
  } catch {
    return [];
  }
};

const saveData = (config: Configuration[]) => {
  fs.writeFileSync(filePath, JSON.stringify(config, null, 2));
};

export async function GET() {
  const datas = getArrayData();
  return NextResponse.json(datas);
}
// **GET** END

// **Edit** START
export async function PUT(req: Request) {
  try {
    const formData = await req.formData();

    // Fetch the pricing and banner data from the form
    const updatedPricing = JSON.parse(
      formData.get("price")?.toString() || "[]",
    );
    const updatedBanner = JSON.parse(
      formData.get("banner")?.toString() || "[]",
    );
    const updatedTravelAndMeet = JSON.parse(
      formData.get("travelAndMeet")?.toString() || "[]",
    );
    const updatedExecutivePlan = JSON.parse(
      formData.get("executivePlan")?.toString() || "[]",
    );
    const updatedTestimonial = JSON.parse(
      formData.get("testimonial")?.toString() || "[]",
    );
    const updatedSuccessStories = JSON.parse(
      formData.get("successStories")?.toString() || "[]",
    );
    const updatedNewsLetter = JSON.parse(
      formData.get("newsLetter")?.toString() || "[]",
    );

    if (!updatedPricing || !Array.isArray(updatedPricing)) {
      return NextResponse.json(
        { message: "Invalid price format" },
        { status: 400 },
      );
    }

    if (!updatedBanner || !Array.isArray(updatedBanner)) {
      return NextResponse.json(
        { message: "Invalid banner format" },
        { status: 400 },
      );
    }

    if (!updatedTravelAndMeet || !Array.isArray(updatedTravelAndMeet)) {
      return NextResponse.json(
        { message: "Invalid Travel And Meet format" },
        { status: 400 },
      );
    }

    if (!updatedExecutivePlan || !Array.isArray(updatedExecutivePlan)) {
      return NextResponse.json(
        { message: "Invalid Executive plan format" },
        { status: 400 },
      );
    }

    if (!updatedTestimonial || !Array.isArray(updatedTestimonial)) {
      return NextResponse.json(
        { message: "Invalid Testimonial format" },
        { status: 400 },
      );
    }

    if (!updatedSuccessStories || !Array.isArray(updatedSuccessStories)) {
      return NextResponse.json(
        { message: "Invalid Success Stories format" },
        { status: 400 },
      );
    }

    if (!updatedNewsLetter || !Array.isArray(updatedNewsLetter)) {
      return NextResponse.json(
        { message: "Invalid News Letter format" },
        { status: 400 },
      );
    }

    const configuration = getArrayData();

    if (configuration.length === 0) {
      return NextResponse.json(
        { message: "No configuration found to update" },
        { status: 404 },
      );
    }

    // Update the pricing and banner sections
    configuration[0].pricing = updatedPricing;
    configuration[1].banner = updatedBanner;
    configuration[2].travelAndMeet = updatedTravelAndMeet;
    configuration[3].executivePlan = updatedExecutivePlan;
    configuration[4].testimonial = updatedTestimonial;
    configuration[5].successStories = updatedSuccessStories;
    configuration[6].newsLetter = updatedNewsLetter;

    // Save updated configuration
    saveData(configuration);

    return NextResponse.json({
      message: "Configuration updated",
      configuration,
    });
  } catch (error) {
    console.error("Error updating configuration:", error);
    return NextResponse.json(
      { message: "Error updating configuration" },
      { status: 500 },
    );
  }
}
// **Edit** END

// **POST** START
export async function POST(req: Request) {
  try {
    const formData = await req.formData();

    const newPricing = JSON.parse(formData.get("price")?.toString() || "[]");
    const newBanner = JSON.parse(formData.get("banner")?.toString() || "[]");
    const newTravelAndMeet = JSON.parse(formData.get("travelAndMeet")?.toString() || "[]");
    const newExecutivePlan = JSON.parse(formData.get("executivePlan")?.toString() || "[]");
    const newTestimonial = JSON.parse(formData.get("testimonial")?.toString() || "[]");
    const newSuccessStories = JSON.parse(formData.get("successStories")?.toString() || "[]");
    const newNewsLetter = JSON.parse(formData.get("newsLetter")?.toString() || "[]");

    if (!newPricing || !Array.isArray(newPricing)) {
      return NextResponse.json(
        { message: "Invalid price format" },
        { status: 400 }
      );
    }

    if (!newBanner || !Array.isArray(newBanner)) {
      return NextResponse.json(
        { message: "Invalid banner format" },
        { status: 400 }
      );
    }

    if (!newTravelAndMeet || !Array.isArray(newTravelAndMeet)) {
      return NextResponse.json(
        { message: "Invalid Travel And Meet format" },
        { status: 400 }
      );
    }

    if (!newExecutivePlan || !Array.isArray(newExecutivePlan)) {
      return NextResponse.json(
        { message: "Invalid Executive plan format" },
        { status: 400 }
      );
    }

    if (!newTestimonial || !Array.isArray(newTestimonial)) {
      return NextResponse.json(
        { message: "Invalid Testimonial format" },
        { status: 400 }
      );
    }

    if (!newSuccessStories || !Array.isArray(newSuccessStories)) {
      return NextResponse.json(
        { message: "Invalid Success Stories format" },
        { status: 400 }
      );
    }

    if (!newNewsLetter || !Array.isArray(newNewsLetter)) {
      return NextResponse.json(
        { message: "Invalid News Letter format" },
        { status: 400 }
      );
    }

    const newConfiguration = {
      pricing: newPricing,
      banner: newBanner,
      travelAndMeet: newTravelAndMeet,
      executivePlan: newExecutivePlan,
      testimonial: newTestimonial,
      successStories: newSuccessStories,
      newsLetter: newNewsLetter,
    };

    const configuration = getArrayData();
    configuration.push(newConfiguration); // Add the new configuration

    saveData(configuration);

    return NextResponse.json({
      message: "New configuration added successfully",
      configuration,
    });
  } catch (error) {
    console.error("Error adding configuration:", error);
    return NextResponse.json(
      { message: "Error adding configuration" },
      { status: 500 }
    );
  }
}
// **POST** END


// **DELETE** START
export async function DELETE(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const indexToDelete = searchParams.get("index");

    if (!indexToDelete || Number.isNaN(Number(indexToDelete))) {
      return NextResponse.json(
        { message: "Invalid index parameter" },
        { status: 400 }
      );
    }

    const index = Number(indexToDelete);
    const configuration = getArrayData();

    if (index < 0 || index >= configuration.length) {
      return NextResponse.json(
        { message: "Configuration not found" },
        { status: 404 }
      );
    }

    // Remove the configuration at the specified index
    configuration.splice(index, 1);

    saveData(configuration);

    return NextResponse.json({
      message: `Configuration at index ${index} deleted successfully`,
      configuration,
    });
  } catch (error) {
    console.error("Error deleting configuration:", error);
    return NextResponse.json(
      { message: "Error deleting configuration" },
      { status: 500 }
    );
  }
}
// **DELETE** END