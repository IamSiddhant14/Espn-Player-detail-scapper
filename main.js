//npm init
//npm install cheerio request 

const url = "https://www.espncricinfo.com/series/ipl-2020-21-1210595";

const cheerio = require('cheerio');
const request = require('request');
const getVAndR = require('./scorecard');
const fs = require('fs');
const path = require('path');

let iplPath = path.join(__dirname,"IPL");

function dirCreator(filePath){

    if(fs.existsSync(filePath) == false ){
        fs.mkdirSync(filePath);
    }
}

dirCreator(iplPath);

request(url ,cb );

function cb( err , responce , html ){//Here responce reffers to the responce code like 404 , 200  etc.
    if( err ){
        // console.log(err);
        console.error(err);
    }else{
        extractLink(html);
    }
}


function extractLink(html){

    let $ = cheerio.load(html);//Loaded all the functionality and html of cheerio in "$" and now could also be accessed by by "$" itself
    
    // a[data-hover="View All Results"] - attribute selector
    let anchorElem = $('a[data-hover="View All Results"]');//finding the veiw all result tag,attribute tag

    let link = anchorElem.attr('href');//.attr refers to attribute
    // console.log(link);//finding the link

    let fullLink = 'https://www.espncricinfo.com/'+link;
    // console.log(fullLink);


    getAllMAtchLink(fullLink);

}

function getAllMAtchLink(uri){

    request( uri , function(error , responce , html ){
        if( error ){
           console.error(error);
        }else{
           extractAllLink(html);
        }
    })
}

function extractAllLink(html){
    let $ = cheerio.load(html);
    let scoreCardArr = $('a[data-hover="Scorecard"]');

    for(let i = 0; i < scoreCardArr.length ; i++ ){
         let link = $(scoreCardArr[i]).attr('href');//Since here "scoreCardArr[i]" is variable in nature therefore surrounding it with '' is not required .
         let fullLink = 'https://www.espncricinfo.com/'+link;
        //  console.log( fullLink );

        getVAndR.getVenAndRes(fullLink);
         
    }
}



