
import siteMetadata from "@/components/client/shared/siteMetaData";
import "@/app/(client)/blog/style.css";
import { fetchBlogs } from "@/_lib/blogUtils";
import Script from "next/script";
import MarkdownRenderer from "@/components/client/shared/MarkdownRenderer";

export async function generateMetadata({ params }: { params: Promise<{ category: string; slug: string }> }) {
  const test = await params;
  const category = test.category
  const slug = test.slug
  const {articles} = await fetchBlogs(category);
  if (!Array.isArray(articles)) {
    throw new Error("Invalid API response: Expected an array of blogs.");
  }
  const blog = articles.find(
    (blog: { slug_name: string }) => blog.slug_name === slug
  );
  const publishedAt = blog?.created_at.value
    ? new Date(blog.created_at.value).toISOString().split("T")[0]
    : "Unknown";

    const url = `${siteMetadata.siteUrl}/${blog?.category_slug}/${blog?.slug_name}`

  return {
    title: blog?.title_name,
    description: blog?.description_body,
    keywords: blog?.keyword_body,
    robots: siteMetadata.robots,
    openGraph: {
      title: blog?.title_name,
      description: blog?.description_body,
      url: url,
      siteName: siteMetadata.title,
      locale: "en_US",
      type: "article",
      publishedTime: publishedAt,
      modifiedTime: publishedAt,
      images: blog?.images,
      authors: blog?.author_name,
    },
    twitter: {
      card: "summary_large_image",
      title: blog?.title_name,
      url: url,
      description: blog?.description_body,
      images: blog?.images,
    },
  };
}

export default async function BlogPage({
  params,
}: 
{ params: Promise<{ category: string; slug: string }> }
) {
  const test = await params
  const category = test.category
  const slug = test.slug
  const {articles} = await fetchBlogs(category);
  const blog = articles.find(
    (post: { slug_name: string }) => post.slug_name === slug
  );
  console.log(blog);
  const publishedAt = blog?.created_at.value
    ? new Date(blog.created_at.value).toISOString().split("T")[0]
    : "Unknown";

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Blog Posting",
    headline: blog?.title_name,
    description: blog?.description_body,
    image: blog?.images,
    datePublished: publishedAt,
    dateModified: publishedAt,
    author: [
      {
        "@type": "Organization",
        name: blog?.author_name ? [blog?.author_name] : siteMetadata.author,
        url: siteMetadata.twitter,
      },
    ],
  };

  return (
    <>
      <Script
        type="application/ld+json"
        id="json-ld"
        strategy="afterInteractive"
      >
        {JSON.stringify(jsonLd)}
      </Script>
      <div className="prose prose-lg mx-auto bg-white p-6 max-w-5xl">
        <MarkdownRenderer content={blog?.content_body || ""} />
      </div>
    </>
  );
}
