const fs = require('fs');

// let buffer = fs.readFileSync('./example.json');
// console.log( buffer );

// let arr = JSON.parse(buffer);//Parsing the data into json formate

//OR

let arr = require('./example.json');

arr.push(
    {
        "object3 In JSON ": 3,
        "comment5": "Adding a new object in json using an array's 'push'operation as we know that we can push multiple object in an array conayining objects "
    }
);

console.log(arr);

let stringData = JSON.stringify(arr);//parsing the data into normal string
console.log(stringData);

fs.writeFileSync("PasteDataHere.json", stringData);
console.log("JSON file updated")

