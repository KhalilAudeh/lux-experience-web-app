import "../../styles/components/skeleton.scss";

import type { FC } from "react";

const FilmDetailsLoader: FC = () => (
  <div className="skeleton-container">
    <div className="skeleton-poster" />
    <div className="skeleton-text" />
    <div className="skeleton-text" />
  </div>
);

export default FilmDetailsLoader;
