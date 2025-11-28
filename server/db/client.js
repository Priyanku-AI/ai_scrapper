import { Pool } from "pg";
// import { drizzle } from "drizzle-orm/postgres-js";
import { drizzle } from "drizzle-orm/node-postgres";

const pool = new Pool({
  host: process.env.POSTGRES_HOST,
  port: 5432,
  database: process.env.POSTGRES_DB,
  user: process.env.POSTGRES_USER,
  password: process.env.POSTGRES_PASSWORD,
});

export const db = drizzle(pool);
