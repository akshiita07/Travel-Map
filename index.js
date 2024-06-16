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

let countrydb = {};       //stores our visited countries from db

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

        // console.log(countrydb);
    } catch (err) {
        console.error("Some error occurred: ", err.stack);
    }
    //close connection:
    // console.log(countrydb); array:[ { id: 1, code: 'FR' }, { id: 2, code: 'GB' }, { id: 3, code: 'US' } ]
    res.render('index.ejs', {
        // converts JavaScript objects (here array) into JSON string
        // console.log(JSON.stringify(countrydb));  [{"id":1,"code":"FR"},{"id":2,"code":"GB"},{"id":3,"code":"US"}]
        countryOutput: JSON.stringify(countrydb),
        totalCountriesSelected: countrydb.length,
    });

    db.end();
});

app.post("/submit",function asyn(req,res){
    // console.log(req.body);  output:{ userInputCountry: 'spain' }
    console.log(req.body.userInputCountry); 
    // const result=db.query("INSERT INTO countries(code,cname) VALUES ()")

});

app.listen(port, () => {
    console.log(`Server running on http://localhost:${port}/`)
})