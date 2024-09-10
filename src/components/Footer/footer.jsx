import React from "react";
import "./footer.css"; 

export function Footer() {
  return (
    <footer className="footer bg-light">
      <div className="footer-content">
        <div className="footer-section">
          <h3>RecipeGuide</h3>
          <p>Recipe Guide for all kinds of recipes, from breakfast to dinner, and everything in between. Explore new recipes and enjoy cooking!</p>
        </div>

        <div className="footer-section">
          <h4>Quick Links</h4>
          <ul>
            <li><a href="#">Home</a></li>
            <li><a href="#">About Us</a></li>
            <li><a href="#">Contact</a></li>
          </ul>
        </div>

        <div className="footer-section">
          <h4>Follow Us</h4>
          <div className="social-icons">
            <a href="https://www.facebook.com"><i className="bi bi-facebook"></i></a>
            <a href="https://www.twitter.com"><i className="bi bi-twitter"></i></a>
            <a href="https://www.instagram.com"><i className="bi bi-instagram"></i></a>
          </div>
        </div>
      </div>

      <div className="footer-bottom">
        &copy; 2024 RecipeGuide. All rights reserved.
      </div>
    </footer>
  );
}


