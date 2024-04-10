var snowflake = require('snowflake-sdk');
const connection = snowflake.createConnection({
    account: 'kebstfb-ue47928',
    username: 'venkateshmorishetti',
    password: 'Chintu@97',
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