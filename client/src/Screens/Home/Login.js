import React, { useEffect, useState } from 'react'
import './Login.css'
import axios from 'axios'

export default function Login(props) {
    const [UserName, setUserName] = useState('');
    const [Password, setPassword] = useState('');
    const [Message, setMessage] = useState('');

    axios.defaults.withCredentials = true;

    const getData = () =>{
        axios
        .post(`http://localhost:4000/login`,{UserName,Password}
        )
        .then((response) => response.data)
        .then((response) => {
            console.log(response)
            if(response.message){
                setMessage(response.message)
                console.log(Message)
            }
            if(response.loggedIn){
                if(response.role==1){
                    window.location.pathname = `/Student/${response.user}/${response.role}`
                } else if(response.role==2) {

                }
                
            }
        });
        
    }
    const getLogged = () =>{
        // axios
        // .get(`http://localhost:4000/login`)
        // .then((response) => response.data)
        // .then((response) => {
        //     console.log(response);
        //     if (response.loggedIn == true){
        //         if(response.role==1){
        //             window.location.pathname = `/Student`
        //         } else if(response.role==2) {

        //         }
                
        //     }
        // });
        // props.login()
    }
    useEffect(() => {
        // getLogged()
        console.log(props)
    }, [props]);
    return (
        <section className="sign-in">
            <div className="form-container">
                <div className="signin-content">
                    <div className="signin-image">
                        <figure><img src="images/signup-image.jpg" alt="sing up image"/></figure>
                        <a className="nav-link"  onClick={()=>{window.location.pathname = '/register'}}>Create an account</a>
                    </div>

                    <div className="signin-form">
                        <h2 className="form-title">Sign in</h2>
                        <div className="register-form" id="login-form">
                            <div className="form-group">
                                <label><i className="zmdi zmdi-account material-icons-name"></i></label>
                                <input value={UserName} onChange={(e)=>setUserName(e.target.value)} 
                                type="text" name="your_name" id="your_name" placeholder="User Name"/>
                            </div>
                            <div className="form-group">
                                <label><i className="zmdi zmdi-lock"></i></label>
                                <input value={Password} onChange={(e)=>setPassword(e.target.value)} 
                                type="password" name="your_pass" id="your_pass" placeholder="Password"/>
                            </div>
                            {(Message!='')?
                            <div class="alert alert-danger" role="alert">{Message}</div>
                            :null}
                            <div className="form-group">
                                <input type="checkbox" name="remember-me" id="remember-me" className="agree-term" />
                                <label className="label-agree-term"><span><span></span></span>Remember me</label>
                            </div>
                            <div className="form-group form-button">
                                <input onClick={()=>getData()}
                                 type="button" name="signin" id="signin" className="form-submit" value="Log in"/>
                            </div>
                        </div>
                        {/* <div className="social-login">
                            <span className="social-label">Or login with</span>
                            <ul className="socials">
                                <li><a href="#"><i className="display-flex-center zmdi zmdi-facebook"></i></a></li>
                                <li><a href="#"><i className="display-flex-center zmdi zmdi-twitter"></i></a></li>
                                <li><a href="#"><i className="display-flex-center zmdi zmdi-google"></i></a></li>
                            </ul>
                        </div> */}
                    </div>
                </div>
            </div>
        </section>
    )
}
