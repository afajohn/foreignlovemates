import { NextResponse } from "next/server";
import fs from "node:fs";
import path from "node:path";
import type { Article } from "@/app/types/article";
import type { trashArticle } from "@/app/types/trash";

const filePathTrash = path.join(process.cwd(), "src/app/data/trash/latest.json");
const filePath = path.join(process.cwd(), "src/app/data/articles/latest.json");

const getTrash = () => {
	try {
		const data = fs.readFileSync(filePathTrash, "utf-8");
		return JSON.parse(data);
	} catch {
		return [];
	}
};

const saveTrash = (articles: trashArticle[]) => {
	fs.writeFileSync(filePathTrash, JSON.stringify(articles, null, 2));
};

const getArticles = () => {
	try {
		const data = fs.readFileSync(filePath, "utf-8");
		return JSON.parse(data);
	} catch {
		return [];
	}
};

const saveArticles = (articles: trashArticle[]) => {
	fs.writeFileSync(filePath, JSON.stringify(articles, null, 2));
};


export async function GET(req: Request) {
	const { searchParams } = new URL(req.url);
	const id = searchParams.get("id");
	const searchQuery = searchParams.get("search")?.toLowerCase() || "";
	const page = Number.parseInt(searchParams.get("page") || "1", 10);
	const limit = Number.parseInt(searchParams.get("limit") || "10", 10);
  
	let articles = getTrash(); 
	articles = articles.filter((article: { deleted: boolean; }) => !article.deleted);

	// GET params by ID
	if (id) {
	  const article = articles.find((art: { id: number }) => art.id === Number(id));

	  if (!article) {
		return NextResponse.json({ error: "trashArticle not found" }, { status: 404 });
	  }
	  return NextResponse.json({ article });
	}
  
	let filteredtrashArticles = articles;
	// GET params by sreach
	if (searchQuery) {
	  filteredtrashArticles = articles.filter(
		(article: { title: string; slug: string; category: string; type: string; }) =>
		  article.title.toLowerCase().includes(searchQuery) ||
		  article.slug.toLowerCase().includes(searchQuery) ||
		  article.category.toLowerCase().includes(searchQuery) ||
		  article.type.toLowerCase().includes(searchQuery)
	  );
	}
  
	const totaltrashArticles = filteredtrashArticles.length;
	const totalPages = Math.ceil(totaltrashArticles / limit);
	const paginatedtrashArticles =
	  searchQuery !== "" ? filteredtrashArticles : filteredtrashArticles.slice((page - 1) * limit, page * limit);
  
	console.log("Returning articles:", paginatedtrashArticles.length, "Search Query:", searchQuery);
  
	return NextResponse.json({ articles: paginatedtrashArticles, totalPages });
  }

  

export async function POST(req: Request) {
	try {
		const {
			title,
			slug,
			content,
			author,
			pagestatus,
			metaTag,
			description,
			keywords,
			imagePath,
			category,
			type, 
			cluster,
			altText,
			caption,
			ds, 
			user, 
			created_at,
			// BigQuery
			author_name,
			category_name,
			content_body,
			description_body,
			image_path,
			keyword_body,
			page_id,
			slug_name,
			status_name,
			title_name,
			type_name,
			category_slug, 
			type_slug

		} = await req.json();
		if (!title || !content) {
			return NextResponse.json({ message: "Missing fields" }, { status: 400 });
		}

		const articles = getArticles();

		const newArticle: Article = {
			id: articles.length + 1,
			slug,
			title,
			content,
			author,
			pagestatus,
			metaTag,
			description,
			keywords,
			imagePath,
			category,
			date: new Date().toISOString(),
			type,
			cluster,
			altText,
			caption,
			ds, user, created_at,
			// BigQuery
			author_name,
			category_name,
			content_body,
			description_body,
			image_path,
			keyword_body,
			page_id,
			slug_name,
			status_name,
			title_name,
			type_name,
			category_slug, 
			type_slug
		};

		articles.push(newArticle);
		saveArticles(articles);

		return NextResponse.json({ message: "trashArticle added", article: newArticle });
	} catch {
		return NextResponse.json(
			{ message: "Error saving article" },
			{ status: 500 },
		);
	}
}
