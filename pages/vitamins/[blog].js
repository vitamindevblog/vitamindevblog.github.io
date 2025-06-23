"use client";
import React from "react";
import fs from "fs";
import path from "path";
import matter from "gray-matter";
import { motion, useScroll, useSpring } from "framer-motion";
const Comment = dynamic(() => import("../../components/CommentFacebook"));
import dynamic from "next/dynamic";
import Image from "next/image";
import ReactMarkdown from "react-markdown";
import rehypeRaw from "rehype-raw";
import remarkGfm from "remark-gfm";
import Head from "next/head";

const DetailBlog = (props) => {
  const { data, content } = matter(props.content);

  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001,
  });
  const SOCIAL_SHARE = {
    FACEBOOK: "https://www.facebook.com/sharer.php?u=",
    LINKEDIN: "https://www.linkedin.com/shareArticle?mini=true&url=",
    TWITTER: "https://twitter.com/intent/tweet?url=",
  };

  const socialShareFaceBook = (type) => {
    window.open(`${SOCIAL_SHARE[type]}${window.location.href}`);
  };

  return (
    <>
      <Head>
        <title>{data.title}</title>
        <meta name="Vitamindev" content={data.title} />
      </Head>
      <motion.div
        className="progress-bar"
        style={{ scaleX: scrollYProgress }}
      />
      <div id="blog-post-container">
        <div className="prose main">
          <h3>Share to social</h3>
          <div className="social-share">
            <Image
              src={require("../../public/img/facebook-30.png")}
              width={30}
              height={30}
              alt="icon face"
              onClick={() => socialShareFaceBook("FACEBOOK")}
            />
            <Image
              src={require("../../public/img/twitter-30.png")}
              width={30}
              height={30}
              alt="icon twitter"
              onClick={() => socialShareFaceBook("TWITTER")}
            />
            <Image
              src={require("../../public/img/linkedin-30.png")}
              width={30}
              height={30}
              alt="icon linkedin"
              onClick={() => socialShareFaceBook("LINKEDIN")}
            />
          </div>
          <h1 className="header">{data.title}</h1>
          <Image
            src={require(`../../public/img/content/${data.img}`)}
            alt={data?.slug}
            className="w-full h-1/2 object-cover"
          />
          <ReactMarkdown
            remarkPlugins={[remarkGfm]}
            rehypePlugins={[rehypeRaw]}
            components={{
              h1: ({ node, ...props }) => (
                <h1 className="text-4xl my-6 font-bold" {...props} />
              ),
              h2: ({ node, ...props }) => (
                <h1 className="text-3xl my-6 font-bold" {...props} />
              ),
              h3: ({ node, ...props }) => (
                <h1 className="text-2xl my-6 font-bold" {...props} />
              ),
              h4: ({ node, ...props }) => (
                <h1 className="text-xl my-6 font-bold" {...props} />
              ),
              h5: ({ node, ...props }) => (
                <h1 className="text-lg my-6 font-bold" {...props} />
              ),
              h6: ({ node, ...props }) => (
                <h1 className="text-base my-6 font-bold" {...props} />
              ),
              ul: ({ node, ...props }) => (
                <ul className="list-disc pl-10" {...props} />
              ),
              ol: ({ node, ...props }) => (
                <ol className="list-decimal pl-10" {...props} />
              ),
              pre: ({ node, inline, className, children, ...props }) => (
                <pre
                  className="bg-[#1f2937] p-4 my-4 rounded text-[#e5e7eb]"
                  {...props}>
                  {children}
                </pre>
              ),
            }}>
            {content}
          </ReactMarkdown>

          <Comment />
        </div>
      </div>
    </>
  );
};

export default DetailBlog;

export async function getStaticPaths() {
  const files = fs.readdirSync(path.join(process.cwd(), "content"));
  const paths = files.map((filename) => ({
    params: {
      blog: filename.replace(".md", ""),
    },
  }));
  return {
    paths,
    fallback: false, // false: 404 nếu không tồn tại trong build
  };
}

// Lấy nội dung từng bài viết
export async function getStaticProps({ params }) {
  const filePath = path.join(process.cwd(), "content", `${params.blog}.md`);
  const content = fs.readFileSync(filePath, "utf8");
  return {
    props: {
      content,
    },
  };
}
