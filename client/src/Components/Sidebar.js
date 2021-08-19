import React from 'react'
import { Link } from 'react-router-dom'
import './Navbar.css'
const SidebarData = [{
        title: 'Home',
        icon: 'house-fill',
        link:'/home'
    },
    {
        title: 'Dashboard',
        icon: 'book-fill',
        link:'/dashboard'
    },
    {
        title: 'All Courses',
        icon: 'book-fill',
        link:'/course'
    },
    {
        title: 'All Instructors',
        icon: 'person-fill',
        link:'/instructor'
    },
    {
        title: 'All Students',
        icon: 'people-fill',
        link:'/student'
    },
    {
        title: 'Courses',
        icon: 'people-fill',
        link:'/courses'
    },
    {
        title: 'Classroom',
        icon: 'people-fill',
        link:'/classroom'
    },
    {
        title: 'Users',
        icon: 'people-fill',
        link:'/users'
    }

]
export default function Sidebar() {
    
    return (
        <div className="Sidebar">
            <ul 
            className="SidebarList"
            >
                {
                    SidebarData.map((val,key)=>{
                        return(
                            <li
                                key={key}
                                className="row"
                                id={window.location.pathname == val.link ? "active":""}
                                onClick={()=>{window.location.pathname = val.link}}
                                >
                                    {/* <Link to={val.link}> */}
                                    <i id="icon" className={`bi bi-${val.icon}`}></i>
                                    <div id="title">{val.title}</div>
                                    
                                    {/* </Link> */}
                                    
                            </li>
                        )
                    })
                }
            </ul>
        </div>
    )
}
