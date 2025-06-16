"use client"
import React from "react";
import Link from "next/link";
import type { Article, ArticleFormProps} from "@/app/types/article";
import TiptapEditor from "./TipTapComponent";
import { useArticleForm } from "@/hooks/useArticle";
// import { useRouter } from "next/navigation";

export default function ArticleForm({ articlesData, editId}: ArticleFormProps) {
  const {
    title, setTitle, content, setContent, description, setDescription, cluster, setCluster, keywords, setKeywords, type, setType, pageLink,
    category, setCategory, slug, setSlug, imagePath, setImagePath, altText, setAltText,
    handleSubmit, handleUpdate,  handleClick, btnC, loading, cancelCreate
  } = useArticleForm(articlesData as object as Article);
  // const router = useRouter();
  const isFormIncomplete = !title || !description || !keywords || !type || !category || !slug || !content;
  const ifNOtitle = !title ;
  return (
    <div> 
      <form action="submit">
        <div className="flex">
          <h1 className="text-xl font-bold mb-4">{editId ? "Edit Article" : "Publish Article"}</h1>
          <div className="flex rounded-lg right-0 p-6 gap-4 top-0 ml-auto w-[350px]">
            <button
              type="button"
              className={`rounded-lg p-4 border ${ifNOtitle ? "bg-gray-400 cursor-not-allowed" : "rounded-lg p-4 border"}`}
              disabled={loading || ifNOtitle}
              onClick={ () => {
                const formData = new FormData(document.querySelector("form") as HTMLFormElement);
                handleClick('dft');
                if (editId) {
                  handleUpdate(formData, "draft");
                } else {
                  handleSubmit(formData, "draft");
                }
              }} 
            >
              Save As Draft
              {loading && btnC === "dft" && <svg className="animate-spin h-5 w-5 inline-block ml-2" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" aria-label="Loading">
                <title>Loading spinner</title>
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
              </svg>}
            </button>
            
            <button
              type={isFormIncomplete ? "button" : "submit"}
              className={`rounded-lg p-4 border ${isFormIncomplete ? 'bg-red-400' : 'bg-green-400'} text-white`}
              disabled={loading} 
              onClick={ () => {
                if (isFormIncomplete) 
                 cancelCreate()
                else{
                  const formData = new FormData(document.querySelector("form") as HTMLFormElement);
                  handleClick('sub');
                  if (editId) {
                     handleUpdate(formData, "published");
                  } else {
                     handleSubmit(formData, "published");
                  }
                }
              }} 
            >
              {isFormIncomplete ? "Cancel" : editId ? "Update" : "Publish"}
              {loading && btnC === "sub" &&  <svg className="animate-spin h-5 w-5 inline-block ml-2" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" aria-label="Loading">
                <title>Loading spinner</title>
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
              </svg>}
            </button>
          </div>
        </div>
        <div className="flex">
          <section className="w-64 flex-auto">
            <div className="flex gap-4 pb-5">
              <div className="w-1/2 p-4 flex border rounded-lg shadow-md">
                <label htmlFor="title" className="font-semibold text-gray-700 whitespace-nowrap m-auto pe-3">Page Title</label>
                <input id="title" name="title" className="bg-gray-100 rounded-md h-10 px-3 w-full" value={title} onChange={(e) => setTitle(e.target.value)} />
              </div>
              <div className="w-1/2 p-4 flex border rounded-lg shadow-md">
                <label htmlFor="slug" className="font-semibold text-gray-700 whitespace-nowrap m-auto pe-3">Page Slug</label>
                <input name="slug" className="bg-gray-100 rounded-md h-10 px-3 w-full" value={slug} onChange={(e) => setSlug(e.target.value)} />
              </div>
            </div>
            {slug && (
              <div className="w-full p-4 mb-5 flex border rounded-lg shadow-md bg-gray-50">
                <span className="font-seibold text-gray-700 whitespace-nowrap m-left pe-3">Link to Page:</span>
                <Link href={pageLink} className="text-blue-600 hover:underline">
                  {`${window.location.origin}${pageLink}`}
                </Link>
              </div>
            )}
            <div className="w-full p-4 flex border rounded-lg shadow-md mb-4">
              <label htmlFor="description" className="font-semibold text-gray-700 whitespace-nowrap m-auto pe-3">Description</label>
              <input name="description" className="bg-gray-100 rounded-md h-10 px-3 w-full" value={description} onChange={(e) => setDescription(e.target.value)} />
            </div>
            <div>
              <TiptapEditor
                value={content}
                onChange={(value) => {
                  setContent(value);
                }}
              />
            </div>
          </section>
          <section className="ml-auto custom-scrollbar background-light900_dark200 light-border sticky right-0 top-0 flex h-screen w-[350px] flex-col gap-6 overflow-y-auto border-l p-6 shadow-light-300 dark:shadow-none max-xl:hidden">
            <div className="border rounded-lg p-4">
              <label htmlFor="cluster" className="font-semibold text-gray-700 block mb-2">Cluster Page?</label>
              <div className="flex gap-4">
                <label className="flex items-center gap-2">
                  <input type="radio" name="cluster" value="yes" checked={cluster === "yes"} onChange={(e) => setCluster(e.target.value)} className="form-radio text-primary" />
                  Yes
                </label>
                <label className="flex items-center gap-2">
                  <input type="radio" name="cluster" value="no" checked={cluster === "no"} onChange={(e) => setCluster(e.target.value)} className="form-radio text-primary" />
                  No
                </label>
              </div>
            </div>
            <div className="border rounded-lg p-4 hidden">
             
              <input type="text" name="imagePath" value={imagePath} onChange={(e) => setImagePath(e.target.value)} className="w-full bg-gray-100 h-10 px-3 rounded-md" hidden/>
              <input type="text" name="altText" value={altText} onChange={(e) => setAltText(e.target.value)} className="w-full bg-gray-100 h-10 px-3 rounded-md" hidden/>
            </div>

            <div className="border rounded-lg p-4 ">
              <label htmlFor="keywords" className="font-semibold text-gray-700 block mb-2">Keywords</label>
              <input type="text" name="keywords" value={keywords} onChange={(e) => setKeywords(e.target.value)} className="w-full bg-gray-100 h-10 px-3 rounded-md" placeholder="Enter keywords..." />
            </div>

            <div className="border rounded-lg p-4">
              <label htmlFor="type" className="font-semibold text-gray-700 block mb-2">Page Type</label>
              <select
                name="type"
                value={type}
                onChange={(e) => setType(e.target.value)}
                className="w-full bg-gray-100 h-10 px-3 rounded-md"
              >
                <option value="">Select a page type</option>
                {Array.isArray(articlesData.pageTypeNames) && articlesData.pageTypeNames.map((pt) => (
                  <option key={pt.id} value={pt.slug}>
                    {pt.name}
                  </option>
                ))}
              </select>
              {/* { !ptData.entities && <p className="text-red-500">Failed to load page types</p>} */}
            </div>
            
            <div className="border rounded-lg p-4">
              <label htmlFor="category" className="font-semibold text-gray-700 block mb-2">Page Category</label>
              <select
                name="category"
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                className="w-full bg-gray-100 h-10 px-3 rounded-md"
              >
                <option value="">Select a page type</option>
                {type === "video" ? (
                  Array.isArray(articlesData.categoryNames['2']) && articlesData.categoryNames['2'].map((cat) => (
                    <option key={Number(cat.id)} value={cat.slug}>
                      {cat.name}
                    </option>
                  ))
                ) : (
                  Array.isArray(articlesData.categoryNames['1']) && articlesData.categoryNames['1'].map((cat) => (
                    <option key={Number(cat.id)} value={cat.slug}>
                      {cat.name}
                    </option>
                  ))
                ) } 
              </select>
              {/* {!catData.entities && <p className="text-red-500">Failed to load categories</p>} */}
            </div>


          </section>
        </div>
      </form>
    </div>
  );
}
