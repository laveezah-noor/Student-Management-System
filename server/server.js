const express = require('express');
const cors = require('cors');
require('dotenv').config();
const bodyParser = require('body-parser');
const session = require('express-session');
const cookieParser = require('cookie-parser');
const upload = require('express-fileupload')
const connection = require(`./db`);

const app = express();
app.use(express.json())
app.use(upload())
app.use(cors({
  origin: ['http://localhost:3000'],
  methods: ["GET","POST","DELETE"],
  credentials: true
}));
// app.use(cors());
app.use(bodyParser.json());
app.use(cookieParser());
app.use(bodyParser.urlencoded({extended:false}));
app.use(session({
  key:"userID",
  secret: "ClassroomSystem",
  resave: false,
  saveUninitialized: true,
  cookie: {
    httpOnly: true,
    maxAge: 24 * 3600000
  }
}))

app.get('/home',(req,res)=>{
  const SELECT_ALL_TASKS = `
  SELECT COUNT(*) AS Students FROM STUDENT;
  SELECT COUNT(*) AS Trainers FROM INSTRUCTOR;
  SELECT COUNT(*) AS Courses FROM COURSE;
  `;
  connection.query(SELECT_ALL_TASKS, (err, result) => {
    if (err) {
      console.log(err);
    } else {
      console.log(result);
      res.send(result)
    }
  });
})

app.get('/login',(req,res)=>{
  console.log(req.session)
  console.log(req.session.id)
  if (req.session.user){
    let data = {
      loggedIn:req.session.loggedIn,
      user:req.session.user[0].UserID,
      role:req.session.user[0].RoleID}
    console.log(data);
    res.send(data)
    } else {
    res.send({loggedIn: false});
  }
})

app.post('/login', (req, res) => {
  const UserName = req.body.UserName;
  const Password = req.body.Password;
  const SELECT_ALL_TASKS = `
  SELECT * FROM USERS
   WHERE UserName = '${UserName}' AND UserPassword = '${Password}';
  `;
  connection.query(SELECT_ALL_TASKS, (err, result) => {
    if (err) {
      console.log(err);
    } 
    if(result.length>0){
      req.session.loggedIn = true;
      req.session.user = result;
      console.log(result);
      let data = {
        loggedIn:req.session.loggedIn,
        user:req.session.user[0].UserID,
        role:req.session.user[0].RoleID}
      console.log(data);
      res.send(data)
    } else {
      res.send({message:"Wrong UserName or Password"})
    }
  });
});

app.get('/notification/:role/:id', (req, res) => {
  const role = req.params.role;
  const id = req.params.id;
  console.log(role,id)
  const SELECT_ALL_TASKS = `
  SELECT * FROM NOTIFICATION WHERE UserID = ${id};
  ;
  `;
  connection.query(SELECT_ALL_TASKS, (err, result) => {
    if (err) {
      console.log(err);
    } else {
      console.log(result)
      res.send(result);
    }
  });
});


app.get('/profile/:role/:id', (req, res) => {
  const role = req.params.role;
  const id = req.params.id;
  const SELECT_ALL_TASKS = `
  CALL ProfileData(${role},${id});
  `;
  connection.query(SELECT_ALL_TASKS, (err, result) => {
    if (err) {
      console.log(err);
    } else {
      console.log(result)
      res.send(result);
    }
  });
});

app.post('/updateProfile', (req, res) => {
  const SELECT_ALL_TASKS = `
  CALL ProfileData(${role},${id});
  `;
  connection.query(SELECT_ALL_TASKS, (err, result) => {
    if (err) {
      console.log(err);
    } else {
      console.log(result)
      res.send(result);
    }
  });
});



app.get('/dashboard/:role/:id', (req, res) => {
  const role = req.params.role;
  const id = req.params.id;
  const SELECT_ALL_TASKS = `
  
  CALL DashboardData(${role},${id});

  `;
  // const SELECT_ALL_TASKS = `
  // SELECT 'Courses' AS label, COUNT(*) AS value FROM COURSE
  // UNION 
  // SELECT 'Students' AS label, COUNT(*) FROM STUDENT
  // UNION 
  // SELECT 'Instructors' AS label, COUNT(*) FROM INSTRUCTOR;
  // `;
  connection.query(SELECT_ALL_TASKS, (err, result) => {
    if (err) {
      console.log(err);
    } else {
      console.log(result)
      res.send(result);
    }
  });
});

