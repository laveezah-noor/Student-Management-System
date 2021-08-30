import React from 'react'
import { Switch, Route } from "react-router-dom";
import Navbar from '../Components/Navbar';
import Dashboard from './Dashboard';
import Students from './Students';
import Course from './Course';

export default function Home() {
    return (
        <div className="w-100 h-100" 
        style={{backgroundColor:"beige", width:"inherit"}}>
            <Nav/>
            <div>
              <img 
            className="img-fluid w-100"
            style={{backgroundSize:"cover"}}
            src="https://images.unsplash.com/photo-1513258496099-48168024aec0?ixid=MnwxMjA3fDB8MHxzZWFyY2h8MTB8fGxlYXJuaW5nfGVufDB8fDB8fA%3D%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60"
            />  
            </div>
            
            <h2>Home Page</h2>
        </div>
    )
}

const Nav = () =>{
    return(
        <nav>

        </nav>
    )
}