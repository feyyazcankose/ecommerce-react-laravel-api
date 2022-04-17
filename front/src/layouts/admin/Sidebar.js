import React from 'react'
import { NavLink  } from 'react-router-dom';
import Logo from '../../assets/admin/img/logo-ct.png'
import DashboardIcon from '@mui/icons-material/Dashboard';
import PersonIcon from '@mui/icons-material/Person';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import DirectionsCarFilledIcon from '@mui/icons-material/DirectionsCarFilled';
import ViewListIcon from '@mui/icons-material/ViewList';
import ShortTextIcon from '@mui/icons-material/ShortText';
const Sidebar = ({active}) => {

  return (
    <aside className="sidenav navbar navbar-vertical navbar-expand-xs border-0 border-radius-xl my-3 fixed-start ms-3 " id="sidenav-main">
        <div className="sidenav-header">
        <i className="fas fa-times p-3 cursor-pointer text-secondary opacity-5 position-absolute end-0 top-0 d-none d-xl-none" aria-hidden="true" id="iconSidenav"></i>
        <NavLink   to="/admin" className="navbar-brand m-0 d-flex align-items-center">
            
            <div className="icon icon-shape icon-sm shadow border-radius-md bg-logo text-center me-2 d-flex align-items-center justify-content-center">
            <ShortTextIcon className="text-white"/>
            </div>
            <span className="ms-1 font-weight-bold">FALY</span>
        </NavLink>
        </div>

        <hr className="horizontal dark mt-0" />

        <div className="collapse navbar-collapse  w-auto " id="sidenav-collapse-main">
        <ul className="navbar-nav">
            <li className="nav-item">
            <NavLink activeClassName="active" to="/admin"   className="nav-link" end>
                <div className="icon icon-shape icon-sm shadow border-radius-md bg-white text-center me-2 d-flex align-items-center justify-content-center">
                <DashboardIcon  className={active == "home" ? 'text-white': ''}/>
                </div>
                <span className="nav-link-text ms-1">Ana Sayfa</span>
            </NavLink >
            </li>
            <li className="nav-item">
            <NavLink   activeClassName="active" to="/admin/users" className="nav-link">
                <div className="icon icon-shape icon-sm shadow border-radius-md bg-white text-center me-2 d-flex align-items-center justify-content-center">
                    <PersonIcon className={active == "users" ? 'text-white': ''}/>
                </div>
                <span className="nav-link-text ms-1">Kullanıcılar</span>
            </NavLink >
            </li>
            <li className="nav-item">
            <NavLink activeClassName="active" to="/admin/products" className="nav-link" >
                <div className="icon icon-shape icon-sm shadow border-radius-md bg-white text-center me-2 d-flex align-items-center justify-content-center">
                    <ShoppingCartIcon className={active == "products" ? 'text-white': ''}/>
                </div>
                <span className="nav-link-text ms-1">Ürünler</span>
            </NavLink >
            </li>
            <li  className="nav-item">
            <NavLink activeClassName="active" to="/admin/orders" className="nav-link">
                <div className="icon icon-shape icon-sm shadow border-radius-md bg-white text-center me-2 d-flex align-items-center justify-content-center">
                <ViewListIcon className={active == "orders" ? 'text-white': ''}/>
                </div>
                <span className="nav-link-text ms-1">Sparişler</span>
            </NavLink >
            </li>
            <li className="nav-item">
            <NavLink activeClassName="active" to="/admin/cargo" className="nav-link" >
                <div className="icon icon-shape icon-sm shadow border-radius-md bg-white text-center me-2 d-flex align-items-center justify-content-center">
                <DirectionsCarFilledIcon className={active == "cargos" ? 'text-white': ''}/>
                </div>
                <span className="nav-link-text ms-1">Kargo</span>
            </NavLink >
            </li>
        </ul>
        </div>
    
  </aside>
  )
}

export default Sidebar;

