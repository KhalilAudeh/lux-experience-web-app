import "../styles/components/carousel.scss";

import { FiChevronLeft, FiChevronRight } from "react-icons/fi";
import { useEffect, useRef, useState, type FC } from "react";

import type { Film } from "../types";
import FilmCard from "./FilmCard";

interface CarouselProps {
  title: string;
  films: Film[];
}

const Carousel: FC<CarouselProps> = ({ title, films }) => {
  const containerRef = useRef<HTMLDivElement>(null);

  // variables to be used for logic on extremes
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(false);

  // Update scroll button states
  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const updateScrollState = () => {
      const { scrollLeft, scrollWidth, clientWidth } = container;
      setCanScrollLeft(scrollLeft > 0);
      setCanScrollRight(scrollLeft < scrollWidth - clientWidth - 1); // -1 for rounding errors
    };

    // Initial check
    updateScrollState();

    // Listen to scroll events
    container.addEventListener("scroll", updateScrollState);

    // Cleanup
    return () => {
      container.removeEventListener("scroll", updateScrollState);
    };
  }, [films]); // Re-run when films change

  const scroll = (direction: "left" | "right") => {
    if (!containerRef.current) return;

    const container = containerRef.current;
    const scrollAmount = container.clientWidth * 0.8; // Scroll 80% of container width

    container.scrollBy({
      left: direction === "left" ? -scrollAmount : scrollAmount,
      behavior: "smooth",
    });
  };

  return (
    <div className="carousel">
      <div className="carousel-header">
        {/* carousel category title */}
        <h2 className="carousel-title">{title}</h2>

        {/* horizantal scroll navigation */}
        <div className="carousel-controls">
          <button onClick={() => scroll("left")} aria-label="Scroll left" disabled={!canScrollLeft} className={!canScrollLeft ? "disabled" : ""}>
            <FiChevronLeft />
          </button>
          <button onClick={() => scroll("right")} aria-label="Scroll right" disabled={!canScrollRight} className={!canScrollRight ? "disabled" : ""}>
            <FiChevronRight />
          </button>
        </div>
      </div>

      {/* carousel data results container */}
      <div className="carousel-container" ref={containerRef}>
        {films.map((film) => (
          <FilmCard key={film.id} film={film} />
        ))}
      </div>
    </div>
  );
};

export default Carousel;
