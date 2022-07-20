const mysql = require("mysql2/promise");

const con = mysql.createPool({
    host: "localhost",
    user: "root",
    database: "my_virtual_shop",
    dateStrings:'DATETIME',
    connectionLimit:10,
});

module.exports = con;