import React from 'react'
import { Switch, Route } from "react-router-dom";
import Navbar from '../Components/Navbar';
import Dashboard from './Dashboard';
import Students from './Students';
import Course from './Course';

export default function Home() {
    return (
        <>
        <Navbar/>
        <div style={{backgroundColor:"beige"}}>
            <h2>Home Page</h2>
        </div>
        
        </>
    )
}
