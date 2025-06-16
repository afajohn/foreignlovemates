import { extractImageSrc, fetchBlogsAll, formatCategory } from "@/_lib/blogUtils";
import type { Blog } from "@/app/types/article";
import Image from "next/image";

interface BlogData {
  category_slug: string;
  image: string;
}

const MobileLayout = async () => {
  const {articles} = await fetchBlogsAll()
  const uniqueCategoriesFilter = articles.filter((blog:Blog)=> blog.category_slug)
  const uniqueCategoriesMap = uniqueCategoriesFilter.map((blog:Blog)=> blog.category_slug.trim())
  
  
  const uniqueCategories= uniqueCategoriesMap.filter((value:string,index:number,self:string[])=>value !=="" &&  self.indexOf(value)===index)


  const latestBlogData: BlogData[] = uniqueCategories.map((category: string) => {
    const latestBlog: Blog | undefined = articles
      .filter((blog: Blog) => blog.category_slug === category)
      .sort(
        (a: Blog, b: Blog) =>
          new Date(b.created_at.value).getTime() -
          new Date(a.created_at.value).getTime()
      )[0];

    return {
      category_slug: category,
      image: extractImageSrc(latestBlog?.content_body ?? "") || "/default-image.jpg",
    };
  });

  console.log("Latest Blog Data:", latestBlogData);
  
  return (
    <div className="grid grid-cols-1 sm:hidden p-4">
      {latestBlogData.map(({ category_slug, image }) => (
        <a key={category_slug} href={`/blog/${category_slug}`} className="text-center bg-gray-200 p-4 my-3">
          <div>
            <Image
              width={630}
              height={0}
              src={image}
              alt={category_slug}
              className="pb-2"
            />
          </div>
          {formatCategory(category_slug)}
        </a>
      ))}
    </div>
  );
};

export default MobileLayout;
