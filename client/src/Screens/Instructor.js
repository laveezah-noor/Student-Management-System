import React,{useState, useEffect} from 'react';
import axios from 'axios';
import $ from 'jquery';

export default function Instructor (props){
    const [instructorList, setInstructorList] = useState([]);
    const [ModalTitle, setModalTitle] = useState('');
    const [InstructorID, setInstructorID] = useState(0);
    const [FirstName, setFirstName] = useState('');
    const [LastName, setLastName] = useState('');
    const [Contact, setContact] = useState('');
    const [Email, setEmail] = useState('');
            
    const getInstructorList = () => {
        axios
          .get(`http://localhost:4000/instructor`)
          .then((response) => response.data)
          .then((response) => setInstructorList(response));
    };
    const addClick = () =>{
        setModalTitle("Add Instructor")
        setFirstName('');
        setLastName('');
        setContact('');
        setEmail('');
    
    };
    const editClick = (Instructor) =>{
        setModalTitle("Edit Instructor")
        setFirstName(Instructor.FirstName);
        setLastName(Instructor.LastName);
        setContact(Instructor.Contact);
        setEmail(Instructor.Email);
        setInstructorID(Instructor.ID)
    };
    const deleteClick = (InstructorID) =>{

        if(window.confirm('Are you sure?')){
            axios
              .delete(`http://localhost:4000/instructor/${InstructorID}`, {
                method: 'DELETE',
              })
              .then((result) => {
                console.log(result);
                getInstructorList();
            } // fetching the updated list
                ,(error)=>{
                alert('Failed');
            })
            }
    };
    const createClick = () =>{

        if(window.confirm('Are you sure?')){
            axios
              .post(`http://localhost:4000/addInstructor`, {
                FirstName,
                LastName,
                Contact,
                Email
              })
              .then((result) => {
                console.log(result);
                getInstructorList();
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
              .put(`http://localhost:4000/updateInstructor`, {
                InstructorID,
                FirstName,
                LastName,
                Contact,
                Email
              })
              .then((result) => {
                console.log(result);
                getInstructorList();
            } // fetching the updated list
                ,(error)=>{
                alert('Failed');
            })
            }
            $('#exampleModal .btn-close').click()
    };

    useEffect(() => {
        getInstructorList();
    }, [props]);
    return (
        <div>
            <h3 className="mt-3 mb-2 mx-5">Instructor List</h3>
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
                    Instructor Id
                </th>
                <th>
                    Instructor Name

                </th>
                <th>
                    Contact
                </th>
                <th>
                    Email
                </th>
                <th>
                    Options
                </th>
            </tr>
            </thead>
            <tbody>
                {instructorList.map(instructor=>
                    <tr key={instructor.ID}>
                        <td>{instructor.ID}</td>
                        <td>{instructor.FirstName} {instructor.LastName}</td>
                        <td>{instructor.Contact}</td>
                        <td>{instructor.Email}</td>
                        <td>
                        <button type="button"
                        className="btn btn-light mr-1"
                        data-bs-toggle="modal"
                        data-bs-target="#exampleModal"
                        onClick={()=>editClick(instructor)}
                        >
                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-pencil-square" viewBox="0 0 16 16">
                            <path d="M15.502 1.94a.5.5 0 0 1 0 .706L14.459 3.69l-2-2L13.502.646a.5.5 0 0 1 .707 0l1.293 1.293zm-1.75 2.456-2-2L4.939 9.21a.5.5 0 0 0-.121.196l-.805 2.414a.25.25 0 0 0 .316.316l2.414-.805a.5.5 0 0 0 .196-.12l6.813-6.814z"/>
                            <path fillRule="evenodd" d="M1 13.5A1.5 1.5 0 0 0 2.5 15h11a1.5 1.5 0 0 0 1.5-1.5v-6a.5.5 0 0 0-1 0v6a.5.5 0 0 1-.5.5h-11a.5.5 0 0 1-.5-.5v-11a.5.5 0 0 1 .5-.5H9a.5.5 0 0 0 0-1H2.5A1.5 1.5 0 0 0 1 2.5v11z"/>
                            </svg>
                        </button>
                
                        <button type="button"
                        className="btn btn-light mr-1"
                        onClick={()=>deleteClick(instructor.ID)}
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
                            <span className="input-group-text">First Name</span>
                            <input type="text" className="form-control"
                            value={FirstName}
                            onChange={(e)=>setFirstName(e.target.value)}/>
                        </div>

                        <div className="input-group mb-3">
                            <span className="input-group-text">Last Name</span>
                            <input type="text" className="form-control"
                            value={LastName}
                            onChange={(e)=>setLastName(e.target.value)}/>
                        </div>

                        <div className="input-group mb-3">
                            <span className="input-group-text">Email</span>
                            <input type="text" className="form-control"
                            value={Email}
                            onChange={(e)=>setEmail(e.target.value)}/>
                        </div>
                                
                        <div className="input-group mb-3">
                            <span className="input-group-text">Contact</span>
                            <input type="text" className="form-control"
                            value={Contact}
                            onChange={(e)=>setContact(e.target.value)}/>
                        </div>
                                
                                
                     </div>
                     {/* <div className="p-2 w-50 bd-highlight">
                         <img width="250px" height="250px"
                         src={PhotoPath+PhotoFileName}/>
                         <input className="m-2" type="file" onChange={this.imageUpload}/>
                     </div> */}
                    </div>
                                
                    {InstructorID===0?
                        <button type="button"
                        className="btn btn-primary float-start"
                        onClick={()=>createClick()}
                        >Create</button>
                        :null}

                        {InstructorID!==0?
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
