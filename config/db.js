const mysql = require("mysql2");

const db = mysql.createPool({
  host: "localhost",
  user: "root",
  password: "",
  database: "gym_graduation_project",
});
db.getConnection(() => {
  console.log("connect to db successfully");
});
module.exports = db;
