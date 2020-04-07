import { fetch } from 'epm-ui-react';
import page from 'epm-ui-boot/page';

function share ( project_id, group_id, p_token ) {
    var url = 'http://fet.bonc.test:3610/api/v3/projects/'+project_id+'/share?private_token='+ p_token ;
    var formdata = new FormData();
        formdata.append( "id", project_id );
        formdata.append( "group_id", group_id );
        formdata.append( "group_access", 20 );
    return new Promise( ( resolve, reject ) => {
        fetch(url,{
            method: 'POST',
            body: formdata
        }).then( ( res ) => res.json() )
        .then( ( res ) => { 
            try{
                resolve( res );
            }catch( error ){
                reject( error );
            }
        });
    } )
}

function groups ( b ) {
    var url = 'http://fet.bonc.test:3610/api/v3/projects/owned?private_token='+ b ;
    return new Promise( ( resolve, reject ) => {
        var group;
        fetch(url,{
            method: 'GET',
        }).then( ( res ) => res.json() )
        .then( ( res ) => { 
            try{
                let a = new Set();
                res.map( item => a.add( item.name ) );
                findInner( ( data ) => { 
                    let b = new Set();
                    data = data.data.data;
                    data.map( item => b.add( item.title ) );
                    let arr = Array.from(
                        new Set( [...res.filter(x => !b.has(x.name)), ...data.filter(x => !a.has(x.title))] ) 
                    );
                    resolve( arr )
                } )
                // resolve( group );
            }catch( error ){
                reject( error );
            }
        });
    } )
}

function findInner ( callback ) {
    let apiHost = `${page.basename}/api`;
    var url = apiHost + `/innerSource/getAll`;
    fetch( url, {
        method: 'GET',
    } )
    .then( function( res ) {
      return res.json();
    } )
    .then( function( res ) {
      callback( res )
    } );
  }


function projectCreator ( user_id, p_token ) {
    var url = 'http://fet.bonc.test:3610/api/v3/users/'+ user_id +'?private_token='+ p_token ;
    return new Promise( ( resolve, reject ) => {
        var group;
        fetch(url,{
            method: 'GET',
        }).then( ( res ) => res.json() )
        .then( ( res ) => { 
            try{
                group = res;
                resolve( group );
            }catch( error ){
                reject( error );
            }
        });
    } )
}

export {
    share, 
    groups,
    projectCreator
}