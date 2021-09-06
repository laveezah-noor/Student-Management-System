import React, { useEffect, useState } from 'react'
import axios from 'axios';
import {Card, OverviewCard} from '../Components/Card'
import { useHistory, useLocation, useParams, useRouteMatch } from 'react-router-dom';

export default function Dashboard(props) {
    let { path, url } = useRouteMatch();
    const history = useHistory()
    const {user} = useParams();
    const {role} = useParams();
    const [data, setData] = useState([])
    const[FirstName,setFirstName] = useState('');
    const[LastName,setLastName] = useState(''); 
    const[S_Courses,setS_Courses] = useState(0);
    const[I_Students,setI_Students] = useState(0);
    const[A_Students,setA_Students] = useState(0);
    const[A_Courses,setA_Courses] = useState(0);
    const[A_Trainers,setA_Trainers] = useState(0);
    const[A_Admins,setA_Admins] = useState(0);
    const[A_Users,setA_Users] = useState(0);
    const getData = () => {
        axios
          .get(`http://localhost:4000/dashboard/${role}/${user}`)
          .then((response) => response.data)
          .then((response) => {
              if (role==1){
                setFirstName(response[0][0].FirstName)
                setLastName(response[0][0].LastName)
                setData(response[1]);
                setS_Courses(response[2][0]['TotalCourses'])
              } else if (role==2){
                setData(response[1]);
                setFirstName(response[0][0].FirstName)
                setLastName(response[0][0].LastName)
                setI_Students(response[2][0]['TotalStudents'])

              } else if (role==3) {
                setData(response[1]);
                setFirstName(response[0][0].FirstName)
                setLastName(response[0][0].LastName)
                setA_Admins(response[5][0]['TotalAdmins'])
                setA_Students(response[1][0]['TotalStudents'])
                setA_Trainers(response[2][0]['TotalTrainers'])
                setA_Users(response[4][0]['TotalUsers'])
                setA_Courses(response[3][0]['TotalCourses'])
              }
            console.log(response);
            });
        };    
    useEffect(() => {
        getData();
        console.log(user)
    }, [props]);

    return (
        <div style={{margin:"3rem 3rem 3rem 100px"}}>
            <h1 className="text-left">{`Welcome Back, ${FirstName} ${LastName}!`}</h1>
            <hr/>
            {role==1?
            <div className="row">
            <div className=" row m-2">
            <h2 className="h3 m-2 mb-4 text-left">Overview</h2>
            
            <OverviewCard 
              title={'Courses In Progress'}
              icon={"bi bi-book"}
              value={S_Courses}
                />
            
            </div>
            <div className=" row m-2">
            <h2 className="h3 m-2 mb-4 text-left">My Courses</h2>
            {data.map(item=>
            {return(
                <Card 
              key={item.ID}
              CourseID={item.ID}
              CourseName={item.CourseName}
              CourseDetail={''}
              CourseImage={item.Image}
              InstructorName={item.InstructorName}
              onClick = {()=>history.push(`${url}/Classroom/${item.ID}`)}
                />
            )})}
            
            </div>
            </div>
            :null}
            {role==2?
            <div className="row">
            <div className=" row m-2">
            <h2 className="h3 m-2 mb-4 text-left">Overview</h2>
            <OverviewCard 
              title={'Total Students'}
              icon={"bi bi-people"}
              value={I_Students}
                />
            </div>
            <div className=" row m-2">
            <h2 className="h3 m-2 mb-4 text-left">My Courses</h2>
            {data.map(item=>
            {return(
                <Card 
              key={item.ID}
              CourseID={item.ID}
              CourseName={item.CourseName}
              CourseDetail={''}
              CourseImage={item.Image}
              InstructorName={item.InstructorName}
              onClick = {()=>history.push(`${url}/MyClassroom/${item.ID}`)}
                />
            )})}
            
            </div>
            </div>
            
            :null}
            {role==3?
            <div className="d-flex">
            <OverviewCard 
              title={'Total Courses'}
              icon={"bi bi-book"}
              value={A_Courses}
                />
            <OverviewCard 
              title={'Total Students'}
              icon={"bi bi-people"}
              value={A_Students}
                />
            <OverviewCard 
              title={'Total Trainers'}
              icon={"bi bi-people"}
              value={A_Trainers}
                />
            <OverviewCard 
              title={'Total Users'}
              icon={"bi bi-people-fill"}
              value={A_Users}
                />
            <OverviewCard 
              title={'Total Admins'}
              icon={"bi bi-person"}
              value={A_Admins}
                />
            </div>
            
            :null}
        </div>
    )
}
