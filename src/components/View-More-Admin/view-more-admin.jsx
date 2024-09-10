import axios from "axios"
import "./view-more-admin.css";

import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom"
import { Footer } from "../Footer/footer";
import { useCookies } from "react-cookie";

export function ViewMoreAdmin(){
    const[data,setData]=useState([]);
    const[loading,setLoading]=useState("");
    const[cookie,setCookie,removeCookie]=useCookies(["adminname"]);
    const navigate=useNavigate();
    let params=useParams();
    
    function LoadMore(){
        setLoading("Loading...Please wait...")
        axios.get(`https://recipe-application-a5j5.onrender.com/get-id/${params.id}`)
        .then(response=>{
            setData(response.data);
            setLoading("");
        })

    }
    function handleLogout(){
        removeCookie("adminname");
        navigate("/");
    }
    useEffect(()=>{
        LoadMore();
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
           <div id="box-setting">
           <div id="view-more-loading">{loading}</div>
            {
                data.map(item=><dl key={item.id}>
                    <dd><img src={item.photoUrl} height="200" width="50%"/></dd>
                    <dd><h2 id="recipe-title">{item.title}</h2></dd>
                    <dt>Course:</dt>
                    <dd>{item.course}</dd>
                    <dt>Ingredients:</dt>
                    <dd>{item.ingredients}</dd>
                    <dt>Directions:</dt>
                    <dd>{item.directions}</dd>
                    <Link className="btn mt-3" to={"/admin-recipe-page"} id="btn-back">Back to Recipe</Link>
                    
                </dl>)
            }
           </div>
           <Footer/>
        </div>
    )
}