const db = require('../database/db');

console.log('Running database migration...');

const createLeadsTable = `
  CREATE TABLE IF NOT EXISTS leads (
    id TEXT PRIMARY KEY,
    name TEXT NOT NULL,
    phone TEXT NOT NULL,
    email TEXT,
    address TEXT,
    project_details TEXT,
    status TEXT DEFAULT 'New',
    source TEXT DEFAULT 'Website',
    estimated_value REAL,
    preferred_contact_method TEXT DEFAULT 'Phone',
    project_timeline TEXT,
    created_date DATETIME DEFAULT CURRENT_TIMESTAMP,
    updated_date DATETIME DEFAULT CURRENT_TIMESTAMP,
    created_by TEXT DEFAULT 'system'
  )
`;

db.serialize(() => {
  db.run(createLeadsTable, (err) => {
    if (err) {
      console.error('Error creating "leads" table:', err.message);
      process.exit(1);
    }
    console.log('✅ "leads" table created or already exists.');
  });

  // You can add more table creation queries here

  db.close((err) => {
    if (err) {
      console.error(err.message);
      process.exit(1);
    }
    console.log('Database migration complete. Connection closed.');
    process.exit(0);
  });
});