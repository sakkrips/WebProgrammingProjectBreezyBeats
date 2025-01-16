const express = require('express');
const { Pool } = require('pg');
const bodyParser = require('body-parser');

const app = express();
app.use(bodyParser.json());

// PostgreSQL connection
const pool = new Pool({
  user: 'postgres',
  host: 'localhost',
  database: 'postgres',
  password: 'sakrips99',
  port: 5432,
});

// API Endpoint to Fetch Users
app.get('/api/users', async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM users');
    res.json(result.rows);
  } catch (err) {
    console.error(err);
    res.status(500).send('Server Error');
  }
});

// Start the server
const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});


const path = require('path');
const frontendPath = path.join(__dirname); // Define at the top
app.use(express.static(frontendPath)); // Serve static files



// Function to register a new user
async function registerUser(username, email, password) {
    try {
      // Check if the email already exists
      const checkEmail = await pool.query('SELECT * FROM users WHERE email = $1', [email]);
      if (checkEmail.rows.length > 0) {
        throw new Error('Email already registered!');
      }
  
      // Insert the new user into the database
      const result = await pool.query(
        'INSERT INTO users (username, email, password) VALUES ($1, $2, $3) RETURNING *',
        [username, email, password]
      );
  
      return result.rows[0]; // Return the inserted user
    } catch (err) {
      throw err; // Re-throw the error for the route handler to handle
    }
  }
  
  // POST endpoint using the function
  app.post('/api/register', async (req, res) => {
    const { username, email, password } = req.body;
  
    if (!username || !email || !password) {
      return res.status(400).send('All fields are required!');
    }
  
    try {
      const newUser = await registerUser(username, email, password); // Call the helper function
      res.status(201).json(newUser); // Respond with the created user
    } catch (err) {
      console.error('Error registering user:', err.message);
      res.status(500).send(err.message || 'Server Error'); // Return the error message
    }
  });
  
  async function testDatabaseConnection() {
    try {
      const result = await pool.query('SELECT NOW()');
      console.log('Connected to database at:', result.rows[0].now);
    } catch (err) {
      console.error('Database connection error:', err.stack);
    }
  }
  
  testDatabaseConnection(); // Call this function to test the connection
  

  