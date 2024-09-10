import { BrowserRouter,Route,Routes } from "react-router-dom";
import { Home } from "./Home/home";
import { UserRecipePage } from "./User-Recipe-Page/user-recipe-page";
import { ViewMoreAdmin } from "./View-More-Admin/view-more-admin";
import { ViewMoreUser } from "./View-More-User/view-more-user";
import {UserLogin} from "./Login-User/user-login";
import {AddRecipe} from "./Add-Recipe/add-recipe"
import { UserRegister } from "./Register-User/user-register";
import { AdminRecipe } from "./Admin-Recipe-Page/admin-recipe-page";
import { AdminLogin } from "./Admin-Login/admin-login";
import { AdminRegister } from "./Admin-Register/admin-register";


export function RoutePage(){
    return(
        <div>
            <BrowserRouter>
            <Routes>
                <Route path="/" element={<Home/>}></Route>

                <Route path="user-recipe-page" element={<UserRecipePage/>}></Route>
                <Route path="view-more-admin/:id" element={<ViewMoreAdmin/>}></Route>
                <Route path="view-more-user/:id" element={<ViewMoreUser/>}></Route>
                <Route path="user-login" element={<UserLogin/>}></Route>
                <Route path="user-register" element={<UserRegister/>}></Route>
                <Route path="admin-login" element={<AdminLogin/>}></Route>
                <Route path="admin-register" element={<AdminRegister/>}></Route>
                <Route path="admin-recipe-page" element={<AdminRecipe/>}></Route>
                <Route path="add-recipe" element={<AddRecipe/>}></Route>
                <Route path="*" element={<h3>Page Not Found</h3>}></Route>
            </Routes>
            </BrowserRouter>
            
        </div>
    )
}