const express = require('express');
const cors = require('cors');
require('dotenv').config();
const bodyParser = require('body-parser');
const session = require('express-session');
const cookieParser = require('cookie-parser');
const upload = require('express-fileupload')
const path = require("path");
const fs = require('fs');
const connection = require(`./db`);

const app = express();
app.use(express.json())
app.use(upload())
app.use(cors({
  origin: ['http://localhost:3000'],
  methods: ["GET","POST","DELETE","PUT"],
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
  SELECT * FROM NOTIFICATION WHERE UserID = ${id}
  ORDER BY ID DESC;
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

app.put('/updateProfile', (req, res) => {
  console.log("result: ",req.body.UserID,
  req.body.RoleID,
  req.body.UserName,
  req.body.UserPassword,
  req.body.FirstName,
  req.body.LastName,
  req.body.Email,
  req.body.Contact,
  req.body.Profile)
  if(req.body.Profile){
    const SELECT_ALL_TASKS = `
	START TRANSACTION;
		UPDATE USERS SET 
		UserName = '${req.body.UserName}',
		UserPassword = '${req.body.UserPassword}'
		WHERE UserID = ${req.body.UserID} AND RoleID = ${req.body.RoleID};
		CALL UpdateProfile('${req.body.RoleID}', '${req.body.UserID}', '${req.body.FirstName}', 
      '${req.body.LastName}', '${req.body.Email}', '${req.body.Contact}', '${req.body.Profile}');
	COMMIT;
  `;
  connection.query(SELECT_ALL_TASKS, (err, result) => {
    if (err) {
      console.log(err);
    } else {
      console.log(result)
      res.send(result);
    }
  });
  }else{
    const SELECT_ALL_TASKS = `
	START TRANSACTION;
		UPDATE USERS SET 
		UserName = '${req.body.UserName}',
		UserPassword = '${req.body.UserPassword}'
		WHERE UserID = ${req.body.UserID} AND RoleID = ${req.body.RoleID};
		CALL UpdateProfile('${req.body.RoleID}', '${req.body.UserID}', '${req.body.FirstName}', 
      '${req.body.LastName}', '${req.body.Email}', '${req.body.Contact}', '');
	COMMIT;
  `;
  connection.query(SELECT_ALL_TASKS, (err, result) => {
    if (err) {
      console.log(err);
    } else {
      console.log(result)
      res.send(result);
    }
  });
  }
});



app.get('/dashboard/:role/:id', (req, res) => {
  const role = req.params.role;
  const id = req.params.id;
  const SELECT_ALL_TASKS = `
  
  CALL DashboardData(${role},${id});

  `;
  console.log(SELECT_ALL_TASKS)
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

app.delete('/leavecourse/:id', (req, res) => {
  const DELETE_TASK = `DELETE FROM COURSE_STUDENT WHERE StudentID= ${req.params.id};`;
  connection.query(DELETE_TASK, (err, result) => {
    if (err) {
      console.log(err);
    } else {
      res.send('Left');
    }
  });
});

app.post('/addLecture', (req, res) => {
  console.log("LectureFile: ",req.body.FileName)
  if (req.body.FileName=='') {
    const ADD_TASK = `INSERT INTO LECTURE (CourseID, Description, Video, Notes, InstructorID, SubmitTime)
    VALUES (${req.body.CourseID},'${req.body.Description}','${req.body.Video}','${req.body.Notes}',${req.body.InstructorID},NOW());`;
    console.log(ADD_TASK, `add lecture`);
  connection.query(ADD_TASK, (err) => {
    if (err) {
      console.log(err);
    } else {
      res.send("Lecture Added");
    }
  });
  } else {
    const ADD_TASK = `INSERT INTO LECTURE (CourseID, Description, File, Video, Notes, InstructorID, SubmitTime)
    VALUES (${req.body.CourseID},'${req.body.Description}','${req.body.FileName}','${req.body.Video}','${req.body.Notes}',${req.body.InstructorID},NOW());`;
    console.log(ADD_TASK, `add lecture`);
  connection.query(ADD_TASK, (err) => {
    if (err) {
      console.log(err);
    } else {
      res.send("Lecture Added");
    }
  });
  }
    
});

app.post('/uploadLecture', (req, res) => {
  if (req.files === null) {
    return res.status(400).json({ msg: 'No file uploaded' });
  }

  const file = req.files.file;
  let reqPath = path.join(__dirname, '../');//It goes 1 folders or directories back from given __dirname.
  console.log("File:  ",file, reqPath)

  file.mv(`${reqPath}client/public/LectureFiles/${file.name}`, err => {
    if (err) {
      console.error(err);
      return res.status(500).send(err);
    }

    res.json({ fileName: file.name, filePath: `/LectureFiles/${file.name}` });
  });
});

app.delete('/deleteLectureFile',(req,res) =>{
  console.log("Path: ",req.query.path);
  fs.unlink(req.query.path, (err) => {
    if (err) {
      console.log(err)
    }
  res.send('Deleted')
  })
})

app.put('/updateLecture', (req, res) => {
  const UPDATE_COURSE = `UPDATE LECTURE SET Description = '${req.body.Description}', Notes = '${req.body.Notes}', Video = '${req.body.Video}', File = '${req.body.FileName}' WHERE ID = ${req.body.LectureID};`;
  console.log(UPDATE_COURSE, `update course`);
  connection.query(UPDATE_COURSE, (err) => {
    if (err) {
      console.log(err);
    } else {
      res.send('added');
    }
  });
});

app.post('/uploadCourseImage', (req, res) => {
  if (req.files === null) {
    return res.status(400).json({ msg: 'No file uploaded' });
  }

  const file = req.files.file;
  let reqPath = path.join(__dirname, '../');//It goes 1 folders or directories back from given __dirname.
  console.log("File:  ",file, reqPath)

  file.mv(`${reqPath}client/public/CourseImages/${file.name}`, err => {
    if (err) {
      console.error(err);
      return res.status(500).send(err);
    }

    res.json({ fileName: file.name, filePath: `/CourseImages/${file.name}` });
  });
});

app.delete('/deleteCourseImage/:path',(req,res) =>{
  fs.unlink(req.params.path, (err) => {
    if (err) {
      console.log(err)
    }
  res.send('Deleted')
  })
})


app.delete('/deleteLecture/:id', (req, res) => {
  const DELETE_TASK = `
  DELETE FROM LECTURE WHERE ID = ${req.params.id};`;
  connection.query(DELETE_TASK, (err, result) => {
    if (err) {
      console.log(err);
    } else {
      res.send('deleted');
    }
  });
});

app.post('/uploadProfileImage', (req, res) => {
  if (req.files === null) {
    return res.status(400).json({ msg: 'No file uploaded' });
  }

  const file = req.files.file;
  let reqPath = path.join(__dirname, '../');//It goes 1 folders or directories back from given __dirname.
  console.log("File:  ",file, reqPath)

  file.mv(`${reqPath}client/public/ProfileImages/${file.name}`, err => {
    if (err) {
      console.error(err);
      return res.status(500).send(err);
    }

    res.json({ fileName: file.name, filePath: `/ProfileImages/${file.name}` });
  });
});

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
  if (req.query.id) {
    const SELECT_ALL_TASKS = `
  SELECT Count(*) as Total FROM COURSE_STUDENT WHERE CourseID = ${req.params.CourseID};
  SELECT IF( EXISTS(
    Select * FROM COURSE_STUDENT WHERE CourseID = ${req.params.CourseID} AND StudentID = ${req.query.id})
    , 1, 0) AS Status;
  `;
  connection.query(SELECT_ALL_TASKS, (err, result) => {
    if (err) {
      console.log(err);
    } else {
      console.log(result)
      res.send(result);
    }
  });
  } else {
  const SELECT_ALL_TASKS = `
  SELECT Count(*) as Total FROM COURSE_STUDENT WHERE CourseID = ${req.params.CourseID};
  `;
  connection.query(SELECT_ALL_TASKS, (err, result) => {
    if (err) {
      console.log(err);
    } else {
      console.log(result)
      res.send(result);
    }
  });
  }
  
});

app.post('/addCourse', (req, res) => {
  console.log(req.body.ImgName)
  if (req.body.ImgName!=''){
    const ADD_TASK = `INSERT INTO COURSE (CourseName, InstructorID, Image) VALUES ('${req.body.CourseName}', ${req.body.Instructor},'${req.body.ImgName}')`;
    console.log(ADD_TASK, `add course`);
    connection.query(ADD_TASK, (err) => {
      if (err) {
        console.log(err);
      } else {
        res.send('added');
      }
    });
  } else {
    const ADD_TASK = `INSERT INTO COURSE (CourseName, InstructorID) VALUES ('${req.body.CourseName}', ${req.body.Instructor})`;
    console.log(ADD_TASK, `add course`);
    connection.query(ADD_TASK, (err) => {
      if (err) {
        console.log(err);
      } else {
        res.send('added');
      }
    });
  }
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
  const UPDATE_COURSE = `UPDATE COURSE SET CourseName = '${req.body.CourseName}', InstructorID = ${req.body.Instructor}, Image = '${req.body.ImgName}' WHERE ID = ${req.body.CourseID};`;
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


app.get('/myTrainers/:id', (req, res) => {
  
  if (req.query.search){
    console.log("Query: ",req.query)
    const SELECT_ALL_TASKS = `
  Call MyTrainers(${req.params.id},0,"${req.query.filter}","${req.query.search}");
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
  Call MyTrainers(${req.params.id},${req.query.sort},"${req.query.filter}","");
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
  Call MyTrainers(${req.params.id},0,"","");
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