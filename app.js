//set up the server
const express = require( "express" );
const app = express();
const port = 3000;
const logger = require("morgan");



// define middleware that logs all incoming requests
app.use(logger("dev"));


// define a route for the default home page
app.get( "/", ( req, res ) => {
    res.sendFile( __dirname + "/views/index.html" );
} );



app.get( "/home", ( req, res ) => {
    res.sendFile( __dirname + "/views/home.html" );
} );
// define a route for the assignment list page
app.get( "/assignments", ( req, res ) => {
    res.sendFile( __dirname + "/views/assignments.html" );
} );

// define a route for the assignment detail page
app.get( "/assignments/detail", ( req, res ) => {
    res.sendFile( __dirname + "/views/detail.html" );
} );

app.get( "/createaccount", ( req, res ) => {
    res.sendFile( __dirname + "/views/createaccount.html" );
} );

app.get( "/goalsetting", ( req, res ) => {
    res.sendFile( __dirname + "/views/goalsetting.html" );
} );

app.get( "/todo", ( req, res ) => {
    res.sendFile( __dirname + "/views/todo.html" );
} );

app.get( "/moodtracker", ( req, res ) => {
    res.sendFile( __dirname + "/moodPages/moodtracker.html" );
} );

app.get( "/journaling", ( req, res ) => {
    res.sendFile( __dirname + "/views/journaling.html" );
} );

app.get( "/pictureupload", ( req, res ) => {
    res.sendFile( __dirname + "/views/pictureupload.html" );
} );

app.use(express.static(__dirname + '/public'));

// start the server
app.listen( port, () => {
    console.log(`App server listening on ${ port }. (Go to http://localhost:${ port })` );
} );