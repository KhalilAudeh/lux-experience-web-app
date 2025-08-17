import type { AppDispatch, RootState } from "../store/store";
import { Carousel, FilmCardLoader, Navigator } from "../components";
import { useDispatch, useSelector } from "react-redux";

import { fetchFilmsByCategory } from "../store/filmsSlice";
import { useEffect } from "react";

// Define categories with titles and Redux state keys
const CATEGORIES = [
  {
    id: "now_playing",
    title: "Now Playing",
    stateKey: "nowPlayingFilms" as const, // Ensures type safety
  },
  {
    id: "top_rated",
    title: "Top Rated",
    stateKey: "topRatedFilms" as const,
  },
  {
    id: "popular",
    title: "Popular",
    stateKey: "popularFilms" as const,
  },
];

const Home = () => {
  const dispatch = useDispatch<AppDispatch>();
  const data = useSelector((state: RootState) => state.films);

  useEffect(() => {
    // Fetch all films with 3 different catgories
    CATEGORIES.forEach((category) => {
      dispatch(fetchFilmsByCategory({ category: category.id }));
    });
  }, [dispatch]);

  return (
    <div>
      <h1 className="main-title">Films List By Category</h1>

      <Navigator />

      {CATEGORIES.map((category) =>
        data.isLoading ? <FilmCardLoader /> : <Carousel key={category.id} title={category.title} films={data[category.stateKey]?.results || []} />
      )}
    </div>
  );
};

export default Home;
