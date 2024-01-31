//set up the server
const express = require( "express" );
const app = express();
const port = 3000;
const logger = require("morgan");
const bodyParser = require('body-parser');
const db = require('./db/db_connection.js'); // Adjust the path accordingly


// Use body-parser middleware
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

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

app.get( "/journaling/viewJournals", ( req, res ) => {
    res.sendFile( __dirname + "/views/viewJournals.html" );
} );

app.use(express.static(__dirname + '/public'));


//im trying this pls plsplspslpslsplp work
app.post('/register', (req, res) => {
    const { first_name, last_name, username, password, email } = req.body;
  
    // You may want to add validation and hashing for the password
  
    const query = 'INSERT INTO user (first_name, last_name, username, password, email) VALUES (?, ?, ?, ?, ?)';
    db.query(query, [first_name, last_name, username, password, email], (err, results) => {
      if (err) {
        console.error('Error registering user: ' + err.message);
        return res.status(500).json({ error: 'Internal Server Error' });
      }
      res.status(200).json({ message: 'User registered successfully' });
    });
  });
  
  

// start the server
app.listen( port, () => {
    console.log(`App server listening on ${ port }. (Go to http://localhost:${ port })` );
} );