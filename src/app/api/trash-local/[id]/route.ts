import { NextResponse } from "next/server";
import fs from "node:fs/promises";
import path from "node:path";
import type { Article } from "@/app/types/article";
import { fetchCategoriesAndPageTypes } from "@/_lib/fetch-catpt";

const fileTrashPath = path.join(process.cwd(), "src/app/data/trash/latest.json");

const readTrash = async () => {
  try {
    const fileData = await fs.readFile(fileTrashPath, "utf8");
    return JSON.parse(fileData);
  } catch (error) {
    console.error("Error reading trash:", error);
    return [];
  }
};

const writeTrash = async (articles: Article[]) => {
  try {
    await fs.writeFile(fileTrashPath, JSON.stringify(articles, null, 2));
  } catch (error) {
    console.error("Error writing trash:", error);
  }
};

// Get an article by ID
export async function GET(req: Request, { params }: { params: { id: string } }) {
  try {
    const { id } = await params;
    const articles = await readTrash();
    const article = articles.find((article: { id: number; }) => article.id === Number(id));
    if (!article) {
      return NextResponse.json({ message: "Article not found" }, { status: 404 });
    }
    const { categoryNames, pageTypeNames } = await fetchCategoriesAndPageTypes();
    return NextResponse.json({...article, categoryNames, pageTypeNames});
  } catch (error) {
    console.error("GET Error:", error);
    return NextResponse.json({ error: "Failed to fetch article" }, { status: 500 });
  }
}

// Delete an article
export async function DELETE(req: Request, { params }: { params: { id: string } }) {
  try {
    const { id } = await params;
    if (!id) {
      return NextResponse.json({ error: "Article ID is required" }, { status: 400 });
    }

    const articleId = parseInt(id, 10);
    if (isNaN(articleId)) {
      return NextResponse.json({ error: "Invalid Article ID" }, { status: 400 });
    }

    const trash = await readTrash();
    const initialLength = trash.length;
    const updatedTrashArticles = trash.filter((article: { id: number }) => article.id !== articleId);

    if (updatedTrashArticles.length === initialLength) {
      return NextResponse.json({ error: "Article not found in trash" }, { status: 404 });
    }

    await writeTrash(updatedTrashArticles);

    return NextResponse.json({ message: "Article deleted successfully from trash" });
  } catch (error) {
    console.error("DELETE Error:", error);
    return NextResponse.json({ error: "Failed to delete article from trash" }, { status: 500 });
  }
}

export async function PATCH(req: Request, { params }: { params: { id: string } }) {
  try {
    const { id } = await params;
    if (!id) {
      return NextResponse.json({ error: "Article ID is required" }, { status: 400 });
    }

    const articles = await readTrash();
    const articleIndex = articles.findIndex((article: { id: number }) => article.id === Number(id));

    if (articleIndex === -1) {
      return NextResponse.json({ error: "Article not found" }, { status: 404 });
    }

    articles[articleIndex].deleted = true;

    await writeTrash(articles); 
    return NextResponse.json({ message: "Article soft deleted successfully" });
  } catch (error) {
    console.error("DELETE Error:", error);
    return NextResponse.json({ error: "Failed to soft delete article" }, { status: 500 });
  }
}
