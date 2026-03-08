// import React, { useEffect, useRef, useState } from "react";
// import { useSong } from "../hooks/useSong";
// import "../styles/player.scss";

// const formatTime = (timeInSeconds) => {
//   if (!Number.isFinite(timeInSeconds) || timeInSeconds < 0) {
//     return "0:00";
//   }

//   const minutes = Math.floor(timeInSeconds / 60);
//   const seconds = Math.floor(timeInSeconds % 60)
//     .toString()
//     .padStart(2, "0");

//   return `${minutes}:${seconds}`;
// };

// const Player = () => {
//   const { songs, loading } = useSong();
//   const [currentIndex, setCurrentIndex] = useState(0);
//   const [isPlaying, setIsPlaying] = useState(false);
//   const [currentTime, setCurrentTime] = useState(0);
//   const [duration, setDuration] = useState(0);
//   const [volume, setVolume] = useState(0.8);
//   const [isMuted, setIsMuted] = useState(false);
//   const audioRef = useRef(null);
//   const previousVolumeRef = useRef(0.8);
//   const currentSong = songs[currentIndex] ?? null;

//   useEffect(() => {
//     setCurrentIndex(0);
//     setCurrentTime(0);
//     setDuration(0);
//     setIsPlaying(false);
//   }, [songs]);

//   useEffect(() => {
//     const audioElement = audioRef.current;

//     if (!audioElement || !currentSong) {
//       return;
//     }

//     audioElement.volume = volume;
//     audioElement.muted = isMuted;
//   }, [isMuted, volume]);

//   useEffect(() => {
//     const audioElement = audioRef.current;

//     if (!audioElement) {
//       return;
//     }

//     audioElement.currentTime = 0;
//     setCurrentTime(0);

//     const playPromise = audioElement.play();

//     if (playPromise && typeof playPromise.then === "function") {
//       playPromise
//         .then(() => setIsPlaying(true))
//         .catch(() => setIsPlaying(false));
//     }
//   }, [currentSong?._id]);

//   if (loading) {
//     return (
//       <div className="player-loading">
//         <div className="loading-spinner"></div>
//         <p className="loading-text">Loading your playlist...</p>
//       </div>
//     );
//   }

//   if (!songs?.length || !currentSong) {
//     return (
//       <div className="player-empty">
//         <div className="empty-icon">🎵</div>
//         <p className="empty-message">
//           Detect your expression to load playlist.
//         </p>
//       </div>
//     );
//   }

//   const handlePrevious = () => {
//     setCurrentIndex((prev) => (prev === 0 ? songs.length - 1 : prev - 1));
//   };

//   const handleNext = () => {
//     setCurrentIndex((prev) => (prev === songs.length - 1 ? 0 : prev + 1));
//   };

//   const handleTogglePlay = () => {
//     const audioElement = audioRef.current;

//     if (!audioElement) {
//       return;
//     }

//     if (audioElement.paused) {
//       const playPromise = audioElement.play();

//       if (playPromise && typeof playPromise.then === "function") {
//         playPromise
//           .then(() => setIsPlaying(true))
//           .catch(() => setIsPlaying(false));
//       }
//       return;
//     }

//     audioElement.pause();
//     setIsPlaying(false);
//   };

//   const handleSeek = (event) => {
//     const audioElement = audioRef.current;

//     if (!audioElement) {
//       return;
//     }

//     const newTime = Number(event.target.value);
//     audioElement.currentTime = newTime;
//     setCurrentTime(newTime);
//   };

//   const handleVolumeChange = (event) => {
//     const newVolume = Number(event.target.value);
//     setVolume(newVolume);

//     if (newVolume > 0) {
//       previousVolumeRef.current = newVolume;
//       setIsMuted(false);
//     }
//   };

//   const handleMuteToggle = () => {
//     if (isMuted || volume === 0) {
//       const restoredVolume = previousVolumeRef.current || 0.8;
//       setVolume(restoredVolume);
//       setIsMuted(false);
//       return;
//     }

//     previousVolumeRef.current = volume;
//     setVolume(0);
//     setIsMuted(true);
//   };

