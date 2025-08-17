import "../styles/pages/filmDetails.scss";

import type { AppDispatch, RootState } from "../store/store";
import { FilmDetailsLoader, Navigator } from "../components";
import { addToWishlist, removeFromWishlist } from "../store/wishlistSlice";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useMemo } from "react";

import { fetchFilmDetails } from "../store/filmDetailsSlice";
import { getPrimaryGenre } from "../utils/genre";
import { toast } from "react-toastify";
import { useParams } from "react-router-dom";

const FilmDetails = () => {
  const dispatch = useDispatch<AppDispatch>();

  // Extract film id from params of url
  const { id } = useParams();

  const { currentFilm: film, isLoading } = useSelector((state: RootState) => state.filmDetails);
  const wishlistFilms = useSelector((state: RootState) => state.wishlistData.films);

  const isInWishlist = useMemo(() => wishlistFilms.some((f) => film?.id === f.id), [wishlistFilms, film?.id]);

  const primaryGenre = useMemo(() => getPrimaryGenre(film?.genres || []), [film?.genres]);

  useEffect(() => {
    if (id) dispatch(fetchFilmDetails({ id: Number(id) }));
  }, [dispatch, id]);

  if (isLoading) return <FilmDetailsLoader />;

  // Hanlde add to wishlist method
  const handleAddRemoveWishlist = () => {
    if (isInWishlist) {
      // Remove film from wishlist
      if (film) dispatch(removeFromWishlist(film.id));

      toast.error("Film removed from wishlist");
    } else {
      // Add film to wishlist
      if (film) dispatch(addToWishlist(film));

      toast.success("Film added to wishlist");
    }

    // Save immediately after dispatch
    const newWishlist = isInWishlist ? wishlistFilms.filter((f) => film && f.id !== film.id) : [...wishlistFilms, film];
    localStorage.setItem("wishlist", JSON.stringify(newWishlist));

    // Wait 2 seconds then reload
    setTimeout(() => {
      window.location.reload();
    }, 2000);
  };

  return (
    <div className={`film-details genre-${primaryGenre.id}`}>
      <h1 className="main-title">Film Details: {film?.title}</h1>

      <Navigator />

      <div className="film-details-container">
        {/* Left Column - Image */}
        <div>
          <img src={`https://image.tmdb.org/t/p/w780${film?.poster_path}`} alt={film?.title} className="film-details-poster" />
          <span className="genre-badge">{primaryGenre.name}</span>
        </div>

        {/* Right Column - Title/Description/Button */}
        <div className="film-details-info">
          <h1 className="title">{film?.title}</h1>
          <p className="overview">{film?.overview}</p>

          {/* wishlist button: add or remove */}
          {isInWishlist ? (
            <button className="remove-btn" onClick={handleAddRemoveWishlist}>
              &#10006; Remove from Wishlist
            </button>
          ) : (
            <button className="wishlist-btn" onClick={handleAddRemoveWishlist}>
              Add to Wishlist
            </button>
          )}
        </div>
      </div>

      {/* Full Row Section - Additional Info */}
      <div className="film-details-extra-info">
        <div>
          <b>Release Date:</b> <span>{film?.release_date}</span>{" "}
        </div>

        <div>
          <b>Rating:</b> <span>{film?.vote_average}/10</span>
        </div>

        <div>
          <b>Status:</b> <span className={`status-${film?.status.toLowerCase()}`}>{film?.status}</span>
        </div>

        <div>
          <b>Tagline:</b> <span>{film?.tagline !== "" ? film?.tagline : "N/A"}</span>
        </div>

        <div>
          <b>⚠️ Adultts Only:</b> <span>{film?.adult ? "YES" : "NO"}</span>
        </div>
      </div>
    </div>
  );
};

export default FilmDetails;
