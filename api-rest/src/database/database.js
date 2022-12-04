import sqlite3 from 'sqlite3';

const db = new sqlite3.Database('./database.db', (err) => {  
    if (err) {
        console.error(err.message);
    }
    console.log('Connected to the database.');
});

// Create tables if not exist
db.serialize(() => {
    db.run(`CREATE TABLE IF NOT EXISTS admin (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        username TEXT NOT NULL UNIQUE,
        password TEXT NOT NULL
    )`);

    db.run(`CREATE TABLE IF NOT EXISTS company (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        company_name TEXT NOT NULL,
        company_api_key TEXT NOT NULL
    )`);

    db.run(`CREATE TABLE IF NOT EXISTS location (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        company_id INTEGER NOT NULL,
        location_name TEXT NOT NULL,
        location_country TEXT NOT NULL,
        location_city TEXT NOT NULL,
        location_meta TEXT,
        FOREIGN KEY (company_id) REFERENCES company (id)
    )`);

    db.run(`CREATE TABLE IF NOT EXISTS sensor (
        sensor_id INTEGER PRIMARY KEY AUTOINCREMENT NOT NULL, 
        location_id INTEGER, 
        sensor_name TEXT, 
        sensor_category TEXT, 
        sensor_meta TEXT, 
        sensor_api_key TEXT, 
        FOREIGN KEY(location_id) REFERENCES location(location_id)
    )`);

    db.run(`CREATE TABLE IF NOT EXISTS sensor_data (
        id INTEGER PRIMARY KEY AUTOINCREMENT NOT NULL, 
        sensor_name TEXT,
        temp_max INTEGER, 
        temp_min INTEGER, 
        humidity_percentage INTEGER
    )`);

});

export default db;
