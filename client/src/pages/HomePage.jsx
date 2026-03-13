import { useState, useMemo, useCallback } from "react";
import useFetchPhotos from "../hooks/useFetchPhotos.jsx";
import Spinner from "../components/Spinner.jsx";
import { useUI } from "../context/UIContext.jsx";
import { useReducer } from "react";
import {
  favouritesReducer,
  initialState,
} from "../reducers/favouritesReducer.js";

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
    <>
      <div style={{ padding: "40px", fontFamily: "Arial, sans-serif" }}>
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            marginBottom: "20px",
          }}
        >
          <h1 style={{ fontSize: "30px" }}>Photo Gallery</h1>

          <button onClick={() => setShowFavs(!showFavs)}>
            {showFavs ? "Show All Photos" : "Show Favourites"}
          </button>
        </div>

        <input
          type="text"
          placeholder="Search"
          value={search}
          onChange={handleSearch}
          style={{
            width: "100%",
            padding: "10px",
            marginBottom: "30px",
            borderRadius: "6px",
            border: "1px solid #ccc",
          }}
        />

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fill, minmax(250px, 1fr))",
            gap: "20px",
          }}
        >
          {displayedPhotos.length === 0 && <p>No photos found.</p>}

          {displayedPhotos.map((photo) => {
            const isFav = favourites[photo.id];
            return (
              <div
                key={photo.id}
                style={{
                  border: "1px solid #ddd",
                  borderRadius: "8px",
                  padding: "10px",
                }}
              >
                <img
                  src={photo.download_url}
                  alt={photo.author}
                  style={{
                    width: "100%",
                    borderRadius: "6px",
                  }}
                />

                <p style={{ marginTop: "8px" }}>{photo.author}</p>
                <button onClick={() => toggleFav(photo.id)} className="text-xl">
                  {isFav ? "❤️" : "🤍"}
                </button>
              </div>
            );
          })}
        </div>
      </div>
    </>
  );
}
