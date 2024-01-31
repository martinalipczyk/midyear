//set up the server
const express = require( "express" );
const app = express();
const port = 3000;
const logger = require("morgan");

// Configure Express to use EJS
app.set( "views",  __dirname + "/views");
app.set( "view engine", "ejs" );


// define middleware that logs all incoming requests
app.use(logger("dev"));


// define a route for the default home page
app.get( "/", ( req, res ) => {
    res.sendFile( __dirname + "/views/index.html" );
} );



app.get( "/home", ( req, res ) => {
    res.sendFile( __dirname + "/views/home.html" );
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

app.get( "/moodtracker/bored", ( req, res ) => {
    res.sendFile( __dirname + "/moodPages/bored.html" );
} );

app.get( "/moodtracker/happy", ( req, res ) => {
    res.sendFile( __dirname + "/moodPages/happy.html" );
} );

app.get( "/moodtracker/stressed", ( req, res ) => {
    res.sendFile( __dirname + "/moodPages/stressed.html" );
} );

app.get( "/moodtracker/tired", ( req, res ) => {
    res.sendFile( __dirname + "/moodPages/tired.html" );
} );

app.get( "/moodtracker/upset", ( req, res ) => {
    res.sendFile( __dirname + "/moodPages/upset.html" );
} );

app.use(express.static(__dirname + '/public'));

// start the server
app.listen( port, () => {
    console.log(`App server listening on ${ port }. (Go to http://localhost:${ port })` );
} );