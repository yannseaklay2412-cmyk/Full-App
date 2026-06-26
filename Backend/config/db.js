import pg from 'pg';
import dotenv from 'dotenv';
dotenv.config();

const { Pool } = pg;

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: { rejectUnauthorized: false } 
});

pool.on('error', (err) => {
  console.error('Database connection lost, will reconnect automatically:', err.message)
})

pool.connect()
  .then(() => console.log('Database connected successfully!'))
  .catch((err) => console.error('Database connection failed:', err));

export default pool;  