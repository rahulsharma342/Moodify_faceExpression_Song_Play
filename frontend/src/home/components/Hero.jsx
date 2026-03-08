import React from "react";
import "../styles/hero.css";
import { Link } from "react-router-dom";


const Hero = () => {
  return (
    <div className="hero">

      {/* Navbar */}


      {/* Hero Section */}

      <div className="hero-container">

        <div className="hero-left">

          <h1>
            Vibes Without <br /> Borders on Your MOOD
          </h1>

          <p>
            Vibes Without Borders on Your <span className="highlight">MOOD</span> lets you explore every beat and genre,
            anywhere you are. Music without limits, just pure connection.
          </p>

          <div className="stats">
            <span>2000+ songs</span>
            <span>300+ Exclusive Singers</span>
            <span>600+ Album</span>
          </div>
          <br></br>
          <Link to="/FaceExpression">
            <button className="listen-btn">Scan Mood</button>
          </Link>

        </div>


        <div className="hero-right">
          <img src="https://images.unsplash.com/photo-1564492893770-559297ff3ee9?q=80&w=387&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" alt="model"/>
        </div>

      </div>

    </div>
  );
};

export default Hero;