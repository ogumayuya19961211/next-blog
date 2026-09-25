import PostForm from "@/components/PostForm";
import "./page.css";
import { createPost } from "@/lib/actions";
import { cookies } from "next/headers";
import { verify } from "crypto";
import { verifyToken } from "@/lib/jwt";
import { redirect } from "next/navigation";

export default async function NewPostPage() {
  const cookieStore = await cookies();
  const token = cookieStore.get('token')?.value;
  const user = verifyToken(token);
  if(!user) redirect ('/auth/signin')

  return (
    <div className="page">
      <h1 className="page-title">新規記事作成</h1>
      <PostForm action={createPost}/>
    </div>
  );
}
