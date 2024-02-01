//set up the server
const express = require( "express" );
const app = express();
const port = 3000;
const logger = require("morgan");
const bodyParser = require('body-parser');
const db = require('./db/db_connection.js'); // Adjust the path accordingly
let userna = null;
let userid = null;


// Use body-parser middleware
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// Configure Express to use EJS
app.set( "views",  __dirname + "/views");
app.set( "view engine", "ejs" );


// define middleware that logs all incoming requests
app.use(logger("dev"));


// app.get( "/", ( req, res ) => {
//     res.sendFile( __dirname + "/views/index.html" );
// } );



app.get( "/", ( req, res ) => {
    res.render("login");
} )

app.get( "/home", ( req, res ) => {
    res.render('home', {user_id: userid, username: userna});
    // app.post('/dologin', (req, res));
} )

app.get( "/createaccount", ( req, res ) => {
    res.render("createaccount");
} );


app.get( "/todo", ( req, res ) => {
    res.render('todo', {user_id: userid, username: userna});
} );

app.get( "/moodtracker", ( req, res ) => {
    res.sendFile( "/moodPages/moodtracker.html" );
} );

app.get( "/journaling", ( req, res ) => {
    res.render( "journaling" );
} );

app.get( "/pictureupload", ( req, res ) => {
    res.render( "pictureupload" );
} );

app.get( "/moodtracker/bored", ( req, res ) => {
    res.sendFile(__dirname+ "/moodPages/bored.html" );
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

const get_user_id = 'SELECT user_id FROM user' 
app.get( "/journaling/viewJournals/:id", ( req, res ) => {
    res.render( "viewJournals", {userna} );
} );

app.get( "/login", ( req, res ) => {
    res.render( "login" );
} );

app.use(express.static(__dirname + '/public'));


//im trying this pls plsplspslpslsplp work
app.post('/register', (req, res) => {
    const { first_name, last_name, username, password, email } = req.body;
  
  
    const query = 'INSERT INTO user (first_name, last_name, username, password, email) VALUES (?, ?, ?, ?, ?)';
    db.query(query, [first_name, last_name, username, password, email], (err, results) => {
      if (err) {
        console.error('Error registering user: ' + err.message);
        return res.status(500).json({ error: 'Internal Server Error' });
      }
      res.status(200).json({ message: 'User registered successfully' });
      
    });
   
    res.render('home');
  });

  
app.post('/dologin', (req, res) => {
    const { username, password } = req.body;
  
    const query = 'SELECT user_id, username FROM user WHERE username = ? AND password = ?';
    db.query(query, [username, password], (err, results) => {
      if (err) {
        console.error('Error executing query: ' + err.message);
        return res.status(500).json({ error: 'Internal Server Error' });
      }

      if (results.length === 1) {
        userid = results[0].user_id;
        userna = results[0].username;
        res.render('home', {user_id: userid, username: userna});
      } else {
        res.status(401).json({ success: false, error: 'Invalid credentials' });
      }
    });
});

// start the server
app.listen( port, () => {
    console.log(`App server listening on ${ port }. (Go to http://localhost:${ port })` );
} );