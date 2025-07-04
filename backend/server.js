//import required packages 
const express = require('express'); //USED to make http request
const sqlite3 = require('sqlite3'); //used for database(serverless)
const bcrypt = require('bcrypt');
const cors = require('cors'); //used to receive data from frontend
 
const app = express();
const PORT = 3000;

app.use(cors({ origin: 'http://localhost:5173' }));
app.use(express.json()); // For parsing JSON request bodies

// Connect to SQLite (creates db file if not exists)
const db = new sqlite3.Database('./smsdb.sqlite', (err) => {
  if (err) return console.error(err.message);
  console.log('Connected to the SQLite database.');
});

// Create a simple "student" table
db.run(`
  CREATE TABLE IF NOT EXISTS student (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    sname TEXT,
    dob TEXT,
    sclass TEXT,
    saddress TEXT,
    g_phone TEXT,
    username TEXT,
    password TEXT
  );
`);

// Create a simple "teacher" table
db.run(`
  CREATE TABLE IF NOT EXISTS teacher (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    sname TEXT,
    dob TEXT,
    sclass TEXT,
    saddress TEXT,
    g_phone TEXT,
    username TEXT,
    password TEXT
  );
`);

// Example API routes
// '/' is default route so we say it home address/route
app.get('/', (req, res) => { 
  res.send('Hello from the API!');
});

// API: Get get student
app.get('/api/get/student', (req, res) => {
  db.all('SELECT * FROM student', [], (err, rows) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json(rows);
  });
});

// API: Get get teacher
app.get('/api/get/teacher', (req, res) => {
  db.all('SELECT * FROM teacher', [], (err, rows) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json(rows);
  });
});

// API: Add student
app.post('/api/add/student', (req, res) => {
  const { sname, dob, sclass, saddress, g_phone, username, password } = req.body;

  bcrypt.hash(password, 10, (err, hash_password) => {
    if (err) {
      return res.status(500).json({ error: 'Failed to hash password' });
    }
    const query = `INSERT INTO student (sname, dob, sclass, saddress, g_phone, username, password) VALUES (?, ?, ?, ?, ?, ?, ?)`;
    db.run(query, [sname, dob, sclass, saddress, g_phone, username, hash_password], function(err) {
      if (err) return res.status(500).json({ error: err.message });
      var message = 'User registered successfully';
      res.json({ message, sname, dob, sclass, saddress, g_phone, username, hash_password });
    });
  });
});

// API: Add teacher
app.post('/api/add/teacher', (req, res) => {
  const { tname, dob, tclass, subject, taddress, phone, username, password } = req.body;

  bcrypt.hash(password, 10, (err, hash_password) => {
    if (err) {
      return res.status(500).json({ error: 'Failed to hash password' });
    }
    const query = `INSERT INTO teacher (tname, dob, tclass, subject, taddress, phone, username, password) VALUES (?, ?, ?, ?, ?, ?, ?, ?)`;
    db.run(query, [tname, dob, tclass, subject, taddress, phone, username, hash_password], function(err) {
      if (err) return res.status(500).json({ error: err.message });
      var message = 'Teacher registered successfully';
      res.json({ tname, dob, tclass, subject, taddress, phone, username, hash_password });
    });
  });
});



// API: Get student by ID
app.get('/api/get/student/:id', (req, res) => {
  const studentId = req.params.id;
  db.get('SELECT * FROM student WHERE id = ?', [studentId], (err, row) => {
    if (err) return res.status(500).json({ error: err.message });
    if (!row) return res.status(404).json({ error: 'Student not found' });
    res.json(row);
  });
});

// API: Get teacher by ID
app.get('/api/get/teacher/:id', (req, res) => {
  const teacherId = req.params.id;
  db.get('SELECT * FROM teacher WHERE id = ?', [teacherId], (err, row) => {
    if (err) return res.status(500).json({ error: err.message });
    if (!row) return res.status(404).json({ error: 'Teacher not found' });
    res.json(row);
  });
});

// API: Update student
app.put('/api/update/student/:id', (req, res) => {
  const studentId = req.params.id;
  const { sname, dob, sclass, saddress, g_phone, username, password } = req.body;

  bcrypt.hash(password, 10, (err, hash_password) => {
    if (err) {
      return res.status(500).json({ error: 'Failed to hash password' });
    }
    const query = `UPDATE student SET sname = ?, dob = ?, sclass = ?, saddress = ?, g_phone = ?, username = ?, password = ? WHERE id = ?`;
    db.run(query, [sname, dob, sclass, saddress, g_phone, username, hash_password, studentId], function(err) {
      if (err) return res.status(500).json({ error: err.message });
      if (this.changes === 0) return res.status(404).json({ error: 'Student not found' });
      res.json({ message: 'Student updated successfully' });
    });
  });
});

// API: Update teacher
app.put('/api/update/teacher/:id', (req, res) => {
  const teacherId = req.params.id;
  const { tname, dob, tclass, subject, taddress, phone, username, password } = req.body;
  bcrypt.hash(password, 10, (err, hash_password) => {
    if (err) {
      return res.status(500).json({ error: 'Failed to hash password' });
    }
    const query = `UPDATE teacher SET tname = ?, dob = ?, tclass = ?, subject = ?, taddress = ?, phone = ?, username = ?, password = ? WHERE id = ?`;
    db.run(query, [tname, dob, tclass, subject, taddress, phone, username, hash_password, teacherId], function(err) {
      if (err) return res.status(500).json({ error: err.message });
      if (this.changes === 0) return res.status(404).json({ error: 'Teacher not found' });
      res.json({ message: 'Teacher updated successfully' });
    });
  });
}); 

// API: Delete student
app.delete('/api/delete/student/:id', (req, res) => {
  const studentId = req.params.id;
  db.run('DELETE FROM student WHERE id = ?', [studentId], function(err) {
    if (err) return res.status(500).json({ error: err.message });
    if (this.changes === 0) return res.status(404).json({ error: 'Student not found' });
    res.json({ message: 'Student deleted successfully' });
  });
});

// API: Delete teacher
app.delete('/api/delete/teacher/:id', (req, res) => {
  const teacherId = req.params.id;
  db.run('DELETE FROM teacher WHERE id = ?', [teacherId], function(err) {
    if (err) return res.status(500).json({ error: err.message });
    if (this.changes === 0) return res.status(404).json({ error: 'Teacher not found' });
    res.json({ message: 'Teacher deleted successfully' });
  });
});



// Login route
app.post('/api/login', (req, res) => {
  const { username, password } = req.body;
  if (!username || !password) {
    return res.status(400).json({ message: 'Username and password are required.' });
  }

  db.get(`SELECT * FROM student WHERE username = ?`, [username], async (err, student) => {
    //check for errors
    if (err) {
      
      console.log(err , '_error');
      return res.status(401).json({ error: err.message });
    } 
    // console.log(student.username);
    //check is username exists
    if (!student){
      return res.status(401).json({ error: "Username do not exists" });
    }

// console.log(err , '_error');
    //check if hash password matches
    bcrypt.compare(password, student.password, (err, result) => {
      if (err) {
        console.error('Bcrypt compare error:', err);
        return res.status(500).json({ error: 'Internal error' });
      }
      console.log(username , '_' , password);

      if (!result) {
          console.log('Invalid password');

        return res.status(401).json({ error: 'Invalid password' });
      }

      // Password is correct
      // req.session.studentId = student.id;
      
      console.log(username , '_' , password);
      return res.json({ student });
    });

  });
});

//listen to the defined port
app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
