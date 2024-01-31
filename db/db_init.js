/**** Create some sample subjects and assignments ****/

const insert_user_sql = `
    INSERT INTO user 
        (user_id, first_name, last_name, username, password) 
    VALUES 
        (?, ?, ?, ?, ?);
`

db.execute(insert_user_sql, [0, 'martina', 'lipczyk', 'marlip26', '123456', 'marlip26@bergen.org']);

db.execute(insert_subject_sql, [1, 'liam', 'strauser', 'liastr26', '123', 'liastr26@bergen.org']);

db.execute(insert_subject_sql, [2, 'mia', 'subrahmanyam', 'miasub26', '456', 'miasub26@bergen.org']);

db.execute(insert_subject_sql, [3, 'yuto', 'takeda', 'yuttak26', '890', 'yuttak26@bergen.org']);


// const insert_journal_sql = `
//     INSERT INTO assignments 
//         (title, priority, subjectId, dueDate, description) 
//     VALUES 
//         (?, ?, ?, ?, ? );
// `

// //subjectId: 2 => 'Math'
// db.execute(insert_assignment_sql, ['Textbook Exercises', 10, 2, '2023-05-26', 
//         'Do odd questions in the range #155 - #207 (chapter 11). Remember to show your work!']);

// //subjectId: 3 => 'Language'
// db.execute(insert_assignment_sql, ['Long Form Essay', 8, 3, '2023-06-01', null]);

// //subjectId: 1 => 'Comp Sci'
// db.execute(insert_assignment_sql, ['Web App Project', 5, 1, '2023-06-07', null]);
