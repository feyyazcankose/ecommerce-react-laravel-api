import React from 'react'
import Navbar from './Navbar'
import { Helmet } from "react-helmet";
import { Link } from 'react-router-dom';
import '../../assets/front/css/style.css'

import { useNavigate  } from 'react-router-dom'

import axios from 'axios';
import swal from 'sweetalert'

const Header = () => {

  const navigate = useNavigate ();
  let AuthList="";
  
  async function onLogout(e){
	e.preventDefault();
	const csrf = await axios.get('/sanctum/csrf-cookie');
    await axios.post("api/logout").then(res=>{
      if(res.data.status==200)
	  {
		localStorage.removeItem("auth_token");
        localStorage.removeItem("auth_name");
        
        swal({
          title: "Çıkış Başarılı",
          icon: "success",
          button: "Tamam",
        });

        navigate('/');
	  }
	});	
  }



  if(!localStorage.getItem("auth_token"))
  {
	AuthList = (
			<ul className="header-links pull-right">
				<li><Link to="/login"><i className="fa fa-user-o"></i>Giriş Yap</Link></li>
				<li><Link to="/register"><i className="fa fa-user-o"></i>Kayıt Ol</Link></li>
			</ul>
	);

  }
  else 
  {
	AuthList = (
		<ul className="header-links pull-right">
			<li><Link to="/profile"><i className="fa fa-user-o"></i>Hesabım</Link></li>
			<li><button onClick={onLogout} type="button" className="btn btn-danger btn-sm text-white" >Çıkış Yap</button></li>
		</ul>

	); 
  }

  return (
       <>
	   	<Helmet>
      		<link href="assets/front/css/bootstrap.min.css" rel="stylesheet" ></link>
    	</Helmet>
	   	 <header>
			<div id="top-header">
				<div className="container">
					<ul className="header-links pull-left">
						<li><a href="#"><i className="fa fa-phone"></i> +021-95-51-84</a></li>
						<li><a href="#"><i className="fa fa-envelope-o"></i> email@email.com</a></li>
						<li><a href="#"><i className="fa fa-map-marker"></i> 1734 Stonecoal Road</a></li>
					</ul>
					{AuthList}
				</div>
			</div>

			<div id="header">
				<div className="container">
					<div className="row">
						<div className="col-md-3">
							<div className="header-logo">
								<a href="#" className="logo">
									<img src="./img/logo.png" alt=""/>
								</a>
							</div>
						</div>

						<div className="col-md-6">
							<div className="header-search">
								<form>
									<select className="input-select">
										<option value="0">All Categories</option>
										<option value="1">Category 01</option>
										<option value="1">Category 02</option>
									</select>
									<input className="input" placeholder="Search here"/>
									<button className="search-btn">Search</button>
								</form>
							</div>
						</div>

						<div className="col-md-3 clearfix">
							<div className="header-ctn">
								<div>
									<a href="#">
										<i className="fa fa-heart-o"></i>
										<span>Your Wishlist</span>
										<div className="qty">2</div>
									</a>
								</div>

								<div className="dropdown">
									<a className="dropdown-toggle" data-toggle="dropdown" aria-expanded="true">
										<i className="fa fa-shopping-cart"></i>
										<span>Your Cart</span>
										<div className="qty">3</div>
									</a>
									<div className="cart-dropdown">
										<div className="cart-list">
											<div className="product-widget">
												<div className="product-img">
													<img src="./img/product01.png" alt=""/>
												</div>
												<div className="product-body">
													<h3 className="product-name"><a href="#">product name goes here</a></h3>
													<h4 className="product-price"><span className="qty">1x</span>$980.00</h4>
												</div>
												<button className="delete"><i className="fa fa-close"></i></button>
											</div>

											<div className="product-widget">
												<div className="product-img">
													<img src="./img/product02.png" alt=""/>
												</div>
												<div className="product-body">
													<h3 className="product-name"><a href="#">product name goes here</a></h3>
													<h4 className="product-price"><span className="qty">3x</span>$980.00</h4>
												</div>
												<button className="delete"><i className="fa fa-close"></i></button>
											</div>
										</div>
										<div className="cart-summary">
											<small>3 Item(s) selected</small>
											<h5>SUBTOTAL: $2940.00</h5>
										</div>
										<div className="cart-btns">
											<a href="#">View Cart</a>
											<a href="#">Checkout  <i className="fa fa-arrow-circle-right"></i></a>
										</div>
									</div>
								</div>

								<div className="menu-toggle">
									<a href="#">
										<i className="fa fa-bars"></i>
										<span>Menu</span>
									</a>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
		</header>

		<Navbar/>
	   
	   
	   
	   </>
  )
}
export default Header;