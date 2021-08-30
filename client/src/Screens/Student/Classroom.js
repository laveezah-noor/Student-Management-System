import React, { useState, useEffect } from 'react'
import axios from 'axios';
import $ from 'jquery';

export default function Classrrom(props) {
    const [Course,setCourse] = useState([]);
    const [Student,setStudent] = useState([]);
    const [LectureList,setLectureList] = useState([]);
    const [TotalStudent,setTotalStudent] = useState('');
    const [ModalTitle, setModalTitle] = useState('');
    const [LectureID, setLectureID] = useState(0);
    const [Description, setDescription] = useState('');
    const [Notes, setNotes] = useState('');
    const [Video, setVideo] = useState('');
    const [File, setFile] = useState('');
    
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
    const [CourseID,setCourseID] = useState(0);
    const [InstructorID,setInstructorID] = useState(0);
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
                console.log(item)
                setCourseID(item.ID);
                setInstructorID(item.InstructorID)
                setTitle(item.CourseName);
                setInstructor(item.InstructorName)

            })

    }

    const addClick = () =>{
        setModalTitle("Add Lecture")
        setDescription('');
        setNotes('');
        setVideo('');
        setFile('');
    
    };
    const editClick = (Lecture) =>{
        setModalTitle("Edit Lecture")
        setDescription(Lecture.Description);
        setNotes(Lecture.Notes);
        setVideo(Lecture.Video);
        setFile(Lecture.File);
        setLectureID(Lecture.ID)
    };
    const deleteClick = (InstructorID) =>{

        if(window.confirm('Are you sure?')){
            axios
              .delete(`http://localhost:4000/instructor/${InstructorID}`, {
                method: 'DELETE',
              })
              .then((result) => {
                console.log(result);
                getDataList();
            } // fetching the updated list
                ,(error)=>{
                alert('Failed');
            })
            }
    };
    const createClick = () =>{

        if(window.confirm('Are you sure?')){
            axios
              .post(`http://localhost:4000/addLecture`, {
                Description,
                Notes,
                Video,
                File,
                InstructorID,
                CourseID
              })
              .then((result) => {
                console.log(result);
                getDataList();
            } // fetching the updated list
                ,(error)=>{
                alert('Failed');
            })
            }
            $('#exampleModal .btn-close').click()
    };
    const updateClick = () =>{

        if(window.confirm('Are you sure?')){
            axios
              .put(`http://localhost:4000/updateLecture`, {
                LectureID,
                Description,
                Notes,
                Video,
                File
              })
              .then((result) => {
                console.log(result);
                getDataList();
            } // fetching the updated list
                ,(error)=>{
                alert('Failed');
            })
            }
            $('#exampleModal .btn-close').click()
    };

    
    useEffect(() => {
        getDataList()
    }, [props]);
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
                <button className="btn btn-light">
                <i className="fa fa-plus"></i>
                </button>
                {LectureList.map(item=>{
                return(
                <div className="card" key={item.ID}>
                <div className="card-header mt-2 mb-2 d-flex justify-content-between">
                    <div>
                    <h5 class="card-title text-left text-bold">{item.InstructorName}</h5>
                    <p className="card-text text-left text-secondary" style={{fontSize:15}}>{item.SubmitTime}</p>
                    </div>
                    
           
                    <div class="dropdown">
                      <button class="btn btn-light dropdown" type="button" id="dropdownMenuButton1" data-bs-toggle="dropdown" aria-expanded="false">
                        <i className="fa fa-ellipsis-v"></i>
                      </button>
                      <ul class="dropdown-menu" aria-labelledby="dropdownMenuButton1">
                        <li onClick={()=>editClick(item)} data-bs-toggle="modal"
                    data-bs-target="#exampleModal"><a class="dropdown-item" href="#">Edit</a></li>
                        <li onClick={()=>deleteClick(item.ID)} data-bs-toggle="modal"
                    data-bs-target="#exampleModal"><a class="dropdown-item" href="#">Delete</a></li>
                      </ul>
                    </div>
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
        <div className="modal fade" id="exampleModal" tabIndex="-1" aria-hidden="true">
                <div className="modal-dialog modal-lg modal-dialog-centered">
                <div className="modal-content">
                   <div className="modal-header">
                       <h5 className="modal-title">{ModalTitle}</h5>
                       <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"
                       ></button>
                   </div>

                   <div className="modal-body">
                    <div className="d-flex flex-row bd-highlight mb-3">

                     <div className="p-2 w-50 bd-highlight">

                        <div className="input-group mb-3">
                            <span className="input-group-text">Lecture Title</span>
                            <input type="text" className="form-control"
                            value={Description}
                            onChange={(e)=>setDescription(e.target.value)}/>
                        </div>

                        <div className="input-group mb-3">
                            <span className="input-group-text">Content</span>
                            <textarea class="form-control" aria-label="With textarea"
                            value={Notes}
                            onChange={(e)=>setNotes(e.target.value)}></textarea>
                            {/* <input type="text" className="form-control"
                            value={Notes}
                            onChange={(e)=>setNotes(e.target.value)}/> */}
                        </div>

                        <div className="input-group mb-3">
                            <span className="input-group-text">Embed Video</span>
                            <input type="text" className="form-control"
                            value={Video}
                            onChange={(e)=>setVideo(e.target.value)}/>
                        </div>
                                
                        <div className="input-group mb-3">
                            <span className="input-group-text">File</span>
                            <input type="file" className="form-control"
                            value={File}
                            onChange={(e)=>setFile(e.target.value)}/>
                        </div>
                                
                     </div>
                     {/* <div className="p-2 w-50 bd-highlight">
                         <img width="250px" height="250px"
                         src={PhotoPath+PhotoFileName}/>
                         <input className="m-2" type="file" onChange={this.imageUpload}/>
                     </div> */}
                    </div>
                                
                    {LectureID===0?
                        <button type="button"
                        className="btn btn-primary float-start"
                        onClick={()=>createClick()}
                        >Create</button>
                        :null}

                        {LectureID!==0?
                        <button type="button"
                        className="btn btn-primary float-start"
                        onClick={()=>updateClick()}
                        >Update</button>
                        :null}
                   </div>
                        
                        </div>
                </div>
            </div>
        </div>
    )
}
