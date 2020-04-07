const fs = require( 'fs' );
const path = require( 'path' );
const env       = process.env.NODE_ENV || "development";
const config = require( '../../config/database' )[env];

console.log( 'current config: ', config, env );
const Sequelize = require('sequelize');
const sequelize = new Sequelize( config.database, config.username, config.password, config );
const db = {};

fs.readdirSync( __dirname )
  .filter( file => ( file.indexOf( "." ) !== 0 ) && ( file !== "index.js" ) )
  .forEach( file => {
    const model = sequelize.import( path.join( __dirname, file ) );
    db[ model.name ] = model;
  } );

Object.keys(db).forEach(modelName => {
  if ("associate" in db[modelName]) {
    db[modelName].associate(db);
  }
});

sequelize
  .authenticate()
  .then(() => {
    console.log('Connection has been established successfully.');
  })
  .catch(err => {
    console.error('Unable to connect to the database:', err);
  });



db.sequelize = sequelize;
db.Sequelize = Sequelize;

module.exports = db;
