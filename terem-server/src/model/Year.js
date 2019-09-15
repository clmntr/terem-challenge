// ------------------------------
// Imports

const WeatherData = require('./WeatherData');
const Month = require('./Month');

// ------------------------------
// Exports

module.exports = class Year extends WeatherData {
    
    constructor ( year ) {
        if ( typeof year !== 'string' ) throw new TypeError('Constructor first argument should be a string');
        super();
        this.Year               = year;
        this.MonthlyAggregates  = [];
    }

    addRecord ( record ) {
        let month = this.MonthlyAggregates.find( item => item.Month === record.month );
        if ( !month ) {
            month = new Month( record.month );
            this.MonthlyAggregates.push( month );
        }
        month.addRecord( record );
        super.addRecord( record );
    }
}