import React,{useEffect,useState} from 'react'
import axios from 'axios'

export default function Instructor(props) {
  const [InstructorList, setInstructorList] = useState([]);
  const ID = props.match.params.user;
  const [Filter,setFilter] = useState('ID')
  const FiltersList=[
      // {label: '', value: ''},
      {label: "ID", value: "ID"},
      {label: "FirstName", value: "FirstName"},
      {label: "LastName", value: "LastName"},
      {label: "CourseName", value: "CourseName"},
      // {label: "Email", value: "Email"},
      // {label: "Contact", value: "Contact"}
      
  ]
              

  const getDataList = () => {
      axios
        .get(`http://localhost:4000/myTrainers/${ID}`)
        .then((response) => response.data)
        .then((response) => setInstructorList(response[0]));
      
  };

    const Search = (val) =>{
      console.log(val);
      if (val!=""){
          axios
        .get(`http://localhost:4000/myTrainers/${ID}?filter=${Filter}&search=${val}`)
        .then((response) => response.data)
        .then((response) => {
            console.log(response[0]);
          setInstructorList(response[0])
          })
      }
      else{
          getDataList();
      }
  }
  const Sort = (asc) =>{
      console.log(Filter)
      if(asc){
          axios
        .get(`http://localhost:4000/myTrainers/${ID}?filter=${Filter}&sort=1`)
        .then((response) => response.data)
        .then((response) => {
            console.log(response[0]);
          setInstructorList(response[0])
        });
      } else {
          axios
        .get(`http://localhost:4000/myTrainers/${ID}?filter=${Filter}&sort=2`)
        .then((response) => response.data)
        .then((response) => {
            console.log(response[0]);
          setInstructorList(response[0])
        });
      }
  }

  useEffect(() => {
      getDataList();
  }, [props]);
  return (
    <div style={{margin:"3rem 3rem 3rem 100px"}}>
      <h3 className="mt-3 mb-2 mx-5">My Instructors</h3>
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
        <main id="main" data-aos="fade-in">
        {/* /* <!-- ======= Trainers Section ======= --> */}
     <section id="trainers" class="trainers">
       <div class="container" data-aos="fade-up">

         <div class="row" data-aos="zoom-in" data-aos-delay="100">
           {InstructorList.map(item=>{
             return(
             <TrainerCard 
             key={item.ID}
             InstructorName={item.FirstName+' '+item.LastName}
             CourseName={item.CourseName}
             ProfileImage={item.Profile}
             />
           )})}
         </div>
         </div>
         </section>
        </main>
      </div>
    )
}

const TrainerCard = (props) =>{
  const CourseName = props.CourseName;
  const InstructorName = props.InstructorName;
  const ProfileImage = props.ProfileImage;
  const ImagePath = '/ProfileImages/'
  const InstructorDetail = '';
  return(
    <div class="col-lg-4 col-md-6 d-flex align-items-stretch">
            <div class="member">
              <img 
              src={(ProfileImage!=null)?ImagePath+ProfileImage:"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSl0wBXgHGyB3MGOazyvMIMriErCQoLqxBAUA&usqp=CAU"}
              class="img-fluid" alt=""/>
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