import React,{useEffect,useState} from 'react'
import axios from 'axios'
import Header from './Header';
import Footer from './Footer';

export default function Instructor(props) {
  const [InstructorList, setInstructorList] = useState([]);
    
  const getDataList = () => {
      axios
        .get(`http://localhost:4000/trainer`)
        .then((response) => response.data)
        .then((response) => setInstructorList(response[0]));
      
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
        <h2>Trainer</h2>
        {/* <p>Est dolorum ut non facere possimus quibusdam eligendi voluptatem. Quia id aut similique quia voluptas sit quaerat debitis. Rerum omnis ipsam aperiam consequatur laboriosam nemo harum praesentium. </p> */}
      </div>
    </div>
    {/* <!-- End Breadcrumbs --> */}
    
    {/* <!-- ======= Trainers Section ======= --> */}
    <section id="trainers" class="trainers">
      <div class="container" data-aos="fade-up">

        <div class="row" data-aos="zoom-in" data-aos-delay="100">
          {InstructorList.map(item=>{
            console.log(item)
            return(
            <Card 
            key={item.ID}
            Profile={item.Profile}
            InstructorName={item.FirstName+' '+item.LastName}
            />
          )})}
        </div>
        </div>
      </section>
    </main>
    <Footer/>
    </div>
    )
}

const Card = (props) =>{
  const CourseName = props.CourseName;
  const InstructorName = props.InstructorName;
  const ProfileImage = props.Profile
  const InstructorDetail = '';
  const ImagePath = '/ProfileImages/'
  return(
    <div class="col-lg-3 col-md-6 d-flex align-items-stretch">
            <div class="member">
              <img src={(ProfileImage!=null)?ImagePath+ProfileImage:"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSl0wBXgHGyB3MGOazyvMIMriErCQoLqxBAUA&usqp=CAU"}
               className="img-fluid" alt=""/>
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