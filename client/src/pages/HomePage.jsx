import { useState, useMemo, useCallback } from "react";

export default function HomePage() {
  const [search, setSearch] = useState("");
  const photos = []; // useFetchPhotos()

  const handleSearch = useCallback((e) => {
    setSearch(e.target.value);
  }, []);

//   const filteredPhotos = useMemo(() => {
//     if (!search) return photos;

//     return photos.filter((input) => {
//       input.author.toLowerCase().includes(search.toLowerCase());
//     });
//   }, [photos, search]);

  return (
    <>
      <div style={{ padding: "40px", fontFamily: "Arial, sans-serif" }}>
        <h1 style={{ fontSize: "30px", marginBottom: "20px" }}>
          Photo Gallery
        </h1>

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
          {filteredPhotos.length === 0 && <p>No photos found.</p>}

          {filteredPhotos.map((photo) => (
            <div
              key={photo.id}
              style={{
                border: "1px solid #ddd",
                borderRadius: "8px",
                padding: "10px",
              }}
            >
              {/* <img
                src={}
                alt={}
                style={{
                  width: "100%",
                  borderRadius: "6px",
                }}
              /> */}

              {/* <p style={{ marginTop: "8px" }}>{}</p> */}
            </div>
          ))}
        </div>
      </div>
    </>
  );
}
