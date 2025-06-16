import React from "react";
import Image from "next/image";
import siteMetadata from "@/components/client/shared/siteMetaData";
import { extractImageSrc, fetchBlogs, formatCategory } from "@/_lib/blogUtils";
import type { Blog } from "@/app/types/article";
import Pagination from "@/components/client/shared/BlogPagination";
import LeftSidebar from "@/components/client/shared/LeftSidebar";

export async function generateMetadata({ params }: { params: Promise<{ category: string }> })  {
  const test = await params
  const slug = test.category;
  const formattedCategory = formatCategory(slug)

  return {
    title: `Blogs Directory Page || ${formattedCategory}`,
    description: `Learn more about Love Me ${formattedCategory} Blogs`,
    robots: siteMetadata.robots

  };

}


export default async function CategoryPage({ params, searchParams }: {params:Promise<{category:string}>; searchParams:Promise<{page:string}>}) {

  const slug = (await params).category;
  const sp = (await searchParams).page

  const currentPage = Number(sp) || 1;

  const formattedCategory = formatCategory(slug)

  const {data, articles}  = await fetchBlogs(slug, currentPage);

  const totalCount = data.totalRecords

  const pageSize = 10

  const totalPages = Math.ceil(totalCount/pageSize)

  return (
    <>
    <div className="flex flex-row">
    <LeftSidebar/>
      <div>
        <h1 className="font-medium text-3xl ps-5 py-5 max-sm:hidden">
          Blog Directory Page | {formattedCategory}
        </h1>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-4 px-3 pb-10 pt-3">
          {articles.length > 0 ? (
            articles.map((post: Blog) => {
              const imageSrc = extractImageSrc(post.content_body);

              return (
                <div key={post.page_id} className="flex items-center justify-center rounded-lg bg-gray-200">
                  <a
                    href={`/${post.category_name.toLowerCase()}/${post.slug_name}`}
                    className="text-blue-500 block w-full h-full"
                  >
                    <div className="border p-4 rounded-lg">
                      {imageSrc ? (
                        <Image
                          src={imageSrc}
                          width={630}
                          height={0}
                          alt={typeof post.title_name === 'string' ? post.title_name : 'Blog image'}
                          className="h-[250px] object-cover mx-auto rounded-md gap-3"
                          priority={true}
                        /> ) : (
                          <div className="h-[250px] bg-gray-300 flex items-center justify-center rounded-md">
                            <span className="text-gray-500">No Image Available</span>
                          </div>
                      )}
                      <h2 className="text-xl font-bold text-center">{post.title_name}</h2>
                      <p className="text-center text-black pt-2">{post.description_body}</p>
                    </div>
                  </a>
                  
                </div>
              );
            })
          ) : (
            <p>No posts found in this category.</p>
          )}
        </div>
        <Pagination totalPages={totalPages} currentPage={currentPage} /> 
        </div>
        </div>
    </>
  );
}
