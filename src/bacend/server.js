const express = require('express');
const mysql = require('mysql2');
const cors = require('cors');
const bodyParser = require('body-parser');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const app = express();
const PORT = 3000;
const SECRET = 'your_jwt_secret';

app.use(cors());
app.use(bodyParser.json());

const db = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'Adeel@786',
  database: 'pneumonia_db',
});

db.connect(err => {
  if (err) throw err;
  console.log('✅ MySQL connected');
});

// ======= REGISTER =======
app.post('/signup', async (req, res) => {
  const { email, password, confirmPassword } = req.body;

  if (!email || !password || !confirmPassword)
    return res.status(400).json({ message: 'All fields are required' });

  if (password !== confirmPassword)
    return res.status(400).json({ message: 'Passwords do not match' });

  const hashedPassword = await bcrypt.hash(password, 10);

  db.query('SELECT * FROM users WHERE email = ?', [email], (err, results) => {
    if (results.length > 0)
      return res.status(400).json({ message: 'Email already registered' });

    db.query('INSERT INTO users (email, password) VALUES (?, ?)', [email, hashedPassword], (err) => {
      if (err) return res.status(500).json({ message: 'Error registering user' });
      res.json({ message: 'User registered successfully' });
    });
  });
});

// ======= LOGIN =======
app.post('/login', (req, res) => {
  const { email, password } = req.body;

  db.query('SELECT * FROM users WHERE email = ?', [email], async (err, results) => {
    if (err || results.length === 0)
      return res.status(401).json({ message: 'Invalid email or password' });

    const user = results[0];
    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch)
      return res.status(401).json({ message: 'Invalid email or password' });

    const token = jwt.sign({ id: user.id }, SECRET, { expiresIn: '1d' });
    res.json({ message: 'Login successful', token });
  });
});

app.listen(PORT, () => {
  console.log(`🚀 Server running on http://192.168.1.105:${PORT}`);
});
