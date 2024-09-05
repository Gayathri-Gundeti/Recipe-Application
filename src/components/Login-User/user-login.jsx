import { Link, useNavigate } from "react-router-dom";
import "./user-login.css";
import { Formik, useFormik } from "formik";
import axios from "axios";
import { useCookies } from "react-cookie";

export function UserLogin(){
    let navigate=useNavigate();
    const[cookies,setCookie,removeCookie]=useCookies(["username"]);
    const formik=useFormik({
        initialValues:{
            UserName:"",
            Password:""
        },
        onSubmit:(user)=>{
            axios.get("http://127.0.0.1:2233/get-users")
            .then(response=>{
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

    })
    return(
        <div id="background">
           <div className="d-flex justify-content-center align-items-center " style={{height:"100vh"}}>
           <form onSubmit={formik.handleSubmit} className="bg-light p-3 rounded-3 w-25">
                <h3 id="login-title">User Login</h3>
                <dl className="my-4">
                    <dd className="my-3"><input type="text" name="UserName" className="form-control" placeholder="Enter User Name" onChange={formik.handleChange}/></dd>
                    <dd><input type="password" name="Password" className="form-control" placeholder="Enter Password" onChange={formik.handleChange}/></dd>
                    
                </dl>
                <div className="text-center">
                <button className="btn me-2" id="btnLogin">Login</button>
                <Link to={"/"}><button id="btnCancel" className="btn">Cancel</button></Link>
                </div>
                <div className="my-3 text-center">
                    <Link to={"/user-register"} >NewUser Register</Link>
                </div>
            </form>
           </div>
        </div>
    )
}