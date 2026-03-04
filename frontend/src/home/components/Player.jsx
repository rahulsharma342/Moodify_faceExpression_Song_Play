import React, { useEffect, useState } from "react";
import { useSong } from "../hooks/useSong";

const containerStyle = {
  width: "90%",
  maxWidth: "900px",
  margin: "24px auto",
  padding: "16px",
  border: "1px solid rgba(255,255,255,0.15)",
  borderRadius: "12px",
};

const emptyStyle = {
  width: "90%",
  maxWidth: "900px",
  margin: "24px auto",
  textAlign: "center",
  opacity: 0.8,
};

const listButtonStyle = {
  width: "100%",
  display: "flex",
  alignItems: "center",
  gap: "12px",
  background: "transparent",
  border: "none",
  color: "inherit",
  cursor: "pointer",
  padding: "8px",
  textAlign: "left",
};

const Player = () => {
  const { songs, loading } = useSong();
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    setCurrentIndex(0);
  }, [songs]);

  if (loading) {
    return <div style={emptyStyle}>Loading playlist...</div>;
  }

  if (!songs?.length) {
    return <div style={emptyStyle}>Detect your expression to load playlist.</div>;
  }

  const currentSong = songs[currentIndex];

  return (
    <section style={containerStyle}>
      <h2 style={{ marginBottom: "8px" }}>Playlist</h2>
      <p style={{ marginBottom: "16px", opacity: 0.8 }}>
        Mood: {currentSong.mood}
      </p>

      <audio
        key={currentSong._id}
        controls
        autoPlay
        src={currentSong.url}
        style={{ width: "100%", marginBottom: "16px" }}
      />

      <div style={{ display: "grid", gap: "8px" }}>
        {songs.map((song, index) => {
          const isActive = currentSong._id === song._id;

          return (
            <button
              key={song._id}
              onClick={() => setCurrentIndex(index)}
              style={{
                ...listButtonStyle,
                border: isActive
                  ? "1px solid rgba(255,255,255,0.5)"
                  : "1px solid rgba(255,255,255,0.15)",
                borderRadius: "10px",
              }}
            >
              <img
                src={song.posterUrl}
                alt={song.title}
                width={60}
                height={60}
                style={{ objectFit: "cover", borderRadius: "8px" }}
              />
              <div>
                <p>{song.title}</p>
                <small style={{ opacity: 0.75 }}>Mood: {song.mood}</small>
              </div>
            </button>
          );
        })}
      </div>
    </section>
  );
};

export default Player;
