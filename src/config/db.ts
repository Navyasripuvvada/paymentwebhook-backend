import { Pool } from "pg";
import dotenv from "dotenv";

dotenv.config();

export const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: {
    rejectUnauthorized: false,
  },
});

pool.query("SELECT 1")
  .then(() => console.log("PostgreSQL connected successfully"))
  .catch((err) => console.log(err.message));