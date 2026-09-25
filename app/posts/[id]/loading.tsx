import "./loading.css";

export default function Loading() {
  return (
    <div className="article-skeleton">
      <div className="skeleton tag-sk" />
      <div className="skeleton title-sk" />
      <div className="skeleton meta-sk" />
      <div className="divider-sk" />
      <div className="lines-sk">
        <div className="skeleton line-sk line-full" />
        <div className="skeleton line-sk line-ninety" />
        <div className="skeleton line-sk line-full" />
        <div className="skeleton line-sk line-eighty" />
        <div className="skeleton line-sk line-full" />
        <div className="skeleton line-sk line-seventy" />
      </div>
    </div>
  );
}
