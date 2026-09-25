import Link from "next/link";
import "./page.css";
import { cookies } from "next/headers";
import { verify } from "crypto";
import { verifyToken } from "@/lib/jwt";
import { redirect } from "next/navigation";
import { getPost } from "@/lib/queries";
import { postDelete } from "@/lib/actions";
import Pagination from "@/components/Pagination";

interface Props{
  searchParams: Promise<{page?: string}>
}

export default async function DashboardPage({searchParams}: Props) {

  const cookieStore = await cookies();
  const token = cookieStore.get("token")?.value;
  const user = verifyToken(token);
  if(!user) return redirect('/auth/signin');

  const {page: pagestr} = await searchParams;
  const page = parseInt(pagestr || '1');
  const {posts, totalPages} = await getPost({isOwn: true, page});

  return (
    <div className="page">
      <div className="dashboard-header">
        <h1 className="page-title">My Articles</h1>
        <Link href="/posts/new" className="new-post-button">
          ＋ 新規作成
        </Link>
      </div>

      {/* 記事がない場合はこちらをコメントイン、下のリストをコメントアウト */}
      {posts.length === 0 ? (
        <p className="empty">まだ記事がありません。最初の記事を書いてみましょう。</p>
      ) : (                               
      <div className="article-list">
          {posts.map((post) => (
            <div key={post.id} className="article-row">
              <span className={`status-badge ${post.published ? "status-published" : "status-draft"} `}>
                <span className={`status-badge ${post.published ? "status-dot-published" : "status-dot-draft"} `} />
                  {post.published ? '公開' : '下書き'}
                </span>
                <Link href={`/posts/${post.id}`} className="article-title">
                  {post.title}
                </Link>
                <span className="article-date">{post.updatedAt.toLocaleDateString('ja-JP')}</span>
                <div className="article-actions">
                  <Link href={`/posts/${post.id}/edit`} className="icon-button" title="編集">
                    ✎
                  </Link>
                  <form action={postDelete.bind(null, post.id)}>
                    <button type="submit" className="icon-button icon-button-danger" title="削除">
                      🗑
                    </button>
                  </form>
                </div>
              </div>    
          ))}                               
      </div>
      )}
      {totalPages > 1 && (
        <Pagination currentPage={page} totalPages={totalPages} basePath="/dashboard" />
      )

      }
    </div>
  );
}
