import React, {useState, useEffect} from 'react'
import {Link} from 'react-router-dom'
import Button from './Button';  
import './Navbar.css'

export default function Navbar() {
    const [click, setClick] = useState(false);
    const [button, setButton] = useState(true)

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
            <nav className="navbar">
                <div className="navbar-container">
                    <Link className="navbar-logo">
                        LN <i className="fab fa-typo3"></i>
                    </Link>
                    <div className="menu-icon" onClick={handleClick}>
                        <i className={click ? 'fas fa-times' : 'fas fa-bars'} ></i>
                    </div>
                    <ul className={click ? 'nav-menu active' : 'nav-menu'}>
            <li className='nav-item'> 
              <Link to='/' className='nav-links' onClick={closeMenu}>
                Home
              </Link>
            </li>
            <li className='nav-item'>
              <Link
                to='/services'
                className='nav-links'
                onClick={closeMenu}
              >
                Services
              </Link>
            </li>
            <li className='nav-item'>
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
                className='nav-links-mob'
                onClick={closeMenu}
              >
                Sign Up
              </Link>
            </li>
          </ul>
                    {
                        button && <Button buttonStyle="btn-outline">Sign Up</Button>
                    }
                </div>
            </nav>
        </>
    )
}