// import React from 'react'

// export default function Drawer() {
//     const [click, setClick] = useState(false);
//     const [button, setButton] = useState(true)

//     const handleClick = () => {
//         setClick(!click)
//     }
//     const closeMenu = () => {
//         setClick(false)
//     }
//     const showButton = ()=>{
//         if (window.innerWidth <= 960) {
//             setButton(false)
//             console.log('False')
//         } else {
//             setButton(true)
//             console.log('Runn')
//         }
//     }
//     window.addEventListener('resize', showButton);

//     useEffect(() => {
//         showButton()
//     }, [])

//     return (
//     <>
//     <div class="navbar">
//         <Link to="#" classname="menu-bars">
//         <i className={click ? 'fas fa-times' : 'fas fa-bars'} ></i>
//         </Link>
//     </div>
//     <ul className={click ? 'nav-menu active' : 'nav-menu'}>
//                       <li className='nav-item'> 
//                         <Link to='/' className='nav-links' onClick={closeMenu}>
//                           Home
//                         </Link>
//                       </li>
//                       <li className='nav-item'>
//                         <Link
//                           to='/services'
//                           className='nav-links'
//                           onClick={closeMenu}
//                         >
//                           Services
//                         </Link>
//                       </li>
//                       <li className='nav-item'>
//                         <Link
//                           to='/products'
//                           className='nav-links'
//                           onClick={closeMenu}
//                         >
//                           Products
//                         </Link>
//                       </li>
//                       <li>
//                         <Link
//                           to='/sign-up'
//                           className='nav-links-mob'
//                           onClick={closeMenu}
//                         >
//                           Sign Up
//                         </Link>
//                       </li>
//                     </ul>
//     </>
//     )
// }
