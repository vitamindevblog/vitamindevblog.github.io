"use client";
import { useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import matter from "gray-matter";
import Head from "next/head";
import PostItem from "@/components/PostItem";
import { SquareArrowLeft, SquareArrowRight } from "lucide-react";
import Footer from "@/components/Footer";

const limitItems = 10;
export default function Home(props) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [listPosts, setListPosts] = useState([]);
  const [backupListPosts, setBackupListPosts] = useState([]);
  const [totalPage, setTotalPage] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    const pageOnUrl = searchParams.get("page");

    const realData = props?.data?.map((blog) => matter(blog));
    let listItems = realData?.map((listItem) => listItem.data) || [];
    listItems = listItems?.sort((a, b) => {
      return new Date(b.date).getTime() - new Date(a.date).getTime();
    });
    setBackupListPosts(listItems);

    if (pageOnUrl) {
      let pageNumber = Number(pageOnUrl);

      setCurrentPage(pageNumber);
      setListPosts(
        listItems.slice((pageNumber - 1) * limitItems, pageNumber * limitItems)
      );
    } else {
      setListPosts(listItems.slice(0, limitItems));
    }

    setTotalPage(Math.ceil(listItems?.length / limitItems));
  }, []);

  const changePage = (page) => {
    setCurrentPage(page);
    router.replace(`/?page=${page}`);

    setListPosts(
      backupListPosts.slice((page - 1) * limitItems, page * limitItems)
    );
  };

  return (
    <div>
      <Head>
        <meta charSet="UTF-8" />
        <title>Vitamindev Blog</title>
        <meta name="Vitamindev Blog" content="Vitamindev Blog"></meta>
      </Head>
      <section className="flex flex-col justify-between">
        <div className="mb-auto main" data-aos="fade-up">
          <div className="text-xl font-bold border-b-2 max-w-max mb-5">
            Bài viết
          </div>
          <PostItem listItems={listPosts} />

          {listPosts.length > 0 && (
            <div className="flex items-center gap-2 mt-10 text-lg font-semibold">
              <SquareArrowLeft
                className={
                  currentPage === 1
                    ? "cursor-pointer disable-div"
                    : "cursor-pointer"
                }
                onClick={() => changePage(currentPage - 1)}
              />
              <div className="text-sm">
                {currentPage} / {totalPage} trang
              </div>
              <SquareArrowRight
                className={
                  currentPage === totalPage
                    ? "cursor-pointer disable-div"
                    : "cursor-pointer"
                }
                onClick={() => changePage(currentPage + 1)}
              />
            </div>
          )}
        </div>
        <Footer />
      </section>
    </div>
  );
}

export const getStaticProps = async () => {
  const fs = require("fs");

  const files = fs.readdirSync(`${process.cwd()}/content`, "utf-8");

  const blogs = files.filter((fn) => fn.endsWith(".md"));

  const data = blogs.map((blog) => {
    const path = `${process.cwd()}/content/${blog}`;
    const rawContent = fs.readFileSync(path, {
      encoding: "utf-8",
    });

    return rawContent;
  });

  return {
    props: {
      data,
    },
  };
};
