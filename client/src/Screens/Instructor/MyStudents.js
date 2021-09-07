// import React from 'react'
import React,{useState, useEffect} from 'react';
import axios from 'axios';
import $ from 'jquery';
import { useHistory, useLocation, useRouteMatch } from 'react-router-dom';

export default function Students(props){
    const history = useHistory();
    const FiltersList=[
        // {label: '', value: ''},
        {label: "ID", value: "ID"},
        {label: "FirstName", value: "FirstName"},
        {label: "LastName", value: "LastName"},
        {label: "Email", value: "Email"},
        {label: "Contact", value: "Contact"}
        
    ]
    const {state} = useLocation();
    const user = parseInt(state.id);
    const role = parseInt(state.role)
    const [StudentList, setStudentList] = useState([]);
    const [Filter,setFilter] = useState("ID")
    // const [Search,setSearch] = useState("")


    const getStudentList = () => {
        axios
          .get(`http://localhost:4000/myStudents/${user}`)
          .then((response) => response.data)
          .then((response) => {
              console.log(response[0]);
            setStudentList(response[0])
          });
    };

    const Search = (val) =>{
        console.log(val);
        if (val!=""){
            axios
          .get(`http://localhost:4000/myStudents/${user}?filter=${Filter}&search=${val}`)
          .then((response) => response.data)
          .then((response) => {
              console.log(response[0]);
            setStudentList(response[0])
            })
        }
    }
    const Sort = (asc) =>{
        console.log(Filter)
        if(asc){
            axios
          .get(`http://localhost:4000/myStudents/${user}?filter=${Filter}&sort=1`)
          .then((response) => response.data)
          .then((response) => {
              console.log(response[0]);
            setStudentList(response[0])
          });
        } else {
            axios
          .get(`http://localhost:4000/myStudents/${user}?filter=${Filter}&sort=2`)
          .then((response) => response.data)
          .then((response) => {
              console.log(response[0]);
            setStudentList(response[0])
          });
        }
    }
    
    useEffect(() => {
        getStudentList();
        console.log(StudentList);
    }, [props]);
    return (
        <div>
            <h3 className="mt-3 mb-2 mx-5">Student List</h3>
            <div className="d-flex flex-row mx-5">


                    <input className="form-control m-2"
                    onChange={(e)=>Search(e.target.value)}
                    // value={Search}
                    placeholder={`Search By ${Filter}`}/>
                        <select class="form-select m-2 w-25" aria-label="Sort By" value={Filter} onChange={(e)=>{setFilter(e.target.value)}}>
                          {FiltersList.map(fil=><option value={fil.value}>{`By ${fil.label}`}</option>)}
                        </select>                 

                    <button type="button" className="btn btn-light"
                    onClick={()=>Sort(true)}
                    >
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-arrow-down-square-fill" viewBox="0 0 16 16">
                        <path d="M2 0a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2H2zm6.5 4.5v5.793l2.146-2.147a.5.5 0 0 1 .708.708l-3 3a.5.5 0 0 1-.708 0l-3-3a.5.5 0 1 1 .708-.708L7.5 10.293V4.5a.5.5 0 0 1 1 0z"/>
                        </svg>
                    </button>

                    <button type="button" className="btn btn-light"
                    onClick={()=>Sort(false)}
                    >
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-arrow-up-square-fill" viewBox="0 0 16 16">
                        <path d="M2 16a2 2 0 0 1-2-2V2a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2H2zm6.5-4.5V5.707l2.146 2.147a.5.5 0 0 0 .708-.708l-3-3a.5.5 0 0 0-.708 0l-3 3a.5.5 0 1 0 .708.708L7.5 5.707V11.5a.5.5 0 0 0 1 0z"/>
                        </svg>
                    </button>
                    {/* <button type="button" 
                    // className="btn btn-light"
                    className="btn btn-light mr-1"
                    data-bs-toggle="modal"
                    data-bs-target="#exampleModal"
                    onClick={()=>addClick()}
                    >
                        <i className="bi bi-plus" style={{fontSize:"30px"}}></i>
                    </button> */}
                    </div>
            <table className="table table-striped">
            <thead>
            <tr>
                <th>
                    Student Id
                </th>
                <th>
                    First Name

                </th>
                <th>
                    Last Name

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
                {StudentList.map(Student=>
                    <tr key={Student.ID}>
                        <td>{Student.ID}</td>
                        <td>{Student.FirstName}</td>
                        <td>{Student.LastName}</td>
                        <td>{Student.Contact}</td>
                        <td>{Student.Email}</td>
                        <td>
                        <button type="button"
                        className="btn btn-light mr-1"
                        onClick={()=>{history.push(`/Home/${user}/${role}/StudentDetails`, {id: Student.ID, role:1})}}
                        ><i class="bi bi-three-dots"></i>
                        </button>
                       </td>
                    </tr>
                    )}
            </tbody>
            </table>
        </div>
    )
}

{/*export default function Student() {
    return (
        <div style={{margin:"3rem 3rem 3rem 100px"}}>
            <div className="Head pb-3">
                <span className="h1">Student</span>
            </div>



             <div className="content">
                <div className="row">
                    <div className="col">
                        <form class="d-flex">
                            <input class="form-control me-2" type="search" placeholder="Search" aria-label="Search" />
                            <button class="btn btn-outline-success" type="submit">Search</button>
                        </form>
                    </div>
                    <div className="col">
                        <div class="dropdown">
                          <span className="h5">
                              Semester
                          </span>
                          <select name="semester" id="semesters">
                                <option value="semester1">Semester 1</option>
                                <option value="semester2">Semester 2</option>
                                <option value="semester3">Semester 3</option>
                                <option value="semester4">Semester 4</option>
                                <option value="semester5">Semester 5</option>
                                <option value="semester6">Semester 6</option>
                                <option value="semester7">Semester 7</option>
                                <option value="semester8">Semester 8</option>
                          </select>
                        </div>
                    </div>
                </div>
                <hr/>
                <div className="row m-4">
                    <List/>
                </div>
            </div> 
        </div>
    )
}*/}
