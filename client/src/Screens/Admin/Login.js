import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './Login.css'

export default function Login() {
    const [registered, setRegister] = useState(true);
    if (registered){
        return (<SignIn registered={registered} setRegister={setRegister}/>)
    } else {
        return(<Register/>)
    }
    
}

function SignIn(props) {
    const handler = (reg) =>{
        props.setRegister(false)
        console.log(reg)
    }
    return (
        <div className="container">
        <div className="row">
            <div className="col-lg-3 col-md-2"></div>
            <div className="col-lg-6 col-md-8 login-box">
                <div className="col-lg-12 login-key">
                    <i className="fa fa-key" aria-hidden="true"></i>
                </div>
                <div className="col-lg-12 login-title">
                    Sign In
                </div>
                <div className="col-lg-12 login-form">
                    <div className="col-lg-12 login-form">
                        <form>
                            <div className="form-group">
                                <label className="form-control-label">EMAIL ADDRESS</label>
                                <input type="text" className="form-control" />
                            </div>
                            <div className="form-group">
                                <label className="form-control-label">PASSWORD</label>
                                <input type="password" className="form-control" />
                            </div>
                            <div className="col-lg-12 login-text pb-2">
                                Not Registered? 
                                <Link to="#" onClick={()=>handler(props.registered)}>Register Now</Link>
                            </div>

                            <div className="col-lg-12 loginbttm">
                                <div className="col-lg-6 login-btm login-text">
                                    {/* Error Message */}
                                </div>
                                <div className="col-lg-12 login-btm login-button text-center">
                                    <button type="submit" className="btn btn-outline-primary">LOGIN</button>
                                </div>
                                
                            </div>
                        </form>
                    </div>
                </div>
                <div className="col-lg-3 col-md-2"></div>
            </div>
        </div>
    </div>
    )
}

function Register() {
    return (
        <div className="container">
        <div className="row">
            <div className="col-lg-3 col-md-2"></div>
            <div className="col-lg-6 col-md-8 login-box">
                <div className="col-lg-12 login-key">
                    <i className="fa fa-key" aria-hidden="true"></i>
                </div>
                <div className="col-lg-12 login-title">
                    Register
                </div>
                <div className="col-lg-12 login-form">
                    <div className="col-lg-12 login-form">
                        <form>
                            <div className="form-group">
                                <label className="form-control-label">EMAIL ADDRESS</label>
                                <input type="text" className="form-control" />
                            </div>
                            <div className="form-group">
                                <label className="form-control-label">PASSWORD</label>
                                <input type="password" className="form-control" />
                            </div>
                            <div className="col-lg-12 login-text pb-2">
                                Not Registered? 
                                {/* <Link to="#" onClick={()=>handler(props.registered)}>Register Now</Link> */}
                            </div>

                            <div className="col-lg-12 loginbttm">
                                <div className="col-lg-6 login-btm login-text">
                                    {/* Error Message */}
                                </div>
                                <div className="col-lg-12 login-btm login-button text-center">
                                    <button type="submit" className="btn btn-outline-primary">LOGIN</button>
                                </div>
                                
                            </div>
                        </form>
                    </div>
                </div>
                <div className="col-lg-3 col-md-2"></div>
            </div>
        </div>
    </div>
    )
}
