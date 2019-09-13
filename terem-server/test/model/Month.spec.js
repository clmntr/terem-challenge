// ------------------------------
// Imports

const assert    = require('chai').assert;
const expect    = require('chai').expect;
const Month     = require('../../src/model/Month');

// ------------------------------
// Tests

describe( 'Month', () => {
    describe( '#constructor()', () => {
        it( "First argument should be a string", () => {
            const construct = () => new Month( null );
            expect( construct ).to.throw( 'Constructor first argument should be a string' );
        })
    })

    describe( '#addRecord()', () => {
        it( "Month should possess a addRecord method", () => {
            const month = new Month('January');
            assert.isFunction( month.addRecord );
        })
    })
})