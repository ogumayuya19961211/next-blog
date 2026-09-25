import PostForm from "@/components/PostForm";
import "./page.css";
import { getPostById } from "@/lib/queries";
import { notFound, redirect } from "next/navigation";
import { cookies } from "next/headers";
import { verifyToken } from "@/lib/jwt";
import { updatePost } from "@/lib/actions";

interface Props{
  params: Promise<{id: string}>
}

export default async function EditPostPage({params}: Props) {
  const {id} = await params;
  const post = await getPostById(parseInt(id));

  if(!post) notFound();

  const cookeStore = await cookies();
  const token = cookeStore.get('token')?.value;
  const user = verifyToken(token);

  if(!user || user.id !== post.userId) redirect('/dashboard');

  const action = updatePost.bind(null, post.id);

  return (
    <div className="page">
      <h1 className="page-title">記事を編集</h1>
      <PostForm action={action} initialTitle={post.title} initialContent={post.content}/>
    </div>
  );
}
