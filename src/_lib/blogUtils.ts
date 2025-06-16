import type { Blog } from "@/app/types/article";

const BASE_URL = process.env.NEXTAUTH_URL 

export const extractImageSrc = (content: string) => {
    const match = content.match(/<img[^>]+src="([^"]+)"/);
    return match ? match[1] : null;
};

export const formatCategory = (category: string) => {
    return category
        .split("_")
        .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
        .join(" ");
};

interface FetchBlogsResponse {
    data: {totalRecords: number}; // Full API response
    articles: Blog[]; // Array of Blog objects
}

export const fetchBlogsAll = async () => {
    if (!BASE_URL) {
        console.error("BASE_URL is not defined.");
        return { data: { totalRecords: 0 }, articles: [] };
    }
    try {
        const response = await fetch(`${BASE_URL}/api/blog?pt=article&pageSize=100`, {next: {revalidate:7200}})
        if(!response.ok) {
            throw new Error("Failed to fetch All Blogs")
        }
        const data = await response.json();
        return {
            data,
            articles: data.articles || [],
        }
    }
    catch(err) {
        console.error("fetchBlogs error:", err);
        return { data: { totalRecords: 0 }, articles: [] }; 
       }
}

export const fetchBlogs = async (category:string, page = 1): Promise<FetchBlogsResponse> => {
    if (!BASE_URL) {
        console.error("BASE_URL is not defined.");
        return { data: { totalRecords: 0 }, articles: [] };
    }

   try{
    const response = await fetch(`${BASE_URL}/api/blog?ctgy=${category}&page=${page}`, {next: {revalidate: 7200}});
    if(!response.ok) {
        throw new Error(`Failed to fetch blogs for category: ${category}, page: ${page}`)
    }
    const data = await response.json();
    return {
        data, // Full API response
        articles: data.articles || [], // Extracted articles array
      };
   }
   catch(err) {
    console.error("fetchBlogs error:", err);
    return { data: { totalRecords: 0 }, articles: [] }; 
   }
};

export const filterBlogsByCategory = (blogs: Blog[], slug: string): Blog[] => {
    
   try{
    if (!blogs || !Array.isArray(blogs)) {
        console.error("Invalid blogs array passed to filterBlogsByCategory.");
        return [];
    }

    return blogs.filter((blog) => blog.category_name === slug);
   }
   catch(err) {
    console.error(err);
    return [];
   }
}