//   const handleMetadataLoaded = () => {
//     const audioElement = audioRef.current;

//     if (!audioElement) {
//       return;
//     }

//     setDuration(audioElement.duration || 0);
//   };

//   const handleTimeUpdate = () => {
//     const audioElement = audioRef.current;

//     if (!audioElement) {
//       return;
//     }

//     setCurrentTime(audioElement.currentTime || 0);
//   };

//   return (
//     <div className="spotify-player">
//       <div className="playlist-section">
//         <div className="playlist-header">
//           <h2>Your Playlist</h2>
//           <span className="song-count">{songs.length} songs</span>
//         </div>

//         <div className="playlist-grid">
//           {songs.map((song, index) => {
//             const isActive = currentSong._id === song._id;

//             return (
//               <button
//                 key={song._id}
//                 className={`song-item ${isActive ? "active" : ""}`}
//                 onClick={() => setCurrentIndex(index)}
//               >
//                 {isActive && <span className="playing-indicator"></span>}
//                 <img
//                   src={song.posterUrl}
//                   alt={song.title}
//                   className="song-poster"
//                 />
//                 <div className="song-info">
//                   <p className="song-title">{song.title}</p>
//                   <small className="song-mood">🎭 {song.mood}</small>
//                 </div>
//               </button>
//             );
//           })}
//         </div>
//       </div>

//       <div className="player-bar">
//         <audio
//           ref={audioRef}
//           className="native-audio"
//           src={currentSong.url}
//           preload="metadata"
//           autoPlay
//           onLoadedMetadata={handleMetadataLoaded}
//           onTimeUpdate={handleTimeUpdate}
//           onEnded={handleNext}
//           onPlay={() => setIsPlaying(true)}
//           onPause={() => setIsPlaying(false)}
//         />

//         <div className="player-bar-content">
//           <div className="now-playing-info">
//             <img
//               src={currentSong.posterUrl}
//               alt={currentSong.title}
//               className="now-playing-poster"
//             />
//             <div className="now-playing-text">
//               <p className="now-playing-title">{currentSong.title}</p>
//               <small className="now-playing-mood">{currentSong.mood}</small>
//             </div>
//           </div>

//           <div className="player-controls">
//             <div className="transport-controls">
//               <button
//                 type="button"
//                 className="control-btn"
//                 onClick={handlePrevious}
//                 title="Previous"
//               >
//                 ⏮
//               </button>

//               <button
//                 type="button"
//                 className="control-btn play-btn"
//                 onClick={handleTogglePlay}
//                 title={isPlaying ? "Pause" : "Play"}
//               >
//                 {isPlaying ? "⏸" : "▶"}
//               </button>

//               <button
//                 type="button"
//                 className="control-btn"
//                 onClick={handleNext}
//                 title="Next"
//               >
//                 ⏭
//               </button>
//             </div>

//             <div className="progress-wrap">
//               <span className="time-label">{formatTime(currentTime)}</span>
//               <input
//                 type="range"
//                 min="0"
//                 max={duration || 0}
//                 step="0.1"
//                 value={Math.min(currentTime, duration || 0)}
//                 className="progress-slider"
//                 onChange={handleSeek}
//               />
//               <span className="time-label">{formatTime(duration)}</span>
//             </div>
//           </div>

//           <div className="player-extra">
//             <div className="mood-display">
//               <span className="mood-label">Mood:</span>
//               <span className="mood-value">{currentSong.mood}</span>
//             </div>

//             <div className="volume-wrap">
//               <button
//                 type="button"
//                 className="volume-btn"
//                 onClick={handleMuteToggle}
//                 title={isMuted || volume === 0 ? "Unmute" : "Mute"}
//               >
//                 {isMuted || volume === 0 ? "🔇" : "🔊"}
//               </button>
//               <input
//                 type="range"
//                 min="0"
//                 max="1"
//                 step="0.01"
//                 value={volume}
//                 className="volume-slider"
//                 onChange={handleVolumeChange}
//               />
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Player;
import React, { useEffect, useRef, useState } from "react";
import { useSong } from "../hooks/useSong";
import "../styles/player.scss";

