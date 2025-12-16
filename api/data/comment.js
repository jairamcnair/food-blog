

export const config = {
  runtime: "nodejs",
};

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



import { neon } from "@neondatabase/serverless";

export default async function handler(req, res) {
  // Only allow POST
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  try {    
    const currentDate = new Date();
    const monthName = await getMonthName(currentDate.getMonth()+1)
    const date = currentDate.getFullYear() + "-" + monthName + "-" + currentDate.getDate();
    const{ recipe, name, rating, comment, reply_to } = req.body; // get's the JSON requested object
    const email = null;

    /*if (!recipe || !username || !comment) {
      return res.status(400).json({ error: "Missing required fields" });
    }*/

    const sql = neon(process.env.DATABASE_POSTGRES_URL);

    console.log(req.body.rating)
    if(req.body.rating == null){
      rating = 0;
    }

    const result = await sql.query("INSERT INTO comments (recipe, name, email, rating, comment, date, reply_to) VALUES($1, $2, $3, $4, $5, $6, $7) RETURNING *",
            [recipe, name, email, rating, comment, date, reply_to]
        );

    res.status(201).json({ message: "Comment added successfully", comment: result[0] });
  } catch (err) {
    console.error("API error:", err);
    res.status(500).json({ error: "Internal server error" });
  }
}