import { BrowserRouter,Route,Routes } from 'react-router-dom';
import { Home } from './components/Home/home';
import { UserRecipePage } from './components/User-Recipe-Page/user-recipe-page';
import { ViewMoreAdmin } from './components/View-More-Admin/view-more-admin';
import { ViewMoreUser } from './components/View-More-User/view-more-user';
import { UserLogin } from './components/Login-User/user-login';
import { AddRecipe } from './components/Add-Recipe/add-recipe';
import { UserRegister } from './components/Register-User/user-register';
import { AdminRecipe } from './components/Admin-Recipe-Page/admin-recipe-page';
import { AdminLogin } from './components/Admin-Login/admin-login';
import { AdminRegister } from './Admin-Register/admin-register';
import './App.css';

function App() {
  return (
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
  );
}

export default App;
