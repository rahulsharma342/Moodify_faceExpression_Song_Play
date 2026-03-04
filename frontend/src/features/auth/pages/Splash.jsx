// Splash.jsx
import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";
import "../styles/splash.scss";

const Splash = () => {
  const navigate = useNavigate();
  const { user, loading } = useAuth();

  useEffect(() => {
    if (!loading) {
      const timer = setTimeout(() => {
        if (user) {
          navigate("/home", { replace: true });
        } else {
          navigate("/login", { replace: true });
        }
      }, 1000); // splash duration

      return () => clearTimeout(timer);
    }
  }, [user, loading, navigate]);

  return (
    <div className="splash">
      <div className="logo">🎵</div>
      <h1>Moodify</h1>
      <p className="tagline">Detect your mood. Play your vibe.</p>
      <div className="loader">
        <span></span>
        <span></span>
        <span></span>
      </div>
    </div>
  );
};

export default Splash;