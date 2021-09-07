import React, {useEffect, useState} from 'react'
import { useLocation, useParams } from 'react-router-dom';
import axios from 'axios';

export default function ProfileDetails(props) {
    const {state} = useLocation();
    const UserID = parseInt(state.id);
    const RoleID = parseInt(state.role)
    const ImagePath = '/ProfileImages/'
    const [Img,setImg] = useState('')
    const [PrevImg,setPrevImg] = useState('')
    const [UserName,setUserName] = useState('');
    const [UserPassword,setUserPassword] = useState('');
    const [FirstName,setFirstName] = useState('');
    const [LastName,setLastName] = useState('');
    const [Email,setEmail] = useState('');
    const [Contact,setContact] = useState('');
    const [Profile,setProfile] = useState('');
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
          setProfile(response[0][0].Profile)
        })
    };
    
    useEffect(() => {
        getData();
        console.log(UserID,RoleID)
    }, [props]);
    
    return (
        <div 
        className="d-flex justify-content-around my-5"
        >
            <div className="card w-75 p-2 m-2">
                <div className="card-header mt-2 mb-2 d-flex justify-content-between">
                <h5 className="modal-title">Profile Details</h5>
                </div>
                <div className="card-body d-flex">
                    <div className="d-flex flex-row bd-highlight mb-3 col-7">
                        <div className="p-2 w-50 bd-highlight">
                           <div className="input-group mb-3">
                               <span className="input-group-text">First Name</span>
                               <input type="text" className="form-control"
                               value={FirstName} disabled
                               onChange={(e)=>setFirstName(e.target.value)}/>
                           </div>

                           <div className="input-group mb-3">
                               <span className="input-group-text">Last Name</span>
                               <input type="text" className="form-control"
                               value={LastName} disabled
                               onChange={(e)=>setLastName(e.target.value)}/>
                           </div>

                           <div className="input-group mb-3">
                               <span className="input-group-text">Email</span>
                               <input type="email" className="form-control"
                               value={Email} disabled
                               onChange={(e)=>setEmail(e.target.value)}/>
                           </div>

                           <div className="input-group mb-3">
                               <span className="input-group-text">Contact</span>
                               <input type="text" className="form-control"
                               value={Contact} disabled
                               onChange={(e)=>setContact(e.target.value)}/>
                           </div>
                           
                           <div>
                           {/* <div className="input-group mb-3">
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
                           </div> */}
                           <div className="input-group mb-3">
                               <span className="input-group-text">Role</span>
                               <input type="text" className="form-control"
                               value={Role} disabled
                               />
                           </div>
                           </div>
                                 


                        </div>
                        </div>
                    <div className="col-3">
                        <img 
                        className="w-75 rounded-circle" 
                        // style={{position:'absolute', top:120, left:130, border: "150px"}} 
                        src={(Profile!=null)?ImagePath+Profile:"https://www.seekpng.com/png/detail/428-4287240_no-avatar-user-circle-icon-png.png"}
                        />
                    </div>      

                </div>
            </div>
        </div>
    )
}
