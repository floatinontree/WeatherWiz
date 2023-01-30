const express = require('express')
const cors = require('cors')
const app = express()
const port = 3001

app.use(cors())
app.use(express.text());

app.post('/api/postAThing', (req, res) => {
  console.log(`got post ${req.body}`)
  res.status(204).send()
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})