app.get('/classroom/:courseid', (req, res) => {
  const COURSEDATA = `
  CALL ClassroomCourse(${req.params.courseid});
  CALL ClassroomStudent(${req.params.courseid});
  CALL ClassroomLecture(${req.params.courseid});
`
  connection.query((COURSEDATA), (err, result) => {
    if (err) {
      console.log(err);
    } else {
      console.log(result);
      res.send(result) 
    }
  });
});

app.post('/addLecture', (req, res) => {
  if (req.body.File) {
    console.log(req.body.File)
    var file = req.body.File
    var filename = file.name
    console.log(filename)
    const ADD_TASK = `INSERT INTO LECTURE (CourseID, Description, Video, Notes, File, InstructorID, SubmitTime)
    VALUES (${req.body.CourseID},'${req.body.Description}','${req.body.Video}','${req.body.Notes}','${filename}',${req.body.InstructorID},NOW());`;
    console.log(ADD_TASK, `add lecture`);    
    file.mv('client/public/LectureFiles'+filename, function (err){
      if(err){
        res.send(err)
      } else {
        res.send('File Uploaded')
      }
    })
  } else {
    const ADD_TASK = `INSERT INTO LECTURE (CourseID, Description, Video, Notes, InstructorID, SubmitTime)
    VALUES (${req.body.CourseID},'${req.body.Description}','${req.body.Video}','${req.body.Notes}',${req.body.InstructorID},NOW());`;
    console.log(ADD_TASK, `add lecture`);
  }
  connection.query(ADD_TASK, (err) => {
    if (err) {
      console.log(err);
    } else {
      res.send('added');
    }
  });
});

app.post('/upload',(req,res)=>{
  if (req.files) {
    console.log(req.files)
    var file = req.files.file
    var filename = file.name
    console.log(filename)
    file.mv('./uploads'+filename, function (err){
      if(err){
        res.send(err)
      } else {
        res.send('File Uploaded')
        // res.json({filename:file.name, filePath: `/uploads/${file.name}`})
      }
    })
  }
})

app.post('/joinCourse', (req, res) => {
  const ADD_TASK = `Call JoinCourse(${req.body.CourseID},${req.body.StudentID});`;
  console.log(ADD_TASK, `join course`);
  connection.query(ADD_TASK, (err) => {
    if (err) {
      console.log(err);
    } else {
      res.send('joined');
    }
  });
});

app.get('/role', (req, res) => {
  const SELECT_ALL_TASKS = `
  SELECT * FROM ROLE;
  `;
  connection.query(SELECT_ALL_TASKS, (err, result) => {
    if (err) {
      console.log(err);
    } else {
      res.send(result);
    }

  });
});

app.get('/user', (req, res) => {
  if (req.query.search){
    console.log("Query: ",req.query)
    const SELECT_ALL_TASKS = `
  Call ShowUsers(0,"${req.query.filter}","${req.query.search}");
  `;
  console.log(SELECT_ALL_TASKS)
  connection.query(SELECT_ALL_TASKS, (err, result) => {
    if (err) {
      console.log(err);
    } else {
      res.send(result);
    }
  });
  } else if (req.query.sort){
    const SELECT_ALL_TASKS = `
  Call ShowUsers(${req.query.sort},"${req.query.filter}","");
  `;
  connection.query(SELECT_ALL_TASKS, (err, result) => {
    if (err) {
      console.log(err);
    } else {
      res.send(result);
    }
  });
  } else {
    const SELECT_ALL_TASKS = `
  Call ShowUsers(0,"","");
  `;
  connection.query(SELECT_ALL_TASKS, (err, result) => {
    if (err) {
      console.log(err);
    } else {
      res.send(result);
    }
  });
  }
});

app.get('/course', (req, res) => {
  if (req.query.search){
    console.log("Query: ",req.query)
    const SELECT_ALL_TASKS = `
  Call ShowCourses(0,"${req.query.filter}","${req.query.search}");
  `;
  console.log(SELECT_ALL_TASKS)
  connection.query(SELECT_ALL_TASKS, (err, result) => {
    if (err) {
      console.log(err);
    } else {
      res.send(result);
    }
  });
  } else if (req.query.sort){
    const SELECT_ALL_TASKS = `
  Call ShowCourses(${req.query.sort},"${req.query.filter}","");
  `;
  connection.query(SELECT_ALL_TASKS, (err, result) => {
    if (err) {
      console.log(err);
    } else {
      res.send(result);
    }
  });
  } else {
    const SELECT_ALL_TASKS = `
  Call ShowCourses(0,"","");
  `;
  connection.query(SELECT_ALL_TASKS, (err, result) => {
    if (err) {
      console.log(err);
    } else {
      res.send(result);
    }
  });
  }
});

