// ------------------------------
// Imports

const util = require('../../util')

// ------------------------------
// API

exports.getWeatherData = function( req, res ) {
    model
        .then( years => {
            let object = { WeatherData : Object.values( years ) }
            res.json( object );
        })
        .catch( error => res.error( error ) )
    ;
}

exports.getWeatherDataForYear = function( req, res ) {
    // TODO
}

exports.getWeatherDataForMonth = function( req, res ) {
    // TODO
}

// Initialize data
const model = new Promise( (resolve, reject) => {
    util.readCSV('resources/data.csv')
        .then( util.reduce( util.reduceToYears, {} ) )
        .then( years => {
            resolve( years );
        })
        .catch( error => {
            reject( error );
        })
})
