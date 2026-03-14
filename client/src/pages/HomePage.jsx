import { useState, useMemo, useCallback } from "react";
import useFetchPhotos from "../hooks/useFetchPhotos.jsx";
import Spinner from "../components/Spinner.jsx";
import { useUI } from "../hooks/context/UIContext.jsx";
import { useReducer } from "react";
import "../App.css";
import {
  favouritesReducer,
  initialState,
} from "../hooks/reducers/favouritesReducer.js";

export default function HomePage() {
  const [search, setSearch] = useState("");
  const { photos } = useFetchPhotos();
  const { loading } = useUI();
  const [favourites, dispatch] = useReducer(favouritesReducer, initialState);
  const [showFavs, setShowFavs] = useState(false);

  const handleSearch = useCallback((e) => {
    setSearch(e.target.value);
  }, []);

  const favrouitePhotos = useMemo(() => {
    return photos.filter((photo) => favourites[photo.id]);
  }, [photos, favourites]);

  const filteredPhotos = useMemo(() => {
    if (!search) return photos;

    return photos.filter((input) => {
      return input.author.toLowerCase().includes(search.toLowerCase());
    });
  }, [photos, search]);

  const displayedPhotos = showFavs ? favrouitePhotos : filteredPhotos;

  const toggleFav = (id) => {
    dispatch({
      type: "TOGGLE_FAV",
      payload: id,
    });
  };

  if (loading) {
    return <Spinner />;
  }

  return (
    <div className="gallery-page">
      <div className="gallery-header">
        <h1 className="gallery-title">Photo Gallery</h1>

        <button
          className="toggle-favs-btn"
          onClick={() => setShowFavs(!showFavs)}
        >
          {showFavs ? "Show All Photos" : "Show Favourites"}
        </button>
      </div>

      <input
        type="text"
        placeholder="Search"
        value={search}
        onChange={handleSearch}
        className="gallery-search"
      />

      <div className="gallery-grid">
        {displayedPhotos.length === 0 && <p>No photos found.</p>}

        {displayedPhotos.map((photo) => {
          const isFav = favourites[photo.id];
          return (
            <article key={photo.id} className="photo-card">
              <img
                src={photo.download_url}
                alt={photo.author}
                className="photo-card-image"
              />

              <div className="photo-card-footer">
                <p className="photo-author">{photo.author}</p>
                <button
                  onClick={() => toggleFav(photo.id)}
                  className="fav-btn"
                  aria-label={
                    isFav ? "Remove from favourites" : "Add to favourites"
                  }
                >
                  {isFav ? "❤️" : "🤍"}
                </button>
              </div>
            </article>
          );
        })}
      </div>
    </div>
  );
}
