const express = require('express')
const cors = require('cors')
const app = express()
const port = 3001

const Pool = require('pg').Pool;

const pool = new Pool({
  host: 'localhost',
  port: 5432,
  database: 'weather_db',
  user: 'postgres',
  password: '',
  ssl: false
})

app.use(cors())
app.use(express.json());

// app.post('/api/postAThing', async (req, res) => {
//   console.log(`got post ${req.body}`)

//   const temperature = req.body
//   const query = `SELECT location FROM weather_db.weather WHERE temperature ${temperature >= 68 ? '>=' : '<'} 68`
//   const result = await pool.query(query)
//   res.json(result.rows)
// })


app.post('/api/temperature', async (req, res) => {
  try {
    console.log('hit')
    console.log('body', req.body)
    const item = req.body;
    await console.log(item)
    await pool.connect();
    await pool.query('INSERT INTO weather(temp) VALUES($1)', [item.temp]);

    res.status(200).json({ message: "temp saved" });
} catch (error) {
    res.status(500).json({ message: "Error saving temp", error });
}
})


app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})



