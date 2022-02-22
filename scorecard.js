// .find -- Find the particular element sectors
// .hasClass -- return true or false accordingly

const cheerio = require('cheerio');
const request = require('request');
const path = require('path');
const fs = require('fs');
const { contents } = require('cheerio/lib/api/traversing');

const xlsx = require('xlsx');

function getVenueAndResult(url) {

    request(url, function (error, responce, html) {
        if (error) {
            console.error(error);
        } else {
            VenueAndResult(html);
        }
    })

}

function VenueAndResult(html) {

    let $ = cheerio.load(html);
    let venarr = $('.match-header-info.match-info-MATCH  .description');

    // for( let i =0; i < venarr.length ; i++){

    // let ven = $(venarr[i]).text().split(",");
    let ven = $(venarr).text().split(",");
    let date = ven[2];
    let venue = ven[1];
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
    for (let i = 0; i < innings.length; i++) {

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

        for (let j = 0; j < allRows.length; j++) {

            let allCols = $(allRows[j]).find('td');
            let isWorthy = $(allCols[0]).hasClass('batsman-cell');//Return true 0r false

            if (isWorthy == true) {

                let playerName = $(allCols[0]).text().trim();
                let runs = $(allCols[2]).text().trim();
                let balls = $(allCols[3]).text().trim();
                let fours = $(allCols[5]).text().trim();
                let sixes = $(allCols[6]).text().trim();
                let STR = $(allCols[7]).text().trim();
                // console.log(`${playerName} | ${runs} | ${balls} | ${fours} | ${sixes} | ${STR}`);

                processPlayer(teamName, opponentName, playerName, runs, balls, fours, sixes, STR, venue, date, result);
            }

        }

        console.log(`**************************** *****************************************`)


    }

    // console.log(htmlString)
}

function processPlayer(teamName, opponentName, playerName, runs, balls, fours, sixes, STR, venue, date, result) {
    let teamPath = path.join(__dirname, "IPL", teamName);
    dirCreator(teamPath);

    let filePath = path.join(teamPath, playerName + ".xlsx");
    let content = excelReader(filePath, playerName);

    let playerobj = {
        playerName,
        teamName,
        opponentName,
        runs,
        balls,
        fours,
        sixes,
        STR,
        venue,
        date,
        result,
    }; 

    content.push(playerobj);
    excelWriter(filePath, playerName, content)


}

function dirCreator(filePath) {

    if (fs.existsSync(filePath) == false) {
        fs.mkdirSync(filePath);
    }

}

function excelWriter(fileName, sheetName, jsonData) {

    let newWB = xlsx.utils.book_new();

    // Json is converted to sheet formate(Rows and Coloums)
    let newWS = xlsx.utils.json_to_sheet(jsonData);
    //new workbook name , new worksheet name , new xmls name

    xlsx.utils.book_append_sheet(newWB, newWS, sheetName);//sheet name
    xlsx.writeFile(newWB, fileName);//file name
}

function excelReader(fileName, sheetName) {

    if (fs.existsSync(fileName) == false) {
        return [];
    }

    let wb = xlsx.readFile(fileName);//File name
    let excelData = wb.Sheets[sheetName];//Sheet name
    let ans = xlsx.utils.sheet_to_json(excelData);
    return ans;

}

module.exports = {
    getVenAndRes: getVenueAndResult
}

