const Hapi = require('hapi');
const mysql = require('mysql');

// server connection();
const server = new Hapi.Server({
    host: "localhost",
    port: 3000,
    routes: {
        cors: true
    }
});

//Start the server
async function startServer() {
    try {
        await server.start();
    }
    catch (err) {
        console.log(err);
        process.exit(1);
    }
    console.log('Server running at:', server.info.uri);
};
startServer();

//connect to mysql server
var db = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: '',
    database: "ps_gst_billing_task"
});

db.connect((err) => {
    if(err){
        console.log("Error while connecting to mysql");
        process.exit(1);
    }
    console.log("Connected to mysql.");
});
db.query('SELECT 1 + 1 AS solution', function (error, results, fields) {
    if (error) throw error;
    console.log('The solution is: ', results[0].solution);
});

server.route({
    method: "GET",
    path: "/code/{product_code}",
    handler: (req, res) => {
        return(encodeURIComponent(req.params.product_code));
    }
});
server.route({
    method: "GET",
    path: "/name/{product_name}",
    handler: (req, res) => {
        return(encodeURIComponent(req.params.product_name));
    }
});
server.route({
    method: "GET",
    path: "/products",
    handler: (req, res) => {
        return("Find all the products");
    }
});
server.route({
    method: "POST",
    path: "/product",
    handler: (req, res) => {
        return("Add this new product to database:\n" + req.payload);
    }
});
server.route({
    method: "PATCH",
    path: "/{product_code}",
    handler: (req, res) => {
        return("Edit the product with product id: "+encodeURIComponent(req.params.product_code));
    }
});