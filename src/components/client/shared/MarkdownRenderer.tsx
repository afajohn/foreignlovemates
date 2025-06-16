"use client"; // 👈 This makes it a Client Component

import React from "react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import rehypeRaw from "rehype-raw"; // ✅ Safe to use in a Client Component
import Image from "next/image";

interface MarkdownRendererProps {
  content: string;
}

export default function MarkdownRenderer({ content }: MarkdownRendererProps) {
  return (
    <ReactMarkdown
      remarkPlugins={[remarkGfm]}
      rehypePlugins={[rehypeRaw]} // ✅ Now it's only used on the client
      components={{
        h1: ({ ...props }) => <h1 className="text-center" {...props} />,
        img: ({ ...props }) => (
          <figure className="my-4">
            <Image
              src={props.src || "/default-image-path.jpg"}
              alt={props.alt || "Image"}
              width={630}
              height={400} // ✅ Ensure a valid height
              style={{ height: "auto" }}
              priority={true}
            />
          </figure>
        ),
        p: ({ children, ...props }) => {
          const isEmpty =
            !children ||
            (Array.isArray(children) &&
              children.every(
                (child) => typeof child === "string" && child.trim() === "",
              ));

          return isEmpty ? <p {...props}>&nbsp;</p> : <p {...props}>{children}</p>;
        },
      }}
    >
      {content}
    </ReactMarkdown>
  );
}
