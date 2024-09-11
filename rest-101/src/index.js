const express = require('express')
const app = express()
const cors = require('cors');
const morgan = require('morgan');
const router = require('./routes');

app.use(cors());
app.use(morgan('dev'));
app.use(express.json());
app.use('/', router);


app.use((error, req, res, next) => {
  console.log('Error', error);
  if (error.status) {
    return res.status(error.code).send(error.message)
  }
  res.status(500).send("Something went wrong!");
});


const port = process.env.PORT || 4000;
app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
  console.log(`localhost:${port}`)
})