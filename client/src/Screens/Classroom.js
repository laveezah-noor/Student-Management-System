import React, { useState, useEffect } from 'react'
import axios from 'axios';

export default function Classrrom(props) {
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
        {
            Id:2,
            title: 'Material',
            status: false,
        }
    ]);

    const onChange = (e) =>{
        let NewArr = [...NavList]
        NewArr.map(item=>
            item.status = false)
        NewArr[e].status = true;
        setNavList(NewArr)
    }
    const [title,setTitle] = useState('Course Name');
    const [instructor,setInstructor] = useState('Course Instructor');
    
    const getDataList = () =>{
        axios
          .get(`http://localhost:4000/classroom/${props.match.params.courseid}`)
          .then((response) => response.data)
          .then((response) => {
              console.log(response);
              setCourse(response[0]);
              setStudent(response[2]);
              setTotalStudent(response[3][0]['Total'])
              setLectureList(response[5])  
            });
            
        Course.map(item=>{
            setTitle(item.CourseName);
            setInstructor(item.InstructorName)
            
        })

    }
    useEffect(() => {
        getDataList()
    }, [props]);
    console.log(LectureList);
    return (
        <div>
            <div className="card w-75 p-2 m-2" style={{height:"30vh"}}>
            <img className="card-img-top h-100" style={{backgroundSize:"cover"}} src="https://images.unsplash.com/photo-1497633762265-9d179a990aa6?ixid=MnwxMjA3fDB8MHxzZWFyY2h8MTd8fGxlYXJuaW5nfGVufDB8fDB8fA%3D%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60"/>
            <div className="card-img-overlay">
                <h5 class="card-title h1 text-left text-light">{title}</h5>
                <p className="card-text h3 text-left text-light">{instructor}</p>
            </div>
            <div className="card-body">
                {/* <h5 class="card-title">{title}</h5>
                <p className="card-text">{instructor}</p> */}
            </div>
            {/* <div className="card-footer">
                Hello
            </div> */}
        </div>
        <div class="card text-center w-75 p-2 m-2">
          <div class="card-header">
            <ul class="nav nav-tabs card-header-tabs nav-fill">
              {NavList.map(item=>
              <li class="nav-item" key={item.Id}>
                <a className={item.status?"nav-link active":"nav-link"}
                onClick={()=>onChange(item.Id)}>{item.title}</a>
              </li>
              )}
            </ul>
          </div>
          <div class="card-body">
            {NavList[0].status?
            <div>
                {LectureList.map(item=>{
                return(
                <div className="card">
                <div className="card-header mt-2 mb-2">
                    <h5 class="card-title text-left text-bold">{item.InstructorName}</h5>
                    <p className="card-text text-left text-secondary" style={{fontSize:15}}>{item.SubmitTime}</p>
                
                </div>
                <div className="card-body">
                    <p class="card-title text-left text-bold h4 mb-3 mx-2">{item.Description}</p>
                    {item.Notes!=null?<p class="card-title text-left">{item.Notes}</p>:null}
                    {item.Video!=null?
                        <iframe width="560" height="315" src={item.Video}>
                        </iframe>:null
                    }
                    {item.File!=null?
                    <div className="card w-50">
                        <div className="card-body">
                        <h5 class="card-title text-left text-bold">{title}</h5>
                        </div>
                    </div>
                    :null}
                </div>
            </div>
                )})}
            </div>
            :null}
            
            {NavList[1].status?
            <div className="text-left">
                <div className="d-flex m-3 p-2 justify-content-between border-bottom">
                <h4 class="card-title text-left text-bold">Classmates</h4>
                    <p className="card-text text-left ">{TotalStudent} Students</p>
                </div>
                <div class="">
                  {Student.map(item=>
                        <div class="border-bottom p-2 mx-4" key={item.ID}>{item.StudentName}</div>
                    )}
                </div>
            </div>
            :null}
          
        </div>
        </div>
        </div>
    )
}
