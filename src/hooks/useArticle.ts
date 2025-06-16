import error from "next/error";
import { toast } from "sonner";
import { generateSlug } from "./useCommon";
import { handleRequest } from "@/_lib/api";
import { pageParams } from "@/app/types/fetch-param";
import { useEffect, useMemo, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import type { Article, ArticleProps } from "@/app/types/article";
// Article Table Hook
export function useArticleTable() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [dataSource, setDataSource] = useState<string>(searchParams.get("ds") || "bigquery");
  const [searchQuery, setSearchQuery] = useState("");
  const [deleteArticleId, setDeleteArticleId] = useState<number | null>(null);
  const [hoveredArticleId, setHoveredArticleId] =  useState<string | null>(null);
  const [loadingArticleId, setLoadingArticleId] =  useState<string | null>(null);
  const [loadingPage, setLoadingPage] = useState<number | null>(null);
  const [loadingDltArt, setloadingDltArt] = useState(false);
  const [sqArticles, setArticlesData] = useState<{
    articles: Article[];
    totalPages: number;
    length: number;
  }>({ articles: [], totalPages: 0, length: 0 });
  const [debouncedQuery, setDebouncedQuery] = useState("");
  
  useEffect(() => { const handler = setTimeout(() => { setDebouncedQuery(searchQuery); }, 300);  
    return () => { clearTimeout(handler);  };}, [searchQuery]);
   
  useEffect(() => { if (debouncedQuery) { search(debouncedQuery); } }, [debouncedQuery]);

  const search = async (value: string) => {
    try {
      pageParams.dataSource =  "search";
      pageParams.sq =  value;
      const newArticlesData = await handleRequest(`/api/blog?sq=${pageParams.sq}`, "GET")
      setArticlesData({articles: newArticlesData.articles, totalPages: newArticlesData.totalPages, length: newArticlesData.pageSize}); 
    } catch (error) {
      console.error("Error fetching articles:", error);
    }
  };

  const setHoveredArticle = (id: string | number | null) => {
    setHoveredArticleId(id !== null ? String(id) : null);
  };

  const handleDataSourceChange = (value: string) => {
    setDataSource(value);
    const currentParams = new URLSearchParams();
    currentParams.set("ds", value);
    router.push(`/afa-admin/articles/article-table?${currentParams.toString()}`);
  };

  const handleDeleteClick = (id: number) => {
    setDeleteArticleId(id);
  };

  const confirmDelete = async () => {
    if (!deleteArticleId) return;
    setloadingDltArt(true)
    try {
      const url = dataSource ===  "bigquery" ? `/api/blog/${deleteArticleId}` : `/api/articles/${deleteArticleId}`
      if (dataSource ===  "bigquery" )
      await handleRequest(url, "PUT", { "page_status": "archived" })
      else await handleRequest( url, "DELETE"); // Hard Delete;
      toast.error("Article deleted successfully!");
      setloadingDltArt(false)
      router.refresh();
    } catch {
      toast.error("Failed to delete article");
      setloadingDltArt(false)
    } finally {
      closeDeleteModal();
    }
  };

  const closeDeleteModal = () => {
    setDeleteArticleId(null);
  };

  return {
    sqArticles,
    dataSource,
    setDataSource,
    searchQuery,
    setSearchQuery,
    search,
    handleDataSourceChange,
    deleteArticleId,
    handleDeleteClick,
    confirmDelete,
    closeDeleteModal,
    hoveredArticleId,
    loadingArticleId, 
    setLoadingArticleId,
    setHoveredArticleId: setHoveredArticle,
    loadingDltArt,
    setloadingDltArt,
    loadingPage, 
    setLoadingPage
  };
}

