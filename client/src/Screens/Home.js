import React from 'react'
import { Switch, Route } from "react-router-dom";
import Navbar from '../Components/Navbar';
import Dashboard from './Dashboard';
import Courses from './Courses';
import Students from './Students';

export default function Home() {
    return (
        <>
        <Navbar/>
        <Switch>
            <Route path="/dashboard" exact component={Dashboard} />
            <Route path="/courses" exact component={Courses} />
            <Route path="/students" exact component={Students} />
        </Switch>
        </>
    )
}
