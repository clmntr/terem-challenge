// ------------------------------
// Imports

const moment = require('moment');
const Record = require('./Record');

// ------------------------------
// Exports

module.exports = class WeatherData {
    constructor () {
        this.FirstRecordedDate      = null;
        this.LastRecordedDate       = null;
        this.TotalRainfall          = 0;
        this.AverageDailyRainfall   = 0;
        this.DaysWithNoRainfall     = 0;
        this.DaysWithRainfall       = 0;
    }

    addRecord ( record ) {
        if ( !(record instanceof Record) ) throw new TypeError( 'First agrument should be an instance of Record' );
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
