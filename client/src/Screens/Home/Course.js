import React, { useState, useEffect } from 'react'
import axios from 'axios'
import Footer from './Footer';
import Header from './Header';

export default function Course(props) {
    const [CourseList, setCourseList] = useState([]);
    
    const getDataList = () => {
        axios
          .get(`http://localhost:4000/course`)
          .then((response) => response.data)
          .then((response) => 
          {console.log(response[0]);
            setCourseList(response[0])});
        
    };

    useEffect(() => {
        getDataList();
    }, [props]);
    return (
        <div>
        <Header/>            
          <main id="main" data-aos="fade-in">

                    {/* <!-- ======= Breadcrumbs ======= --> */}
            <div class="breadcrumbs">
              <div class="container">
                <h2>Courses</h2>
                {/* <p>Variety Of New Courses. </p> */}
              </div>
            </div>
            {/* <!-- End Breadcrumbs --> */}

            {/* <!-- ======= Courses Section ======= --> */}
            <section id="courses" class="courses">
              <div class="container" data-aos="fade-up">

                <div class="row" data-aos="zoom-in" data-aos-delay="100">
                  {CourseList.map(item=>{
                    console.log(item);
                    return(
                      <Card
                      key={item.ID}
                      CourseID={item.ID}
                      CourseName={item.CourseName}
                      CourseDetail={''}
                      CourseImage={item.Image}
                      InstructorName={item.InstructorName}
                      />
                    )})}
                  
                  {/* <!-- End Course Item--> */}

                </div>

              </div>
            </section>
            {/* <!-- End Courses Section --> */}
          </main>
          {/* <!-- End #main --> */}
          <Footer/>
        </div>
    )
}

function Card(params) {
    const CourseName = params.CourseName
    const CourseDetail = params.CourseDetail
    const InstructorName = params.InstructorName
    const CourseID = params.CourseID
    const CourseImage = params.CourseImage
    const ImagePath = '/CourseImages/'
    const [TotalStudent,setTotalStudent] = useState(0)
    const getData= () =>{
      axios
    .get(`http://localhost:4000/totalStudent/${CourseID}`)
    .then((response) => response.data)
    .then((response) => {
      console.log(response)
      setTotalStudent(response[0]['Total'])});
    };
    useEffect(() => {
      getData();
  }, [params]);
    return(
        <div class="col-lg-4 col-md-6 d-flex align-items-stretch mt-4 mb-4 mt-md-0">
        <div class="course-item">
          <img 
          src={(CourseImage!=null)?ImagePath+CourseImage:"https://images.unsplash.com/photo-1593720213428-28a5b9e94613?ixid=MnwxMjA3fDB8MHxzZWFyY2h8MXx8d2ViJTIwZGV2ZWxvcG1lbnR8ZW58MHx8MHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60"} 
          class="img-fluid" alt="..."/>
          <div class="course-content">
            {/* <div class="d-flex justify-content-between align-items-center mb-3">
              <h4>Marketing</h4>
              <p class="price">$250</p>
            </div> */}

            <h3><a href="course-details.html">{CourseName}</a></h3>
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