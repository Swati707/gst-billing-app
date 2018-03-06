const Hapi = require('hapi');

const server = new Hapi.Server({
    host: "localhost",
    port: 3000,
    routes: {
        cors: true
    }
});

// server.connection();

server.route({
    method: "GET",
    path: "/hello",
    handler: (req, res) => {
        return("hellow world!");
    }
});

// server.start(error => {
//     if(error){
//         console.log("Error while starting server");
//         throw error;
//     }
//     console.log("Server running at: " + server.info.uri);
// });
// Start the server
async function start() {

    try {
        await server.start();
    }
    catch (err) {
        console.log(err);
        process.exit(1);
    }

    console.log('Server running at:', server.info.uri);
};

start();