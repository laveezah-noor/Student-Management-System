import React, {useEffect,useState} from 'react'
import Card from '../Components/Card'
import axios from 'axios'

export default function Courses(props) {
    const [CourseList, setCourseList] = useState([]);
    
    const getDataList = () => {
        axios
          .get(`http://localhost:4000/course`)
          .then((response) => response.data)
          .then((response) => setCourseList(response));
        
    };

    useEffect(() => {
        getDataList();
    }, [props]);

    return (
        <div style={{margin:"3rem 3rem 3rem 100px"}}>
            <div className="Head pb-3">
                <span className="h1">Courses</span>
            </div>
            <div className="content">
                <div className="row">
                    <div className="col">
                        {/* Search Bar */}
                        <form class="d-flex">
                            <input class="form-control me-2" type="search" placeholder="Search" aria-label="Search" />
                            <button class="btn btn-outline-success" type="submit">Search</button>
                        </form>
                    </div>
                    <div className="col">
                        {/* Filters */}
                        <div class="dropdown">
                          <span className="h5">
                              {/* Filter Name */}
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
                    {/* List */}
                    {CourseList.map(item=>{
                        console.log(item);
                        return(
                        <Card
                        title={item.CourseName}
                        instructor={item.InstructorName}
                        onClick={()=>{window.location.pathname = `/classroom/${item.ID}`}}
                        />)}
                        )}
                    
                </div>
            </div>
        </div>
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
