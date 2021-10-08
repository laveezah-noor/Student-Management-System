// import List from '../Components/List'
import React,{useState, useEffect} from 'react';
import axios from 'axios';
import $ from 'jquery';

export default function Users(props){
    const FiltersList=[
        {label: 'ID', value: 'ID'},
        {label: 'UserName', value: 'UserName'},
        {label: 'UserPassword', value: 'UserPassword'},
        {label: 'Role', value: 'Role'}
    ]
    const [UserList, setUserList] = useState([]);
    const [RoleList, setRoleList] = useState([]);
    const [ModalTitle, setModalTitle] = useState('');
    const [UserID, setUserID] = useState(0);
    const [UserName, setUserName] = useState('');
    const [UserPassword, setUserPassword] = useState('');
    const [Role, setRole] = useState('');
    const [FirstName, setFirstName] = useState('');
    const [LastName, setLastName] = useState('');
    const [Email, setEmail] = useState('');
    const [Contact, setContact] = useState('');
    const [Filter,setFilter] = useState('ID')

    const getUserList = () => {
        axios
          .get(`http://localhost:4000/User`)
          .then((response) => response.data)
          .then((response) => setUserList(response[0]));
          axios
          .get(`http://localhost:4000/role`)
          .then((response) => response.data)
          .then((response) => setRoleList(response));
        
    };
    const Search = (val) =>{
        console.log(val);
        if (val!=""){
            axios
          .get(`http://localhost:4000/User?filter=${Filter}&search=${val}`)
          .then((response) => response.data)
          .then((response) => {
              console.log(response[0]);
            setUserList(response[0])
            })
        } else{
            getUserList();
        }
    }
    const Sort = (asc) =>{
        console.log(Filter)
        if(asc){
            axios
          .get(`http://localhost:4000/User?filter=${Filter}&sort=1`)
          .then((response) => response.data)
          .then((response) => {
              console.log(response[0]);
            setUserList(response[0])
          });
        } else {
            axios
          .get(`http://localhost:4000/User?filter=${Filter}&sort=2`)
          .then((response) => response.data)
          .then((response) => {
              console.log(response[0]);
            setUserList(response[0])
          });
        }
    }

    const addClick = () =>{ 
        setModalTitle("Add User")
        setUserName('');
        setUserPassword('');
        setRole('');
        setFirstName('');
        setLastName('');
        setContact('');
        setEmail('');
    
    };
    const editClick = (User) =>{
        setModalTitle("Edit User")
        setUserName(User.UserName);
        setUserPassword(User.UserPassword);
        setRole(User.Role);
        setUserID(User.ID)
    };
    const deleteClick = (UserID,RoleID) =>{
        console.log(UserID,RoleID)
        if(window.confirm('Are you sure?')){
            axios
              .delete(`http://localhost:4000/deleteUser?id=${UserID}&role=${RoleID}`, {
                method: 'DELETE',
              })
              .then((result) => {
                console.log(result);
                getUserList();
            } // fetching the updated list
                ,(error)=>{
                alert('Failed');
            })
            }
    };
    const createClick = () =>{

        if(window.confirm('Are you sure?')){
            axios
              .post(`http://localhost:4000/addUser`, {
                UserName,
                UserPassword,
                Role,
                FirstName,
                LastName,
                Contact,
                Email
              })
              .then((result) => {
                console.log(result);
                getUserList();
                $('#exampleModal .btn-close').click()
            } // fetching the updated list
                ,(error)=>{
                alert('Failed');
                $('#exampleModal .btn-close').click()
            })
            }
            
    };
    const updateClick = () =>{

        if(window.confirm('Are you sure?')){
            axios
              .put(`http://localhost:4000/updateUser`, {
                UserID,
                UserName,
                UserPassword,
                Role
              })
              .then((result) => {
                console.log(result);
                getUserList();
            } // fetching the updated list
                ,(error)=>{
                alert('Failed');
            })
            }
            $('#exampleModal .btn-close').click()
    };
    
    useEffect(() => {
        getUserList();
    }, [props]);
    console.log("Users: ",UserList);
    return (
        <div>
            <h3 className="mt-3 mb-2 mx-5">User List</h3>
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
                    data-toggle="tooltip" data-placement="bottom" title="Ascending Order"
                    >
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-arrow-down-square-fill" viewBox="0 0 16 16">
                        <path d="M2 0a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2H2zm6.5 4.5v5.793l2.146-2.147a.5.5 0 0 1 .708.708l-3 3a.5.5 0 0 1-.708 0l-3-3a.5.5 0 1 1 .708-.708L7.5 10.293V4.5a.5.5 0 0 1 1 0z"/>
                        </svg>
                    </button>

                    <button type="button" className="btn btn-light"
                    onClick={()=>Sort(false)}
                    data-toggle="tooltip" data-placement="bottom" title="Descending Order"
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
                    data-toggle="tooltip" data-placement="bottom" title="Create New"
                    onClick={()=>addClick()}
                    >
                        <i className="bi bi-plus" style={{fontSize:"30px"}}></i>
                    </button>
                    </div>
            <table className="table table-striped t-margin">
            <thead>
            <tr>
                <th>
                    User Id
                </th>
                <th>
                    Full Name
                </th>
                <th>
                    Username

                </th>
                <th>
                    Password

                </th>
                <th>
                    Role
                </th>
                <th>
                    Options
                </th>
            </tr>
            </thead>
            <tbody>
                {UserList.map(User=>
                    <tr key={User.UserID}>
                        <td>{User.UserID}</td>
                        <td>{User.FirstName} {User.LastName}</td>
                        <td>{User.UserName}</td>
                        <td>{User.UserPassword}</td>
                        <td>{User.Role}</td>
                        <td>
                        <button type="button"
                        className="btn btn-light mr-1"
                        data-bs-toggle="modal"
                        data-bs-target="#exampleModal"
                        onClick={()=>editClick(User)}
                        >
                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-pencil-square" viewBox="0 0 16 16">
                            <path d="M15.502 1.94a.5.5 0 0 1 0 .706L14.459 3.69l-2-2L13.502.646a.5.5 0 0 1 .707 0l1.293 1.293zm-1.75 2.456-2-2L4.939 9.21a.5.5 0 0 0-.121.196l-.805 2.414a.25.25 0 0 0 .316.316l2.414-.805a.5.5 0 0 0 .196-.12l6.813-6.814z"/>
                            <path fillRule="evenodd" d="M1 13.5A1.5 1.5 0 0 0 2.5 15h11a1.5 1.5 0 0 0 1.5-1.5v-6a.5.5 0 0 0-1 0v6a.5.5 0 0 1-.5.5h-11a.5.5 0 0 1-.5-.5v-11a.5.5 0 0 1 .5-.5H9a.5.5 0 0 0 0-1H2.5A1.5 1.5 0 0 0 1 2.5v11z"/>
                            </svg>
                        </button>
                
                        <button type="button"
                        className="btn btn-light mr-1"
                        onClick={()=>deleteClick(User.UserID,User.RoleID)}
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
                            <span className="input-group-text">User Name</span>
                            <input type="text" className="form-control"
                            value={UserName}
                            onChange={(e)=>setUserName(e.target.value)}/>
                        </div>

                        <div className="input-group mb-3">
                            <span className="input-group-text">Password</span>
                            <input type="password" className="form-control"
                            value={UserPassword}
                            onChange={(e)=>setUserPassword(e.target.value)}/>
                        </div>
                        <div className="input-group mb-3">
                            <span className="input-group-text">Role</span>
                            <select className="form-select"
                            onChange={(e)=>{setRole(e.target.value);console.log(Role)}}
                            value={Role}>
                                <option value="">Select Role</option>
                                {RoleList.map(role=><option key={role.RoleID} value={role.RoleID}>
                                    {role.Role}
                                </option>)}
                            </select>
                        </div>
                                
                                
                     </div>
                     {UserID==0?
                     <div>
                        <div className="input-group mb-3">
                            <span className="input-group-text">First Name</span>
                            <input type="email" className="form-control"
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
                         
                     </div>:null}
                     {/* <div className="p-2 w-50 bd-highlight">
                         <img width="250px" height="250px"
                         src={PhotoPath+PhotoFileName}/>
                         <input className="m-2" type="file" onChange={this.imageUpload}/>
                     </div> */}
                    </div>
                                
                    {UserID==0?
                        <button type="button"
                        className="btn btn-primary float-start"
                        onClick={()=>createClick()}
                        >Create</button>
                        :null}

                        {UserID!=0?
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

{/*export default function User() {
    return (
        <div style={{margin:"3rem 3rem 3rem 100px"}}>
            <div className="Head pb-3">
                <span className="h1">User</span>
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
