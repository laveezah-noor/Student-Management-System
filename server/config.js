var sql = require("mssql")

var dbConfig = {
    server: "ALLAN-HP\ALLAN",
    database: 'TodoList',
    user: "allen",
    password: "allen.02",
    port: 1433
}

function getEmp(){
    // var conn = new sql.Connection(dbConfig);
    // var req = new sql.Request(conn);
    

    conn.connect(function (err) {
        if (err){
            console.log(err);
            return;
        }
        req.query("SELECT * FROM TODO", function(err, recordset){
            if (err){
                console.log(err);
                 
            } else{
                console.log(recordset)
            }
        conn.close()
        })
    })
}
getEmp()