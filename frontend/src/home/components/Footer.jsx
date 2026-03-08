import React from "react";
import "../styles/footer.css";

const Footer = () => {
  return (
    <footer className="footer">

      <div className="footer-container">

        {/* Logo Section */}

        <div className="footer-col">
          <h2 className="logo">Moodify🎵</h2>
          <p>
            Discover unlimited music, explore new genres and enjoy
            your favorite tracks anytime anywhere.
          </p>
        </div>


        {/* Links */}

        <div className="footer-col">
          <h3>Company</h3>
          <ul>
            <li>About</li>
            <li>Careers</li>
            <li>Blog</li>
            <li>Press</li>
          </ul>
        </div>


        <div className="footer-col">
          <h3>Support</h3>
          <ul>
            <li>Help Center</li>
            <li>Contact Us</li>
            <li>Privacy Policy</li>
            <li>Terms</li>
          </ul>
        </div>


        <div className="footer-col">
          <h3>Discover</h3>
          <ul>
            <li>Trending</li>
            <li>New Releases</li>
            <li>Top Charts</li>
            <li>Genres</li>
          </ul>
        </div>

      </div>


      {/* bottom */}

      <div className="footer-bottom">
        <p>© 2026 Moodify. All rights reserved.</p>
      </div>

    </footer>
  );
};

export default Footer;