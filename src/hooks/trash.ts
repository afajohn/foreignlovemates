import error from "next/error";
import { toast } from "sonner";
import { generateSlug } from "./useCommon";
import { handleRequest } from "@/_lib/api";
import { pageParams } from "@/app/types/fetch-param";
import { useEffect, useMemo, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import type { trashArticle, trashArticleProps } from "@/app/types/trash";
// Article Table Hook
export function useArticleTable() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [dataSourceTrash, setDataSourceTrash] = useState<string>(searchParams.get("ds") || "trash-json");
  const [searchQuery, setSearchQuery] = useState("");
  const [deleteArticleId, setDeleteArticleId] = useState<number | null>(null);
  const [restoreArticleId, setRestoreArticleId] = useState<string | number | null>(null);
  const [hoveredArticleId, setHoveredArticleId] =  useState<string | null>(null);
  const [loadingArticleId, setLoadingArticleId] =  useState<string | null>(null);
  const [loadingPage, setLoadingPage] = useState<number | null>(null);
  const [loadingDltArt, setloadingDltArt] = useState(false);
  const [sqArticles, setArticlesData] = useState<{
      articles: trashArticle[];
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
        const newArticlesData = await handleRequest(`/api/trash?sq=${pageParams.sq}`, "GET")
        setArticlesData({articles: newArticlesData.articles, totalPages: newArticlesData.totalPages, length: newArticlesData.pageSize}); 
      } catch (error) {
        console.error("Error fetching articles:", error);
      }
    };
    
  const setHoveredArticle = (id: string | number | null) => {
    setHoveredArticleId(id !== null ? String(id) : null);
  };

  const handleDataSourceTrashChange = (value: string) => {
    setDataSourceTrash(value);
    const currentParams = new URLSearchParams();
    currentParams.set("ds", value);
    router.push(`/afa-admin/trash/article-table?${currentParams.toString()}`);
  };

  const handlePermanentDeleteClick = (id: number) => {
    setDeleteArticleId(id);
  };

  const handleRestoreClick = (id: string | number | null) => {
    setRestoreArticleId(id);
  };

  const confirmPermanentDelete = async () => {
    if (!deleteArticleId) return;
    setloadingDltArt(true)
    try {
      const url = dataSourceTrash ===  "trash-bigquery" ? `/api/blog/${deleteArticleId}` : `/api/trash-local/${deleteArticleId}`
      if (dataSourceTrash ===  "trash-bigquery" )
      await handleRequest(url, "DELETE")
      else await handleRequest( url, "DELETE"); // Hard Delete;
      toast.error("Article deleted successfully!");
      setloadingDltArt(false)
      router.refresh();
    } catch {
      // setMessage("Failed to delete article");
      toast.error("Failed to delete article");
      setloadingDltArt(false)
    } finally {
      closeDeleteModal();
    }
  };

  const confirmRestore = async () => {
    if (restoreArticleId) {
    setloadingDltArt(true)
    try {
      const url = dataSourceTrash ===  "trash-bigquery" ? `/api/trash/${restoreArticleId}` : `/api/trash-local/${restoreArticleId}`
      if (dataSourceTrash ===  "trash-bigquery" )
      await handleRequest(url, "PUT", { "page_status": "published" })
      else await handleRequest( url, "POST"); 
      toast.error("Article restored successfully!");
      setloadingDltArt(false)
      router.refresh();
    } catch {
      // setMessage("Failed to delete article");
      toast.error("Failed to restore article");
      setloadingDltArt(false)
    } finally {
      closeRestoreModal();
    }}
  };

  const closeDeleteModal = () => {
    setDeleteArticleId(null);
  };
  const closeRestoreModal = () => {
    setRestoreArticleId(null);
  };

  return {
    sqArticles,
    dataSourceTrash,
    setDataSourceTrash,
    searchQuery,
    setSearchQuery,
    handleDataSourceTrashChange,
    deleteArticleId,
    restoreArticleId,
    handlePermanentDeleteClick,
    handleRestoreClick,
    confirmPermanentDelete,
    confirmRestore,
    closeDeleteModal,
    closeRestoreModal,
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
export function useTrashArticleForm(existingArticle?: trashArticle): trashArticleProps {
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
    const articleName = slug || generateSlug(title); // Generate article ID dynamically
    let newContent = content;
    let firstImageUrl: string | null = null;
    let firstImageAlt: string | null = null;
    const imgTagMatch = content.match(/<img[^>]+src=["'](data:image\/[a-zA-Z]+;base64,[^"']+|https?:\/\/[^"']+)["'][^>]*>/);
    if (imgTagMatch) {
  
         const altMatch = imgTagMatch[0].match(/alt=["']([^"']+)["']/);
         if (altMatch) {
             firstImageAlt = altMatch[1]; 
         }
     }

    for (let i = 0; i < imageUrls.length; i++) {
      const imageUrl = imageUrls[i];

      let fileExtension = "jpg"; // Default extension
      if (imageUrl.startsWith("data:image/")) {
        // Extract file extension from base64 data URL
        fileExtension = imageUrl.split(";")[0].split("/")[1]; // Gets 'png', 'jpeg', 'gif', etc.
      } else {
        // Extract file extension from normal URL
        fileExtension = imageUrl.split('.').pop()?.split('?')[0].toLowerCase() || "jpg";
      }

      const newFileName = imageUrls.length === 1
        ? `${articleName}.${fileExtension}`
        : `${articleName}-${String(i + 1).padStart(2, '0')}.${fileExtension}`;

      // Upload image and get new URL
      const newImageUrl = await uploadToGoogleCloud(imageUrl, newFileName);


      if (i === 0) {
        firstImageUrl = newImageUrl
      }

      // Replace old URL with new one in content
      newContent = newContent.replace(imageUrl, newImageUrl);
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
      const imageUrls = extractImageUrls(content);
      let updatedContent = content
      let imagePath = ""
      let altText = ""
      
  
      if (imageUrls.length > 0) {
        const { newContent, firstImageUrl, firstImageAlt } = await processImages(imageUrls, content);
        updatedContent = newContent
        imagePath = firstImageUrl || ""
        altText = firstImageAlt || ""
      }

      const url = ds === "bigquery" ?  "/api/blog" : "/api/trash";
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
          'image' : []

        } : {...data, ...{'author': author }};
      
      await handleRequest(url, "POST", { ...postData, content: updatedContent, imagePath, altText });
      // setMessage("Article added successfully!");
      router.push(`/afa-admin/articles/article-table${pushUrl}`);
      toast.success("Article added successfully!");
    } catch {
      // setMessage("Failed to add article");
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
      const url = ads ?  `/api/blog/${existingArticle?.page_id}` : `/api/trash/${existingArticle.id}`;
      const pushUrl = ads ? "?ds=bigquery": "?ds=json" ;
      await handleRequest(url, "PUT", { ...data, content});
      // setMessage("Article updated successfully!");
      router.push(`/afa-admin/trash/article-table${pushUrl}`);
      toast.success("Article updated successfully!");
    } catch {
      // setMessage("Failed to update article");
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
    btnC, handleClick, setLoading,
  };
}
