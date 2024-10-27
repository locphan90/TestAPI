// index.js
const express = require('express');
const { poolPromise } = require('./db');
const sql = require('mssql');

const app = express();
const port = 3000;

// Middleware to parse JSON requests
app.use(express.json());

// Basic API Route to fetch data
app.get('/api/users', async (req, res) => {
  try {
    const pool = await poolPromise;
    const result = await pool.request().query('SELECT * FROM ticketing'); // Assuming you have a 'Users' table
    res.json(result.recordset);
  } catch (err) {
    res.status(500).send(err.message);
  }
});

// Start the server
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
