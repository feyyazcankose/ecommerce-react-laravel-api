import axios from 'axios';
import React, { useState } from 'react'
import Helmet from 'react-helmet'
import { Link } from 'react-router-dom'
import { useNavigate  } from 'react-router-dom'
import swal from 'sweetalert'

const Register = () => {

    const navigate = useNavigate ();
    const [registerState, setRegister] = useState({
        'name':'',
        'surname':'',
        'email':'',
        'password':'',
        'validation_error':[]
    });

    const HandleChange = (e) => {

        setRegister({
                        ...registerState, 
                        [e.target.name] : e.target.value
        });

    }


    async function onSubmit(e){
          e.preventDefault();

          const data = {
              "name": registerState.name,
              "surname":registerState.surname,
              "email":registerState.email,
              "password":registerState.password,
          }
          
          
          const csrf = await axios.get('/sanctum/csrf-cookie');


          await axios.post("api/register",data).then(res=>{
          if(res.data.status==200){


            localStorage.setItem("auth_token",res.data.token);
            localStorage.setItem("auth_name",res.data.username);
            
            swal({
              title: "Kayıt Başarılı",
              icon: "success",
              button: "Tamam",
            });

            navigate('/');

          }
          else
          {
            setRegister({
              ...registerState, 
              ['validation_error'] :res.data.validation_error
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
    <section className="min-vh-100 mb-8">
      <div className="page-header align-items-start min-vh-50 pt-5 pb-11 m-3 border-radius-lg" style={{backgroundImage: "url('assets/admin/img/curved-images/curved14.jpg')"}}>
        <span className="mask bg-gradient-dark opacity-6"></span>
        <div className="container">
          <div className="row justify-content-center">
            <div className="col-lg-5 text-center mx-auto">
              <h1 className="text-white mb-2 mt-5">Hoş Geldin!</h1>
              <p className="text-lead text-white">FALY.COM Alışveriş sitesine kayıt olmak için aşağıdaki bilgileri doldurun.</p>
            </div>
          </div>
        </div>
      </div>
      <div className="container">
        <div className="row mt-lg-n10 mt-md-n11 mt-n10">
          <div className="col-xl-4 col-lg-5 col-md-7 mx-auto">
            <div className="card z-index-0">
              <div className="card-header text-center pt-4">
                <h5>Kayıt Ol</h5>
              </div>
              <div className="card-body">
                <form onSubmit={onSubmit} >
                  <div className="my-1">
                    <input type="text" className="form-control" placeholder="Ad" name="name" onChange={HandleChange}   value={registerState.name}/>
                  </div>
                  {registerState.validation_error['name']!==null? <div className="input-error">{registerState.validation_error['name']}</div> : ''}
                  <div className="my-1">
                    <input type="text" className="form-control" placeholder="Soyad" name="surname" onChange={HandleChange} value={registerState.surname}/>
                  </div>
                  {registerState.validation_error['surname']!==null? <div className="input-error">{registerState.validation_error['surname']}</div> : ''}
                  <div className="my-1">
                    <input type="email" className="form-control" placeholder="E Posta" name="email" onChange={HandleChange} value={registerState.email}/>
                  </div>
                  {registerState.validation_error['email']!==null? <div className="input-error">{registerState.validation_error['email']}</div> : ''}

                  <div className="my-1">
                    <input type="password" className="form-control" placeholder="Parola" name="password" onChange={HandleChange} value={registerState.password}/>
                  </div>

                  {registerState.validation_error['password']!==null? <div className="input-error">{registerState.validation_error['password']}</div> : ''}

                  <div className="text-center">
                    <button type="submit" className="btn bg-gradient-dark w-100 my-4 mb-2">Kayıt Ol</button>
                  </div>
                  <div className="text-center">
                      <Link to="/" className="btn w-100 mt-4 mb-0">Ana Sayfa</Link>
                    </div>
                  <p className="text-sm mt-3 mb-0">Zaten hesabınız var mı? <Link to="/login" className="text-dark font-weight-bolder">Giriş Yap</Link></p>
                </form>
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

export default Register