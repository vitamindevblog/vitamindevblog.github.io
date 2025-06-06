import { NextResponse } from "next/server";
import fs from "fs";
import path from "path";

export async function GET(req, { params }) {
  const { blog } = await params;
  const filePath = path.join(process.cwd(), "content", `${blog}.md`);

  try {
    const content = fs.readFileSync(filePath, "utf-8").trim();
    return NextResponse.json({ content });
  } catch (error) {
    return NextResponse.json({ error: "File not found" }, { status: 404 });
  }
}
