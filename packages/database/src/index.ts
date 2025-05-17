import { drizzle } from "drizzle-orm/neon-serverless";
import { Pool } from '@neondatabase/serverless';
import * as schema from "./schema";

if (!process.env.DATABASE_URL) {
  throw new Error("DATABASE_URL environment variable is required");
}

// Create a Pool instance
const pool = new Pool({ connectionString: process.env.DATABASE_URL });

// Initialize Drizzle with PostgreSQL
export const db = drizzle(pool);

// Export schema and types
export * from "./schema";

// Helper function to check database connection
export async function checkConnection() {
  try {
    const result = await pool.connect();
    const version = await result.query('SELECT version();');
    result.release();
    return { ok: true, version: version.rows[0].version };
  } catch (error) {
    return { ok: false, error };
  }
}
