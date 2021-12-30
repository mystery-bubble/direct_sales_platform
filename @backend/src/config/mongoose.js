const config = require( "./index" );
const mongoose = require( "mongoose" );

module.exports = app => {
    mongoose.connect( config.mongoUrl, { useNewUrlParser: true, useUnifiedTopology: true } );
    mongoose.Promise = global.Promise;

    process.on( "SIGINT", cleanup );
    process.on( "SIGTERM", cleanup );
    process.on( "SIGHUP", cleanup );

    if ( app ) {
        app.set( "mongoose", mongoose );
    }
};

let cleanup = () => {
    mongoose.connection.close( function() {
        process.exit( 0 );
    } );
}