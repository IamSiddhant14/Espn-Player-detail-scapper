const fs = require('fs');

// let buffer = fs.readFileSync('./example.json');
// console.log( buffer );

// let arr = JSON.parse(buffer);//Parsing the data into json formate

//OR

let arr = require('./example.json');

const xlsx = require('xlsx');

arr.push(
    {
        name: "Thor",
        "last Name": "Odinson",
        isAvenger: true,
        friends: ["Tony", "Peter", "Bruce"],
        age: 102,
        address: {
            planet: "Asgard",
        },
    }
);

console.log(arr);

let stringData = JSON.stringify(arr);//parsing the data into normal string
console.log(stringData);

fs.writeFileSync("PasteDataHere.json", stringData);
console.log("JSON file updated")



//WRITTING A XLSX FILE USING THE JSON DATA:

//Creating a new WorkBook
let newWB = xlsx.utils.book_new();

// Json is converted to sheet formate(Rows and Coloums)
let newWS = xlsx.utils.json_to_sheet(arr);
//new workbook name , new worksheet name , new xmls name

xlsx.utils.book_append_sheet(newWB, newWS, 'Avengers');//sheet name
xlsx.writeFile(newWB, 'Siddhant.xlsx');//file name

// READING A XLSX FILE :
console.log("Writting the read data in the terminal")
let wb = xlsx.readFile('Siddhant.xlsx');//File name
let excelData = wb.Sheets['Avengers'];//Sheet name
let ans = xlsx.utils.sheet_to_json(excelData);
console.log(ans)



