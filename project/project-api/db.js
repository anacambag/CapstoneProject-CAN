"use strict";


const { Pool } = require("pg");
const { getDatabaseUri } = require("./config");

require("colors");

const db = new Pool({ connectionString: getDatabaseUri() });
db.connect((err) => {
  if (err) {
    console.error("connection error", err.stack);
  } else {
    console.log("Successfully connected to postgres database!".blue);
  }
});

module.exports = db;