// ------------------------------
// Imports

const fs        = require('fs');
const csv       = require('fast-csv');
const moment    = require('moment');
const Record    = require('./model/Record');
const Year      = require('./model/Year');

// ------------------------------
// Functions 

// Util function that apply a reducer function to an array 
const reduce    = ( fn, acc ) => array => array.reduce( fn, acc );

// Function that parse a csv coming from a stream
const readCSV = ( source ) => {
    return new Promise( (resolve, reject ) => {
        try{
            let array = []
            fs.createReadStream( source )
                .pipe( csv.parse({ headers : true }) )
                .on('error', error => reject( error ) )
                .on('data', row => array.push( row ) )
                .on('end', () => resolve( array ) )
            ;
        }
        catch( error ) {
            reject( error )
        }
    });
}

// Reducer that instantiate the data structure
const reduceToYears = ( acc = {}, row ) => {
    if ( typeof acc === 'object' && row['Rainfall amount (millimetres)'] ) {
        let record = new Record( row );
        if ( moment().isAfter( moment( record.date )) ) {
            let year = Number( record.year );
            if ( year !== NaN ) {
                acc[ year ] = acc[ year ] || new Year( record.year );
                acc[ year ].addRecord( record )
            }
        }
    }
    return acc;
}

// Function that handle the serialization
const stringify = datas => {
    let object = { WeatherData : Object.values(datas) }
    return JSON.stringify( object, ( key, value ) => {
        if ( typeof value === 'number' ) return String( value );
        return value;
    }, 4 )
}

// Function that handle the output
const outputResult = config => result => {
    if ( config.dest ) {
        fs.writeFileSync( config.dest, result );
    }
    if ( config.log ) {
        console.log( result );
    }
}

// Read file from stream, parse and push into output
const launch = ( config ) => {
    if ( typeof config.source === 'string' ) {
        readCSV( config.source )
            .then( reduce( reduceToYears, {} ) )
            .then( stringify )
            .then( outputResult( config ) )
            .catch( error => console.log( error ) )
        ;
    }
}

// ------------------------------
// Exports

module.exports = {
    readCSV         : readCSV,
    reduceToYears   : reduceToYears,
    stringify       : stringify,
    outputResult    : outputResult,
    launch          : launch
}
