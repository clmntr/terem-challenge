// ------------------------------
// Imports

const assert    = require('chai').assert;
const expect    = require('chai').expect;
const Year      = require('../../src/model/Year');
const Record    = require('../../src/model/Record');
const Month     = require('../../src/model/Month');

// ------------------------------
// Variables

const rainRecord    = new Record({
    'Rainfall amount (millimetres)' : "13",
    'Year'                          : "2019",
    'Month'                         : "01",
    'Day'                           : "01",
});

// ------------------------------
// Tests

describe( 'Year', () => {
    describe( '#constructor()', () => {
        it( "First argument should be a string", () => {
            const construct = () => new Year( null );
            expect( construct ).to.throw( 'Constructor first argument should be a string' );
        })
    })

    describe( '#addRecord()', () => {
        it( "Year should possess a addRecord method", () => {
            const year = new Year('2019');
            assert.isFunction( year.addRecord );
        })

        it( "Adding a record should add a Month to MonthlyAggregates", () => {
            const year = new Year('2019');
            year.addRecord( rainRecord );
            assert.notEqual( year.MonthlyAggregates.length, 0 );
            expect(year.MonthlyAggregates[0]).to.be.instanceof(Month);
        })
    })
})