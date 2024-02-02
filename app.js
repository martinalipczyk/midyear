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
app.use(express.json());

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
    res.render( "moodtracker", {user_id: userid, username: userna});
} );

app.get( "/journaling", ( req, res ) => {
    res.render( "journaling", {user_id: userid, username: userna} );
} );

// app.get( "/pictureupload", ( req, res ) => {
//     res.render( "pictureupload" );
// } );

app.get( "/moodtracker/bored", ( req, res ) => {
    res.render("bored", {user_id: userid, username: userna});
} );

app.get( "/moodtracker/happy", ( req, res ) => {
    res.render( "happy", {user_id: userid, username: userna} );
} );

app.get( "/moodtracker/stressed", ( req, res ) => {
    res.render( "stressed", {user_id: userid, username: userna} );
} );

app.get( "/moodtracker/tired", ( req, res ) => {
    res.render( "tired", {user_id: userid, username: userna});
} );

app.get( "/moodtracker/upset", ( req, res ) => {
    res.render( "upset", {user_id: userid, username: userna} );
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

// app.get("/pictureupload/viewpictures", (req, res) => {
//     db.query('SELECT picture FROM view_images WHERE userid = ?', [userid], (err, results) => {
//         if (err) {
//             console.error('Error executing query: ' + err.message);
//             return res.status(500).json({ error: 'Internal Server Error' });
//         }

//         res.render("viewpictures", { user_id: userid, username: userna, pictures: results });
//     });
// });

app.get( "/login", ( req, res ) => {
    res.render( "login" );
} );

app.use(express.static(__dirname + '/public'));

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


app.post('/deleteTask', (req, res) => {
    const { taskName } = req.body; // Assuming you have user information in the session

    if (!userid) {
        return res.status(401).json({ error: 'Unauthorized' });
    }

    // Add code to delete the task with the given name and user_id from the database
    // Example: (this depends on your database schema and query mechanism)
    const deleteTaskQuery = 'DELETE FROM tasks WHERE task_name = ? AND user_id = ?';
    db.query(deleteTaskQuery, [taskName, userid], (deleteErr, deleteResults) => {
        if (deleteErr) {
            console.error('Error deleting task: ' + deleteErr.message);
            return res.status(500).json({ error: 'Internal Server Error' });
        }

        // Check if any rows were affected, indicating success
        if (deleteResults.affectedRows > 0) {
            res.json({ message: 'Task deleted successfully' });
        } else {
            res.status(404).json({ error: 'Task not found' });
        }
    });
});

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
    const { taskName } = req.body;

    if (!taskName || taskName.trim() === '') {
        return res.status(400).json({ error: 'Task name cannot be empty' });
    }

    console.log('Received taskName:', taskName);
    const insertTaskQuery = 'INSERT INTO tasks (user_id, task_name) VALUES (?, ?)';
    db.query(insertTaskQuery, [userid, taskName], (insertErr, insertResults) => {
        if (insertErr) {
            console.error('Error saving task: ' + insertErr.message);
            return res.status(500).json({ error: 'Internal Server Error' });
        }
        console.log('Received taskName:', taskName);
        res.status(200).json({ message: 'Task saved successfully' });
    });
});

app.get('/getUserTasks', (req, res) => {

        if (!userid) {
            return res.status(401).json({ error: 'Unauthorized' });
        }
    
    
        const getUserTasksQuery = 'SELECT task_name FROM tasks WHERE user_id = ?';
        db.query(getUserTasksQuery, [userid], (err, results) => {
            if (err) {
                console.error('Error fetching user tasks:', err);
                return res.status(500).json({ error: 'Internal Server Error' });
            }
    
            const tasks = results.map(result => ({ task_name: result.task_name }));
    
            res.json({ tasks: tasks });
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

// app.post('/uploadPictures', upload.single('image'), (req, res) => {
//     try {
//         const { buffer, originalname } = req.file;

//         if (!buffer || !originalname) {
//             console.error('No file uploaded');
//             return res.status(400).json({ error: 'No file uploaded' });
//         }
//         const { textinput } = req.body;

//         const query = 'INSERT INTO view_images (userid, picture, caption) VALUES (?, ?, ?)';
//         db.query(query, [userid, buffer, textinput], (err, results) => {
//             if (err) {
//                 console.error('Error adding to picturebook: ' + err.message);
//                 return res.status(500).json({ error: 'Internal Server Error' });
//             }

//             res.redirect('/pictureupload/viewpictures'); 
//         });
//     } catch (error) {
//         console.error('Error handling picture upload:', error);
//         res.status(500).json({ error: 'Internal Server Error' });
//     }
// });






// start the server
app.listen( port, () => {
    console.log(`App server listening on ${ port }. (Go to http://localhost:${ port })` );
} );