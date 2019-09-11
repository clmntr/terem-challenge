// ------------------------------
// Imports

const program   = require('commander');
const launch    = require('./util').launch;

// ------------------------------
// Initialize CLI

program
    .version('1.0.0')
    .option( "-s, --source <string>", "The CSV source file", 'resources/data.csv' )
    .option( "-d, --dest <string>", "The destination file", 'dest/data.json' )
    .option( "--log", "Log the result in the console.", false )
;

program.parse( process.argv );

launch( program );