import { neon } from "@neondatabase/serverless";

export default async function handler(req, res) {
  // Only allow GET
  if (req.method !== "GET") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  try {
    const { recipe } = req.query; // comes from URL: /api/data/1

    if (!recipe) {
      return res.status(400).json({ error: "Recipe ID is required" });
    }

    const sql = neon(process.env.DATABASE_POSTGRES_URL);

    const result = await sql(
      `SELECT * FROM comments WHERE recipe = $1`,
      [recipe]
    );

    result.sort((a, b) => a.comment_id - b.comment_id);

    res.status(200).json({ all: result });
  } catch (err) {
    console.error("API error:", err);
    res.status(500).json({ error: "Internal server error" });
  }
}
