//npm init
//npm i express body-parser ejs pg
import express from 'express';
import bodyParser from 'body-parser';
import ejs from 'ejs';
import pg from 'pg';

const app = express();
const port = 3000;

//to serve static css pages from public folder
app.use(express.static('public'));
app.use(bodyParser.urlencoded({ extended: true }))

let countrydb = [];       //stores our visited countries from db

//database:
const db = new pg.Client({
    user: 'postgres',
    host: 'localhost',
    database: 'world',      //my db is named 'world'
    password: 'password',   //my password
    port: 5432
});

db.connect();   //start connection to db

app.get('/', async (req, res) => {
    const result = await db.query("SELECT code FROM visited_countries")
    try {
        for (var i = 0; i < result.rows.length; i++) {
            countrydb.push(result.rows[i].code);
        }
        // console.log(result.rowCount);


        console.log("The countries queried are: "+countrydb);
        // console.log(countrydb); array:[ { id: 1, code: 'FR' }, { id: 2, code: 'GB' }, { id: 3, code: 'US' } ]
        res.render('index.ejs', {
            // converts JavaScript objects (here array) into JSON string
            // console.log(JSON.stringify(countrydb));  [{"id":1,"code":"FR"},{"id":2,"code":"GB"},{"id":3,"code":"US"}]
            countryOutput: countrydb,
            totalCountriesSelected: result.rowCount,
        });
    } catch (err) {
        console.error("Some error occurred: ", err.stack);
    }


    //close connection:
    // db.end();
});

app.post("/submit", async (req, res) => {
    // console.log(req.body);  output:{ userInputCountry: 'spain' }
    // console.log(req.body.userInputCountry);         op:spain

    //convert inputs first letter to upper case & rest body to lowercase
    // console.log(req.body.userInputCountry.charAt(0).toUpperCase());
    // console.log(req.body.userInputCountry.slice(1).toLowerCase());

    //first split input where space occurs-- ie north_korea
    let userWords = req.body.userInputCountry.split(' ');
    // console.log(userWords); [ 'South', 'Korea' ] saves words in array

    let userInput = "";

    // let userFirstChar = req.body.userInputCountry.charAt(0).toUpperCase();
    // let userRemainChar = req.body.userInputCountry.slice(1).toLowerCase();
    // let userInput = userFirstChar.concat(userRemainChar);
    // console.log(userInput);

    for (var i = 0; i < userWords.length; i++) {
        userInput = userInput + userWords[i].charAt(0).toUpperCase() + userWords[i].slice(1).toLowerCase();
        if (i < userWords.length - 1) {
            userInput = userInput + " ";
        }
    }

    console.log(userInput);

    //fetch country code corresponding to country name:
    const resultCode = await db.query("SELECT code FROM countries WHERE cname=$1", [userInput]);

    if (resultCode.rowCount > 0) {
        console.log(resultCode.rows);        //output:[ { code: 'ES' } ]
        // console.log(resultCode.rows[0].code);   //as only 1 row is returned so index [0]

        const codeToInsert = resultCode.rows[0].code;
        // console.log(codeToInsert);

        //add this code to visited_countries table:
        const result = await db.query("INSERT INTO visited_countries(code) VALUES ($1)", [codeToInsert]);
    }
    else {
        console.log("No country found!")
    }

    res.redirect('/');

    // db.end();
});

app.listen(port, () => {
    console.log(`Server running on http://localhost:${port}/`)
})
