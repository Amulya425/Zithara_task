const express = require('express');
const bodyParser = require('body-parser');
const pg = require('pg');
const cors = require('cors');

const app = express();
const port = 5000;

// Middleware
app.use(cors());
app.use(bodyParser.json());

// Database configuration
const pool = new pg.Pool({
  user: 'postgres',
  host: 'localhost',
  database: 'my_database',
  password: 'Amulya@1',
  port: 5432,
});

// Routes
// Route to fetch customers from the database with search and sort functionality
app.get('/api/customers', async (req, res) => {
  try {
    const { search, sortOption } = req.query;
    let query = 'SELECT * FROM customers';

    // Handle search query
    if (search) {
      query += ` WHERE customer_name LIKE '%${search}%' OR location LIKE '%${search}%'`;
    }

    // Handle sorting
    if (sortOption === 'date') {
      query += ' ORDER BY created_at::date'; // Added space before ORDER BY
    } else if (sortOption === 'time') {
      query += ' ORDER BY created_at::time'; // Added space before ORDER BY
    }

    const { rows } = await pool.query(query);
    res.json(rows);
  } catch (error) {
    console.error('Error executing query', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Start the server
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
