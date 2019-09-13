// ------------------------------
// Imports

const express   = require('express');

// ------------------------------
// Server

const app       = express();
const port      = 3001;
const routes    = [
    './api/weatherData/weatherData.routes.js',
]

// Load routes
routes.forEach( source => {
    var route = require( source );
    route( app );
})

// Connect app to main port
app.listen(port);

console.log('Terem server running on port ' + port);