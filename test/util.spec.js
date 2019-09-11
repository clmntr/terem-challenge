// ------------------------------
// Imports

const assert        = require('chai').assert;
const expect        = require('chai').expect;
const util          = require('../src/util');

// ------------------------------
// Variables

const path          = 'resources/data.test.csv';
const emptyRecord   = {
    'Rainfall amount (millimetres)' : "",
    'Year'                          : "2018",
    'Month'                         : "01",
    'Day'                           : "01",
};
const olderRecord   = {
    'Rainfall amount (millimetres)' : "13",
    'Year'                          : "2018",
    'Month'                         : "01",
    'Day'                           : "01",
};
const rainRecord  = {
    'Rainfall amount (millimetres)' : "0",
    'Year'                          : "2019",
    'Month'                         : "02",
    'Day'                           : "02",
};
const lateRecord  = {
    'Rainfall amount (millimetres)' : "0",
    'Year'                          : "2119",
    'Month'                         : "02",
    'Day'                           : "02",
};

// ------------------------------
// Tests

describe( 'util', () => {

    describe( '#readCSV()', () => {

        it( "First argument should be a valid uri", () => {
            return util.readCSV().catch( error => {
                assert.isDefined( error );
            })
        })

        it( "First argument should be a valid csv file", () => {
            return util.readCSV( 'resources/note.txt' ).catch( error => {
                assert.isDefined( error );
            })
        })

        it( "Result should be a promise", () => {
            expect( util.readCSV( path ) ).to.be.a( 'promise' );
        })

        it( "Promise should return an array", () => {
            return util.readCSV( path ).then( result => {
                expect( result ).to.be.an('array');
            })
        })

    })

    describe( '#reduceToYears()', () => {

        it( "Adding two record with different years", () => {
            let acc = {};
            acc = util.reduceToYears(acc, rainRecord )
            acc = util.reduceToYears(acc, olderRecord )
            assert.equal( Object.keys( acc ).length, 2 );
        })

        it( "Row should contains a property Rainfall amount (millimetres)", () => {
            const result = util.reduceToYears({}, emptyRecord )
            assert.deepEqual( result, {} );
        })

        it( "Row should not be later than today", () => {
            const result = util.reduceToYears({}, lateRecord )
            assert.deepEqual( result, {} );
        })

    })

})