// ------------------------------
// Imports

const assert    = require('chai').assert;
const expect    = require('chai').expect;
const Record     = require('../../src/model/Record');

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

describe( 'Record', () => {
    describe( '#constructor()', () => {
        it( "First argument should be a well formatted object", () => {
            const construct = () => new Record( {} );
            expect( construct ).to.throw( 'First argument should be an object with the right properties' );
        })

        it( "Record date should be of format YYYY-MM-DD", () => {
            assert.equal( rainRecord.date, '2019-01-01');
        })
    })
})