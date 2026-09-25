import Link from "next/link";
import "./page.css";
import { getPostById } from "@/lib/queries";
import { notFound } from "next/navigation";
import { cookies } from "next/headers";
import { verify } from "crypto";
import ReactMarkDown from "react-markdown";
import { verifyToken } from "@/lib/jwt";

import remarkGfm from "remark-gfm";
import { postDelete } from "@/lib/actions";

interface Props{
  params: Promise<{id: string}>
}

export default async function PostDetailPage({params}: Props) {
  const { id } = await params;
  const post =  await getPostById(parseInt(id));

  if(!post) notFound();

  const cookeStore = await cookies();
  const token = cookeStore.get('token')?.value;
  const user = verifyToken(token);
  const isAuthor = user?.id === post.userId;

  return (
    <article className="article">
      <span className="tag">Article</span>

      <h1 className="article-title">{post.title}</h1>

      <div className="article-meta">
        <div className="author-avatar">{post.user.name.charAt(0).toUpperCase()}</div>
        <span>{post.user.name}</span>
        <span>·</span>
        <span>{post.updatedAt.toLocaleDateString('ja-JP')}</span>
      </div>

      <div className="divider" />


      <div className="content">
        <ReactMarkDown remarkPlugins={[remarkGfm]}>{post.content}</ReactMarkDown>        
      </div>

      {/* 記事の著者の場合は編集・削除ボタンを表示（コメントインで確認可能） */}
      {isAuthor && (
        <div className="actions">
        <Link href={`/posts/${post.id}/edit`} className="button-edit">
          編集する
        </Link>
        <form action={postDelete.bind(null, post.id)}>
          <button type="submit" className="button-delete">
            削除する
          </button>
        </form>
      </div>
      )}
      <Link href="/" className="back-link">
        ← 一覧に戻る
      </Link>
    </article>
  );
}
