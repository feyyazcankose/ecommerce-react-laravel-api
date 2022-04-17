import React from 'react'
import Footer from '../../layouts/admin/Footer';
import Sidebar from '../../layouts/admin/Sidebar';
import Navbar from '../../layouts/admin/Navbar';


 const Home = () => {
  return (
    <>
       
        <Sidebar active = "home"/>
        <main className="main-content position-relative max-height-vh-100 h-100 border-radius-lg ">
        <Navbar/>
        <div className="container-fluid py-4">
            <h1>Home</h1>
        </div>
        </main>
        <Footer />
        
        
    </>
  )
}

export default Home;