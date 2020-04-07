import { fetch } from 'epm-ui-react';
import page from 'epm-ui-boot/page';
import {apiHost} from "../configs/config";

function createProduction ( title, description ) {
    var url = apiHost + '/production' ;
    var data = {
        title: title,
        description: description,
    }
        fetch(url,{
            method: 'POST',
            headers: {
                'content-type': 'application/json'
              },
            body: JSON.stringify( data )
        }).then( ( res ) => res.json() )
        .then( ( d ) => { 
            try{
                alert( '成功' );
                // window.open( window.location.origin + page.basename + '/open-source/openconfirm', '_self' );
            }catch( error ){
                console.error( error );
            }
        });

}

function upLoadProduction( file ){
    var url = apiHost + '/file';
    var data = {
        name: file.originalname,
        mime: file.mimetype,
        filePath: file.path,
        size: file.size,
    }
    fetch( url, {
        method: 'POST',
        headers: {
            'content-type': 'application/json'
        },
        body: JSON.stringify( data )
    } ).then( ( res ) => { res.json() } )
    .then( ( d ) => {
        try{
        }catch( error ){
            console.error( error )
        }
    } );

}

export {
    createProduction,
    upLoadProduction
}