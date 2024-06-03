// Mengimport package
const express = require("express");
const cors = require("cors");
const app = express();
const port = 3100;
const pegawaiRouter = require("./pegawai");

// Supaya API dapat diakses di domain yang berbeda
app.use(cors());

// Buat ngubah request body yang berupa json ke dalam object
app.use(express.json());

app.use("/pegawai", pegawaiRouter);

app.get("/", (req, res) => {
  res.send("Hello from pegawai-service! 😁");
});

// Menjalankan server di port 3001
app.listen(port, () => console.log("Server terkoneksi pada port " + port));
