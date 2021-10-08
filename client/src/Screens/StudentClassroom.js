import React, { useState, useEffect } from 'react'
import axios from 'axios';
import $ from 'jquery';

export default function Classroom(props) {
    const [Course,setCourse] = useState([]);
    const [Student,setStudent] = useState([]);
    const [LectureList,setLectureList] = useState([]);
    const [TotalStudent,setTotalStudent] = useState('');
    const [NavList, setNavList] = useState([
        {
            Id:0,
            title: 'Lectures',
            status: true,
        },
        {
            Id:1,
            title: 'People',
            status: false,
        },

        // {
        //     Id:2,
        //     title: 'Material',
        //     status: false,
        // }
    ]);

    const onChange = (e) =>{
        let NewArr = [...NavList]
        NewArr.map(item=>
            item.status = false)
        NewArr[e].status = true;
        setNavList(NewArr)
    }
    const [CourseID,setCourseID] = useState(0);
    const [InstructorID,setInstructorID] = useState(0);
    const [title,setTitle] = useState('Course Name');
    const [instructor,setInstructor] = useState('Course Instructor');
    const [CourseImage, setCourseImage] = useState('')
    const ImagePath = '/CourseImages/'
    const getDataList = () =>{
        axios
          .get(`http://localhost:4000/classroom/${props.match.params.courseid}`)
          .then((response) => response.data)
          .then((response) => {
            setCourse(response[0]);
            setStudent(response[2]);
            setTotalStudent(response[3][0]['Total'])
            setLectureList(response[5])
            console.log(Course,Student,TotalStudent,LectureList)
            if(response[0][0]!=undefined){
                setCourseID(response[0][0].ID);
                setInstructorID(response[0][0].InstructorID)
                setTitle(response[0][0].CourseName);
                setInstructor(response[0][0].InstructorName)
                setCourseImage(response[0][0].Image)
            }
            console.log(response);
            });
        
    }
    const Leave = () =>{
        axios
        .delete(`http://localhost:4000/leavecourse/${props.match.params.user}/${CourseID}`)
        .then((response) => response.data)
          .then((response) => {
              console.log(response)
                window.location.pathname=`/Home/${props.match.params.user}/${props.match.params.role}`
          });
    }
    const Lectures = () =>{
        if(LectureList!=[]){
            return(
                LectureList.map(item=>{
                    console.log(LectureList)
                    return(
                    <div className="card my-2" key={item.ID}>
                    <div className="card-header mt-2 mb-2 d-flex justify-content-between">
                        <div>
                        <h5 className="card-title text-left text-bold">{item.InstructorName}</h5>
                        <p className="card-text text-left text-secondary" style={{fontSize:15}}>{item.SubmitTime}</p>
                        </div>
                        
                    </div>
                    <div className="card-body">
                        <p className="card-title text-left text-bold h4 mb-3 mx-2">{item.Description}</p>
                        {item.Notes!=null?<p className="card-title text-left">{item.Notes}</p>:null}
                        {item.Video!=null?
                            <iframe width="560" height="315" src={item.Video}>
                            </iframe>:null
                        }
                        {item.File!=null?
                        <div className="card w-50">
                            <div className="card-body">
                            <h5 className="card-title text-left text-bold">{title}</h5>
                            </div>
                        </div>
                        :null}
                    </div>
                </div>
                    )})
            )
        }
    }
    console.log(props.match.params.user);    
    useEffect(() => {
        getDataList()
    }, [props]);
    return (
        <div className="ml-5">
            <div className="card w-75 p-2 m-2" style={{height:"30vh"}}>
            <img className="card-img-top h-100" style={{backgroundSize:"cover"}} 
            src={(CourseImage!=null)?ImagePath+CourseImage:"https://images.unsplash.com/photo-1497633762265-9d179a990aa6?ixid=MnwxMjA3fDB8MHxzZWFyY2h8MTd8fGxlYXJuaW5nfGVufDB8fDB8fA%3D%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60"}
            />
            <div className="card-img-overlay d-flex justify-content-between" style={{"backgroundColor": "rgba(128, 128, 128,0.6)"}}>
                <div>
                <h5 className="card-title h1 text-left text-light">{title}</h5>
                <p className="card-text h3 text-left text-light">{instructor}</p>
                </div>
                <div className="d-flex flex-row-reverse">

            <div className="dropdown">
                      <button className="btn btn-light dropdown" type="button" id="dropdownMenuButton1" data-bs-toggle="dropdown" aria-expanded="false">
                        <i className="fa fa-ellipsis-v"></i>
                      </button>
                      <ul className="dropdown-menu" aria-labelledby="dropdownMen uButton1">
                        <li 
                        ><button className="dropdown-item"
                        onClick={()=>Leave()} >Leave</button></li>
                        </ul>
            </div>
                </div>
            </div>
        </div>
        <div className="card text-center w-75 p-2 m-2">
          <div className="card-header">
            <ul className="nav nav-tabs card-header-tabs nav-fill">
              {NavList.map(item=>
              <li className="nav-item" key={item.Id}>
                <a className={item.status?"nav-link active":"nav-link"}
                onClick={()=>onChange(item.Id)}>{item.title}</a>
              </li>
              )}
            </ul>
          </div>
          <div className="card-body">
            {NavList[0].status?
            // Lectures
            <div>
                <Lectures/>
            </div>
            :null}
            
            {NavList[1].status?
            // People
            <div className="text-left">
                <div className="d-flex m-3 p-2 justify-content-between border-bottom">
                <h4 className="card-title text-left text-bold">Classmates</h4>
                    <p className="card-text text-left ">{TotalStudent} Students</p>
                </div>
                <div className="">
                  {Student.map(item=>
                        <div className="border-bottom p-2 mx-4" key={item.ID}>{item.StudentName}</div>
                    )}
                </div>
            </div>
            :null}
          
        </div>
        </div>
    </div>
    )
}
