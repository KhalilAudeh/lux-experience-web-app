import { FilmCard, Navigator } from "../components";

import type { RootState } from "../store/store";
import { useSelector } from "react-redux";

const Wishlist = () => {
  const films = useSelector((state: RootState) => state.wishlistData.films);

  return (
    <div>
      <h1 className="main-title">Your Wishlist</h1>

      <Navigator />

      {films.length === 0 ? (
        <p>Your wishlist is empty</p>
      ) : (
        <div style={{ display: "flex", gap: "2rem", flexWrap: "wrap" }}>
          {films.map((film) => (
            <FilmCard key={film.id} film={film} />
          ))}
        </div>
      )}
    </div>
  );
};

export default Wishlist;
