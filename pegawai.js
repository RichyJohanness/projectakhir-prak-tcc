// Mengimport package
const express = require("express");
const router = express.Router();
const connection = require("./config");

// [GET] Mengambil daftar pegawai
router.get("/", async (req, res) => {
  try {
    // Execute query ke database
    const command = "SELECT * FROM pegawai";
    const data = await connection.promise().query(command);

    // Mengirimkan respons jika berhasil
    res.status(200).json({
      status: "Success",
      message: "Berhasil mengambil daftar pegawai",
      data: data[0],
    });
  } catch (error) {
    // mengirimkan respons jika gagal
    res.status(error.statusCode || 500).json({
      status: "Error",
      message: error.message,
    });
  }
});

// [POST] Memasukkan pegawai baru ke daftar pegawai
router.post("/", async (req, res) => {
  try {
    // mengambil nama dan nip dari request body
    const { nama, nip } = req.body;

    // kalau nama/nip kosong atau gaada kolom nama/nip di request body
    if (!nama || !nip) {
      const msg = `${!nama ? "Nama" : "NIP"} gabole kosong 😠`;
      const error = new Error(msg);
      error.statusCode = 401;
      throw error;
    }

    // Execute query ke database
    const command = "INSERT INTO pegawai (nama, nip) VALUES (?, ?)";
    await connection.promise().query(command, [nama, nip]);

    // mengirimkan respons jika berhasil
    res.status(201).json({
      status: "Success",
      message: "Berhasil menambahkan pegawai",
    });
  } catch (error) {
    // mengirimkan respons jika gagal
    res.status(error.statusCode || 500).json({
      status: "Error",
      message: error.message,
    });
  }
});

// [PUT] Mengubah data pegawai berdasarkan id
router.put("/:id", async (req, res) => {
  try {
    // mengambil id dari parameter
    const { id } = req.params;

    // mengambil nama dan nip dari request body
    const { nama, nip } = req.body;

    // kalau nama/nip kosong atau gaada kolom nama/nip di request body
    if (!nama || !nip) {
      const msg = `${!nama ? "Nama" : "NIP"} gabole kosong 😠`;
      const error = new Error(msg);
      error.statusCode = 401;
      throw error;
    }

    // Execute query ke database
    const command = "UPDATE pegawai SET nama = ?, nip = ? WHERE id = ?";
    await connection.promise().query(command, [nama, nip, id]);

    // mengirimkan respons jika berhasil
    res.status(201).json({
      status: "Success",
      message: "Berhasil mengubah data pegawai",
    });
  } catch (error) {
    // mengirimkan respons jika gagal
    res.status(error.statusCode || 500).json({
      status: "Error",
      message: error.message,
    });
  }
});

// [DELETE] Menghapus data pegawai berdasarkan id
router.delete("/:id", async (req, res) => {
  try {
    // mengambil id dari parameter
    const { id } = req.params;

    // Execute query ke database
    const command = "DELETE FROM pegawai WHERE id = ?";
    await connection.promise().query(command, [id]);

    // mengirimkan respons jika berhasil
    res.status(200).json({
      status: "Success",
      message: "Berhasil menghapus pegawai",
    });
  } catch (error) {
    // mengirimkan respons jika gagal
    res.status(error.statusCode || 500).json({
      status: "Error",
      message: error.message,
    });
  }
});

// [GET] Mengambil data pegawai berdasarkan ID
router.get("/:id", async (req, res) => {
  try {
    // mengambil id dari parameter
    const { id } = req.params;

    // Execute query ke database
    const command = "SELECT * FROM pegawai WHERE id = ?";
    const [[data]] = await connection.promise().query(command, [id]);

    if (!data) {
      const error = new Error("Pegawai tidak ditemukan.");
      error.statusCode = 404;
      throw error;
    }

    // Mengirimkan respons jika berhasil
    res.status(200).json({
      status: "Success",
      message: "Berhasil mengambil pegawai",
      data: data,
    });
  } catch (error) {
    // mengirimkan respons jika gagal
    res.status(error.statusCode || 500).json({
      status: "Error",
      message: error.message,
    });
  }
});

module.exports = router;
