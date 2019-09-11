// ------------------------------
// Imports

const moment = require('moment');

// ------------------------------
// Exports

module.exports = class Record {
    constructor ( record ) {
        if ( !record['Rainfall amount (millimetres)'] || !record['Year'] || !record['Month'] || !record['Day'] ) {
            throw new TypeError('First argument should be an object with the right properties');
        }
        this.rainfall               = Number( record['Rainfall amount (millimetres)'] );
        this.date                   = record['Year'] + "-" + record['Month'] + "-" + record['Day'];
        this.moment                 = moment( this.date );
        this.year                   = record['Year'];
        this.month                  = this.moment.format('MMMM');
    }
}