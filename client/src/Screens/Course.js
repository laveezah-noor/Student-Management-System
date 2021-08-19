import React,{useState, useEffect} from 'react';
import axios from 'axios';
import $ from 'jquery';

export default function Course (props){
    const [CourseList, setCourseList] = useState([]);
    const [InstructorList, setInstructorList] = useState([]);
    const [ModalTitle, setModalTitle] = useState('');
    const [CourseID, setCourseID] = useState(0);
    const [CourseName, setCourseName] = useState('');
    const [Instructor, setInstructor] = useState(0);
            
    const getCourseList = () => {
        axios
          .get(`http://localhost:4000/course`)
          .then((response) => response.data)
          .then((response) => setCourseList(response));
          axios
            .get(`http://localhost:4000/instructor`)
            .then((response) => response.data)
            .then((response) => setInstructorList(response));
        
    };
    const addClick = () =>{
        setModalTitle("Add Course")
        setCourseID(0)
        setCourseName('')
        setInstructor('')
    
    };
    const editClick = (course) =>{
        setModalTitle("Edit Course")
        setCourseID(course.ID)
        setCourseName(course.CourseName)
        setInstructor(course.InstructorID)
    
    };
    const deleteClick = (courseID) =>{

        if(window.confirm('Are you sure?')){
            axios
              .delete(`http://localhost:4000/course/${courseID}`, {
                method: 'DELETE',
              })
              .then((result) => {
                console.log(result);
                getCourseList();
            } // fetching the updated list
                ,(error)=>{
                alert('Failed');
            })
            }
    };
    const createClick = () =>{

        if(window.confirm('Are you sure?')){
            axios
              .post(`http://localhost:4000/addCourse`, {
                CourseName,
                Instructor
              })
              .then((result) => {
                console.log(result);
                getCourseList();
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
              .put(`http://localhost:4000/updateCourse`, {
                CourseID,
                CourseName,
                Instructor
              })
              .then((result) => {
                console.log(result);
                getCourseList();
            } // fetching the updated list
                ,(error)=>{
                alert('Failed');
            })
            }
            $('#exampleModal .btn-close').click()
    };

    useEffect(() => {
        getCourseList();
    }, [props]);
    
    return (
        <div>
            <h3 className="mt-3 mb-2 mx-5">Courses List</h3>
            <div className="d-flex flex-row mx-5">


                    <input className="form-control m-2"
                    // onChange={this.changeDepartmentIdFilter}
                    placeholder="Search By Name"/>

                    
                    <select class="form-select m-2" aria-label="Sort By">
                      <option selected>Sort By</option>
                      <option value="1">One</option>
                      <option value="2">Two</option>
                      <option value="3">Three</option>
                    </select>
                    <button type="button" className="btn btn-light"
                    // onClick={()=>this.sortResult('DepartmentId',true)}
                    >
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-arrow-down-square-fill" viewBox="0 0 16 16">
                        <path d="M2 0a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2H2zm6.5 4.5v5.793l2.146-2.147a.5.5 0 0 1 .708.708l-3 3a.5.5 0 0 1-.708 0l-3-3a.5.5 0 1 1 .708-.708L7.5 10.293V4.5a.5.5 0 0 1 1 0z"/>
                        </svg>
                    </button>

                    <button type="button" className="btn btn-light"
                    // onClick={()=>this.sortResult('DepartmentId',false)}
                    >
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-arrow-up-square-fill" viewBox="0 0 16 16">
                        <path d="M2 16a2 2 0 0 1-2-2V2a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2H2zm6.5-4.5V5.707l2.146 2.147a.5.5 0 0 0 .708-.708l-3-3a.5.5 0 0 0-.708 0l-3 3a.5.5 0 1 0 .708.708L7.5 5.707V11.5a.5.5 0 0 0 1 0z"/>
                        </svg>
                    </button>
                    <button type="button" 
                    // className="btn btn-light"
                    className="btn btn-light mr-1"
                    data-bs-toggle="modal"
                    data-bs-target="#exampleModal"
                    onClick={()=>addClick()}
                    >
                        <i className="bi bi-plus" style={{fontSize:"30px"}}></i>
                    </button>
                    
                    </div>
                    
            <table className="table table-striped">
            <thead>
            <tr>
                <th>
                    Course Id
                </th>
                <th>
                    Course Name

                </th>
                <th>
                    Instructor

                </th>
                <th>
                    Options
                </th>
            </tr>
            </thead>
            <tbody>
                {CourseList.map(course=>
                    <tr key={course.ID}>
                        <td>{course.ID}</td>
                        <td>{course.CourseName}</td>
                        <td>{course.InstructorName}</td>
                        <td>
                        <button type="button"
                        className="btn btn-light mr-1"
                        data-bs-toggle="modal"
                        data-bs-target="#exampleModal"
                        onClick={()=>editClick(course)}
                        >
                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-pencil-square" viewBox="0 0 16 16">
                            <path d="M15.502 1.94a.5.5 0 0 1 0 .706L14.459 3.69l-2-2L13.502.646a.5.5 0 0 1 .707 0l1.293 1.293zm-1.75 2.456-2-2L4.939 9.21a.5.5 0 0 0-.121.196l-.805 2.414a.25.25 0 0 0 .316.316l2.414-.805a.5.5 0 0 0 .196-.12l6.813-6.814z"/>
                            <path fillRule="evenodd" d="M1 13.5A1.5 1.5 0 0 0 2.5 15h11a1.5 1.5 0 0 0 1.5-1.5v-6a.5.5 0 0 0-1 0v6a.5.5 0 0 1-.5.5h-11a.5.5 0 0 1-.5-.5v-11a.5.5 0 0 1 .5-.5H9a.5.5 0 0 0 0-1H2.5A1.5 1.5 0 0 0 1 2.5v11z"/>
                            </svg>
                        </button>
                
                        <button type="button"
                        className="btn btn-light mr-1"
                        onClick={()=>deleteClick(course.ID)}
                        >
                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-trash-fill" viewBox="0 0 16 16">
                            <path d="M2.5 1a1 1 0 0 0-1 1v1a1 1 0 0 0 1 1H3v9a2 2 0 0 0 2 2h6a2 2 0 0 0 2-2V4h.5a1 1 0 0 0 1-1V2a1 1 0 0 0-1-1H10a1 1 0 0 0-1-1H7a1 1 0 0 0-1 1H2.5zm3 4a.5.5 0 0 1 .5.5v7a.5.5 0 0 1-1 0v-7a.5.5 0 0 1 .5-.5zM8 5a.5.5 0 0 1 .5.5v7a.5.5 0 0 1-1 0v-7A.5.5 0 0 1 8 5zm3 .5v7a.5.5 0 0 1-1 0v-7a.5.5 0 0 1 1 0z"/>
                            </svg>
                        </button>
                
                        </td>
                    </tr>
                    )}
            </tbody>
            </table>
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
                            <span className="input-group-text">Course Name</span>
                            <input type="text" className="form-control"
                            value={CourseName}
                            onChange={(e)=>setCourseName(e.target.value)}/>
                        </div>

                        <div className="input-group mb-3">
                            <span className="input-group-text">Instructor Name</span>
                            <select className="form-select"
                            onChange={(e)=>{setInstructor(e.target.value);console.log(Instructor)}}
                            value={Instructor}>
                                <option value="">Select Instructor</option>
                                {InstructorList.map(ins=><option key={ins.ID} value={ins.ID}>
                                    {ins.FirstName} {ins.LastName}
                                </option>)}
                            </select>
                        </div>
{/*                                 
                        <div className="input-group mb-3">
                            <span className="input-group-text">DOJ</span>
                            <input type="date" className="form-control"
                            value={DateOfJoining}
                            onChange={this.changeDateOfJoining}/>
                        </div> */}
                                
                                
                     </div>
                     {/* <div className="p-2 w-50 bd-highlight">
                         <img width="250px" height="250px"
                         src={PhotoPath+PhotoFileName}/>
                         <input className="m-2" type="file" onChange={this.imageUpload}/>
                     </div> */}
                    </div>
                                
                    {CourseID==0?
                        <button type="button"
                        className="btn btn-primary float-start"
                        onClick={()=>createClick()}
                        >Create</button>
                        :null}

                        {CourseID!=0?
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
