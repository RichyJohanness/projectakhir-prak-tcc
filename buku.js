const express = require("express");
const router = express.Router();
const connection = require("./config");

// [GET] Mengambil daftar buku
router.get("/", async (req, res) => {
  try {
    // Execute query ke database
    const command = "SELECT * FROM buku"; // Mengubah query untuk memperoleh data buku
    const data = await connection.promise().query(command);

    // Mengirimkan respons jika berhasil
    res.status(200).json({
      status: "Success",
      message: "Berhasil mengambil daftar buku",
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

// [POST] Memasukkan buku baru ke dalam daftar buku
router.post("/", async (req, res) => {
  try {
    // mengambil judul dan pengarang dari request body
    const { judul, pengarang } = req.body;

    // jika judul/pengarang kosong atau tidak ada kolom judul/pengarang di request body
    if (!judul || !pengarang) {
      const msg = `${!judul ? "Judul" : "Pengarang"} tidak boleh kosong 😠`;
      const error = new Error(msg);
      error.statusCode = 401;
      throw error;
    }

    // Execute query ke database
    const command = "INSERT INTO buku (judul, pengarang) VALUES (?, ?)";
    await connection.promise().query(command, [judul, pengarang]);

    // mengirimkan respons jika berhasil
    res.status(201).json({
      status: "Success",
      message: "Berhasil menambahkan buku",
    });
  } catch (error) {
    // mengirimkan respons jika gagal
    res.status(error.statusCode || 500).json({
      status: "Error",
      message: error.message,
    });
  }
});

// [PUT] Mengubah data buku berdasarkan id
router.put("/:id", async (req, res) => {
  try {
    // mengambil id dari parameter
    const { id } = req.params;
    const { judul, pengarang } = req.body;

    // jika judul/pengarang kosong atau tidak ada kolom judul/pengarang di request body
    if (!judul || !pengarang) {
      const msg = `${!judul ? "Judul" : "Pengarang"} tidak boleh kosong 😠`;
      const error = new Error(msg);
      error.statusCode = 401;
      throw error;
    }

    // Execute query ke database
    const command = "UPDATE buku SET judul = ?, pengarang = ? WHERE id = ?";
    await connection.promise().query(command, [judul, pengarang, id]);

    // mengirimkan respons jika berhasil
    res.status(201).json({
      status: "Success",
      message: "Berhasil mengubah buku",
    });
  } catch (error) {
    // mengirimkan respons jika gagal
    res.status(error.statusCode || 500).json({
      status: "Error",
      message: error.message,
    });
  }
});

// [DELETE] Menghapus suatu buku berdasarkan id
router.delete("/:id", async (req, res) => {
  try {
    const { id } = req.params;

    // Execute query ke database
    const command = "DELETE FROM buku WHERE id = ?";
    await connection.promise().query(command, [id]);

    // mengirimkan respons jika berhasil
    res.status(200).json({
      status: "Success",
      message: "Berhasil menghapus buku",
    });
  } catch (error) {
    // mengirimkan respons jika gagal
    res.status(error.statusCode || 500).json({
      status: "Error",
      message: error.message,
    });
  }
});

// [GET] Mengambil buku berdasarkan ID
router.get("/:id", async (req, res) => {
  try {
    // mengambil id dari parameter
    const { id } = req.params;

    // Execute query ke database
    const command = "SELECT * FROM buku WHERE id = ?";
    const [[data]] = await connection.promise().query(command, [id]);

    if (!data) {
      const error = new Error("Buku tidak ditemukan.");
      error.statusCode = 404;
      throw error;
    }

    // Mengirimkan respons jika berhasil
    res.status(200).json({
      status: "Success",
      message: "Berhasil mengambil buku",
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
