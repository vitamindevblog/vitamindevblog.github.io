"use client";
import rehypeRaw from "rehype-raw";
import remarkGfm from "remark-gfm";
import ReactMarkdown from "react-markdown";
import Image from "next/image";
import Header from "../../../components/Header";
import Loading from "../../../components/Loading";
import { motion, useScroll, useSpring } from "framer-motion";
import { useEffect, useState } from "react";
import { fetchBlogContent } from "./getContent";
import { useParams } from "next/navigation";
import dynamic from "next/dynamic";
const Comment = dynamic(() => import("../../../components/CommentFacebook"));
function Blog() {
  const params = useParams();
  const [content, setContent] = useState();
  const [data, setData] = useState();
  const [loading, setLoading] = useState(true);
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

  useEffect(() => {
    async function initData() {
      const res = await fetchBlogContent(params.blog);
      setData(res.data);
      setContent(res.content);
      setLoading(false);
    }
    initData();
  }, []);

  return (
    // <Layout>
    <>
      <Header />
      <motion.div
        className="progress-bar"
        style={{ scaleX: scrollYProgress }}
      />
      <Loading loading={loading} />
      {data && (
        <div id="blog-post-container">
          <div
            className="prose main"
            style={{ background: "rgb(250, 250, 250)" }}>
            <h3>Share to social</h3>
            <div className="social-share">
              <Image
                src={require("../../../public/img/facebook-30.png")}
                width={30}
                height={30}
                alt="icon face"
                onClick={() => socialShareFaceBook("FACEBOOK")}
              />
              <Image
                src={require("../../../public/img/twitter-30.png")}
                width={30}
                height={30}
                alt="icon twitter"
                onClick={() => socialShareFaceBook("TWITTER")}
              />
              <Image
                src={require("../../../public/img/linkedin-30.png")}
                width={30}
                height={30}
                alt="icon linkedin"
                onClick={() => socialShareFaceBook("LINKEDIN")}
              />
            </div>
            <h1 className="header">{data?.title}</h1>
            <Image
              src={require(`../../../public/img/content/${data?.img}`)}
              alt={data?.slug}
              className="w-full h-1/2 object-cover"
            />
            <ReactMarkdown
              remarkPlugins={[remarkGfm]}
              rehypePlugins={[rehypeRaw]}>
              {content}
            </ReactMarkdown>

            <Comment />
          </div>
        </div>
      )}
    </>
  );
}

export default Blog;
