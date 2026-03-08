import { getSongs } from "../services/song.api";
import { useContext, useEffect } from "react";
import { SongContext } from "../song.context";

export const useSong = () => {
  const context = useContext(SongContext);

  if (!context) {
    throw new Error("useSong must be used inside SongContextProvider");
  }

  const { songs, setSongs, loading, setLoading } = context;

  const fetchSongs = async (mood) => {
    try {
      setLoading(true);
      localStorage.setItem("mood", mood);
      const data = await getSongs(mood);
      setSongs(data.songs);
    } catch (error) {
      console.error("Error fetching songs:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const savedMood = localStorage.getItem("mood");

    if (savedMood && songs.length === 0) {
      fetchSongs(savedMood);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return { songs, loading, fetchSongs };
};
