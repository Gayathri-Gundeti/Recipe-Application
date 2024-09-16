import axios from "axios"
import "./view-more-user.css";


import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom"
import { useCookies } from "react-cookie";
import { Footer } from "../Footer/footer";

export function ViewMoreUser(){
    const[data,setData]=useState([]);
    const[loading,setLoading]=useState("");
    const [cookies, setCookie, removeCookie] = useCookies(["username"]);
    let navigate = useNavigate();
    let params=useParams();
    
    function LoadMore(){
        setLoading("Loading...Please wait..")
        axios.get(`https://recipe-application-2.onrender.com/get-id/${params.id}`)
        .then(response=>{
            setData(response.data);
            setLoading("");
        })

    }
    function handleLogout() {
        removeCookie("username");
        navigate("/user-login");
      }
    useEffect(()=>{
        LoadMore();
    },[])
    return(
        <div>
           <header className="bg-light">
        <div>

          <h3>
            <img src="../../../images/icon.png" height="50px" width="70px" />RecipeGuide</h3>
        </div>
        <div>
          <span className="h4 me-2 bi bi-person-circle" style={{color:"orange"}}></span><span className="h4 me-4" id="title-user">{cookies["username"]}</span>
          <button title="Logout" id="btnlogout" onClick={handleLogout} className="btn bi bi-door-closed-fill"></button>
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
                    <Link className="btn mt-3" to={"/user-recipe-page"} id="btn-back">Back to Recipe</Link>
                    
                </dl>)
            }
           </div>
           <Footer/>
        </div>
    )
}