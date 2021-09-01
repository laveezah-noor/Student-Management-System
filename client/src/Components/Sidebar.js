import React,{useState, useEffect} from 'react'
import { Link, useHistory } from 'react-router-dom'
import {useParams,useRouteMatch} from 'react-router-dom'
import axios from 'axios'

export default function Sidebar(props) {
    const [course,setCourse] = useState('')
    const getCourse = () =>{
    //     if (role==2){
    //         axios
    //       .get(`http://localhost:4000/courseTrainer/${user}`)
    //       .then((response) => response.data)
    //       .then((response) => {
    //         setCourse(response[0]['ID'])
    //         console.log(response,course);
    //         });
        
    //     }
    }
    const StudentData = [
        {
            title: 'Dashboard',
            icon: 'grid-1x2-fill',
            link:''
        },
        // {
        //     title: 'All Courses',
        //     icon: 'book-fill',
        //     link:'/course'
        // },
        {
            title: 'My Instructors',
            icon: 'person-fill',
            link:'/myInstructor'
        },
        // {
        //     title: 'All Students',
        //     icon: 'people-fill',
        //     link:'student'
        // },
        {
            title: 'All Courses',
            icon: 'book-fill',
            link:'/Courses'
        },
        {
            title: 'Notifications',
            icon: 'bell-fill',
            link:'/Notification'
        },
        // {
        //     title: 'Users',
        //     icon: 'people-fill',
        //     link:'users'
        // },
        {
            title: 'My Profile',
            icon: 'person-circle',
            link:'/myProfile'
        }
    
    ]
    
    const TrainerData = [
        {
            title: 'Dashboard',
            icon: 'grid-1x2-fill',
            link:''
        },
        {
            title: 'My Students',
            icon: 'person-fill',
            link:'/myStudents'
        },
        // {
        //     title: 'My Classroom',
        //     icon: 'book-fill',
        //     link:`/MyClassroom/${course}`
        // },
        {
            title: 'Notifications',
            icon: 'bell-fill',
            link:'/Notification'
        },
        {
            title: 'My Profile',
            icon: 'person-circle',
            link:'/myProfile'
        }
    ]
    
    const AdminData = [
        {
            title: 'Dashboard',
            icon: 'grid-1x2-fill',
            link:''
        },
        {
            title: 'All Instructors',
            icon: 'person-fill',
            link:'/Instructors'
        },
        {
            title: 'All Students',
            icon: 'people-fill',
            link:'/Students'
        },
        {
            title: 'All Courses',
            icon: 'book-fill',
            link:'/Courses'
        },
        {
            title: 'All Users',
            icon: 'people-fill',
            link:'/Users'
        },
        {
            title: 'My Profile',
            icon: 'person-circle',
            link:'/myProfile'
        }
    
    ]
    const role = props.role;
    const user = props.user;
    console.log(role,props);
    let { path, url } = useRouteMatch();
    const history = useHistory()
    console.log("Path: ",path,"URL: ",url, course)
    useEffect(() => {
        getCourse()
    }, [])
    return (
        <div className="Sidebar sticky-bottom d-block">
            <h1 className="p-2 text-white my-3 h2 text-bold">Mentor</h1>
              
            <ul 
            className="SidebarList mt-5"
            >
                {(role==1)?
                    StudentData.map((val,key)=>{
                        return(
                            <li
                                key={key}
                                className="row"
                                id={window.location.pathname == val.link ? "active":""}
                                onClick={()=>{history.push(`${url}${val.link}`, {id: user, role: role})}}
                                // onClick={()=>{window.location.pathname = `${url}${val.link}` }}
                                >
                                    <i id="icon" className={`bi bi-${val.icon}`}></i>
                                    <div id="title">{val.title}</div>
                            </li>
                        )
                    })
                :
                (role==2)?
                TrainerData.map((val,key)=>{
                    return(
                        <li
                            key={key}
                            className="row"
                            id={window.location.pathname == val.link ? "active":""}
                            onClick={()=>{history.push(`${url}${val.link}`, {id: user, role: role})}}
                            >
                                <i id="icon" className={`bi bi-${val.icon}`}></i>
                                <div id="title">{val.title}</div>
                        </li>
                    )
                })
                :
                (role==3)?
                AdminData.map((val,key)=>{
                    return(
                        <li
                            key={key}
                            className="row"
                            id={window.location.pathname == val.link ? "active":""}
                            onClick={()=>{history.push(`${url}${val.link}`, {id: user, role: role})}}
                            >
                                <i id="icon" className={`bi bi-${val.icon}`}></i>
                                <div id="title">{val.title}</div>
                        </li>
                    )
                })
                :null}
            </ul>
        </div>
    )
}
