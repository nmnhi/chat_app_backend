import { Pool } from "pg";

const pool = new Pool({
  user: "postgres",
  password: "110595",
  host: "localhost",
  port: 5433,
  database: "woridb"
});

export default pool;
