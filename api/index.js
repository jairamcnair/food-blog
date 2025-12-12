// project source: https://www.youtube.com/watch?v=ldYcgPKEZC8&t=305s
// this is the first file created for the project

const cheerio = require('cheerio');
const express = require("express");
const app = express(); 
//const pool = require("./db") 
const cors = require("cors");
app.use(cors());
app.use(express.json()); // this gives us access to the request.body object
require('dotenv').config();


/*
const {neon} = require("@neondatabase/serverless")
const sql = neon(`${process.env.DATABASE_URL}`);  // Retrieve your database connection string from an environment variable
*/

//const port = process.env.PORT || 3000;

const {neon} = require("@neondatabase/serverless")
const port = 3000;



const Pool = require("pg").Pool; 
    const pool = new Pool({
        /*FOR LOCAL*/ //connectionString: process.env.DATABASE_URL, // Get from .env
        /* FOR DEPLOYED*/ connectionString: process.env.DATABASE_POSTGRES_URL,
    });



    app.get('/', (req, res) => {
  res.json({ message: 'Hello from Express on Vercel!' });
});


// get the comments and replies
app.get(`/api/data/:recipe`, async (req, res) => {
    const { recipe } = req.params.recipe;
        try {
            const sql = neon(`${process.env.DATABASE_POSTGRES_URL}`);
            const result = await sql.query('SELECT * FROM comments WHERE recipe = $1', [recipe]);

            /*const client = await pool.connect();
            const result = await client.query('SELECT * FROM comments WHERE recipe = $1', [recipe]);*/
           // the results MUST be returned in order of id
           result.rows.sort((a, b) => a.comment_id - b.comment_id);
           //res.json({"all":result.rows});
           res.json("HEY")
           client.release();
        } catch (err) {console.error('Error fetching data:', err);res.status(500).json({ error: 'Internal server error' });}
});


async function getMonthName(monthNumber) {
        let monthName;
      
        switch (monthNumber) {
          case 1:
            monthName = "Jan";
            break;
          case 2:
            monthName = "Feb";
            break;
          case 3:
            monthName = "Mar";
            break;
          case 4:
            monthName = "Apr";
            break;
          case 5:
            monthName = "May";
            break;
          case 6:
            monthName = "June";
            break;
          case 7:
            monthName = "July";
            break;
          case 8:
            monthName = "Aug";
            break;
          case 9:
            monthName = "Sept";
            break;
          case 10:
            monthName = "Oct";
            break;
          case 11:
            monthName = "Nov";
            break;
          case 12:
            monthName = "Dec";
            break;
          default:
            monthName = "Invalid month number";
        }
        return monthName;
    }


// post the comment or reply to the database
app.post("/api/data/comment/", async(req, res) => {

    //recipe, name, email, rating, comment, date, reply_to
    try{

        const currentDate = new Date();
        const monthName = await getMonthName(currentDate.getMonth()+1)
        //const date = currentDate.getFullYear() + "-" + getMonthName(currentDate.getMonth()+1) + "-" + currentDate.getDate();
        const date = currentDate.getFullYear() + "-" + monthName + "-" + currentDate.getDate();
        //console.log(date)

        const{ recipe, name, email, rating, comment, reply_to } = req.body; // get's the JSON requested object

        // pass todo description to query
        const client = await pool.connect();
        const newTodo = await client.query("INSERT INTO comments (recipe, name, email, rating, comment, date, reply_to) VALUES($1, $2, $3, $4, $5, $6, $7) RETURNING *",
            [recipe, name, email, rating, comment, date, reply_to]
        );
        res.json(newTodo);
        console.log(newTodo)
    }
    catch(err){
        console.error(err.message)
    }
})












app.listen(port, () => {console.log(`Server listening at http://localhost:${port}`);});

module.exports = app;