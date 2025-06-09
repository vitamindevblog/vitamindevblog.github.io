"use client";
import React from "react";
import matter from "gray-matter";
import { motion, useScroll, useSpring } from "framer-motion";
const Comment = dynamic(() => import("../../components/CommentFacebook"));
import dynamic from "next/dynamic";
import Image from "next/image";
import ReactMarkdown from "react-markdown";
import rehypeRaw from "rehype-raw";
import remarkGfm from "remark-gfm";

const DetailBlog = (props) => {
  const { data, content } = matter(props.content);
  console.log("data", data);

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
      <motion.div
        className="progress-bar"
        style={{ scaleX: scrollYProgress }}
      />
      <div id="blog-post-container">
        <div
          className="prose main"
          style={{ background: "rgb(250, 250, 250)" }}>
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
            rehypePlugins={[rehypeRaw]}>
            {content}
          </ReactMarkdown>

          {/* <Comment /> */}
        </div>
      </div>
    </>
  );
};

export default DetailBlog;

export const getServerSideProps = async (context) => {
  const fs = require("fs");

  const { blog } = context.params;

  const content = fs.readFileSync(
    `${process.cwd()}/content/${blog}.md`,
    "utf8"
  );

  return {
    props: {
      content,
    },
  };
};
