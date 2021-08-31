import React, {useEffect,useState} from 'react'
import {StudentAllCard} from '../Components/Card'
import axios from 'axios'
import { Route, useLocation, useRouteMatch } from 'react-router-dom';

export default function Courses(props) {
    let { path, url } = useRouteMatch();
    const [CourseList, setCourseList] = useState([]);
    const {state} = useLocation();
    const ID = parseInt(state.id || props.match.params.user);
    const Role = parseInt(state.role || props.match.params.role)
    const [Filter,setFilter] = useState('Course Name')
    const FiltersList=[
        // {label: 'ID', value: 'ID'},
        {label: 'Course Name', value: 'CourseName'},
        {label: 'Trainer FirstName', value: 'TrainerFirstName'},
        {label: 'Trainer LastName', value: 'TrainerLastName'}
    ]
    const getDataList = () => {
        axios
          .get(`http://localhost:4000/course`)
          .then((response) => response.data)
          .then((response) => setCourseList(response[0]));
        
    };

    const Search = (val) =>{
        console.log(val);
        if (val!=""){
            axios
          .get(`http://localhost:4000/course?filter=${Filter}&search=${val}`)
          .then((response) => response.data)
          .then((response) => {
              console.log(response[0]);
              setCourseList(response[0])
            })
        } else{
            getDataList();
        }
    }
    const Sort = (asc) =>{
        console.log(Filter)
        if(asc){
            axios
          .get(`http://localhost:4000/course?filter=${Filter}&sort=1`)
          .then((response) => response.data)
          .then((response) => {
              console.log(response[0]);
              setCourseList(response[0])
          });
        } else {
            axios
          .get(`http://localhost:4000/course?filter=${Filter}&sort=2`)
          .then((response) => response.data)
          .then((response) => {
              console.log(response[0]);
              setCourseList(response[0])
          });
        }
    }

    useEffect(() => {
        getDataList();
    }, [props]);
    console.log(CourseList, state, props.match.params);
    return (
        <div style={{margin:"3rem 3rem 3rem 100px"}}>
            <h3 className="mt-3 mb-2 mx-5">All Courses</h3>
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
                    </div>
                    
                            <hr/>
                <div className="row m-4">
                    {/* List */}
                    {CourseList.map(item=>{
                        // console.log(item);
                        return(
                        <StudentAllCard
                        key={item.ID}
                        CourseID={item.ID}
                        CourseName={item.CourseName}
                        CourseDetail={''}
                        InstructorName={item.InstructorName}
                        StudentID={ID}
                        onClick={()=>{window.location.pathname = `Home/${ID}/${Role}/classroom/${item.ID}`}}
                        />)}
                        )}
                    
                </div>
            </div>
    //     </div>
    // </div>
    )
}

// import React, { Component } from 'react'

// export default class Courses extends Component {
//     render() {
//         return (
//             <div>
//             Hi Coursees                
//             </div>
//         )
//     }
// }
