const sqlite3 = require('sqlite3').verbose();
const fs = require('fs');
const path = require('path');

// Path to the products.json file
const productsPath = path.join(__dirname, 'public', 'data', 'products.json');

// Path to the SQLite database file
const dbPath = './database.db';
const dbExists = fs.existsSync(dbPath);

// Initialize the database
const db = new sqlite3.Database(dbPath);

db.serialize(() => {
  if (dbExists) {
    // Drop all existing tables (if they exist)
    db.run(`DROP TABLE IF EXISTS products;`);
    db.run(`DROP TABLE IF EXISTS cart;`);
    console.log('Existing tables dropped.');
  }

  // Create the `products` table
  db.run(`CREATE TABLE products (
    id INTEGER PRIMARY KEY,
    name TEXT,
    price REAL,
    description TEXT,
    image TEXT,
    category TEXT
  );`);

  // Create the `cart` table
  db.run(`CREATE TABLE cart (
    id INTEGER PRIMARY KEY,
    product_id INTEGER,
    quantity INTEGER,
    selected BOOLEAN
  );`);

  // Initialize the database with data from the JSON file
  const products = require(productsPath);
  const stmt = db.prepare(`INSERT INTO products (id, name, price, description, image, category) VALUES (?, ?, ?, ?, ?, ?)`);

  for (const category in products) {
    products[category].forEach(product => {
      stmt.run(product.id, product.name, product.price, product.description, product.image, category);
    });
  }

  stmt.finalize();
  console.log('Database initialized and products inserted.');
});

module.exports = db;