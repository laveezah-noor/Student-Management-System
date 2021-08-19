const express = require('express');
const cors = require('cors');
require('dotenv').config();
const bodyParser = require('body-parser');
const connection = require(`./db`)

const app = express();
app.use(cors());
app.use(bodyParser.json());

app.get('/dashboard', (req, res) => {
  const SELECT_ALL_TASKS = `
  SELECT 'Courses' AS label, COUNT(*) AS value FROM COURSE
  UNION 
  SELECT 'Students' AS label, COUNT(*) FROM STUDENT
  UNION 
  SELECT 'Instructors' AS label, COUNT(*) FROM INSTRUCTOR;
  `;
  connection.query(SELECT_ALL_TASKS, (err, result) => {
    if (err) {
      console.log(err);
    } else {
      res.send(result);
    }
  });
});


app.get('/classroom/:courseid', (req, res) => {
  const COURSEDATA = `
  CALL ClassroomCourse(${req.params.courseid});
  CALL ClassroomStudent(${req.params.courseid});
  CALL ClassroomLecture(${req.params.courseid})
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
  const SELECT_ALL_TASKS = `
  SELECT U.UserID,U.RoleID,U.UserName,UserPassword,R.Role
  FROM USERS U
  inner JOIN ROLE R ON U.RoleID=R.RoleID;
  `;
  connection.query(SELECT_ALL_TASKS, (err, result) => {
    if (err) {
      console.log(err);
    } else {
      res.send(result);
    }
  });
});

app.get('/course', (req, res) => {
  const SELECT_ALL_TASKS = `
  SELECT C.ID,C.CourseName,C.InstructorID, concat(I.FirstName,' ',I.LastName) AS InstructorName
   FROM COURSE C
  INNER JOIN INSTRUCTOR I ON C.InstructorID = I.ID;
  `;
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

app.get('/instructor', (req, res) => {
  const SELECT_ALL_TASKS = `SELECT * FROM INSTRUCTOR;`;
  connection.query(SELECT_ALL_TASKS, (err, result) => {
    if (err) {
      console.log(err);
    } else {
      res.send(result);
    }
  });
});

app.post('/addUser', (req, res) => {
  const ADD_TASK = `CALL InsertUser
  (${req.body.Role},'${req.body.UserName}','${req.body.UserPassword}','${req.body.FirstName}','${req.body.LastName}','${req.body.Email}','${req.body.Contact}')
  `;
  console.log(ADD_TASK, `add instructor`);
  connection.query(ADD_TASK, (err) => {
    if (err) {
      console.log(err);
    } else {
      res.send('added');
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

app.get('/student', (req, res) => {
  const SELECT_ALL_TASKS = `SELECT * FROM STUDENT;`;
  connection.query(SELECT_ALL_TASKS, (err, result) => {
    if (err) {
      console.log(err);
    } else {
      res.send(result);
    }
  });
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
// // get all tasks
// app.get('/tasks/:userid', (req, res) => {
//   const SELECT_ALL_TASKS = `SELECT * FROM todotaskmanager.tasks where userid = ${req.params.userid} `;
//   connection.query(SELECT_ALL_TASKS, (err, result) => {
//     if (err) {
//       console.log(err);
//     } else {
//       res.send(result);
//     }
//   });
// });

app.listen(4000, () => {
  console.log('server up');
});