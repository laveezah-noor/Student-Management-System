import React, {useState,useEffect} from 'react'
import Footer from './Footer'
import Header from './Header'
import axios from 'axios';
import CountUp from 'react-countup'

export default function Home() {
    // const pure = new PureCounter;
    const [Students,setStudents] = useState(0)
    const [Trainers,setTrainers] = useState(0)
    const [Courses,setCourses] = useState(0)
    const getData = () =>{
      axios
          .get(`http://localhost:4000/home`)
          .then((response) => response.data)
          .then((response) => {
              setStudents(response[0][0]['Students'])
              setTrainers(response[1][0]['Trainers'])
              setCourses(response[2][0]['Courses'])
              console.log(response, Students,Courses,Trainers);
          })
    }
    
    useEffect(() => {
      getData()
    }, [])
    return (
        <div>
          <Header/>
          {/* <!-- ======= Hero Section ======= --> */}
          <section id="hero" class="d-flex justify-content-center align-items-center">
            <div class="container position-relative" data-aos="zoom-in" data-aos-delay="100">
              <h1>Learning Today,<br />Leading Tomorrow</h1>
              <h2>Learn new everything from our wide ranges of Course.</h2>
              <a onClick={()=>{window.location.pathname = `/login`}} href="#" class="btn-get-started"
              >Get Started</a>
            </div>
          </section>
          {/* <!-- End Hero --> */}

          <main id="main">

            {/* <!-- ======= About Section ======= --> */}
            <section id="about" class="about">
              <div class="container" data-aos="fade-up">

                <div class="row">
                  <div class="col-lg-6 order-1 order-lg-2" data-aos="fade-left" data-aos-delay="100">
                    <img src="src/img/about.jpg" class="img-fluid" alt="" />
                  </div>
                  <div class="col-lg-6 pt-4 pt-lg-0 order-2 order-lg-1 content">
                    <h3>New Oppurtunities For Learning</h3>
                    <p class="fst-italic">
                      We are creating the virtual environment in the time of pandemic where we need to work online.
                    </p>
                    {/* <ul>
                      <li><i class="bi bi-check-circle"></i> Ullamco laboris nisi ut aliquip ex ea commodo consequat.</li>
                      <li><i class="bi bi-check-circle"></i> Duis aute irure dolor in reprehenderit in voluptate velit.</li>
                      <li><i class="bi bi-check-circle"></i> Ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate trideta storacalaperda mastiro dolore eu fugiat nulla pariatur.</li>
                    </ul> */}
                    <p>
                    In these circumstances we introduce a bew classroom website in which all the important needs are provided
                    to you for your betterment
                    </p>

                  </div>
                </div>

              </div>
            </section>
            {/* <!-- End About Section --> */}

            {/* <!-- ======= Counts Section ======= --> */}
            <section id="counts" class="counts section-bg">
              <div class="container">

                <div class="row counters">

                  <div class="col-lg-3 col-6 text-center">
                    <CountUp start={0} end={Students} duration={2}/>
                    {/* <span data-purecounter-start="0" data-purecounter-end="1232" data-purecounter-duration="1" class="purecounter"></span> */}
                    <p>Students</p>
                  </div>

                  <div class="col-lg-3 col-6 text-center">
                    <CountUp start={0} end={Courses} duration={2}/>
                    {/* <span data-purecounter-start="0" data-purecounter-end="64" data-purecounter-duration="1" class="purecounter"></span> */}
                    <p>Courses</p>
                  </div>

                  <div class="col-lg-3 col-6 text-center">
                    <CountUp start={0} end={Students} duration={2}/>
                    {/* <span data-purecounter-start="0" data-purecounter-end="42" data-purecounter-duration="1" class="purecounter"></span> */}
                    <p>Events</p>
                  </div>

                  <div class="col-lg-3 col-6 text-center">
                    <CountUp start={0} end={Trainers} duration={2}/>
                    {/* <span data-purecounter-start="0" data-purecounter-end="15" data-purecounter-duration="1" class="purecounter"></span> */}
                    <p>Trainers</p>
                  </div>

                </div>

              </div>
            </section>
            {/* <!-- End Counts Section --> */}

            {/* <!-- ======= Why Us Section ======= --> */}
            <section id="why-us" class="why-us">
              <div class="container" data-aos="fade-up">

                <div class="row">
                  <div class="col-lg-4 d-flex align-items-stretch">
                    <div class="content">
                      <h3>Why Choose Mentor?</h3>
                      <p>
                        A Mentor is the person with specialized knowledge whom you may enlist to educate and motivate you,
                        either in your personal life, your career or both. Choose a mentor who will give you the best insight
                        into your current phase of life or career level.
                      </p>
                      {/* <div class="text-center">
                        <a href="about.html" class="more-btn">Learn More <i class="bx bx-chevron-right"></i></a>
                      </div> */}
                    </div>
                  </div>
                  <div class="col-lg-8 d-flex align-items-stretch" data-aos="zoom-in" data-aos-delay="100">
                    <div class="icon-boxes d-flex flex-column justify-content-center">
                      <div class="row">
                        <div class="col-xl-4 d-flex align-items-stretch">
                          <div class="icon-box mt-4 mt-xl-0">
                            <i class="bi bi-receipt"></i>
                            <h4>Build Trust</h4>
                            <p>The student and mentor relation has proved to be 75% more productive then self learning.</p>
                          </div>
                        </div>
                        <div class="col-xl-4 d-flex align-items-stretch">
                          <div class="icon-box mt-4 mt-xl-0">
                            <i class="bi bi-box"></i>
                            <h4>Clear Learning paths</h4>
                            <p>This world and the internet is a sea of knowlege. Don't let yourself drown in it in the search of a pearl.</p>
                          </div>
                        </div>
                        <div class="col-xl-4 d-flex align-items-stretch">
                          <div class="icon-box mt-4 mt-xl-0">
                            <i class="bi bi-images"></i>
                            <h4>Certifications</h4>
                            <p>A certificate to show off your skills to the world.</p>
                          </div>
                        </div>
                      </div>
                    </div>
                    {/* <!-- End .content--> */}
                  </div>
                </div>

              </div>
            </section>
            {/* <!-- End Why Us Section --> */}
            {/* <!-- ======= Popular Courses Section ======= --> */}
    {/* <section id="popular-courses" class="courses">
      <div class="container" data-aos="fade-up">

        <div class="section-title">
          <h2>Courses</h2>
          <p>Popular Courses</p>
        </div>

        <div class="row" data-aos="zoom-in" data-aos-delay="100">

          <div class="col-lg-4 col-md-6 d-flex align-items-stretch">
            <div class="course-item">
              <img src="src/img/course-1.jpg" class="img-fluid" alt="..."/>
              <div class="course-content">
                <div class="d-flex justify-content-between align-items-center mb-3">
                  <h4>Web Development</h4>
                  <p class="price">$169</p>
                </div>

                <h3><a href="course-details.html">Website Design</a></h3>
                <p>Et architecto provident deleniti facere repellat nobis iste. Id facere quia quae dolores dolorem tempore.</p>
                <div class="trainer d-flex justify-content-between align-items-center">
                  <div class="trainer-profile d-flex align-items-center">
                    <img src="src/img/trainers/trainer-1.jpg" class="img-fluid" alt=""/>
                    <span>Antonio</span>
                  </div>
                  <div class="trainer-rank d-flex align-items-center">
                    <i class="bx bx-user"></i>&nbsp;50
                    &nbsp;&nbsp;
                    <i class="bx bx-heart"></i>&nbsp;65
                  </div>
                </div>
              </div>
            </div>
          </div>  */}
          {/* <!-- End Course Item--> */}

          {/* <div class="col-lg-4 col-md-6 d-flex align-items-stretch mt-4 mt-md-0">
            <div class="course-item">
              <img src="src/img/course-2.jpg" class="img-fluid" alt="..."/>
              <div class="course-content">
                <div class="d-flex justify-content-between align-items-center mb-3">
                  <h4>Marketing</h4>
                  <p class="price">$250</p>
                </div>

                <h3><a href="course-details.html">Search Engine Optimization</a></h3>
                <p>Et architecto provident deleniti facere repellat nobis iste. Id facere quia quae dolores dolorem tempore.</p>
                <div class="trainer d-flex justify-content-between align-items-center">
                  <div class="trainer-profile d-flex align-items-center">
                    <img src="src/img/trainers/trainer-2.jpg" class="img-fluid" alt=""/>
                    <span>Lana</span>
                  </div>
                  <div class="trainer-rank d-flex align-items-center">
                    <i class="bx bx-user"></i>&nbsp;35
                    &nbsp;&nbsp;
                    <i class="bx bx-heart"></i>&nbsp;42
                  </div>
                </div>
              </div>
            </div>
          </div>  */}
          {/* <!-- End Course Item--> */}

          {/* <div class="col-lg-4 col-md-6 d-flex align-items-stretch mt-4 mt-lg-0">
            <div class="course-item">
              <img src="src/img/course-3.jpg" class="img-fluid" alt="..."/>
              <div class="course-content">
                <div class="d-flex justify-content-between align-items-center mb-3">
                  <h4>Content</h4>
                  <p class="price">$180</p>
                </div>

                <h3><a href="course-details.html">Copywriting</a></h3>
                <p>Et architecto provident deleniti facere repellat nobis iste. Id facere quia quae dolores dolorem tempore.</p>
                <div class="trainer d-flex justify-content-between align-items-center">
                  <div class="trainer-profile d-flex align-items-center">
                    <img src="src/img/trainers/trainer-3.jpg" class="img-fluid" alt=""/>
                    <span>Brandon</span>
                  </div>
                  <div class="trainer-rank d-flex align-items-center">
                    <i class="bx bx-user"></i>&nbsp;20
                    &nbsp;&nbsp;
                    <i class="bx bx-heart"></i>&nbsp;85
                  </div>
                </div>
              </div>
            </div>
            </div> */}
            {/* <!-- End Course Item --> */}

         {/* </div>

      </div>
    </section> */}
    {/* <!-- End Popular Courses Section --> */}


    </main>
    {/* <!-- End #main --> */}

  {/* <div id="preloader"></div> */}
  <a href="#" class="back-to-top d-flex align-items-center justify-content-center"><i class="fa fa-arrow-up"></i></a>
        <Footer/>         
        </div>
    )
}
