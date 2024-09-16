import React from "react";
import "./home.css";
import { Link } from "react-router-dom";

export function Home() {
    return (
        <div id="home-background">
            <header className="p-4  d-flex justify-content-between" >
                <div>
                    <h3 id="home-title">RecipeGuide</h3>
                </div>
                <div>
                    <Link to={"/admin-login"}><button className="btn" id="btnAdmin">Admin</button></Link>
                </div>
            </header>
            <div id="cover-bg">
             <div id="cover-text">
             <div id="recipe-title">Discover Delicious Recipes</div>
             <p id="recipe-subtitle">Recipe Guide for all kinds of recipes, from breakfast to dinner, and everything in between. Explore new recipes and enjoy cooking!</p>
             <Link to={"/user-login"}><button className="btn" id="btnlet">Let's Have a Look<span className="bi bi-arrow-right"></span></button></Link>
             </div>

            </div>

        </div>
    )
}