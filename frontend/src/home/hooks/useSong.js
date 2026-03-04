import { getSongs } from "../services/song.api";
import { useContext } from "react";
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
            const data = await getSongs(mood);
            setSongs(data.songs);
        } catch (error) {
            console.error("Error fetching songs:", error);
        } finally {
            setLoading(false);
        }
    };

    return { songs, loading, fetchSongs };
};