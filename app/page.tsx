import PostCard from "@/components/PostCard";
import Pagination from "@/components/Pagination";
import "./page.css";
import { getPost } from "@/lib/queries";

interface Props{
  searchParams: Promise<{page?: string}>
}

export default async function HomePage({searchParams}: Props) {
  const { page: pageStr} = await searchParams;
  const page = parseInt(pageStr || '1');
  const {posts,totalPages,} = await getPost({page});
  console.log(posts);
  return (
    <main>
      <section className="hero">
        <h1 className="hero-title">
          Stories for developers,
          <br />
          by developers.
        </h1>
        <p className="hero-subtitle">
          Next.js 16で構築されたモダンなブログプラットフォーム
        </p>
      </section>

      {/* 記事がない場合はこちらをコメントイン、下のグリッドをコメントアウト */}
     {posts.length === 0 ? (
        <p className="empty">まだ記事がありません</p>
     ) : (
      <div className="grid">
      {posts.map((post) =>(        
        <PostCard key={post.id} post={post} />      
      ))}
      </div>      
     )}
     {totalPages > 1 && <Pagination currentPage={page} totalPages={totalPages}/>}       
      
    </main>
  );
}
