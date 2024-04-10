var snowflake = require('snowflake-sdk');
const connection = snowflake.createConnection({
  account:'',
  username: '',
  password: '',
   
  });
  
  connection.connect((err, conn) => {
    if (err) {
      console.error('Unable to connect: ' + err.message);
    } else {
      console.log('Successfully connected to Snowflake.');
      module.exports.connection = conn;
    }
  });

module.exports = { connection };