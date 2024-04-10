// index.js

const express = require('express');
const app = express();
const port = 5000;
const { connection } = require('./snowFlakeConnector');
const {bigquery} = require('./googleBigQUeryConnector');

app.use(express.json());

app.post('/execute-query', async function(req, res) {

  if(req.body.queryOn === 'snowflake') {
    let isConnectionValid = await connection.isValidAsync();
    console.log("Is connection valid:", isConnectionValid);

    if (!isConnectionValid) {
      return res.status(400).send({'message': 'Connection is not valid'});
    }

    try {

      let result = await new Promise((resolve, reject) => {
        connection.execute({
          sqlText: req.body.query,
          streamResult: true,
          complete: function (err, stmt) {
            if (err) {
              return reject(err);
            }
            let stream = stmt.streamRows();
            let rows = [];
            stream.on('readable', function () {
              let row;
              while ((row = this.read()) !== null) {
                rows.push(row);
              }
            }).on('end', function () {
              resolve(rows);
            }).on('error', function (err) {
              reject(err);
            });
          }
        });
      });

      // Once the promise resolves, send back the result
      res.send({result});
    } catch (error) {
      console.log("Error executing query:", error);
      res.status(500).send({'error': error});
    }
  } else if(req.body.queryOn === 'googlebigquery') {
    const query = req.body.query;
    try {
      // Run the query
      const [rows] = await bigquery.query(query);
  
      // Send back the results
      res.json({ rows });
    } catch (error) {
      console.error('Error executing query:', error);
      res.status(500).json({ error: error });
    }
  }
});


app.get('/kill', (req, res) => {
  connection.destroy();
  res.send('Connection is killed');
})


// Start the server
app.listen(port, () => {
  console.log(`Server is listening at http://localhost:${port}`);
});
