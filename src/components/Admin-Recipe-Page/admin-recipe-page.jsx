import { useEffect, useState } from "react";
import { useCookies } from "react-cookie";
import { Link, useNavigate } from "react-router-dom"
import axios from "axios";
import "./admin-recipe-page.css";
import { Footer } from "../Footer/footer";
export function AdminRecipe(){
    const[data,setData]=useState([]);
    const[loading,setLoading]=useState("");
    let navigate=useNavigate();
    const[cookie,setCookie,removeCookie]=useCookies(["adminname"]);
    function LoadCards(){
        setLoading("Loading...Please Wait..");
        axios.get("https://recipe-application-a5j5.onrender.com/get")
        .then(response=>{
            setLoading("");
            setData(response.data);
        })
        
    }
    function handleLogout(){
        removeCookie("adminname");
        navigate("/");
    }
    function handleDelete(e){
        var flag=window.confirm("Are you sure? \n Want to delete?");
        if(flag==true){
            axios.delete(`https://recipe-application-a5j5.onrender.com/delete-recipe/${e.target.value}`)
        .then(()=>{
         alert("Deleted Successfully...");
         LoadCards();
        })

        }else{
            LoadCards();
        }
        
    }

    useEffect(()=>{
        LoadCards();
    },[])
    return(
        <div>
              <header className="bg-light p-4  d-flex justify-content-around">
                <div>
                <h3>Admin Page</h3>
                
                </div>
                <div id="header-right">
                <span className="bi bi-person-circle">&nbsp;Admin:</span><span className="h4">&nbsp;{cookie["adminname"]}</span>
                <Link to={"/add-recipe"} className="text-decoration-none link-dark "> <button className="btn" id="btnAddRecipe">Add Recipe</button></Link>
                <button className="btn" id="btnlogout" onClick={handleLogout}>Logout</button>
                </div>
            </header>
             <div id="title-recipe">
                <h3 className="fs-2 ms-3">Recipes</h3>

                </div>
                <div id="loading">{loading}</div>
            <section>
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
                                    <Link to={`/view-more-admin/${card.id}`} className="link-light"><button className="btn" id="btnViewmore">View More</button></Link>
                                    <button className="btn mx-2" id="btnDelete" value={`${card.id}`} onClick={handleDelete}>Delete</button>
                                        </div>
                                </div>
                            )
                        }
                    </div>
            </section>
            <Footer/>
        </div>
    )
}