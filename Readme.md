# sqlconnector folder structure

    sqlconnector - backend code
    sqleditor - frontend code
    outputfiles - screenshots of outputs

## techstacks

    backend - nodejs
    frontend - react

## to run
    before run project, we should install necessary dependencies
        npm install in both sqlconnector and sql-editor folders
    to star node server - cd sqlconnector & npm run start
    to start react - cd sqleditor & npm run start
    if you open (http://localhost:3000/) you will see home page.


### to install node modules

    run following script in both sqlconnector & sqleditor folders
        npm install

## available options in home page

    dropdown - this dropdown has 2 options (googlebigquery, snowflake).based on the requirement select the         corresponding option in dropdown
    Execute button - when you click on this button, this will take the query from text box and executes in corresponding platform like snowflake || google big query
    clear - it will clear all the text from text area.

## requirements to run the project
    you need to set snowflake credentials in snowflakeConnector.js file.
        const connection = snowflake.createConnection({
            account:'',
            username: '',
            password: '',
        });
    also, set configuration details of google big query in google_big_query_credentials.json file.
    than only connection will estabilshed to snowflake & googlebigquery.
    