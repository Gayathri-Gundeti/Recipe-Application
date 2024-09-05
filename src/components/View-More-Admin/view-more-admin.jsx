import axios from "axios"
import "./view-more-admin.css";

import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom"

export function ViewMoreAdmin(){
    const[data,setData]=useState([]);
    let params=useParams();
    
    function LoadMore(){
        axios.get(`http://127.0.0.1:2233/get-id/${params.id}`)
        .then(response=>{
            setData(response.data);
        })

    }
    useEffect(()=>{
        LoadMore();
    },[])
    return(
        <div>
           <div id="box-setting">
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
        </div>
    )
}