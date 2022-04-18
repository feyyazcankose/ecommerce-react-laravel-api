import { Route, Routes } from 'react-router-dom';
import Home from './components/admin/Home'
import Users from './components/admin/Users';
import Products from './components/admin/Products';
import Cargo from './components/admin/Cargo';
import Orders from './components/admin/Orders';
import './index.css';
// import '../src/assets/admin/css/soft-ui-dashboard.css';

import FHome from './components/front/Home' ;
import Register from './components/front/auth/Register';
import Login from './components/front/auth/Login';
import  axios  from 'axios';



axios.defaults.baseURL="http://127.0.0.1:8000/";
axios.defaults.headers.post['Content-Type']="application/json";
axios.defaults.headers.post['Accept']="application/json";
axios.defaults.withCredentials = true;

axios.interceptors.request.use(function(config){
  const token = localStorage.getItem('auth_token');
  config.headers.Authorization = token ? `Bearer ${token}` : '';

  return config;
});

function App() {
  return (
    <>
    <Routes> 
        
        <Route path="/">
          
          <Route  index  element={ <FHome/>}>
          </Route>
          
          <Route  path="login"  element={ <Login/>}>
          </Route>


          <Route  path="register"  element={ <Register/>}>
          </Route>

          
        </Route>


        <Route exact  path="/admin">
          
          
          <Route  index  element={ <Home/>}>
          </Route>
          
          
          <Route  path="users"  element={ <Users/>}>
          </Route>

          <Route  path="products"  element={ <Products/>}>
          </Route>

          <Route  path="cargo"  element={ <Cargo/>}>
          </Route>


          <Route  path="orders"  element={ <Orders/>}>
          </Route>



        </Route>
    </Routes>
  </>
  );
}

export default App;
