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

    let innings = $('.card.content-block.match-scorecard-table>.Collapsible')//Brings the stats table of the selected team

    let htmlString = '';

    for( let i =0; i<innings.length ; i++ ){

        htmlString += $(innings[i]).html();

        let teamName = $(innings[i]).find("h5").text();
        teamName = teamName.split('INNINGS')[0].trim();

        // console.log(teamName);

        let opponentindex = i == 0 ? 1 : 0;

        let opponentName = $(innings[opponentindex]).find('h5').text();
        opponentName = opponentName.split('INNINGS')[0].trim();

        console.log(teamName , opponentName);


    }

    console.log(htmlString)
} 

module.exports ={
    getVenAndRes: getVenueAndResult
}

