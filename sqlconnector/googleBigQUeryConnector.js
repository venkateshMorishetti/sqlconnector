const {BigQuery} = require('@google-cloud/bigquery');
const path = require('path');

const keyFilename = path.join('/home/venkatesh/Videos/test/astreyatest/sqlconnector/google_big_query_credentials.json');


// Creates a client using the credentials specified by the environment variable.
const bigquery = new BigQuery({keyFilename});


module.exports = {bigquery};
