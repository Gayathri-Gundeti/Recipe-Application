import axios from "axios"
import { useFormik } from "formik"
import { useState } from "react";
import { Link,useNavigate } from "react-router-dom"
export function UserRegister(){
    const[loading,setLoading]=useState("");
    let navigate=useNavigate();
    const formik=useFormik({
        initialValues:{
            UserName:"",
            Password:"",
            Email:"",
            Mobile:""
        },
        onSubmit:(user)=>{
          if(user.UserName==""||user.Password==""||user.Email==""||user.Mobile==""){
            alert("Please provide all fields");
          }else{
            setLoading("Loading...Please Wait...");
            axios.post("https://recipe-application-2.onrender.com/register-user",user)
            .then(()=>{
                setLoading("");
                alert("Registered Successfully...");
                navigate("/");

            })
          }
        }

    })
    return(
        <div id="background">
         <div className="d-flex justify-content-center align-items-center" style={{height:"100vh"}}>
            <form onSubmit={formik.handleSubmit} className="p-3 rounded-3 " id="container-width">
            <div id="loginuser-loading">{loading}</div>
                <h3 id="login-title">User Register</h3>
                <dl className="my-3">
                    <dd><input type="text" placeholder="Enter User Name" name="UserName" className="form-control my-3" onChange={formik.handleChange}/></dd>
                    <dd><input type="password" placeholder="Enter Password" name="Password" className="form-control my-3" onChange={formik.handleChange}/></dd>
                    <dd><input type="email" placeholder="Enter Email" name="Email" className="form-control my-3" onChange={formik.handleChange}/></dd>
                    <dd>
                    <div className="input-group">
                    <label className="border border-1 p-2">+91</label>   
                    <input type="text" id="mobile-error" placeholder="Enter Mobile Phone Number" name="Mobile" pattern="\d{10}" className="form-control" onChange={formik.handleChange}/>
                    </div>
                    <div className="text-danger mb-3" >Mobile number should contain 10 digits</div>
                    </dd>
                    
                </dl>
               <div>
               <button className="btn me-2" id="btnLogin">Register</button>
               <Link to={"/"}><button id="btnCancel" className="btn">Cancel</button></Link>
               </div>
            </form>
         </div>

        </div>
    )
}