const Hapi = require('hapi');
const mysql = require('mysql');

// server connection();
const server = new Hapi.Server();

//Connecting the server
server.connection({
    host: "localhost",
    port: 3000,
    routes: {
        cors: true
    }
});

//connect to mysql server
server.app.db = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: '',
    database: "ps_gst_billing_task"
});
server.app.db.connect((err) => {
    if(err){
        console.log("Error while connecting to mysql");
        process.exit(1);
    }
    console.log("Connected to mysql.");
});
const db = server.app.db;

//Load plugins and start server
server.register([  
    require('./backend/routes/product')
    ], (err) => {
        if (err) {
            console.log("Error while loading plugin");
            throw err;
        }
        server.start((err) => {
        if (err) {
            console.log("Error while strating server");
            throw err;
        }
        console.log(`Server running at: ${server.info.uri}`);
        });
});

//Checking if database is working
db.query('SELECT 1 + 1 AS solution', function (error, results, fields) {
    if (error) throw error;
    console.log('The solution is: ', results[0].solution);
});


