import { fetch } from 'epm-ui-react';
 
function access ( a ) {
    return new Promise( ( resolve, reject ) => {
        var url = 'http://fet.bonc.test:3610/oauth/token?client_id=f65ae935b1ff81309048d82dbca651a98246e59b15c71bd6a30fa981ac0dfb85&client_secret=995e51b095aa304108997fc5e8621b4b5af67a846f0429efb2cb3c01bf579806&code='+ a +'&grant_type=authorization_code&redirect_uri=http://localhost:3000/inner-source/appconfirm';
        var test;
        fetch(url,{
            method: 'POST'
        }).then( ( res ) => res.json() )
        .then( ( res ) => { 
            try{
                test = res.access_token;
                resolve( test );
            }catch( error ){
                reject( error );
            }
        });
    } )
}

function privateToken( access ){
    var url = 'http://fet.bonc.test:3610/api/v3/user?access_token=' + access;
    return new Promise( ( resolve, reject ) => {
        var user;
        fetch(url,{
            method: 'GET',
        }).then( ( res ) => res.json() )
        .then( ( res ) => { 
            try{
                user = res;
                resolve( user )
            }catch( error ){
                reject( error );
            }
        });
    })
}

export {
    access,
    privateToken
}