const formatTime = (timeInSeconds) => {
  if (!Number.isFinite(timeInSeconds) || timeInSeconds < 0) {
    return "0:00";
  }

  const minutes = Math.floor(timeInSeconds / 60);
  const seconds = Math.floor(timeInSeconds % 60)
    .toString()
    .padStart(2, "0");

  return `${minutes}:${seconds}`;
};

const Player = () => {
  const { songs, loading } = useSong();
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [volume, setVolume] = useState(0.8);
  const [isMuted, setIsMuted] = useState(false);
  const audioRef = useRef(null);
  const previousVolumeRef = useRef(0.8);
  const currentSong = songs[currentIndex] ?? null;

  useEffect(() => {
    setCurrentIndex(0);
    setCurrentTime(0);
    setDuration(0);
    setIsPlaying(false);
  }, [songs]);

  useEffect(() => {
    const audioElement = audioRef.current;

    if (!audioElement || !currentSong) {
      return;
    }

    audioElement.volume = volume;
    audioElement.muted = isMuted;
  }, [isMuted, volume]);

  useEffect(() => {
    const audioElement = audioRef.current;

    if (!audioElement) {
      return;
    }

    audioElement.currentTime = 0;
    setCurrentTime(0);

    const playPromise = audioElement.play();

    if (playPromise && typeof playPromise.then === "function") {
      playPromise
        .then(() => setIsPlaying(true))
        .catch(() => setIsPlaying(false));
    }
  }, [currentSong?._id]);

  if (loading) {
    return (
      <div className="player-loading">
        <div className="loading-spinner"></div>
        <p className="loading-text">Loading your playlist...</p>
      </div>
    );
  }

  if (!songs?.length || !currentSong) {
    return (
      <div className="player-empty">
        <div className="empty-icon">🎵</div>
        <p className="empty-message">
          Detect your expression to load playlist.
        </p>
      </div>
    );
  }

  const handlePrevious = () => {
    setCurrentIndex((prev) => (prev === 0 ? songs.length - 1 : prev - 1));
  };

  const handleNext = () => {
    setCurrentIndex((prev) => (prev === songs.length - 1 ? 0 : prev + 1));
  };

  const handleTogglePlay = () => {
    const audioElement = audioRef.current;

    if (!audioElement) {
      return;
    }

    if (audioElement.paused) {
      const playPromise = audioElement.play();

      if (playPromise && typeof playPromise.then === "function") {
        playPromise
          .then(() => setIsPlaying(true))
          .catch(() => setIsPlaying(false));
      }
      return;
    }

    audioElement.pause();
    setIsPlaying(false);
  };

  const handleSeek = (event) => {
    const audioElement = audioRef.current;

    if (!audioElement) {
      return;
    }

    const newTime = Number(event.target.value);
    audioElement.currentTime = newTime;
    setCurrentTime(newTime);
  };

  const handleVolumeChange = (event) => {
    const newVolume = Number(event.target.value);
    setVolume(newVolume);

    if (newVolume > 0) {
      previousVolumeRef.current = newVolume;
      setIsMuted(false);
    }
  };

  const handleMuteToggle = () => {
    if (isMuted || volume === 0) {
      const restoredVolume = previousVolumeRef.current || 0.8;
      setVolume(restoredVolume);
      setIsMuted(false);
      return;
    }

    previousVolumeRef.current = volume;
    setVolume(0);
    setIsMuted(true);
  };

  const handleMetadataLoaded = () => {
    const audioElement = audioRef.current;

    if (!audioElement) {
      return;
    }

    setDuration(audioElement.duration || 0);
  };

  const handleTimeUpdate = () => {
    const audioElement = audioRef.current;

    if (!audioElement) {
      return;
    }

    setCurrentTime(audioElement.currentTime || 0);
  };

  return (
    <div className="spotify-player">
      <div className="playlist-section">
        <div className="playlist-header">
          <h2>Your Playlist</h2>
          <span className="song-count">{songs.length} songs</span>
        </div>

        <div className="playlist-grid">
          {songs.map((song, index) => {
            const isActive = currentSong._id === song._id;

            return (
              <button
                key={song._id}
                className={`song-item ${isActive ? "active" : ""}`}
                onClick={() => setCurrentIndex(index)}
              >
                {isActive && <span className="playing-indicator"></span>}
                <img
                  src={song.posterUrl}
                  alt={song.title}
                  className="song-poster"
                  loading="lazy"
                />
                <div className="song-info">
                  <p className="song-title">{song.title}</p>
                  <small className="song-mood">🎭 {song.mood}</small>
                </div>
              </button>
            );
          })}
        </div>
      </div>

      <div className="player-bar">
        <audio
          ref={audioRef}
          className="native-audio"
          src={currentSong.url}
          preload="metadata"
          autoPlay
          onLoadedMetadata={handleMetadataLoaded}
          onTimeUpdate={handleTimeUpdate}
          onEnded={handleNext}
          onPlay={() => setIsPlaying(true)}
          onPause={() => setIsPlaying(false)}
        />

        <div className="player-bar-content">
          <div className="now-playing-info">
            <img
              src={currentSong.posterUrl}
              alt={currentSong.title}
              className="now-playing-poster"
              loading="lazy"
            />
            <div className="now-playing-text">
              <p className="now-playing-title">{currentSong.title}</p>
              <small className="now-playing-mood">{currentSong.mood}</small>
            </div>
          </div>

          <div className="player-controls">
            <div className="transport-controls">
              <button
                type="button"
                className="control-btn"
                onClick={handlePrevious}
                title="Previous"
                aria-label="Previous"
              >
                <span className="control-icon" aria-hidden="true">
                  <svg viewBox="0 0 24 24" role="img" focusable="false">
                    <path d="M7 6h2v12H7zM10 12l9 6V6z" />
                  </svg>
                </span>
              </button>

              <button
                type="button"
                className="control-btn play-btn"
                onClick={handleTogglePlay}
                title={isPlaying ? "Pause" : "Play"}
                aria-label={isPlaying ? "Pause" : "Play"}
              >
                <span className="control-icon" aria-hidden="true">
                  {isPlaying ? (
                    <svg viewBox="0 0 24 24" role="img" focusable="false">
                      <path d="M7 5h4v14H7zM13 5h4v14h-4z" />
                    </svg>
                  ) : (
                    <svg viewBox="0 0 24 24" role="img" focusable="false">
                      <path d="M8 5v14l11-7z" />
                    </svg>
                  )}
                </span>
              </button>

              <button
                type="button"
                className="control-btn"
                onClick={handleNext}
                title="Next"
                aria-label="Next"
              >
                <span className="control-icon" aria-hidden="true">
                  <svg viewBox="0 0 24 24" role="img" focusable="false">
                    <path d="M15 6h2v12h-2zM5 6v12l9-6z" />
                  </svg>
                </span>
              </button>
            </div>

            <div className="progress-wrap">
              <span className="time-label">{formatTime(currentTime)}</span>
              <input
                type="range"
                min="0"
                max={duration || 0}
                step="0.1"
                value={Math.min(currentTime, duration || 0)}
                className="progress-slider"
                onChange={handleSeek}
                aria-label="Seek"
              />
              <span className="time-label">{formatTime(duration)}</span>
            </div>
          </div>

          <div className="player-extra">
            <div className="mood-display">
              <span className="mood-label">Mood:</span>
              <span className="mood-value">{currentSong.mood}</span>
            </div>

            <div className="volume-wrap">
              <button
                type="button"
                className="volume-btn"
                onClick={handleMuteToggle}
                title={isMuted || volume === 0 ? "Unmute" : "Mute"}
                aria-label={isMuted || volume === 0 ? "Unmute" : "Mute"}
              >
                {isMuted || volume === 0 ? "🔇" : "🔊"}
              </button>
              <input
                type="range"
                min="0"
                max="1"
                step="0.01"
                value={volume}
                className="volume-slider"
                onChange={handleVolumeChange}
                aria-label="Volume"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Player;
