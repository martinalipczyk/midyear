//set up the server
const express = require( "express" );
const app = express();
const port = 3000;
const logger = require("morgan");
const bodyParser = require('body-parser');
const db = require('./db/db_connection.js'); // Adjust the path accordingly
const multer = require('multer');
const path = require('path');
const fs = require('fs');


let userna = null;
let userid = null;


// Use body-parser middleware
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());


// Configure Express to use EJS
app.set( "views",  __dirname + "/views");
app.set( "view engine", "ejs" );

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        const uploadPath = 'public/uploads';

        fs.mkdir(uploadPath, { recursive: true }, (err) => {
            if (err) {
                console.error('Error creating destination directory:', err);
            }
            cb(null, uploadPath);
        });
    },
    filename: function (req, file, cb) {
        cb(null, Date.now() + path.extname(file.originalname));
    }
});

const upload = multer({ storage: storage });


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
    res.render( "journaling", {user_id: userid, username: userna} );
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

app.get("/journaling/viewJournals", (req, res) => {
    db.query('SELECT text FROM journals WHERE userid = ?', [userid], (err, results) => {
        if (err) {
            console.error('Error executing query: ' + err.message);
            return res.status(500).json({ error: 'Internal Server Error' });
        }

        res.render("viewJournals", { user_id: userid, username: userna, journals: results });
    });
});

app.get("/pictureupload/viewpictures", (req, res) => {
    db.query('SELECT picture FROM view_images WHERE userid = ?', [userid], (err, results) => {
        if (err) {
            console.error('Error executing query: ' + err.message);
            return res.status(500).json({ error: 'Internal Server Error' });
        }

        res.render("viewpictures", { user_id: userid, username: userna, pictures: results });
    });
});



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

        // Assuming you are trying to log in the user after registration
        db.query('SELECT user_id, username FROM user WHERE username = ? AND password = ?', [username, password], (err, results) => {
            if (err) {
                console.error('Error executing login query: ' + err.message);
                return res.status(500).json({ error: 'Internal Server Error' });
            }

            if (results.length === 1) {
                userid = results[0].user_id;
                userna = results[0].username;
                res.render('home', { user_id: userid, username: userna });
            } else {
                res.render('login');
            }
        });
    });
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
        res.render("login");
      }
    });
});


// app.post('/deleteTask', (req, res) => {
//     const { user_id, task_name } = req.body;

//     // Check if the user exists before deleting the task
//     const checkUserQuery = 'SELECT COUNT(*) AS userCount FROM user WHERE user_id = ?';
//     db.query(checkUserQuery, [user_id], (checkUserErr, checkUserResults) => {
//         if (checkUserErr) {
//             console.error('Error checking user existence: ' + checkUserErr.message);
//             return res.status(500).json({ error: 'Internal Server Error' });
//         }

//         const userExists = checkUserResults[0].userCount > 0;

//         if (!userExists) {
//             return res.status(404).json({ error: 'User not found' });
//         }

//         // If the user exists, proceed to delete the task from the tasks table
//         const deleteTaskQuery = 'DELETE FROM tasks WHERE user_id = ? AND task_name = ?';
//         db.query(deleteTaskQuery, [user_id, task_name], (deleteErr, deleteResults) => {
//             if (deleteErr) {
//                 console.error('Error deleting task: ' + deleteErr.message);
//                 return res.status(500).json({ error: 'Internal Server Error' });
//             }
//             res.status(200).json({ message: 'Task deleted successfully' });
//         });
//     });
// });

// app.get('/getTasks/:user_id', (req, res) => {
//     const user_id = req.params.user_id;

//     const query = 'SELECT task_name FROM tasks WHERE user_id = ?';
//     db.query(query, [user_id], (err, results) => {
//         if (err) {
//             console.error('Error fetching tasks: ' + err.message);
//             return res.status(500).json({ error: 'Internal Server Error' });
//         }
//         res.status(200).json(results);
//     });
// });


app.post('/addTask', (req, res) => {
    const { task_name } = req.body;

        // If the user exists, proceed to insert the task into the tasks table
        const insertTaskQuery = 'INSERT INTO tasks (user_id, task_name) VALUES (?, ?)';
        db.query(insertTaskQuery, [userid, task_name], (insertErr, insertResults) => {
            if (insertErr) {
                console.error('Error saving task: ' + insertErr.message);
                return res.status(500).json({ error: 'Internal Server Error' });
            }
            res.status(200).json({ message: 'Task saved successfully' });
        });
    });


app.post('/addtojournal', (req, res) => {
    const {inputBox } = req.body;

    const query = 'INSERT INTO journals (userid, text) VALUES (?, ?)';
    db.query(query, [userid, inputBox], (err, results) => {
        if (err) {
            console.error('Error adding to journal: ' + err.message);
            return res.status(500).json({ error: 'Internal Server Error' });
        }
        res.render('journaling');
    });
});

app.post('/uploadPictures', upload.single('image'), (req, res) => {
    try {
        // Access the uploaded file information using req.file
        const { filename } = req.file;

        // Access other form data using req.body
        const { image, textinput } = req.body;

        // Save the file information and other data to the database
        const query = 'INSERT INTO view_images (userid, picture, caption) VALUES (?, ?, ?)';
        db.query(query, [userid, image, textinput], (err, results) => {
            if (err) {
                console.error('Error adding to picturebook: ' + err.message);
                return res.status(500).json({ error: 'Internal Server Error' });
            }

            res.render('pictureupload');
        });
    } catch (error) {
        console.error('Error handling picture upload:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});


// start the server
app.listen( port, () => {
    console.log(`App server listening on ${ port }. (Go to http://localhost:${ port })` );
} );