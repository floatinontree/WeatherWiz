const { Client } = require('pg');

const client = new Client({
  host: 'localhost',
  port: 5432,
  user: '',
  password: '',
});

const dbName = 'weather_db';
const tableName = 'weather';


const dBclient = new Client({
  host: 'localhost',
  port: 5432,
  user: '',
  password: '',
  database: 'weather_db'
});



const deleteDatabase = async (dbName) => {
  try {
    await client.query(`DROP DATABASE IF EXISTS ${dbName}`);
    console.log(`Database ${dbName} deleted`);
  } catch (error) {
    console.error(`Error deleting database ${dbName}`, error);
  }
};


const createDatabase = async (dbName) => {
  try {
    await client.query(`CREATE DATABASE ${dbName}`);
    console.log(`Database ${dbName} created`);
    client.database = dbName;
  } catch (error) {
    console.error(`Error creating database ${dbName}`, error);
  }
};

const deleteTable = async (tableName) => {
  try {
    await dBclient.query(`DROP TABLE IF EXISTS ${tableName}`);
    console.log(`Table ${tableName} deleted`);
  } catch (error) {
    console.error(`Error deleting table ${tableName}`, error);
  }
};

const createTable = async (tableName) => {
  try {
    const query = `
      CREATE TABLE ${tableName} (
        id SERIAL PRIMARY KEY,
        ageGroupOne TEXT NOT NULL DEFAULT 'Res-A',
        ageGroupTwo TEXT NOT NULL DEFAULT 'Res-B',
        ageGroupThree TEXT NOT NULL DEFAULT 'Res-C',
        ageGroupFour TEXT NOT NULL DEFAULT 'Res-D'
      );
    `;
    await dBclient.query(query);
    console.log(`Table ${tableName} created`);
  } catch (error) {
    console.error(`Error creating table ${tableName}`, error);
  }
};

const insertData = async (tableName) => {
  try {
    const query = `
      INSERT INTO ${tableName} (id) 
      VALUES (DEFAULT)
    `;
    await dBclient.query(query);
    console.log(`Data inserted into ${tableName}`);
  } catch (error) {
    console.error(`Error inserting data into ${tableName}`, error);
  }
};


const reconnect = async() =>{
  
  await client.end()

  await dBclient.connect()
}


client.connect()
  .then(() => deleteDatabase(dbName))
  .then(() => createDatabase(dbName))
  .then(()=> reconnect())
  .then(() => deleteTable(tableName))
  .then(() => createTable(tableName))
  .then(() => insertData(tableName))
  .then(() => dBclient.end())
  .catch(error => {
    console.error(error);
    client.end();
    dBclient.end()
  });
