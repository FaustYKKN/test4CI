const https = require( 'https' );

module.exports = function request ( options = {} ) {

  return new Promise( ( resolve, reject ) => {
    const req = https.request( options, res => {
      let body = '';

      res.setEncoding( 'utf-8' );
      res.on( 'data', chunk => {
        body += chunk;
      } );

      res.on( 'end', () => {
        if (  300 > res.statusCode && res.statusCode >= 200 ) {
          resolve( {
            body: body.toString(),
            ...res
          } );
        }
        else if ( res.statusCode == 409 ){
          resolve( {
            body: JSON.stringify( {
              conflict: true
            } )
          } );
        }else {
          reject(
            new Error(
              `StatusCode: ${ res.statusCode }
Response Headers: ${ JSON.stringify( res.headers, null, 2 ) }
              `.trim()
            )
          );
        }
      } );
    } );

    if ( options.body ) {
      req.write( options.body );
    }

    req.on( 'error', e => {
      console.error( `请求遇到问题：${ e.message }` );
    } );

    req.end();
  } );
};
