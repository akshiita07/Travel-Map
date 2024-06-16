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

db.query("SELECT code FROM visited_countries",function(err,res){
    if(err){
        console.error("Some error occurred: ",err.stack);
    }else{
        // console.log(res.rows);      //returns all rows in visited_countries table

        //countrydb = res.rows;     if this method then we have to JSON stringify n parse
        for(var i=0;i<res.rows.length;i++){
            countrydb.push(res.rows[i].code);
        }

        console.log(countrydb);
    }
    //close connection:
    db.end();
});


app.get('/', (req, res) => {
    // console.log(countrydb); array:[ { id: 1, code: 'FR' }, { id: 2, code: 'GB' }, { id: 3, code: 'US' } ]
    res.render('index.ejs', {
        // converts JavaScript objects (here array) into JSON string
        // console.log(JSON.stringify(countrydb));  [{"id":1,"code":"FR"},{"id":2,"code":"GB"},{"id":3,"code":"US"}]
        countryOutput: countrydb,
        totalCountriesSelected: countrydb.length,
    });

});

app.listen(port, () => {
    console.log(`Server running on http://localhost:${port}/`)
})