import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../../features/auth/hooks/useAuth";
import "../styles/navbar.css";

const Navbar = () => {
  const { user, handleLogout } = useAuth();
  const [menuOpen, setMenuOpen] = useState(false);

  const logoutUser = async () => {
    await handleLogout();
    setMenuOpen(false);
  };

  const displayName = user?.username || user?.name;

  return (
    <nav className="navbar blurred-box">
      <div className="logo">
        <Link to="/">Moodify</Link>
      </div>

      <div className="menu-toggle" onClick={() => setMenuOpen(!menuOpen)}>
        ☰
      </div>

      <ul className={`nav-links ${menuOpen ? "active" : ""}`}>
  <li>
    <Link to="/">
      <div className="hover-slide">
        <span className="top">Home</span>
        <span className="bottom">Home</span>
      </div>
    </Link>
  </li>
  <li>
    <Link to="/FaceExpression">
      <div className="hover-slide">
        <span className="top">Scan Mood</span>
        <span className="bottom">Scan Mood</span>
      </div>
    </Link>
  </li>
  <li>
    <Link to="/playlist">
      <div className="hover-slide">
        <span className="top">Playlist</span>
        <span className="bottom">Playlist</span>
      </div>
    </Link>
  </li>
  <li>
    <Link to="/contact">
      <div className="hover-slide">
        <span className="top">Contact</span>
        <span className="bottom">Contact</span>
      </div>
    </Link>
  </li>
</ul>

      {/* Desktop Auth */}
      <div className="auth-btns desktop-auth">
        {user ? (
          <>
            <span className="username">Hi, {displayName}</span>
            <button className="logout" onClick={logoutUser}>
              Log Out
            </button>
          </>
        ) : (
          <>
            <Link to="/login">
              <button className="login">Log In</button>
            </Link>

            <Link to="/register">
              <button className="signup">Sign Up</button>
            </Link>
          </>
        )}
      </div>
    </nav>
  );
};

export default Navbar;