import React, {useEffect,useState} from 'react'
import axios from 'axios'
import CountUp from 'react-countup';
import './Card.css'

function OverviewCard(props) {
    const title = props.title;
    const icon = props.icon;
    const cls = props.cls;
    const value = props.value;
    return (
      <div className={`main card ${cls}`}>
        <div className="mx-2">
        <div className="title">
              {/* Title */}
              {title}
          </div>
          {/* <div className="hr"/> */}
          <div className="text">
              {/* Value */}
              <CountUp start={0} end={value} duration={2}/>
          </div>
        </div>
        <i className={`fas ${icon}`}></i>
      </div>
  )
}

function Card(params) {
    const CourseName = params.CourseName
    const CourseDetail = params.CourseDetail
    const InstructorName = params.InstructorName
    const CourseID = params.CourseID
    const onClick = params.onClick
    const [TotalStudent,setTotalStudent] = useState(0)
    const getData= () =>{
      axios
    .get(`http://localhost:4000/totalStudent/${CourseID}`)
    .then((response) => response.data)
    .then((response) => {
      // console.log(response)
      setTotalStudent(response[0]['Total'])});
    };
    useEffect(() => {
      getData();
  }, [params]);
    return(
        <div class="col-lg-4 col-md-6 d-flex align-items-stretch mt-4 mt-md-0" onClick={onClick}>
        <div class="course-item m-2">
          <img 
          src="https://images.unsplash.com/photo-1593720213428-28a5b9e94613?ixid=MnwxMjA3fDB8MHxzZWFyY2h8MXx8d2ViJTIwZGV2ZWxvcG1lbnR8ZW58MHx8MHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60" 
          class="img-fluid" alt="..."/>
          <div class="course-content">
            {/* <div class="d-flex justify-content-between align-items-center mb-3">
              <h4>Marketing</h4>
              <p class="price">$250</p>
            </div> */}

            <h3 className="text-left"><a href="course-details.html">{CourseName}</a></h3>
            <p>{CourseDetail}</p>
            <div class="trainer d-flex justify-content-between align-items-center">
              <div class="trainer-profile d-flex align-items-center">
                <img src="assets/img/trainers/trainer-2.jpg" class="img-fluid" alt=""/>
                <span>{InstructorName}</span>
              </div>
              <div class="trainer-rank d-flex align-items-center">
                <i class="fa fa-user"></i>&nbsp;{TotalStudent}
                {/* &nbsp;&nbsp;
                <i class="bx bx-heart"></i>&nbsp;42 */}
              </div>
            </div>
          </div>
        </div>
             {/* <!-- End Course Item--> */}
      </div> 
 
    )
}

function StudentAllCard(params) {
  const CourseName = params.CourseName
  const CourseDetail = params.CourseDetail
  const InstructorName = params.InstructorName
  const CourseID = params.CourseID
  const StudentID = params.StudentID
  const [TotalStudent,setTotalStudent] = useState(0)
  const getData= () =>{
    axios
  .get(`http://localhost:4000/totalStudent/${CourseID}`)
  .then((response) => response.data)
  .then((response) => {
    // console.log(response)
    setTotalStudent(response[0]['Total'])});
  };
  const joinCourse = () => {
    axios
    .post(`http://localhost:4000/joinCourse`,{
      CourseID,
      StudentID
    })
    .then((result) => {
      console.log(result);
      // getCourseList();
    } // fetching the updated list
      ,(error)=>{
      alert('Failed');
  })
  }
  useEffect(() => {
    getData();
}, [params]);
  return(
      <div class="col-lg-4 col-md-6 d-flex align-items-stretch mt-4 mt-md-0">
      <div class="course-item m-2">
        <img 
        src="https://images.unsplash.com/photo-1593720213428-28a5b9e94613?ixid=MnwxMjA3fDB8MHxzZWFyY2h8MXx8d2ViJTIwZGV2ZWxvcG1lbnR8ZW58MHx8MHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60" 
        class="img-fluid" alt="..."/>
        <div class="course-content">
          {/* <div class="d-flex justify-content-between align-items-center mb-3">
            <h4>Marketing</h4>
            <p class="price">$250</p>
          </div> */}

          <h3 className="text-left"><a href="course-details.html">{CourseName}</a></h3>
          <p>{CourseDetail}</p>
          <div class="trainer d-flex justify-content-between align-items-center">
            <div class="trainer-profile d-flex align-items-center">
              <img src="assets/img/trainers/trainer-2.jpg" class="img-fluid" alt=""/>
              <span>{InstructorName}</span>
            </div>
            <div class="trainer-rank d-flex align-items-center">
              <i class="fa fa-user"></i>&nbsp;{TotalStudent}
              {/* &nbsp;&nbsp;
              <i class="bx bx-heart"></i>&nbsp;42 */}
            </div>
          </div>
          <button className="btn course-join d-flex align-items-center" onClick={()=>joinCourse()}>
              <i className="fa fa-play-circle"></i>&nbsp;Join This Course
            </button>
        </div>
      </div>
           {/* <!-- End Course Item--> */}
    </div> 

  )
}

export{
  Card,
  StudentAllCard,
  OverviewCard
}