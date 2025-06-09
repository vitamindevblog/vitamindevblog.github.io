import React from "react";
import { useRouter } from "next/navigation";
import { History } from "lucide-react";

const PostItem = ({ listItems }) => {
  const router = useRouter();

  const renderStyle = (category) => {
    switch (category) {
      case "HTML":
        return "bg-gradient-to-r from-orange-200 to-orange-400 text-orange-900 hover:from-orange-300 hover:to-orange-500 shadow-sm hover:rotate-1 font-semibold";
      case "CSS":
        return "bg-gradient-to-r from-blue-200 to-blue-400 text-blue-900 hover:from-blue-300 hover:to-blue-500 shadow-sm hover:rotate-1 font-semibold";
      case "Javascript":
        return "bg-gradient-to-r from-yellow-200 to-yellow-400 text-yellow-900 hover:from-yellow-300 hover:to-yellow-500 shadow-sm hover:rotate-1 font-semibold";
      default:
        return "bg-gradient-to-r from-gray-200 to-gray-400 text-gray-900 hover:from-gray-300 hover:to-gray-500 shadow-sm hover:rotate-1 font-semibold";
    }
  };
  return (
    <div>
      {!listItems?.length ? (
        <div className="mt-10 text-lg font-normal text-center font-semibold">
          Chưa có bài viết nào để hiển thị
        </div>
      ) : (
        listItems?.map((blog, i) => (
          <div
            className="px-4 py-2 justify-between mb-3 bg-white rounded-lg shadow cursor-pointer md:flex ring-1 ring-gray-200 hover:shadow-lg transition-all duration-300"
            key={i}
            onClick={() => router.push(`/vitamins/${blog?.slug}`)}>
            <div>
              <div className="blogTitle">{blog?.title}</div>
              <div className="font-semibold text-gray-900">
                {blog?.description}
              </div>
              <div className="flex items-center gap-2 max-md:mb-2 text-sm text-gray-400">
                <History />
                {blog?.date}
              </div>
            </div>
            <div
              style={{
                height: "max-content",
                width: "max-content",
                padding: "5px 10px",
                borderRadius: 3,
              }}
              className={renderStyle(blog?.category)}>
              {blog?.category}
            </div>

            <div className="block px-3 py-1 mt-3 text-white duration-300 ease-in-out rounded md:hidden bg-slate-600 w-max hover:scale-105">
              Xem bài viết &rarr;
            </div>
          </div>
        ))
      )}
    </div>
  );
};

export default PostItem;
