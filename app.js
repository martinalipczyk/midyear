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
// app.get( "/", ( req, res ) => {
//     res.sendFile( __dirname + "/views/index.html" );
// } );



app.get( "/", ( req, res ) => {
    res.sendFile( __dirname + "/views/index.html" );
} );



app.get( "/home", ( req, res ) => {
    res.render("home");
} );


app.get( "/createaccount", ( req, res ) => {
    res.render("createaccount" );
} );


app.get( "/todo", ( req, res ) => {
    res.render( "todo" );
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

app.get( "/journaling/viewJournals", ( req, res ) => {
    res.render( "viewJournals" );
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
    // app.get('/fetch-data', (req, res) => {
        
    //     const query = 'SELECT user_id';
      
    //     db.query(query, [userId], (err, results) => {
    //       if (err) {
    //         console.error('Error fetching data from the database: ' + err.message);
    //         return res.status(500).json({ error: 'Internal Server Error' });
    //       }
      
    //       if (results.length === 0) {
    //         return res.status(404).json({ error: 'User not found' });
    //       }
      
    //       // Set the fetched data as variables
    //       const username = results[0].username;
    //       const email = results[0].email;
      
    //       // Use the variables as needed
    //       res.json({ username, email });
    //     });
    //   });
    res.redirect('/home');
  });

  // Login endpoint
// Login endpoint
app.post('/login', (req, res) => {
    const { username, password } = req.body;
  
    const query = 'SELECT user_id FROM user WHERE username = ? AND password = ?';
    db.query(query, [username, password], (err, results) => {
      if (err) {
        console.error('Error executing query: ' + err.message);
        return res.status(500).json({ error: 'Internal Server Error' });
      }
  
      if (results.length === 1) {
        const userId = results[0].user_id;
        res.json({ success: true, message: 'Login successful', userId: userId });
      } else {
        res.status(401).json({ success: false, error: 'Invalid credentials' });
      }
    });
});

  

// start the server
app.listen( port, () => {
    console.log(`App server listening on ${ port }. (Go to http://localhost:${ port })` );
} );