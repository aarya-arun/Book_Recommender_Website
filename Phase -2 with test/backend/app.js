const express = require('express');
const bodyParser = require('body-parser');


constapp = express();
const port = process.env.port || 3300

app.listen(port, () => {
    console.log("Hi This port is running");
});


app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
var router = require('./routes')();
 
app.use('/api', router);