var sql = require("mssql")
var config = require('./db')

// var dbConfig = {
//     server: "ALLAN-HP\ALLAN",
//     database: 'TodoList',
//     user: "allen",
//     password: "allen.02",
//     port: 1433
// }

// function getEmp(){
    
// }
// getEmp()
// (async function () {
//     try {
//         let pool = await sql.connect(config)
//         let result1 = await pool.request()
//             // .input('input_parameter', sql.Int, value)
//             .query('SELECT * From STUDENT,COURSE_STUDENT,COURSE,INSTRUCTOR;')
            
//         console.dir(result1)
    
//         // // Stored procedure
        
//         // let result2 = await pool.request()
//         //     .input('input_parameter', sql.Int, value)
//         //     .output('output_parameter', sql.VarChar(50))
//         //     .execute('procedure_name')
        
//         // console.dir(result2)
//     } catch (err) {
//         // ... error checks
//         console.log(err)

//     }
// })()

sql.connect(config, err => {
    // ... error checks
    if(err){
        console.log(err)
    }
    // Query

    new sql.Request().query('SELECT * From STUDENT,COURSE_STUDENT,COURSE,INSTRUCTOR;', (err, result) => {
        // ... error checks

        console.dir(result)
    })
})

sql.on('error', err => {
    // ... error handler
    console.log(err)
});


