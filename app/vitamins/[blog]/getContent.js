import matter from "gray-matter";

export async function fetchBlogContent(blog) {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_BASE_URL}/api/blogs/${blog}`
  );
  if (!res.ok) throw new Error("Blog not found");
  const data = await res.json();
  return matter(data.content);
}
