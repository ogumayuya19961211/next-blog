import Link from "next/link";
import "./index.css";
import { Post } from "@/entities/post";

interface Props{
  post: Post;
}

export default function PostCard({post}: Props) {
  const excerpt = post.content.slice(0,100) + (post.content.length > 100 ? '...' : '');
  return (
    <Link href={`/posts/${post.id}`} className="card">
      <div className="thumbnail">
        <span className="tag">Article</span>
      </div>
      <div className="body">
        <h2 className="title">{post.title}</h2>
        <div className="meta">
          <span>{post.user.name}</span>
          <span className="meta-dot" />
          <span>{post.createdAt.toLocaleDateString("ja-jp")}</span>
        </div>
        <p className="excerpt">{excerpt}</p>
        <span className="read-more">
          Read more <span className="read-more-arrow">→</span>
        </span>
      </div>
    </Link>
  );
}
