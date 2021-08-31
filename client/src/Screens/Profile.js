import React, {useEffect, useState} from 'react'
import { useLocation, useParams } from 'react-router-dom';
import axios from 'axios';

export default function Profile(props) {
    const {state} = useLocation();
    const UserID = parseInt(state.id);
    const RoleID = parseInt(state.role)
    const [UserName,setUserName] = useState('');
    const [UserPassword,setUserPassword] = useState('');
    const [FirstName,setFirstName] = useState('');
    const [LastName,setLastName] = useState('');
    const [Email,setEmail] = useState('');
    const [Contact,setContact] = useState('');
    const Role = (RoleID==1)? 'Student': (RoleID==2)? 'Instructor' : (RoleID==3)? 'Admin': null 
    const getData = () =>{
        axios
        .get(`http://localhost:4000/profile/${RoleID}/${UserID}`)
        .then((response) => response.data)
        .then((response) => {
          console.log(response[0]);
          setFirstName(response[0][0].FirstName)
          setLastName(response[0][0].LastName)
          setEmail(response[0][0].Email)
          setContact(response[0][0].Contact)
          setUserName(response[0][0].UserName)
          setUserPassword(response[0][0].UserPassword)
        })
    };
    const updateClick = () =>{
        console.log(UserID,
            RoleID,
            UserName,
            UserPassword,
            FirstName,
            LastName,
            Email,
            Contact);
        if(window.confirm('Are you sure?')){
            axios
              .put(`http://localhost:4000/updateProfile`, {
                UserID,
                RoleID,
                UserName,
                UserPassword,
                FirstName,
                LastName,
                Email,
                Contact
              })
              .then((result) => {
                console.log(result);
                getData();
            } // fetching the updated list
                ,(error)=>{
                alert('Failed');
            })
        };
    }
    const LogoutClick = () =>{
        window.location.pathname = ''
    }   
    useEffect(() => {
        getData();
        console.log(UserID,RoleID)
    }, [props]);
    
    return (
        <div 
        className="d-flex justify-content-around my-5"
        >
            <div className="card w-50 p-2 m-2">
                <div className="card-header mt-2 mb-2 d-flex justify-content-between">
                <h5 className="modal-title">My Profile</h5>
                </div>
                <div className="card-body">
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
                               <input type="email" className="form-control"
                               value={Email}
                               onChange={(e)=>setEmail(e.target.value)}/>
                           </div>

                           <div className="input-group mb-3">
                               <span className="input-group-text">Contact</span>
                               <input type="text" className="form-control"
                               value={Contact}
                               onChange={(e)=>setContact(e.target.value)}/>
                           </div>
                           
                           <div>
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
                               <input type="text" className="form-control"
                               value={Role} disabled
                               />
                           </div>
                           </div>
                                 


                        </div>
                        {/* <div className="p-2 w-50 bd-highlight">
                            <img width="250px" height="250px"
                            src={PhotoPath+PhotoFileName}/>
                            <input className="m-2" type="file" onChange={this.imageUpload}/>
                        </div> */}
                        </div>
                        <div className="d-flex justify-content-around">
                        <button type="button"
                        className="btn btn-primary float-start"
                        onClick={()=>updateClick()}
                        >Update</button>
                        <button type="button"
                        className="btn btn-danger float-start"
                        onClick={()=>LogoutClick()}
                        >Logout</button>
                           
                        </div>
                        

                </div>
            </div>
            <div className="card  w-25 p-2 m-2">
            <img className="card-img-top" style={{backgroundSize:"cover", height:"200px"}} src="https://images.unsplash.com/photo-1542137722061-efd1cbdf156c?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=750&q=80"/>
            <div>
                <img 
                className="w-25" 
                // style={{position:'absolute', top:120, left:130, border: "150px"}} 
                src="https://www.seekpng.com/png/detail/428-4287240_no-avatar-user-circle-icon-png.png"
                />
            </div>
            <div className="card-body">
                <h5 class="card-title h2">{FirstName} {LastName}</h5>
                <p className="card-text h5">{UserName}</p>
                <p className="card-text h5">{Email}</p>
                <p className="card-text h5">{Role}</p>

            </div>

            </div>
        </div>
    )
}
