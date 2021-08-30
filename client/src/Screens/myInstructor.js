import React,{useEffect,useState} from 'react'
import axios from 'axios'

export default function Instructor(props) {
  const [InstructorList, setInstructorList] = useState([]);
    
  const getDataList = () => {
      axios
        .get(`http://localhost:4000/instructor`)
        .then((response) => response.data)
        .then((response) => setInstructorList(response));
      
  };

  useEffect(() => {
      getDataList();
  }, [props]);
  return (
    <div style={{margin:"3rem 3rem 3rem 100px"}}>
      <h3 className="mt-3 mb-2 mx-5">My Instructors</h3>
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
        </div>
        
        <hr/>
        <main id="main" data-aos="fade-in">
        {/* /* <!-- ======= Trainers Section ======= --> */}
     <section id="trainers" class="trainers">
       <div class="container" data-aos="fade-up">

         <div class="row" data-aos="zoom-in" data-aos-delay="100">
           {InstructorList.map(item=>{
             return(
             <Card 
             key={item.ID}
             InstructorName={item.FirstName+' '+item.LastName}
             />
           )})}
         </div>
         </div>
         </section>
        </main>
      </div>
    )
}

const Card = (props) =>{
  const CourseName = props.CourseName;
  const InstructorName = props.InstructorName;
  const InstructorDetail = '';
  return(
    <div class="col-lg-4 col-md-6 d-flex align-items-stretch">
            <div class="member">
              <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSl0wBXgHGyB3MGOazyvMIMriErCQoLqxBAUA&usqp=CAU" class="img-fluid" alt=""/>
              <div class="member-content">
                <h4>{InstructorName}</h4>
                <span>{CourseName}</span>
                <p>
                  {InstructorDetail}
                </p>
                <div class="social">
                  <a href=""><i class="bi bi-twitter"></i></a>
                  <a href=""><i class="bi bi-facebook"></i></a>
                  <a href=""><i class="bi bi-instagram"></i></a>
                  <a href=""><i class="bi bi-linkedin"></i></a>
                </div>
              </div>
            </div>
          </div>
  )
}