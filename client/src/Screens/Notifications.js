import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useLocation } from 'react-router-dom';

export default function Notifications(props) {
    const [DataList, setDataList] = useState([]);
    const {state} = useLocation();
    const ID = parseInt(state.id || props.match.params.user);
    const Role = parseInt(state.role || props.match.params.role)
    const getDataList = () => {
        axios
          .get(`http://localhost:4000/notification/${Role}/${ID}`)
          .then((response) => response.data)
          .then((response) =>setDataList(response));        
    };

    useEffect(() => {
        getDataList();
    }, [props]);
    console.log(DataList, state, ID); 
    return (
        <div style={{margin:"3rem 3rem 3rem 100px"}}>
            <h3 className="mt-3 mb-2 mx-5">Notification</h3>
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
                    {/* <button type="button" 
                    // className="btn btn-light"
                    className="btn btn-light mr-1"
                    data-bs-toggle="modal"
                    data-bs-target="#exampleModal"
                    onClick={()=>addClick()}
                    >
                        <i className="bi bi-plus" style={{fontSize:"30px"}}></i>
                    </button>
                     */}
                    </div>
                    
                            <hr/>
                <div className="row m-4">
                    {/* List */}
                    <ul class="list-group list-group-flush">
                    {DataList.map(item=>{
                        console.log(item);
                        return(
                            <li key={item.ID} className="border-bottom p-2 d-flex justify-content-between align-items-start">
                              <div class="ms-2 me-auto">
                                {/* <div class="fw-bold">Subheading</div> */}
                                {item.Message}
                              </div>
                              {/* <span class="badge bg-primary rounded-pill">14</span> */}
                            </li>
                            
                        )}
                    )}
                    </ul>
                    
                </div>
            </div>
    )
}
