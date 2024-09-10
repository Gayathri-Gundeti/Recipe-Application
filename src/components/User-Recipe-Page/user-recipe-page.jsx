import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import "./user-recipe-page.css";
import { useEffect, useState } from "react";
import { useCookies } from "react-cookie";
import recipeIcon from "../../assets/icon.png";
import banner1 from "../../assets/banner1.webp";
import banner2 from "../../assets/banner2.webp";
import banner5 from "../../assets/banner5.png";
import { Footer } from "../Footer/footer";



export function UserRecipePage() {
  let navigate = useNavigate();
  const [cookies, setCookie, removeCookie] = useCookies(["username"]);
  const [data, setData] = useState([]);
  const [inputTxt, setInputTxt] = useState("");
  const [search, setSearchData] = useState([]);
  const [displaynone, setDisplayNone] = useState({ display: "flex" });
  const [loading, setLoading] = useState("Loading...Please Wait...")



  function LoadCards() {
    setLoading("Loading...Please Wait...");
    setDisplayNone({ display: "none" });
    axios.get("https://recipe-application-a5j5.onrender.com/get")
      .then(response => {
        setData(response.data);
        setLoading(false);
        setDisplayNone({ display: "flex" });
      })

  }
  function SearchClick() {
    setLoading("Loading...Please Wait...");
    axios.get(`https://recipe-application-a5j5.onrender.com/get/${inputTxt}`)
      .then(response => {
        setSearchData(response.data);
        setDisplayNone({ display: "none" });
        setInputTxt("");
        setLoading(false);


      })
  }
  function InputChange(e) {
    setInputTxt(e.target.value.charAt(0).toUpperCase());

  }
  function handleHome() {
    LoadCards();
    setSearchData([]);
    setDisplayNone({ display: "none" });


  }
  function handleCourse(course) {
    setLoading("Loading...Please Wait...");
    setDisplayNone({ display: "none" });
    axios.get(`https://recipe-application-a5j5.onrender.com/get-course/${course}`)
      .then(response => {
        setData(response.data);
        setLoading(false);
        setDisplayNone({ display: "flex" });


      })
  }
  function handleLogout() {
    removeCookie("username");
    navigate("/user-login");
  }


  useEffect(() => {
    LoadCards();

  }, [])
  return (
    <div className="main-container">
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

      <div id="banner" className="carousel slide " data-bs-ride="carousel" data-bs-theme="dark">
        <div className="carousel-inner">
          <div className="carousel-item active">
            <img className="d-block w-100 " height={350} src={banner1} alt="First slide" />
          </div>
          <div className="carousel-item">
            <img className="d-block w-100" height={350} src={banner5} alt="Second slide" />
          </div>
          <div className="carousel-item">
            <img className="d-block w-100" height={350} src={banner2} alt="Third slide" />
          </div>
        </div>
        <button className="carousel-control-prev" data-bs-slide="prev" data-bs-target="#banner">
          <span className="carousel-control-prev-icon"></span>
        </button>
        <button className="carousel-control-next" data-bs-slide="next" data-bs-target="#banner">
          <span className="carousel-control-next-icon"></span>
        </button>
      </div>
      <section id="recipe-section">
        <div id="card-space" >
          <div id="search-section">
            <h2 >Recipes</h2>
            <div className="input-group mt-3 w-75">
              <input type="text" placeholder="Search for a recipe" className="form-control" onChange={InputChange} />
              <span className="bi bi-search input-group-text" onClick={SearchClick}></span>

              <div className="dropdown ms-3" id="menu">
                <button className="btn  dropdown-toggle" type="button" data-bs-target="#menu" data-bs-toggle="dropdown">
                  Menu
                </button>
                <ul className="dropdown-menu" >
                  <li onClick={handleHome}><button className="dropdown-item">All</button></li>
                  <li onClick={() => handleCourse("Main Course")}><button className="dropdown-item">MainCourse</button></li>
                  <li onClick={() => handleCourse("Breakfast")}><button className="dropdown-item">BreakFast</button></li>
                  <li onClick={() => handleCourse("Lunch")}><button className="dropdown-item">Lunch</button></li>
                  <li onClick={() => handleCourse("Desserts")}><button className="dropdown-item">Desserts</button></li>
                </ul>
              </div>

            </div>

          </div>
          <div id="loading">{loading}</div>
          <div id="cards-section" style={displaynone}>
            {
              data.map(card =>
                <div className="card" key={card.title}>
                  <div className="card-header">
                    <div> <img src={card.photoUrl} /></div>

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
              search.map(card =>
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
      <Footer/>

    </div>
  )
}