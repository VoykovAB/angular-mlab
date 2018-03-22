const http = require('http');
const express = require('express');
const app = express();

// show exception in console
process.on('uncaughtException', function (error) {
    console.log(error.stack);
});

app.use(express.static(__dirname + '/dist'));
app.use('*', (req, res) => {
    res.sendFile(__dirname + '/dist/index.html');
});

// start server
http.createServer(app).listen(process.env.PORT || 4200);

console.log('Starting the server...');