app.get('/courseTrainer/:id', (req, res) => {
  const SELECT_ALL_TASKS = `
  SELECT C.ID
   FROM COURSE C
  WHERE C.InstructorID = ${req.params.id};`;
  connection.query(SELECT_ALL_TASKS, (err, result) => {
    if (err) {
      console.log(err);
    } else {
      res.send(result);
    }
  });
});

app.get('/totalStudent/:CourseID', (req, res) => {
  const SELECT_ALL_TASKS = `
  SELECT Count(*) as Total FROM COURSE_STUDENT WHERE CourseID = ${req.params.CourseID};`;
  connection.query(SELECT_ALL_TASKS, (err, result) => {
    if (err) {
      console.log(err);
    } else {
      res.send(result);
    }
  });
});



app.post('/addCourse', (req, res) => {
  const ADD_TASK = `INSERT INTO COURSE (CourseName, InstructorID) VALUES ('${req.body.CourseName}', ${req.body.Instructor})`;
  console.log(ADD_TASK, `add course`);
  connection.query(ADD_TASK, (err) => {
    if (err) {
      console.log(err);
    } else {
      res.send('added');
    }
  });
});

app.delete('/course/:courseid', (req, res) => {
  const DELETE_TASK = `DELETE FROM COURSE WHERE (ID = ${req.params.courseid});`;
  connection.query(DELETE_TASK, (err, result) => {
    if (err) {
      console.log(err);
    } else {
      res.send('deleted');
    }
  });
});

app.put('/updateCourse', (req, res) => {
  const UPDATE_COURSE = `UPDATE COURSE SET CourseName = '${req.body.CourseName}', INSTRUCTORID = ${req.body.Instructor} WHERE ID = ${req.body.CourseID};`;
  console.log(UPDATE_COURSE, `update course`);
  connection.query(UPDATE_COURSE, (err) => {
    if (err) {
      console.log(err);
    } else {
      res.send('added');
    }
  });
});

app.get('/trainer', (req, res) => {
  if (req.query.search){
    console.log("Query: ",req.query)
    const SELECT_ALL_TASKS = `
  Call ShowTrainers(0,"${req.query.filter}","${req.query.search}");
  `;
  console.log(SELECT_ALL_TASKS)
  connection.query(SELECT_ALL_TASKS, (err, result) => {
    if (err) {
      console.log(err);
    } else {
      res.send(result);
    }
  });
  } else if (req.query.sort){
    const SELECT_ALL_TASKS = `
  Call ShowTrainers(${req.query.sort},"${req.query.filter}","");
  `;
  connection.query(SELECT_ALL_TASKS, (err, result) => {
    if (err) {
      console.log(err);
    } else {
      res.send(result);
    }
  });
  } else {
    const SELECT_ALL_TASKS = `
  Call ShowTrainers(0,"","");
  `;
  connection.query(SELECT_ALL_TASKS, (err, result) => {
    if (err) {
      console.log(err);
    } else {
      res.send(result);
    }
  });
  }
});

app.post('/addUser', (req, res) => {
  const ADD_TASK = `CALL InsertUser
  (${req.body.Role},'${req.body.UserName}','${req.body.UserPassword}','${req.body.FirstName}','${req.body.LastName}','${req.body.Email}','${req.body.Contact}')
  `;
  console.log(ADD_TASK, `add user`);
  connection.query(ADD_TASK, (err) => {
    if (err) {
      console.log(err);
    } else {
      res.send('User Added');
    }
  });
});

app.delete('/instructor/:instructorid', (req, res) => {
  const DELETE_TASK = `DELETE FROM INSTRUCTOR WHERE (ID = ${req.params.instructorid});`;
  connection.query(DELETE_TASK, (err, result) => {
    if (err) {
      console.log(err);
    } else {
      res.send('deleted');
    }
  });
});

