const express = require('express');
const cors = require('cors');
const app = express();
const port = 3001;

const Pool = require('pg').Pool;

const pool = new Pool({
  host: 'localhost',
  port: 5432,
  database: 'weather_db',
  user: 'postgres',
  password: '',
  ssl: false,
});

app.use(cors());
app.use(express.json());

app.get('/api/ageGroup/:ageGroup', async (req, res) => {
  try {
    const result = await pool.query(`SELECT ${req.params.ageGroup} FROM weather`);
    res.send(result.rows[0]);
  } catch (error) {
    res.status(500).json({ message: 'Error retrieving values', error });
  }
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
