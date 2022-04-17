import React from 'react'
import Footer from '../../layouts/admin/Footer';
import Sidebar from '../../layouts/admin/Sidebar';
import Navbar from '../../layouts/admin/Navbar';


 const Orders = () => {
  return (
    <>
        <Sidebar active="orders" />
        <main className="main-content position-relative max-height-vh-100 h-100 border-radius-lg ">
        <Navbar/>
        <div className="container-fluid py-4">
            <h1>Sparişler</h1>
        </div>
        </main>
        <Footer />
    </>
  )
}

export default Orders;