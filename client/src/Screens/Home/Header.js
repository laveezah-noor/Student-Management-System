import React from 'react'
import { Link, useRouteMatch } from 'react-router-dom'

export default function Header() {
  let {path,url} = useRouteMatch();
  console.log(path,url);
  return (
        <div>
                        {/* <!-- ======= Header ======= --> */}
          <header id="header" className="fixed-top">
            <div className="container d-flex align-items-center">

              <h1 className="logo me-auto"><a href="index.html">Mentor</a></h1>
              {/* <!-- Uncomment below if you prefer to use an image logo --> */}
              {/* <!-- <a href="index.html" className="logo me-auto"><img src="src/img/logo.png" alt="" className="img-fluid"></a>--> */}

              <nav id="navbar" className="navbar order-last order-lg-0">
                <ul>
                  <li><a className="active" onClick={()=>{window.location.pathname = `/`}}>Home</a></li>
                  {/* <li><a href="about.html">About</a></li> */}
                  <li><a onClick={()=>{window.location.pathname = `/courses`}}>Courses</a></li>
                  <li><a onClick={()=>{window.location.pathname = `/trainer`}}>Trainers</a></li>
                  {/* <li><a href="pricing.html">Pricing</a></li> */}

                  {/* <li className="dropdown"><a href="#"><span>Drop Down</span> <i className="bi bi-chevron-down"></i></a>
                    <ul>
                      <li><a href="#">Drop Down 1</a></li>
                      <li className="dropdown"><a href="#"><span>Deep Drop Down</span> <i className="bi bi-chevron-right"></i></a>
                        <ul>
                          <li><a href="#">Deep Drop Down 1</a></li>
                          <li><a href="#">Deep Drop Down 2</a></li>
                          <li><a href="#">Deep Drop Down 3</a></li>
                          <li><a href="#">Deep Drop Down 4</a></li>
                          <li><a href="#">Deep Drop Down 5</a></li>
                        </ul>
                      </li>
                      <li><a href="#">Drop Down 2</a></li>
                      <li><a href="#">Drop Down 3</a></li>
                      <li><a href="#">Drop Down 4</a></li>
                    </ul>
                  </li> */}
                  {/* <li><a href="contact.html">Contact</a></li> */}
                </ul>
                <i className="bi bi-list mobile-nav-toggle"></i>
              </nav>
              {/* <!-- .navbar --> */}

              <a onClick={()=>{window.location.pathname = `/login`}} className="get-started-btn">Get Started</a>

            </div>
          </header>
          {/* <!-- End Header --> */}

        </div>
    )
}
