// ------------------------------
// Node packages

const fs        = require('fs');
const csv       = require('fast-csv');
const moment    = require('moment');
const program   = require('commander');

// ------------------------------
// Utils

const reduce    = ( fn, acc ) => array => array.reduce( fn, acc );
const map       = fn => array => array.map( fn );

// ------------------------------
// Objects

class Record {
    constructor ( record ) {
        this.rainfall               = Number( record['Rainfall amount (millimetres)'] );
        this.date                   = record['Year'] + "-" + record['Month'] + "-" + record['Day'];
        this.moment                 = moment( this.date );
        this.year                   = record['Year'];
        this.month                  = this.moment.format('MMMM');
    }
}

class WeatherData {
    constructor () {
        this.FirstRecordedDate      = null;
        this.LastRecordedDate       = null;
        this.TotalRainfall          = 0;
        this.AverageDailyRainfall   = 0;
        this.DaysWithNoRainfall     = 0;
        this.DaysWithRainfall       = 0;
    }

    addRecord ( record ) {
        // Manage dates
        if ( moment( this.FirstRecordedDate ).isAfter( record.date ) || !this.FirstRecordedDate ) {
            this.FirstRecordedDate  = record.date;
        }
        if ( moment( this.LastRecordedDate ).isBefore( record.date ) || !this.LastRecordedDate ) {
            this.LastRecordedDate   = record.date;
        }
        // Manage stats
        this.TotalRainfall          += record.rainfall;
        if ( record.rainfall ) {
            this.DaysWithRainfall   += 1;
        }
        else {
            this.DaysWithNoRainfall += 1;
        }
        this.AverageDailyRainfall   = this.TotalRainfall / ( this.DaysWithNoRainfall + this.DaysWithRainfall );
        
    }
}

class Month extends WeatherData {
    constructor ( month ) {
        super()
        this.Month = month
    }
}

class Year extends WeatherData {
    
    constructor ( year ) {
        super();
        this.Year               = year;
        this.MonthlyAggregates  = {};
    }

    addRecord ( record ) {
        if ( !this.MonthlyAggregates[ record.month ] ) {
            this.MonthlyAggregates[ record.month ] = new Month( record.month )
        }
        this.MonthlyAggregates[ record.month ].addRecord( record );
        super.addRecord( record )
    }
}

// ------------------------------
// Functions 


const readCSV = ( stream ) => {
    return new Promise( (resolve, reject ) => {
        let array = []
        stream
            .pipe( csv.parse({ headers : true }) )
            .on('data', row => array.push( row ) )
            .on('end', () => resolve( array ) )
        ;
    });
}

// Reducer that remove the rows that do not match the requirements
const cleanRows = ( acc = [], row ) => {
    if ( row['Rainfall amount (millimetres)'] && acc.push ) {
        let record = new Record( row );
        if ( moment().isAfter( moment( record.date )) ) {
            acc.push( record );
        }
    }
    return acc;
}

// Reducer that instantiate the data structure
const reduceToYears = ( acc = [], record ) => {
    let year = Number( record.year );
    if ( year !== NaN ) {
        acc[ year ] = acc[ year ] || new Year( record.year );
        acc[ year ].addRecord( record )
    }
    return acc;
}

// Function that handle the serialization
const stringify = arg => {
    let object = { WeatherData : arg }
    return JSON.stringify( object, ( key, value ) => {
        if ( typeof value === 'number' ) return String( value );
        return value;
    }, 4 )
}

// Function that handle the output
const outputResult = ( result ) => {
    fs.writeFileSync( program.dest, result );
    if ( program.log ) {
        console.log( result );
    }
}

// Read file from stream, parse and push into output
const launch = () => {
    readCSV( fs.createReadStream( program.source ) )
        .then( reduce( cleanRows, [] ) )
        .then( reduce( reduceToYears, {} ) )
        .then( stringify )
        .then( outputResult )
    ;
}

// Initialize CLI

program
    .version('1.0.0')
    .option( "-s, --source <string>", "The CSV source file", 'resources/data.csv' )
    .option( "-d, --dest <string>", "The destination file", 'dest/data.json' )
    .option( "--log", "Log the result in the console.", false )
;

program.parse( process.argv );

launch();