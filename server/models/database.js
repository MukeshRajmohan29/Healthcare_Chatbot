const { Pool } = require('pg');

let pool;

function initializeDatabase() {
  return new Promise((resolve, reject) => {
    pool = new Pool({
      host: process.env.DB_HOST || 'localhost',
      port: process.env.DB_PORT || 5432,
      database: process.env.DB_NAME || 'caps',
      user: process.env.DB_USER || 'postgres',
      password: process.env.DB_PASSWORD,
      max: 20,
      idleTimeoutMillis: 30000,
      connectionTimeoutMillis: 2000,
    });

    // Test the connection
    pool.query('SELECT NOW()', (err, result) => {
      if (err) {
        console.error('Error connecting to PostgreSQL:', err.message);
        reject(err);
        return;
      }
      
      console.log('Connected to PostgreSQL database');
      
      // Create chat_logs table
      const createTableSQL = `
        CREATE TABLE IF NOT EXISTS chat_logs (
          id SERIAL PRIMARY KEY,
          session_id VARCHAR(255) NOT NULL,
          healthcare_context VARCHAR(100) NOT NULL,
          privacy_style VARCHAR(50) NOT NULL,
          user_first_name VARCHAR(100),
          user_last_name VARCHAR(100),
          user_age INTEGER,
          user_input TEXT NOT NULL,
          bot_reply TEXT NOT NULL,
          timestamp TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
          created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
        )
      `;
      
      pool.query(createTableSQL, (err, result) => {
        if (err) {
          console.error('Error creating table:', err.message);
          reject(err);
          return;
        }
        
        console.log('Chat logs table created or already exists');
        resolve();
      });
    });
  });
}

function getDatabase() {
  if (!pool) {
    throw new Error('Database not initialized. Call initializeDatabase() first.');
  }
  return pool;
}

function closeDatabase() {
  return new Promise((resolve, reject) => {
    if (pool) {
      pool.end((err) => {
        if (err) {
          console.error('Error closing database connection:', err.message);
          reject(err);
          return;
        }
        console.log('Database connection closed');
        resolve();
      });
    } else {
      resolve();
    }
  });
}

// Graceful shutdown
process.on('SIGINT', async () => {
  console.log('\nReceived SIGINT. Closing database connection...');
  await closeDatabase();
  process.exit(0);
});

process.on('SIGTERM', async () => {
  console.log('\nReceived SIGTERM. Closing database connection...');
  await closeDatabase();
  process.exit(0);
});

module.exports = {
  initializeDatabase,
  getDatabase,
  closeDatabase
}; 