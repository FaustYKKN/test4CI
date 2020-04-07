export default function parseQuerystring ( key ) {
  const str = window.location.search.substring( 1 );
  const arr = str.split( '&' );
  const obj = {};

  for ( let i = 0; i < arr.length; i++ ) {
    const tmp_arr = arr[ i ].split( '=' );
    obj[ decodeURIComponent( tmp_arr[ 0 ] ) ] = decodeURIComponent( tmp_arr[ 1 ] );
  }

  if( key ) {
    return obj[ key ];
  }else {
    return obj;
  }
}
