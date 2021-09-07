import React, {useEffect, useState} from 'react'
import { useLocation, useParams } from 'react-router-dom';
import axios from 'axios';

export default function Profile(props) {
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
    
    const onChangeImg = e => {
        console.log(Profile);
        setPrevImg(Img)
        setImg(e.target.files[0]);
        setProfile(e.target.files[0].name);
    };
    
    const fileUpload  = () =>{
        // e.preventDefault();
        const formData = new FormData();
        formData.append('file', Img);
        console.log(Img)
        try {
          const res = axios
          .post('http://localhost:4000/uploadProfileImage', formData, {
            headers: {
              'Content-Type': 'multipart/form-data'
            },
          });
          
          const { imageName, imagePath } = res.data;
        console.log('File Uploaded');
        } catch (err) {
        console.log('There was a problem with the server');
        console.log(err);
        }
      };
    
    const updateClick = () =>{
        console.log(UserID,
            RoleID,
            UserName,
            UserPassword,
            FirstName,
            LastName,
            Email,
            Contact,
            Profile);
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
                Contact,
                Profile
              })
              .then((result) => {
                console.log(result);
                if(Profile!=''&Img!=''){
                    fileUpload()
                }
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
                        <div className="p-2 w-50 bd-highlight">
                        {/* {Profile?
                        <img width="250px" height="250px"
                        src={ImagePath+Profile}/>
                        :null
                        }     */}
                        <div class="input-group mb-3">
                            <span class="input-group-text">Profile Image</span>
                          <div class="custom-file" style={{'margin-top':'2px'}}>
                            <input type="file" 
                            class="custom-file-input" 
                            id="inputGroupFile01"
                            onChange={(e)=>onChangeImg(e)} 
                            />
                            <label class="form-control" for="inputGroupFile01">
                                {Profile}</label>
                          </div>
                        </div>
                        </div>
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
                className="w-25 rounded-circle" 
                // style={{position:'absolute', top:120, left:130, border: "150px"}} 
                src={(Profile!=null)?ImagePath+Profile:"https://www.seekpng.com/png/detail/428-4287240_no-avatar-user-circle-icon-png.png"}
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
