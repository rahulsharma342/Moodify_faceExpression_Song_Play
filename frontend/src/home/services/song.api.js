import axios from "axios";

const api = axios.create({
    baseURL:"https://moodify-faceexpression-song-play.onrender.com",
    withCredentials:true
})

export async function getSongs(mood){
    try {
        const response = await api.get("/api/songs?mood="+mood);
        return response.data;
    } catch (error) {
        console.error("Error fetching songs:", error);
        throw error;
    }
}
