import axios from "axios"
import "./view-more-user.css";


import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom"
import { useCookies } from "react-cookie";
import recipeIcon from "../../assets/icon.png";
import { Footer } from "../Footer/footer";

export function ViewMoreUser(){
    const[data,setData]=useState([]);
    const[loading,setLoading]=useState("");
    const [cookies, setCookie, removeCookie] = useCookies(["username"]);
    let navigate = useNavigate();
    let params=useParams();
    
    function LoadMore(){
        setLoading("Loading...Please wait..")
        axios.get(`https://recipe-application-a5j5.onrender.com/get-id/${params.id}`)
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
            <header className="bg-light p-3  d-flex justify-content-between">
        <div>

          <h3>
            <img src={recipeIcon} height="50px" width="70px" />RecipeGuide</h3>
        </div>
        <div>
          <span className="h4 me-2 bi bi-person-circle" id="title-user">&nbsp;User:</span><span className="h4 me-4">{cookies["username"]}</span>
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
                    <Link className="btn mt-3" to={"/user-recipe-page"} id="btn-back">Back to Recipe</Link>
                    
                </dl>)
            }
           </div>
           <Footer/>
        </div>
    )
}