import React, { useState } from 'react'
import Helmet from 'react-helmet'
import { Link } from 'react-router-dom'
import { useNavigate  } from 'react-router-dom'

import axios from 'axios';
import swal from 'sweetalert'


const Login = () => {
  const navigate = useNavigate ();

  const [loginState, setStateLogin] = useState(
      {
          'email':'',
          'password':'',
          'validation_error':[],
          'error':''
      }
  );


  const handleChange = (e) => {
    //input value değiştikçe loginstate değişiklik yapar ~ this method is the loginState assign  in changes input value 
    setStateLogin({...loginState,[e.target.name]:e.target.value});
  }


  async function onSubmit(e) {
    //sayfa yenilenmesin ! ~ this page dont refresh
    e.preventDefault(); 
    console.log("çalıştı");
    const data = {
      "email":loginState.email,
      "password":loginState.password,
    }

    const csrf = await axios.get('/sanctum/csrf-cookie');


    await axios.post("api/login",data).then(res=>{
      if(res.data.status==200){

        localStorage.setItem("auth_token",res.data.token);
        localStorage.setItem("auth_name",res.data.username);
        
        swal({
          title: "Giriş Başarılı",
          icon: "success",
          button: "Tamam",
        });

        navigate('/');

      }
      else
      {
        setStateLogin({
          ...loginState, 
          ['validation_error'] :res.data.validation_error,
          ['error'] :res.data.error
        });

      }
    })

  }


  return (
    <>
    <Helmet>
        <link href="assets/admin/css/soft-ui-dashboard.css" rel="stylesheet" ></link>
    </Helmet>
    <main className="main-content  mt-0">
    <section>
      <div className="page-header min-vh-75">
        <div className="container">
          <div className="row">
            <div className="col-xl-4 col-lg-5 col-md-6 d-flex flex-column mx-auto">
              <div className="card card-plain mt-8">
                <div className="card-header pb-0 text-left bg-transparent">
                  <h3 className="font-weight-bolder text-info text-gradient">FALY.COM</h3>
                  <p className="mb-0">Oturum açmak için e-posta adresinizi ve şifrenizi girin</p>
                </div>
                <div className="card-body">

                  {loginState.error ? <div className="alert alert-danger text-white">
                              {loginState.error}
                    </div>: ''
                  }

                  <form role="form" onSubmit={onSubmit}>
                    <div className="my-2">
                      <input type="email"  onChange={handleChange} className="form-control" placeholder="E Posta" name="email"  value={loginState.email}/>
                    </div>

                    {loginState.validation_error['email']!=null? <div className="input-error">{loginState.validation_error['email']}</div> : ''}
                    
                    <div className="my-2">
                      <input type="password" onChange={handleChange} className="form-control" placeholder="Parola" name="password" value={loginState.password} />
                    </div>

                    {loginState.validation_error['password']!=null? <div className="input-error">{loginState.validation_error['password']}</div> : ''}

                    <div className="text-center">
                      <button type="submit" className="btn bg-gradient-info w-100 mt-4 mb-0">Giriş Yap</button>
                    </div>

                    <div className="text-center">
                      <Link to="/" className="btn w-100 mt-4 mb-0">Ana Sayfa</Link>
                    </div>
                  </form>
                </div>
                <div className="card-footer text-center pt-0 px-lg-2 px-1">
                  <p className="mb-4 text-sm mx-auto d-flex gap-1 px-3">
                    <span>Hesabınız yok mu?</span>
                    <Link to="/register" className="text-info text-gradient font-weight-bold">Kayıt Ol</Link>
                  </p>
                </div>
              </div>
            </div>
            <div className="col-md-6">
              <div className="oblique position-absolute top-0 h-100 d-md-block d-none me-n8">
                <div className="oblique-image bg-cover position-absolute fixed-top ms-auto h-100 z-index-0 ms-n6" style={{background: "url('assets/admin/img/curved-images/curved6.jpg' )"}}></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  </main>

    </>
  )
}

export default Login