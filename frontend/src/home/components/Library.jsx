import React from "react";
import "../styles/library.css";


const Library = () => {
  return (
    <section className="library">

      <div className="library-header">

        <div>
          <h1>Your Infinite <br/> Music Library</h1>
          <p>
            Stream, search, and save your favorite tracks. Discover new vibes
            every day, all in one place.
          </p>
        </div>

        <div className="library-arrows">
          <button>{"<"}</button>
          <button>{">"}</button>
        </div>

      </div>


      <div className="library-cards">

        <div className="library-card">
          <img src="https://i.pinimg.com/1200x/2e/9f/16/2e9f168571f9f71083040d8d320610d0.jpg" alt="Hip Hop"/>
          <div className="play">▶</div>
          <h3>Hip Hop</h3>
          <p>412 songs</p>
        </div>

        <div className="library-card">
          <img src="https://i.pinimg.com/1200x/f7/fb/36/f7fb3624104e3f52c25b9f0cca63769e.jpg" alt="LoFi"/>
          <div className="play">▶</div>
          <h3>Lo - Fi</h3>
          <p>600 songs</p>
        </div>

        <div className="library-card">
          <img src="https://i.pinimg.com/736x/27/01/e3/2701e346ca2765b064e4c1830ef7bcd9.jpg" alt="Rock"/>
          <div className="play">▶</div>
          <h3>Rock & Roll</h3>
          <p>512 songs</p>
        </div>

        <div className="library-card">
          <img src="https://i.pinimg.com/webp/736x/0a/34/62/0a34621c4665cf31bc6e67ed94276c20.webp" alt="R&B"/>
          <div className="play">▶</div>
          <h3>R & B</h3>
          <p>612 songs</p>
        </div>

      </div>

    </section>
  );
};

export default Library;