import "../styles/components/filmCard.scss";

import type { AppDispatch } from "../store/store";
import type { FC } from "react";
import type { Film } from "../types";
import { clearCurrentFilm } from "../store/filmDetailsSlice";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";

interface FilmCardProps {
  film: Film;
}

const FilmCard: FC<FilmCardProps> = ({ film }) => {
  const dispatch = useDispatch<AppDispatch>();

  const navigate = useNavigate();

  // Handle film card click
  const handleCardClick = () => {
    // Clear previous film data before navigation
    dispatch(clearCurrentFilm());

    // Navigate to film details page
    navigate(`/film/${film.id}`);
  };

  return (
    <div className="film-card" onClick={handleCardClick}>
      <img src={`https://image.tmdb.org/t/p/w200${film.poster_path}`} alt={film.title} className="film-poster" />
      <h3 className="film-title">{film.title}</h3>
    </div>
  );
};

export default FilmCard;
