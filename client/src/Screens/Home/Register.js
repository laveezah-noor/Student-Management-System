import React from 'react'
import axios from 'axios'

export default function Register() {
    const [trainer,setTrainer] = React.useState(false)
    return (
        <section className="sign-in">
            <div className="form-container">
                <div className="signin-content">
                    <Trainer status={trainer}/>
                    <div className="signin-image">
                        <figure><img src="../images/signin-image.jpg" alt="sing up image"/></figure>
                        <a className="fst-italic user-select-none"  onClick={()=>{setTrainer(!trainer)}}>Or become a {trainer?"Student?":"Trainer?"}</a>
                    </div>
                <Student status={trainer}/>
                </div>
            </div>
        </section>
    )
}

const Trainer = ({status}) => {
    const cls = status ? "" : "none";
    const [UserName,setUserName] = React.useState('')
    const [UserPassword,setUserPassword] = React.useState('')
    const [FirstName,setFirstName] = React.useState('')
    const [LastName,setLastName] = React.useState('')
    const [Email,setEmail] = React.useState('')
    const [Contact,setContact] = React.useState('')
    const Role = 2;
    const onSubmit = () =>{
        axios
              .post(`http://localhost:4000/addUser`, {
                UserName,
                UserPassword,
                Role,
                FirstName,
                LastName,
                Contact,
                Email
              })
              .then((result) => result.data)
              .then((result)=>{
                console.log(result);
                alert(result);
                window.location.pathname = '/login'
                // getUserList();
                // $('#exampleModal .btn-close').click()
            } // fetching the updated list
                ,(error)=>{
                alert('Failed');
                // $('#exampleModal .btn-close').click()
            })
    }
    console.log(cls)
    return(
        <div className={`signin-form ${cls}`} >
            <h2 className="form-title">Be a Trainer</h2>
            <div className="register-form" >
                <div className="form-group">
                    <label for="username"><i className="zmdi zmdi-account material-icons-name"></i></label>
                    <input type="text" name="username" 
                    placeholder="User Name"
                    value={UserName}
                    onChange={(e)=>setUserName(e.target.value)}/>
                </div>
                <div className="form-group">
                    <label for="your_pass"><i className="zmdi zmdi-lock"></i></label>
                    <input type="password" name="your_pass" 
                    placeholder="Password"
                    value={UserPassword}
                    onChange={(e)=>setUserPassword(e.target.value)}/>
        
                </div>
	    		<div className="form-group">
                    <label for="firstname"><i className="zmdi zmdi-account material-icons-name"></i></label>
                    <input type="text" name="firstname"
                    placeholder="First Name"
                    value={FirstName}
                    onChange={(e)=>setFirstName(e.target.value)}/>
                </div>
	    			<div className="form-group">
                    <label for="lastname"><i className="zmdi zmdi-account material-icons-name"></i></label>
                    <input type="text" name="lastname"
                    placeholder="Last Name"
                    value={LastName}
                    onChange={(e)=>setLastName(e.target.value)}/>
                </div>
	    				<div className="form-group">
                    <label for="email"><i className="zmdi zmdi-email"></i></label>
                    <input type="email" name="email" 
                    placeholder="Email"
                    value={Email}
                    onChange={(e)=>setEmail(e.target.value)}/>
                </div>
                <div className="form-group">
                    <label for="phone"><i className="zmdi zmdi-email"></i></label>
                    <input type="text" name="phone"  
                    placeholder=" Phone Number"
                    value={Contact}
                    onChange={(e)=>setContact(e.target.value)}/>
                </div>

	    		 {/* <div className="form-holder">
	    	<span className="lnr lnr-phone-handset"></span>
	    	<input type="text" className="form-control" placeholder="Phone Number"/>
	            </div> */}
                <div className="form-group">
                    <input type="checkbox" name="remember-me" className="agree-term" />
                    <label for="remember-me" className="label-agree-term"><span><span></span></span>Remember me</label>
                </div>
                <div className="form-group form-button">
                    <button type="submit" onClick={()=>onSubmit()} name="signin" className="form-submit btn">Sign in</button>
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
            

    )
}
const Student = ({status}) => {
    const cls = status ? "none" : "";
    const [UserName,setUserName] = React.useState('')
    const [UserPassword,setUserPassword] = React.useState('')
    const [FirstName,setFirstName] = React.useState('')
    const [LastName,setLastName] = React.useState('')
    const [Email,setEmail] = React.useState('')
    const [Contact,setContact] = React.useState('')
    const Role = 1;
    const onSubmit = () =>{
        axios
              .post(`http://localhost:4000/addUser`, {
                UserName,
                UserPassword,
                Role,
                FirstName,
                LastName,
                Contact,
                Email
              })
              .then((result) => result.data)
              .then((result)=>{
                console.log(result);
                alert(result);
                window.location.pathname = '/login'
                // getUserList();
                // $('#exampleModal .btn-close').click()
            } // fetching the updated list
                ,(error)=>{
                alert('Failed');
                // $('#exampleModal .btn-close').click()
            })
    }
    console.log(cls)
    return(
        <div className={`signin-form ${cls}`} >
        <h2 className="form-title">Be a Student</h2>
            <div className="register-form" >
                <div className="form-group">
                    <label for="username"><i className="zmdi zmdi-account material-icons-name"></i></label>
                    <input type="text" name="username" 
                    placeholder="User Name"
                    value={UserName}
                    onChange={(e)=>setUserName(e.target.value)}/>
                </div>
                <div className="form-group">
                    <label for="your_pass"><i className="zmdi zmdi-lock"></i></label>
                    <input type="password" name="your_pass" 
                    placeholder="Password"
                    value={UserPassword}
                    onChange={(e)=>setUserPassword(e.target.value)}/>
        
                </div>
	    		<div className="form-group">
                    <label for="firstname"><i className="zmdi zmdi-account material-icons-name"></i></label>
                    <input type="text" name="firstname"
                    placeholder="First Name"
                    value={FirstName}
                    onChange={(e)=>setFirstName(e.target.value)}/>
                </div>
	    			<div className="form-group">
                    <label for="lastname"><i className="zmdi zmdi-account material-icons-name"></i></label>
                    <input type="text" name="lastname"
                    placeholder="Last Name"
                    value={LastName}
                    onChange={(e)=>setLastName(e.target.value)}/>
                </div>
	    				<div className="form-group">
                    <label for="email"><i className="zmdi zmdi-email"></i></label>
                    <input type="email" name="email" 
                    placeholder="Email"
                    value={Email}
                    onChange={(e)=>setEmail(e.target.value)}/>
                </div>
                <div className="form-group">
                    <label for="phone"><i className="zmdi zmdi-email"></i></label>
                    <input type="text" name="phone"  
                    placeholder=" Phone Number"
                    value={Contact}
                    onChange={(e)=>setContact(e.target.value)}/>
                </div>

	    		 {/* <div className="form-holder">
	    	<span className="lnr lnr-phone-handset"></span>
	    	<input type="text" className="form-control" placeholder="Phone Number"/>
	            </div> */}
                <div className="form-group">
                    <input type="checkbox" name="remember-me" className="agree-term" />
                    <label for="remember-me" className="label-agree-term"><span><span></span></span>Remember me</label>
                </div>
                <div className="form-group form-button">
                    <button type="submit" onClick={()=>onSubmit()} name="signin" className="form-submit btn">Sign in</button>
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
            

    )
}