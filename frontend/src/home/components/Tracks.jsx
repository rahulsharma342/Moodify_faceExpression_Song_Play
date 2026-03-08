import React from "react";
import "../styles/tracks.css";



const Tracks = () => {
  return (
    <section className="tracks">

      <div className="tracks-header">
        <h2>This Week's Fire Track</h2>
        <h1>Music Flow's Choice</h1>
        <p>
          Discover the hottest songs making waves this week. From chart toppers
          to hidden gems, these tracks are guaranteed to keep you vibing.
        </p>
      </div>


      <div className="tracks-container">

        <div className="track-card">
          <img src="https://i.pinimg.com/736x/03/74/3a/03743aa4be4d4c59e372806ebd572f68.jpg" alt="song"/>
          <h3>Crazy Feel</h3>
          <p>Axel F</p>
        </div>

        <div className="track-card">
          <img src="https://i.pinimg.com/736x/8d/1c/aa/8d1caa783a7142d1726630483e4cd11b.jpg" alt="song"/>
          <div className="play-btn">▶</div>
          <h3>Voice Legend</h3>
          <p>OVO</p>
        </div>

        <div className="track-card">
          <img src="https://i.pinimg.com/736x/17/e7/31/17e731db30b4a3b3032e86ca6bb49087.jpg" alt="song"/>
          <h3>Rise 2 Top</h3>
          <p>MR. OIZO</p>
        </div>

      </div>

    </section>
  );
};

export default Tracks;