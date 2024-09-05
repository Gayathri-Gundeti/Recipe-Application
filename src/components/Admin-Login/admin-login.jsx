import { Link, useNavigate } from "react-router-dom";
import "./admin-login.css";
import { useFormik } from "formik";
import axios from "axios";
import { useCookies } from "react-cookie";


export function AdminLogin(){
    let navigate=useNavigate();
    const[cookies,setCookie,removeCookie]=useCookies(["adminname"])
    const formik=useFormik({
        initialValues:{
            AdminName:"",
            Password:""
        },
        onSubmit:(admin)=>{
            axios.get("http://127.0.0.1:2233/get-admin")
            .then(response=>{
                var client=response.data.find((item)=>item.AdminName===admin.AdminName);
                if(client){
                    if(client.Password===admin.Password){
                        setCookie("adminname",admin.AdminName);
                        navigate("/admin-recipe-page");
                        

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
                <h3 id="login-title">Admin Login</h3>
                <dl className="my-4">
                    <dd className="my-3"><input type="text" name="AdminName" className="form-control" placeholder="Enter User Name" onChange={formik.handleChange}/></dd>
                    <dd><input type="password" name="Password" className="form-control" placeholder="Enter Password" onChange={formik.handleChange}/></dd>
                    
                </dl>
                <div className="text-center">
                <button className="btn me-2" id="btnLogin">Login</button>
                <Link to={"/"}><button id="btnCancel" className="btn">Cancel</button></Link>
                </div>
                <div className="my-3 text-center">
                    <Link to={"/admin-register"} >NewAdmin Register</Link>
                </div>
            </form>
           </div>
        </div>
    )
}