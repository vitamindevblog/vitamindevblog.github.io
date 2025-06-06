import { NextResponse } from "next/server";
import fs from "fs";
import path from "path";

export async function GET() {
  try {
    // Lấy đường dẫn thư mục chứa markdown
    const contentDir = path.join(process.cwd(), "content");

    // Đọc danh sách file trong thư mục
    const files = fs.readdirSync(contentDir, "utf-8");

    // Lọc ra các file có đuôi .md
    const blogs = files.filter((file) => file.endsWith(".md"));

    // Đọc nội dung của từng file markdown
    const data = blogs.map((blog) => {
      const filePath = path.join(contentDir, blog);
      const rawContent = fs.readFileSync(filePath, "utf-8");
      return { filename: blog, content: rawContent };
    });

    return NextResponse.json({ data });
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to load blogs" },
      { status: 500 }
    );
  }
}
