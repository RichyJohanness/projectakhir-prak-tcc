const mysql = require("mysql2");

const config = {
  host: "34.30.80.38",
  user: "root",
  password: "dUXS<(rPH(&CSHE`",
  database: "perpustakaan",
};

const connect = mysql.createConnection(config);

// Koneksi DB
connect.connect((err) => {
  if (err) throw err;
  console.log("MySQL Connected");
});

module.exports = connect;
