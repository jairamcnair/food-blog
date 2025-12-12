

import { neon } from "@neondatabase/serverless";

export default async function handler(req, res) {
  try {
    const { recipe } = req.query;

    const sql = neon(process.env.DATABASE_POSTGRES_URL);
    const result = await sql(
      `SELECT * FROM comments WHERE recipe = $1`,
      [recipe]
    );

    result.sort((a, b) => a.comment_id - b.comment_id);

    res.status(200).json(result);
  } catch (err) {
    console.error("Error fetching data:", err);
    res.status(500).json({ error: "Internal server error" });
  }
}