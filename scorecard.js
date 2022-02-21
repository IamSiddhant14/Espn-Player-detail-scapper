// .find -- Find the particular element sectors
// .hasClass -- return true or false accordingly

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

    // for( let i =0; i < venarr.length ; i++){

        // let ven = $(venarr[i]).text().split(",");
        let ven = $(venarr).text().split(",");
        console.log(ven[2]);//Date
        console.log(ven[1]);//Venue
         
    // }



    let result = $('.event .status-text > span');

    // for( let i =0; i < result.length ; i++){//It will work without this as well as there is only a single element

        // let r = $(result[i]).text();
        let r = $(result).text();
        console.log(r);
        
    // }

    let innings = $('.card.content-block.match-scorecard-table>.Collapsible')//Brings the stats table of the selected team

    let htmlString = '';
    // for( let i =0; i<2 ; i++ ){ //This will also work
    for( let i =0; i<innings.length ; i++ ){

        htmlString += $(innings[i]).html();
        // console.log( htmlString);

        let teamName = $(innings[i]).find("h5").text();
        teamName = teamName.split('INNINGS')[0].trim();

        // console.log(teamName);

        let opponentindex = i == 0 ? 1 : 0;

        let opponentName = $(innings[opponentindex]).find('h5').text();
        opponentName = opponentName.split('INNINGS')[0].trim();

        // console.log(teamName , opponentName);

        let cInning = $(innings[i]);
 
        let allRows = cInning.find('.table.batsman tbody tr');

        for( let j=0; j<allRows.length ; j++ ){

            let allCols = $(allRows[j]).find('td');
            let isWorthy = $(allCols[0]).hasClass('batsman-cell');//Return true 0r false
 
            if( isWorthy == true ){

                let playerName = $(allCols[0]).text().trim();
                let runs = $(allCols[2]).text().trim();
                let balls = $(allCols[3]).text().trim();
                let fours = $(allCols[5]).text().trim();
                let sixes = $(allCols[6]).text().trim();
                let STR = $(allCols[7]).text().trim();
                console.log(`${playerName} | ${runs} | ${balls} | ${fours} | ${sixes} | ${STR}`);
            }

        }

        console.log(`**************************** *****************************************`)


    }

    // console.log(htmlString)
} 

module.exports ={
    getVenAndRes: getVenueAndResult
}

