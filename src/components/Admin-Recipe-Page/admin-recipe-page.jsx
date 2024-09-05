import { useEffect, useState } from "react";
import { useCookies } from "react-cookie";
import { Link, useNavigate } from "react-router-dom"
import axios from "axios";
import "./admin-recipe-page.css";
export function AdminRecipe(){
    const[data,setData]=useState([]);
    let navigate=useNavigate();
    const[cookie,setCookie,removeCookie]=useCookies(["adminname"]);
    function LoadCards(){
        axios.get("http://127.0.0.1:2233/get")
        .then(response=>{
            setData(response.data);
        })
        
    }
    function handleLogout(){
        removeCookie("adminname");
        navigate("/");
    }
    function handleDelete(e){
        axios.delete(`http://127.0.0.1:2233/delete-recipe/${e.target.value}`)
        .then(()=>{
         alert("Deleted Successfully...");
         LoadCards();
        })
    }

    useEffect(()=>{
        LoadCards();
    },[])
    return(
        <div>
              <header className="bg-light p-3  d-flex justify-content-between">
                <div>
                <h3>Admin Page</h3>
                
                </div>
                <div>
                <span className="bi bi-person-circle">&nbsp;Admin:</span><span className="h4">&nbsp;{cookie["adminname"]}</span>
                <Link to={"/add-recipe"} className="text-decoration-none link-dark px-3"> <button className="btn" id="btnAddRecipe">Add Recipe</button></Link>
                <button className="btn" id="btnlogout" onClick={handleLogout}>Logout</button>
                </div>
            </header>
            <section>
            <h3 className="m-3 fs-2">Recipes</h3>
            <div id="cards-section" >
                        {
                            data.map(card=>
                                <div className="card" key={card.title} id="admin-card">
                                    <div className="card-header">
                                        <div> <img src={card.photoUrl}/></div>
                                        
                                    </div>
                                    
                                    <div className="card-body">
                                    <div><span className="fw-bold">Title: </span>{card.title}</div>
                                    <div><span className="fw-bold">Course: </span>{card.course}</div>
                                        
                                        
                                    </div>
                                    <div className="card-footer">
                                    <Link to={`/view-more-admin/${card.id}`} className="link-light"><button className="btn" id="btn-viewmore">View More</button></Link>
                                    <button className="btn mx-2" id="btnAddRecipe" value={`${card.id}`} onClick={handleDelete}>Delete</button>
                                        </div>
                                </div>
                            )
                        }
                    </div>

            </section>
        </div>
    )
}