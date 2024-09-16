import { Link, useNavigate } from "react-router-dom";
import "./user-login.css";
import { Formik, useFormik } from "formik";
import axios from "axios";
import { useCookies } from "react-cookie";
import { useState } from "react";

export function UserLogin(){
    const[loading,setLoading]=useState("");
    let navigate=useNavigate();
    const[cookies,setCookie,removeCookie]=useCookies(["username"]);
    const formik=useFormik({
        initialValues:{
            UserName:"",
            Password:""
        },
        onSubmit:(user)=>{
            if(user.UserName==""||user.Password==""){
                alert("Please provide all fields");
            }else{
                setLoading("Loading...Please Wait...");
                axios.get("https://recipe-application-2.onrender.com/get-users")
                .then(response=>{
                    setLoading("");
                    var client=response.data.find((item)=>item.UserName===user.UserName);
                    if(client){
                        if(client.Password===user.Password){
                            setCookie("username",user.UserName);
                            navigate("/user-recipe-page");
                            
    
                        }else{
                            alert("Invalid Password");
                        }
                    }else{
                        alert("Invalid UserName");
                    }
                })
            }


        }

    })
    return(
        <div id="background">
            
           <div className="d-flex justify-content-center align-items-center " style={{height:"100vh"}}>
          <form onSubmit={formik.handleSubmit} className=" p-3 rounded-3 " id="container-login-width">
          <div id="loginuser-loading">{loading}</div>
                <h3 id="login-title">User Login</h3>
                <dl className="my-4">
                    <dd className="my-3">
                        <input type="text" name="UserName" className="form-control" placeholder="Enter User Name" onChange={formik.handleChange}/></dd>
                    <dd><input type="password" name="Password" className="form-control" placeholder="Enter Password" onChange={formik.handleChange}/></dd>
                    
                </dl>
                <div >
                <button className="btn me-2 w-25" id="btnLogin">Login</button>
                <Link to={"/"}><button id="btnCancel" className="btn w-25">Cancel</button></Link>
                </div>
                <div className="my-3 ">
                    <Link to={"/user-register"} >NewUser Register</Link>
                </div>
            </form>
          </div>
           </div>
    )
}