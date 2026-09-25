import Link from "next/link";
import "./not-found.css";

export default function NotFound() {
  return (
    <div className="not-found">
      <p className="error-code">404</p>
      <h1 className="title">ページが見つかりません</h1>
      <p className="message">
        お探しのページは存在しないか、移動した可能性があります。
      </p>
      <Link href="/" className="back-link">
        ← トップへ戻る
      </Link>
    </div>
  );
}
