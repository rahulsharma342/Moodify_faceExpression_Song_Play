import {createContext, useEffect, useState} from "react";

export const SongContext = createContext();
export const SongContextProvider = ({children}) => {
    const localSongs = JSON.parse(localStorage.getItem("songs")) || [];
    const [songs, setSongs] = useState(localSongs);
    const [loading, setLoading] = useState(false);

    // Persist songs to localStorage whenever they change
    useEffect(() => {
        localStorage.setItem("songs", JSON.stringify(songs));
    }, [songs]);

    return (
        <SongContext.Provider value={{songs, setSongs, loading, setLoading}}>
            {children}
        </SongContext.Provider>
    )
}
