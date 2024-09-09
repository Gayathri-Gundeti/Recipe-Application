import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import "./user-recipe-page.css";
import { useEffect, useState } from "react";
import { useCookies } from "react-cookie";
import recipeIcon from "../../assets/icon.webp";

export function UserRecipePage(){
    let navigate=useNavigate();
    const[cookies,setCookie,removeCookie]=useCookies(["username"]);
    const[data,setData]=useState([]);
    const[inputTxt,setInputTxt]=useState("");
    const[search,setSearchData]=useState([]);
    const[displaynone,setDisplayNone]=useState();
  
    function LoadCards(){
        axios.get("http://127.0.0.1:2233/get")
        .then(response=>{
            setData(response.data);
        })
        
    }
    function SearchClick(){
        axios.get(`http://127.0.0.1:2233/get/${inputTxt}`)
        .then(response=>{
            setSearchData(response.data);
            setDisplayNone({display:"none"});
            setInputTxt("");
            
            
        })
    }
    function InputChange(e){
        setInputTxt(e.target.value.charAt(0).toUpperCase());
        
    }
    function handleHome(){
        LoadCards();
        setSearchData([]);
        setDisplayNone({});
        

    }
    function handleCourse(course){
        axios.get(`http://127.0.0.1:2233/get-course/${course}`)
        .then(response=>{
            setData(response.data);
           

        })
    }
    function handleLogout(){
        removeCookie("username");
        navigate("/user-login");
    }
   
    
    useEffect(()=>{
        LoadCards();
       
    },[])
    return(
        <div>
            <header className="bg-light p-3  d-flex justify-content-between">
                <div>
                   
                <h3>  <img src={recipeIcon} height="50px" width="50px"/>RecipeGuide</h3>
                </div>
                <div>
                <span className="h4 me-2 bi bi-person-circle" id="title-user">&nbsp;User:</span><span className="h4 me-4">{cookies["username"]}</span>
                <button className="btn" id="btnlogout" onClick={handleLogout}>Logout</button>
                </div>
            </header>
            <section id="recipe-section">
                <nav className="bg-light text-white" id="nav-items">
                    <div onClick={handleHome}>Home</div>
                    <div onClick={()=>handleCourse("Main Course") }>Main Course</div>
                    <div onClick={()=>handleCourse("Breakfast")}>Break Fast</div>
                    <div onClick={()=>handleCourse("Lunch")}>Lunch</div>
                    <div onClick={()=>handleCourse("Desserts")}>Desserts</div>
                </nav>
                <div id="card-space" >
                    <h3 className="ms-3">Recipe</h3>
                    <div className="input-group w-75 ms-3">
                        <input type="text" placeholder="Search for a recipe" className="form-control"  onChange={InputChange} />
                        <span className="bi bi-search input-group-text" onClick={SearchClick}></span>
                    </div>
                    <div id="cards-section" style={displaynone}>
                        {
                            data.map(card=>
                                <div className="card" key={card.title}>
                                    <div className="card-header">
                                        <div> <img src={card.photoUrl}/></div>
                                        
                                    </div>
                                    
                                    <div className="card-body">
                                    <div><span className="fw-bold">Title: </span>{card.title}</div>
                                    <div><span className="fw-bold">Course: </span>{card.course}</div>
                                        
                                        
                                    </div>
                                    <div className="card-footer">
                                    <Link to={`/view-more-user/${card.id}`} className="link-light"><button className="btn w-100" id="btn-viewmore">View More</button></Link>
                                        </div>
                                </div>
                            )
                        }
                    </div>
                    <div id="search-results">
                
                    {
                         search.map(card=>
                            <div className="card">
                                <div className="card-header">
            
                                   <div> <img src={card.photoUrl}></img></div>

                                </div>
                                
                                <div className="card-body">
                                <div><span className="fw-bold">Title: </span>{card.title}</div>
                                <div><span className="fw-bold">Course: </span>{card.course}</div>
                                    
                                    
                                </div>
                                <div className="card-footer">
                                <Link to={`/view-more-user/${card.id}`}><button className="btn w-100" id="btn-viewmore">View More</button></Link>
                                    </div>
                            </div>
                        )
                    }
            
            </div>
        
                </div>

               
            </section>
           
        </div>
    )
}