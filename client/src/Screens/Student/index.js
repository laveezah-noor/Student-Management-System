import React from 'react'
import { Route, Router, Switch } from 'react-router-dom'
import Dashboard from './Dashboard';
// import Home from './Home';
import Course from './Course';
import Instructor from './Instructor';
import Students from './Students';
import Sidebar from './Components/Sidebar';
import Courses from './Courses';
import Classrrom from './Classroom';
import Users from './Screens/Users';
import Profile from './Profile';


export default function StudentMain() {
    return (
        <Router>
            <Sidebar/>
            <div className="Screens">
            <Switch>
                <Route path="/dashboard" exact component={Dashboard} />
                <Route path="/course" exact component={Course} />
                <Route path="/instructor" exact component={Instructor} />
                <Route path="/student" exact component={Students} />
                {/* <Route path="/home" exact component={Home} /> */}
                <Route path="/courses" exact component={Courses} />
                <Route path="/classroom/:courseid" exact component={Classrrom} />
                <Route path="/users" exact component={Users} />
                <Route path="/profile" exact component={Profile} />
                <Route />
            </Switch>
            </div>
        </Router>
    )
}
