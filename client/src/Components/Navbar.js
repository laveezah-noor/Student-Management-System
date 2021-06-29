import React, {useState, useEffect} from 'react'
import {Link} from 'react-router-dom'
import './Navbar.css';
import {NavData} from './Data';

export default function Navbar() {
    const [click, setClick] = useState(false);
    const [button, setButton] = useState(true);

    const handleClick = () => {
        setClick(!click)
    }
    const closeMenu = () => {
        setClick(false)
    }
    const showButton = ()=>{
        if (window.innerWidth <= 960) {
            setButton(false)
            console.log('False')
        } else {
            setButton(true)
            console.log('Runn')
        }
    }
    window.addEventListener('resize', showButton);

    useEffect(() => {
        showButton()
    }, [])
    

    return (
        <>
          <div className="navbar">
            <div className="navbar-container">
              <div className="menu-icons" onClick={handleClick}>
                <i className={click ? 'fas fa-times' : 'fas fa-bars'} ></i>
              </div>
              <Link className="navbar-logo">
                  <i className="fab fa-typo3"></i>
                  <span className="h5 p-3">Student Management System</span>
              </Link>
            </div>
          </div>
          <nav className={click ? 'nav-menu active' : 'nav-menu'}>
            <ul className="nav-menu-items">
              {
                NavData.map(item=>{
                  return(
                  <li className='nav-items'> 
                    <Link 
                    to={item.path} 
                    className='nav-links'>
                    {item.title}
                    </Link>
                  </li>
                )})
              }
              {/* <li className='nav-items'> 
                <Link to='/' className='nav-links' onClick={closeMenu}>
                  Home
                </Link>
              </li>
              <li className='nav-items'>
                <Link
                  to='/services'
                  className='nav-links'
                  onClick={closeMenu}
                >
                  Services
                </Link>
              </li>
              <li className='nav-items'>
                <Link
                  to='/products'
                  className='nav-links'
                  onClick={closeMenu}
                >
                  Products
                </Link>
              </li>
              <li>
                <Link
                  to='/sign-up'
                  className='nav-links'
                  onClick={closeMenu}
                >
                  Sign Up
                </Link>
              </li> */}
            </ul>
          </nav>
        </>
    )
}