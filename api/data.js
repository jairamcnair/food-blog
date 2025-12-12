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

const port = process.env.PORT || 3000;

const {neon} = require("@neondatabase/serverless")
//const port = 3000;



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
