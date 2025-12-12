

import { neon } from "@neondatabase/serverless";

export default async function handler(req, res) {
  try {
    const { recipe } = req.query; // from URL

    const sql = neon(process.env.DATABASE_POSTGRES_URL);

    const result = await sql(
      `SELECT * FROM comments WHERE recipe = $1`,
      [recipe]
    );

    // Sort by comment_id
    result.sort((a, b) => a.comment_id - b.comment_id);

    // Return JSON
    res.status(200).json({ all: result });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Internal server error" });
  }
}