import "../../styles/components/skeleton.scss";

import type { FC } from "react";

const FilmCardLoader: FC = () => {
  return (
    <div className="skeleton-loader">
      {[...Array(5)].map((_, i) => (
        <div key={i} className="skeleton-card">
          <div className="skeleton-poster" />
          <div className="skeleton-title" />
        </div>
      ))}
    </div>
  );
};

export default FilmCardLoader;
