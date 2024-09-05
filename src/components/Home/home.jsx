import React from "react";
import "./home.css";
import { Link } from "react-router-dom";

export function Home(){
    return(
        <div id="background" className="d-flex justify-content-center align-items-center" style={{height:"100vh"}}>
           <div>
            <div id="app-title">Recipe Application</div>
             <div className="mt-3" id="btns">
                <Link to={"/user-login"}><button className="btn">USER</button></Link>
                <Link to={"/admin-login"}><button className="btn">ADMIN</button></Link>
             </div>
           </div>
        </div>
    )
}