// Article Form Hook
export function useArticleForm(existingArticle?: Article): ArticleProps {
  const router = useRouter();
  const searchParams = useSearchParams();
  const ds = searchParams.get("ds"); 
  const [title, setTitle] = useState(existingArticle?.title || existingArticle?.title_name || "");
  const [content, setContent] = useState(existingArticle?.content || existingArticle?.content_body|| "");
  const [author, setAuthor] = useState(existingArticle?.author || existingArticle?.author_name|| existingArticle?.user.email|| "");
  const [pagestatus, setStatus] = useState(existingArticle?.pagestatus || existingArticle?.status_name || "published");
  const [metaTag, setMetaTag] = useState(existingArticle?.metaTag || "");
  const [description, setDescription] = useState(existingArticle?.description || existingArticle?.description_body|| "");
  const [imagePath, setImagePath] = useState(existingArticle?.imagePath || "");
  const [keywords, setKeywords] = useState(existingArticle?.keywords || existingArticle?.keyword_body|| "");
  const [category, setCategory] = useState(existingArticle?.category || existingArticle?.category_slug || "");
  const [altText, setAltText] = useState(existingArticle?.altText || "");
  const [caption, setCaption] = useState(existingArticle?.caption || "");
  const [slug, setSlug] = useState(existingArticle?.slug || "");
  const [type, setType] = useState(existingArticle?.type || existingArticle?.type_slug|| "" );
  const [cluster, setCluster] = useState(existingArticle?.cluster || "");
  const [loading, setLoading] = useState(false);
  const [isSlugEdited] = useState(!!existingArticle?.slug);
  const [btnC, setbtnC] = useState('');

  useEffect(() => { if (!isSlugEdited) setSlug(generateSlug(title)); }, [title, isSlugEdited]);

  const pageLink = useMemo(() => {
    if (!slug) return "";
    return category ? `/${category}/${slug}` : `/${slug}`;
  }, [category, slug]);

  const extractImageUrls = (htmlContent: string): string[] => {
    const regex = /<img[^>]+src="([^">]+)"/g;
    let matches: RegExpExecArray | null;
    const urls: string[] = [];
    matches = regex.exec(htmlContent);
    while (matches !== null) {
      urls.push(matches[1]);
      matches = regex.exec(htmlContent);
    }
    return urls;
  };


  const processImages = async (imageUrls: string[], content: string) => {
    const categoryName = category;
    let newContent = content;
    let firstImageUrl: string | null = null;
    let firstImageAlt: string | null = null;
    let articleName = slug || generateSlug(title)
    

   
    for (let i = 0; i < imageUrls.length; i++) {
      const imageUrl = imageUrls[i];
      const imgTagMatch = content.match(/<img[^>]+src=["'](data:image\/[a-zA-Z]+;base64,[^"']+|https?:\/\/[^"']+)["'][^>]*>/);
      if (imgTagMatch) {
        const altMatch = imgTagMatch[0].match(/alt=["']([^"']+)["']/);
        if (altMatch) 
          firstImageAlt = altMatch[1];
      }
  
      if (imgTagMatch?.[i]) {
        const titleMatch = imgTagMatch[i][0].match(/title=["']([^"']+)["']/);
        if (titleMatch) {
            articleName = generateSlug(titleMatch[1]); // Use extracted title
        }
      }
      let fileExtension = "jpg"; // Default extension // console.log("imageUrl", imageUrl);
      if (imageUrl.startsWith("data:image/")) 
        fileExtension = imageUrl.split(";")[0].split("/")[1]; // Gets 'png', 'jpeg', 'gif', etc. // Extract file extension from base64 data URL
      else 
        fileExtension = imageUrl.split('.').pop()?.split('?')[0].toLowerCase() || "jpg"; // Extract file extension from normal URL
      
        const newFileName = `${categoryName}/${articleName}.${fileExtension}`;

        

      const newImageUrl = await uploadToGoogleCloud(imageUrl, newFileName);   // Upload image and g
      console.log(newFileName)

      if (i === 0) firstImageUrl = newImageUrl
      newContent = newContent.replace(imageUrl, newImageUrl); // Replace old URL with new one in content
    }
    return {newContent, firstImageUrl, firstImageAlt};
  };

  const uploadToGoogleCloud = async (imageUrl: string, newFileName: string): Promise<string> => {
    try {
      const response = await fetch("/api/upload", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ imageUrl, newFileName }),
      });
      if (!response.ok) {
        throw new Error(`Upload failed: ${response.status} ${response.statusText}`);
      }
      const data = await response.json(); // Parse JSON response
      return data.newImageUrl; // Assuming API response contains { newImageUrl: "..." }
    } catch (error) {
      console.error("Error uploading image:", error);
      throw error; // Re-throw error so caller function can handle it
    }
  };
  
  const cancelCreate = () => {
    router.push("/afa-admin/articles/article-table")
  }
  const handleClick = (cb: string) => {
    setLoading(true);
    setbtnC(cb)
  };

  const handleSubmit = async (formData: FormData, status: string) => {
    const data: Record<string, unknown> = {};
    formData.append("pagestatus", status);
    formData.forEach((value, key) => {
      data[key] = value;
    });
    try {
      const checkSlugUrl = `/api/blog?check_slug=true&slug=${slug}&ctgy=${category}&pt=${type}`;
      const slugResponse = await fetch(checkSlugUrl);
      const slugData = await slugResponse.json();
      if (slugResponse.ok && slugData) {
        setLoading(false);
        toast.error("A page with this slug, category, and page type already exists. Choose a different slug, category or page type.");
        return; 
      }

      const imageUrls = extractImageUrls(content);
      let updatedContent = content
      let imagePath = ""
      let altText = ""
      
  
      if (imageUrls.length > 0) {
        const { newContent, firstImageUrl, firstImageAlt } = await processImages(imageUrls, content);
        updatedContent = newContent
        imagePath = firstImageUrl || ""
        altText = firstImageAlt || ""   // console.log(imagePath, altText)
      }

      const url = ds === "bigquery" ?  "/api/blog" : "/api/articles";
      const pushUrl = ds === "bigquery" ? "?ds=bigquery": "?ds=json" ;
      const postData = ds === "bigquery" ? 
        {
          'category_name' :category , 
          'page_status' : status, 
          'page_type' : type, 
          'title' : title, 
          'content' : content, 
          'description' : description, 
          'keywords' : keywords, 
          'slug' : slug, 
          'author' : author,
          'image' : [
            {
              'image_path': imagePath,
              'image_caption': caption,
              'image_alt': altText
            }
          ]
 
        } : {...data, ...{'author': author }}; // console.log("uploading data:", postData);

      await handleRequest(url, "POST", { ...postData, content: updatedContent, imagePath, altText });
      router.push(`/afa-admin/articles/article-table${pushUrl}`);
      toast.success("Article added successfully!");
    } catch {
      toast.error("Failed to add article");
      setbtnC('')
      setLoading(false);
    }
  };

  const handleUpdate = async (formData: FormData, status: string) => {
    const ads = ds === "bigquery";
    if(ds === "bigquery"){
      formData.append("page_status", status)
      formData.append("category_name", category)
      formData.append("page_type", type)
    } else formData.append("pagestatus", status)
 
    if (!existingArticle) return;
    const data: Record<string, unknown> = {};
    formData.forEach((value, key) => {
      data[key] = value;
    });

    try {
      const checkSlugUrl = `/api/blog?check_slug=true&slug=${slug}&ctgy=${category}&pt=${type}&pageId=${existingArticle.id}`;
      const slugResponse = await fetch(checkSlugUrl);
      const slugData = await slugResponse.json();
      if (slugResponse.ok && slugData) {
        setLoading(false);
        toast.error("A page with this slug, category, and page type already exists. Choose a different slug, category or page type.");
        return; 
      }

      const url = ads ?  `/api/blog/${existingArticle?.page_id}` : `/api/articles/${existingArticle.id}`;
      const pushUrl = ads ? "?ds=bigquery": "?ds=json" ;
      await handleRequest(url, "PUT", { ...data, content});
      router.push(`/afa-admin/articles/article-table${pushUrl}`);
      toast.success("Article updated successfully!");
    } catch {
      toast.error("Failed to update article");
      setbtnC('');
      setLoading(false);
    }
  };

  return {
    title, setTitle, content , setContent, author, setAuthor,
    pagestatus, setStatus, metaTag, setMetaTag, description, setDescription,
    imagePath, setImagePath, keywords, setKeywords, type, setType, cluster, setCluster,
    pageLink, altText, setAltText, category, setCategory, slug,
    setSlug, loading, handleSubmit,
    handleUpdate, error, caption, setCaption, 
    btnC, handleClick, setLoading, cancelCreate
  };
}
