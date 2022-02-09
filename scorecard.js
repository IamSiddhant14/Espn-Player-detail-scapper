const cheerio = require('cheerio');
const request = require('request');


function getVenueAndResult(url){

    request(url,function(error , responce , html ){
        if( error ){
            console.error( error);
        }else{
            VenueAndResult(html);
        }
    })

}

function VenueAndResult(html){

    let $ = cheerio.load(html);
    let venarr = $('.match-header-info.match-info-MATCH  .description');

    for( let i =0; i < venarr.length ; i++){

        let ven = $(venarr[i]).text().split(",");
        console.log(ven[2]);//Date
        console.log(ven[1]);//Venue
         
    }



    let result = $('.event .status-text > span');

    for( let i =0; i < result.length ; i++){

        let r = $(result[i]).text();
        console.log(r);
         
    }

}

module.exports ={
    getVenAndRes: getVenueAndResult
}