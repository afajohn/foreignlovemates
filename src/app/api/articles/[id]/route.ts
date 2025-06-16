import { NextResponse } from "next/server";
import fs from "node:fs/promises";
import path from "node:path";
import type { Article } from "@/app/types/article";
import { fetchCategoriesAndPageTypes } from "@/_lib/fetch-catpt";

const filePath = path.join(process.cwd(), "src/app/data/articles/latest.json");
const fileTrashPath = path.join(process.cwd(), "src/app/data/trash/latest.json");

const readArticles = async () => {
  try {
    const fileData = await fs.readFile(filePath, "utf8");
    return JSON.parse(fileData);
  } catch (error) {
    console.error("Error reading articles:", error);
    return [];
  }
};

const writeArticles = async (articles: Article[]) => {
  try {
    await fs.writeFile(filePath, JSON.stringify(articles, null, 2));
  } catch (error) {
    console.error("Error writing articles:", error);
  }
};

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
export async function GET(_req: Request, { params }: { params: Promise<{ id: string }> }) {
  try {
    const { id } = await params;
    const articles = await readArticles();
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

// Update an article
export async function PUT(
		req: Request,
		{ params }: { params: Promise<{ id: string }> },
	) {
		try {
			const { id } = await params;
			const updatedData = await req.json();
			const articles = await readArticles();

			const index = articles.findIndex(
				(article: { id: number }) => article.id === Number(id),
			);
			if (index === -1) {
				return NextResponse.json(
					{ message: "Article not found" },
					{ status: 404 },
				);
			}

			articles[index] = { ...articles[index], ...updatedData };
			await writeArticles(articles);

			return NextResponse.json(articles[index]);
		} catch (error) {
			console.error("PUT Error:", error);
			return NextResponse.json(
				{ error: "Failed to update article" },
				{ status: 500 },
			);
		}
	}

// Delete an article
export async function DELETE(
                _req: Request,
                { params }: { params: Promise<{ id: string }> },
        ) {
                try {
                        const { id } = await params;
                        if (!id) {
                                return NextResponse.json(
                                        { error: "Article ID is required" },
                                        { status: 400 },
                                );
                        }

                        const articles = await readArticles(); //reads 
                        const articleToRemove = articles.find((article: { id: number; }) => article.id === Number(id));
                        console.log(articleToRemove);

    const updatedArticles = articles.filter((article: { id: number; }) => article.id !== Number(id));

    if (articles.length === updatedArticles.length) {
      return NextResponse.json({ error: "Article not found" }, { status: 404 });
    }
    const trash = await readTrash();

    const latestTrashId = trash.length > 0 ? Math.max(...trash.map((art: { id: number; }) => art.id)) : 0;
    const articleWithId = { ...articleToRemove, id: latestTrashId + 1 };
    // console.log("ARTICLE WITH ID: "+ JSON.stringify(articleWithId))
    trash.push(articleWithId); 
    await writeTrash(trash);

    articles.push(updatedArticles)
    await writeArticles(updatedArticles);
    
    return NextResponse.json({ message: "Article deleted successfully" });
  } catch (error) {
    console.error("DELETE Error:", error);
    return NextResponse.json({ error: "Failed to delete article" }, { status: 500 });
  }
}

export async function PATCH(
		_req: Request,
		{ params }: { params: Promise<{ id: string }> },
	) {
		try {
			const { id } = await params;
			if (!id) {
				return NextResponse.json(
					{ error: "Article ID is required" },
					{ status: 400 },
				);
			}

			const articles = await readArticles();
			const articleIndex = articles.findIndex(
				(article: { id: number }) => article.id === Number(id),
			);

			if (articleIndex === -1) {
				return NextResponse.json(
					{ error: "Article not found" },
					{ status: 404 },
				);
			}

			articles[articleIndex].deleted = true;

			await writeArticles(articles);
			return NextResponse.json({
				message: "Article soft deleted successfully",
			});
		} catch (error) {
			console.error("DELETE Error:", error);
			return NextResponse.json(
				{ error: "Failed to soft delete article" },
				{ status: 500 },
			);
		}
	}


// Add a POST handler for creating new articles
export async function POST(req: Request) {
  try {
    const newArticle = await req.json(); 
    const articles = await readArticles();

    const latestId = articles.length > 0 ? Math.max(...articles.map((art: { id: number; }) => art.id)) : 0;
    const articleWithId = { ...newArticle, id: latestId + 1 };

    articles.push(articleWithId); 
    await writeArticles(articles); 

    return NextResponse.json(articleWithId, { status: 201 });
  } catch (error) {
    console.error("POST Error:", error);
    return NextResponse.json({ error: "Failed to create article" }, { status: 500 });
  }
}