app.put('/updateInstructor', (req, res) => {
  const UPDATE_COURSE = `UPDATE INSTRUCTOR SET FirstName = '${req.body.FirstName}', LastName = '${req.body.LastName}', Contact = '${req.body.Contact}', Email = '${req.body.Email}' WHERE ID = ${req.body.InstructorID};`;
  console.log(UPDATE_COURSE, `update instructor`);
  connection.query(UPDATE_COURSE, (err) => {
    if (err) {
      console.log(err);
    } else {
      res.send('added');
    }
  });
});


app.get('/myStudents/:id', (req, res) => {
  
  if (req.query.search){
    console.log("Query: ",req.query)
    const SELECT_ALL_TASKS = `
  Call MyStudents(${req.params.id},0,"${req.query.filter}","${req.query.search}");
  `;
  console.log(SELECT_ALL_TASKS)
  connection.query(SELECT_ALL_TASKS, (err, result) => {
    if (err) {
      console.log(err);
    } else {
      res.send(result);
    }
  });
  } else if (req.query.sort){
    const SELECT_ALL_TASKS = `
  Call MyStudents(${req.params.id},${req.query.sort},"${req.query.filter}","");
  `;
  connection.query(SELECT_ALL_TASKS, (err, result) => {
    if (err) {
      console.log(err);
    } else {
      res.send(result);
    }
  });
  } else {
    const SELECT_ALL_TASKS = `
  Call MyStudents(${req.params.id},0,"","");
  `;
  connection.query(SELECT_ALL_TASKS, (err, result) => {
    if (err) {
      console.log(err);
    } else {
      res.send(result);
    }
  });
  }
  
});


app.get('/student', (req, res) => {
  if (req.query.search){
    console.log("Query: ",req.query)
    const SELECT_ALL_TASKS = `
  Call ShowStudents(0,"${req.query.filter}","${req.query.search}");
  `;
  console.log(SELECT_ALL_TASKS)
  connection.query(SELECT_ALL_TASKS, (err, result) => {
    if (err) {
      console.log(err);
    } else {
      res.send(result);
    }
  });
  } else if (req.query.sort){
    const SELECT_ALL_TASKS = `
  Call ShowStudents(${req.query.sort},"${req.query.filter}","");
  `;
  connection.query(SELECT_ALL_TASKS, (err, result) => {
    if (err) {
      console.log(err);
    } else {
      res.send(result);
    }
  });
  } else {
    const SELECT_ALL_TASKS = `
  Call ShowStudents(0,"","");
  `;
  connection.query(SELECT_ALL_TASKS, (err, result) => {
    if (err) {
      console.log(err);
    } else {
      res.send(result);
    }
  });
  }
});

app.post('/addStudent', (req, res) => {
  const ADD_TASK = `INSERT INTO STUDENT (FirstName, LastName, Contact, Email) VALUES ('${req.body.FirstName}', '${req.body.LastName}', '${req.body.Contact}', '${req.body.Email}')`;
  console.log(ADD_TASK, `add student`);
  connection.query(ADD_TASK, (err) => {
    if (err) {
      console.log(err);
    } else {
      res.send('added');
    }
  });
});

app.delete('/student/:studentid', (req, res) => {
  const DELETE_TASK = `DELETE FROM STUDENT WHERE (ID = ${req.params.studentid});`;
  connection.query(DELETE_TASK, (err, result) => {
    if (err) {
      console.log(err);
    } else {
      res.send('deleted');
    }
  });
});

app.put('/updateStudent', (req, res) => {
  const UPDATE_COURSE = `UPDATE STUDENT SET FirstName = '${req.body.FirstName}', LastName = '${req.body.LastName}', Contact = '${req.body.Contact}', Email = '${req.body.Email}' WHERE ID = ${req.body.StudentID};`;
  console.log(UPDATE_COURSE, `update student`);
  connection.query(UPDATE_COURSE, (err) => {
    if (err) {
      console.log(err);
    } else {
      res.send('added');
    }
  });
});

app.get('/studentsorted/:sortparam', (req, res) => {
  console.log(req.params.sortparam)
  const SELECT_ALL_TASKS = `SELECT * FROM STUDENT ORDER BY ${req.params.sortparam};`;
  connection.query(SELECT_ALL_TASKS, (err, result) => {
    if (err) {
      console.log(err);
    } else {
      res.send(result);
      console.log("Result==>",result)
    }
  });
});


app.listen(4000, () => {
  console.log('server up');
});