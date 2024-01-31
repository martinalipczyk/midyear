const db = require("./db_connection");

/**** Delete *CONTENTS OF* existing tables (but not dropping tables themselves) ****/

const delete_assignments_table_sql = "DELETE FROM assignments;"

db.execute(delete_assignments_table_sql);

const delete_subjects_table_sql = "DELETE FROM subjects;"

db.execute(delete_subjects_table_sql);