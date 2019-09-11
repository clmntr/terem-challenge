// ------------------------------
// Imports

const assert        = require('chai').assert;
const expect        = require('chai').expect;
const WeatherData   = require('../../src/model/WeatherData');
const Record        = require('../../src/model/Record');

// ------------------------------
// Variables

const rainRecord    = new Record({
    'Rainfall amount (millimetres)' : "13",
    'Year'                          : "2019",
    'Month'                         : "01",
    'Day'                           : "01",
});
const noRainRecord  = new Record({
    'Rainfall amount (millimetres)' : "0",
    'Year'                          : "2019",
    'Month'                         : "02",
    'Day'                           : "02",
});

// ------------------------------
// Tests

describe( 'WeatherData', () => {
    describe( '#addRecord()', () => {
        
        it( "First argument should be an instance of Record", () => {
            const weatherData = new WeatherData();
            const fn = () => weatherData.addRecord( {} );
            expect( fn ).to.throw( 'First agrument should be an instance of Record' );
        })

        // Rainfall

        it( "Adding a record without rainfall should increase DaysWithNoRainfall", () => {
            const weatherData = new WeatherData();
            assert.equal( weatherData.DaysWithNoRainfall, 0 );
            weatherData.addRecord( noRainRecord );
            assert.equal( weatherData.DaysWithNoRainfall, 1 );
        })

        it( "Adding a record with rainfall should increase DaysWithRainfall", () => {
            const weatherData = new WeatherData();
            assert.equal( weatherData.DaysWithRainfall, 0 );
            weatherData.addRecord( rainRecord );
            assert.equal( weatherData.DaysWithRainfall, 1 );
        })

        it( "Adding a record should update the TotalRainfall", () => {
            const weatherData = new WeatherData();
            weatherData.addRecord( rainRecord );
            assert.equal( weatherData.TotalRainfall, 13 );
            weatherData.addRecord( noRainRecord );
            assert.equal( weatherData.TotalRainfall, 13 );
        })

        it( "Adding a record should update the AverageDailyRainfall", () => {
            const weatherData = new WeatherData();
            weatherData.addRecord( rainRecord );
            assert.equal( weatherData.AverageDailyRainfall, 13 );
            weatherData.addRecord( noRainRecord );
            assert.equal( weatherData.AverageDailyRainfall, 6.5 );
        })

        // Date

        it( "Adding a record with a date below the current FirstRecordedDate should update it", () => {
            const weatherData = new WeatherData();
            weatherData.addRecord( noRainRecord );
            assert.equal( weatherData.FirstRecordedDate, "2019-02-02" );
            weatherData.addRecord( rainRecord );
            assert.equal( weatherData.FirstRecordedDate, "2019-01-01" );
        })

        it( "Adding a record with a date below the current LastRecordedDate should update it", () => {
            const weatherData = new WeatherData();
            weatherData.addRecord( rainRecord );
            assert.equal( weatherData.LastRecordedDate, "2019-01-01" );
            weatherData.addRecord( noRainRecord );
            assert.equal( weatherData.LastRecordedDate, "2019-02-02" );
        })

    })
})