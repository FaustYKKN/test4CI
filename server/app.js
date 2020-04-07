const Koa = require( 'koa' );
const router = require( './router' );
const logger = require( 'koa-logger' );

const authorize = require('./controllers/authorize');

const app = module.exports = new Koa();

// app.use( logger() );

app.use( async ( ctx, next ) => {
  try{
    await next()
  }catch( err ){
    console.log( err );
  }
} )

app.use( authorize );

app.use( router.routes() );

if ( !module.parent ) app.listen( 3000 );