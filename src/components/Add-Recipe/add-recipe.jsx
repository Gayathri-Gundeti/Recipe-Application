import { useFormik } from "formik"
import "./add-recipe.css";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { useState } from "react";

export function AddRecipe() {
    const[loading,setLoading]=useState();
    let navigate = useNavigate();
    const formik = useFormik({
        initialValues: {
            id: 0,
            title: "",
            course: "",
            ingredients: "",
            directions: "",
            photoUrl: null
        },
        onSubmit: (values) => {
            if(values.id==""||values.title==""||values.course==""||values.ingredients==""||values.directions==""||values.photoUrl==""){
                alert("Please provide all the fields");
            }else{
                setLoading("Loading...Please Wait...");
            const formData = new FormData();
            formData.append("id", values.id);
            formData.append("title", values.title);
            formData.append("course", values.course);
            formData.append("ingredients", values.ingredients);
            formData.append("directions", values.directions);
            formData.append("photoUrl", values.photoUrl);  // Ensure the file is appended correctly
        
            axios.post("https://recipe-application-a5j5.onrender.com/send", formData, {
                headers: {
                    "Content-Type": "multipart/form-data",
                },
            })
            .then(() => {
                setLoading("");
                alert("Recipe added");
                navigate("/admin-recipe-page");

            })
            .catch((error) => {
                console.log("Error", error);
            });
            }
        }

      
        

        
    });
     

    return (
        <div id="background">
            <div className="d-flex justify-content-center align-items-center" style={{ height: "100vh" }}>
                <form className="bg-light p-3 rounded-3 w-25" onSubmit={formik.handleSubmit}>
                <div id="loginuser-loading">{loading}</div>
                    <dl>
                        <h3 className="text-center " id="add-title">Add Recipe</h3>
                        <dd><input type="number" placeholder="Enter Id" className="form-control" name="id" onChange={formik.handleChange} /></dd>
                        <dd><input type="text" placeholder="Enter Title" className="form-control" name="title" onChange={formik.handleChange} /></dd>
                        <dd><input type="text" placeholder="Enter Course" className="form-control" name="course" onChange={formik.handleChange} /></dd>
                        <dd><input type="text" placeholder="Enter Ingredients" className="form-control" name="ingredients" onChange={formik.handleChange} /></dd>
                        <dd><input type="text" placeholder="Enter directions" className="form-control" name="directions" onChange={formik.handleChange} /></dd>
                        <dd><input type="file" className="form-control" name="photoUrl" onChange={(event) => formik.setFieldValue("photoUrl", event.currentTarget.files[0])} /></dd>
                    </dl>
                    <button type="submit" className="btn w-100" id="btnSubmit">Submit</button>
                </form>
            </div>
        </div>
    );
}

