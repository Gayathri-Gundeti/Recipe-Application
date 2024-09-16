import { Link, useNavigate } from "react-router-dom";
import "./admin-login.css";
import { useFormik } from "formik";
import axios from "axios";
import { useCookies } from "react-cookie";
import { useState } from "react";


export function AdminLogin(){
    const[loading,setLoading]=useState("");
    let navigate=useNavigate();
    const[cookies,setCookie,removeCookie]=useCookies(["adminname"])
    const formik=useFormik({
        initialValues:{
            AdminName:"",
            Password:""
        },
        onSubmit:(admin)=>{
            if(admin.AdminName==="Gayathri"){
                if(admin.Password==="gaya3"){
                    setCookie("adminname",admin.AdminName);
                    navigate("/admin-recipe-page");
                }else{
                    alert("Invalid Password");
                }
            }else{
                alert("Invalid Name");
            }
        

        }

    })
    return(
        <div id="background">
           <div className="d-flex justify-content-center align-items-center " style={{height:"100vh"}}>
           <form onSubmit={formik.handleSubmit} className=" p-3 rounded-3 " id="container-login-width">
           <div id="loginuser-loading">{loading}</div>
                <h3 id="login-title">Admin Login</h3>
                <dl className="my-4">
                    <dd className="my-3"><input type="text" name="AdminName" className="form-control" placeholder="Enter User Name" onChange={formik.handleChange}/></dd>
                    <dd><input type="password" name="Password" className="form-control" placeholder="Enter Password" onChange={formik.handleChange}/></dd>
                    
                </dl>
                <div>
                <button className="btn me-2 w-25" id="btnLogin">Login</button>
                <Link to={"/"}><button id="btnCancel" className="btn w-25">Cancel</button></Link>
                </div>
            </form>
           </div>
        </div>
    )
}