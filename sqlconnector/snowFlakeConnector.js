var snowflake = require('snowflake-sdk');
const connection = snowflake.createConnection({
    account: '',
    username: '',
    password: '',
    // Additional connection options...
  });
  
  connection.connect((err, conn) => {
    if (err) {
      console.error('Unable to connect: ' + err.message);
    } else {
      console.log('Successfully connected to Snowflake.');
      // Optional: Set this connection as the current connection
      module.exports.connection = conn;
    }
  });

  // Export the connection object
module.exports = { connection };
