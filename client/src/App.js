import './App.css';
import {
  BrowserRouter as Router, 
  Switch, 
  Route, useRouteMatch, useParams, useHistory} from 'react-router-dom'
// import main from './Screens/Home/Login';
import Home from './Screens/Home/Home';
import Header from './Screens/Home/Header';
import Course from './Screens/Home/Course';
import Footer from './Screens/Home/Footer';
import Instructor from './Screens/Home/Instructor';
import Login from './Screens/Home/Login';
import Register from './Screens/Home/Register';
import Dashboard from './Screens/Dashboard';
import MyInstructor from './Screens/myInstructor';
import Classroom from './Screens/StudentClassroom';
import MyClassroom from './Screens/Classroom';
import Courses from './Screens/AllCourses';
import Profile from './Screens/Profile';
import Notifications from './Screens/Notifications';
import SideBar from './Components/Sidebar';
import axios from 'axios';
import AllCourses from './Screens/Admin/Courses';
import Users from './Screens/Admin/Users';
import Students from './Screens/Admin/Students';
import Instructors from './Screens/Admin/Instructors';
import MyStudents from './Screens/Instructor/MyStudents';
import { useEffect, useState } from 'react';


function App() {
  const [status,setStatus] = useState(false)
  const [user,setUser] = useState(0)
  const [role,setRole] = useState(0)
  const getLogin = () =>{
    axios
        .get(`http://localhost:4000/login`)
        .then((response) => response.data)
        .then((response) => {
            console.log(response);
            // if (response.loggedIn){
            //   setUser(response.user)
            //   setStatus(response.loggedIn)
            //   setRole(response.role)
            // }
        })
  }
  console.log("Status: ",status,user,role)
  useEffect(() => {
    getLogin()
  }, []);

  return (
    <div className="App"> 
    <Router>
      <Switch>
      <Route exact path={'/'} component={Home}/>
      <Route path={`/courses`} component={Course} />
      <Route path={`/trainer`} component={Instructor} />
      <Route path={'/Home/:user/:role'} component={Student} user={user} role={role}/>
      <Route path={'/login'} component={Login} login={()=>getLogin()}/>
      <Route path={'/register'} component={Register} />
      
      </Switch>
      
    </Router>
    </div>
  );
}

export default App;

const Student = (props) => {
  const {user} = useParams();
  const {role} = useParams();
  const history = useHistory();
  // console.log('Student', user, role);
  let { path, url } = useRouteMatch();
  // console.log(path, url)
  useEffect(() => {
}, [props]);

  return (
    <div className="Main">
    <SideBar role={role} user={user}/>
    <div className="Screens">
      {(role==1)?
      <Switch>
      <Route exact path={`${path}`} component={Dashboard} />
      <Route exact path={`${path}/myInstructor`} component={MyInstructor} />
      <Route exact path={`${path}/Courses`} component={Courses} />
      <Route exact path={`${path}/myProfile`} component={Profile} />
      <Route exact path={`${path}/Notification`} component={Notifications} />
      <Route exact path={`${path}/Classroom/:courseid`} component={Classroom} />
      </Switch>
      :
      (role==2)?
      <Switch>
      <Route exact path={`${path}`} component={Dashboard} />
      <Route exact path={`${path}/myStudents`} component={MyStudents} />
      <Route exact path={`${path}/Notification`} component={Notifications} />
      <Route exact path={`${path}/MyClassroom/:courseid`} component={MyClassroom} />
      <Route exact path={`${path}/myProfile`} component={Profile} />
      </Switch>
      :
      (role==3)?
      <Switch>
      <Route exact path={`${path}`} component={Dashboard} />
      <Route exact path={`${path}/Instructors`} component={Instructors} />
      <Route exact path={`${path}/Courses`} component={AllCourses} />
      <Route exact path={`${path}/Users`} component={Users} />
      <Route exact path={`${path}/Students`} component={Students} />
      <Route exact path={`${path}/myProfile`} component={Profile} />
      </Switch>
      :
      null}
    </div>      
    </div>
  );
}

const Frontend = (props) => {
  console.log('Home');  
  let { path, url } = useRouteMatch();
  console.log("Path:",path, "Url:",url)
  return (
    <div>
      <Header/>
      <Switch>
        <Route exact path={`${path}`} component={Home}/>
        <Route exact path={`${path}courses`} component={Course} />
        <Route exact path={`${path}trainer`} component={Instructor} />
      </Switch>
      <Footer/>
    </div>
  );
}
