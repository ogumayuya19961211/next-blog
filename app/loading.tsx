import "./loading.css";

export default function Loading() {
  return (
    <main>
      <section className="hero-skeleton">
        <div className="skeleton hero-title-sk" />
        <div className="skeleton hero-subtitle-sk" />
      </section>
      <div className="grid-skeleton">
        {[...Array(4)].map((_, i) => (
          <div key={i} className="card-skeleton">
            <div className="skeleton thumbnail-sk" />
            <div className="body-sk">
              <div className="skeleton line-sk line-full" />
              <div className="skeleton line-sk line-three-quarter" />
              <div className="skeleton line-sk line-half" />
            </div>
          </div>
        ))}
      </div>
    </main>
  );
}
