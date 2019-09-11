// ------------------------------
// Imports

const WeatherData = require('./WeatherData');

// ------------------------------
// Exports

module.exports = class Month extends WeatherData {
    constructor ( month ) {
        if ( typeof month !== 'string' ) throw new TypeError('Constructor first argument should be a string');
        super()
        this.Month = month
    }
}