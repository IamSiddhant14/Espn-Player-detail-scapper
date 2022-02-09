//npm init
//npm install cheerio request 

const url = "https://www.espncricinfo.com/series/ipl-2020-21-1210595";

const cheerio = require('cheerio');
const request = require('request');

request(url ,cb );

function cb( err , responce , html ){//Here responce reffers to the responce code like 404 , 200  etc.
    if( err ){
        // console.log(err);
        console.error(err);
    }else{
        extractLink(html);
    }
}

// a[data-hover="View All Results"] - attribute selector

function extractLink(html){

    let $ = cheerio.load(html);//Loaded all the functionality of cheerio in "$" and now could also be accessed by by "$" itself
    let anchorElem = $('a[data-hover="View All Results"]');//finding the veiw all result tag

    let link = anchorElem.attr('href');//.attr refers to attribute
    console.log(link);//finding the link

    let fullLink = 'https://www.espncricinfo.com/'+link;
    console.log(fullLink);


}