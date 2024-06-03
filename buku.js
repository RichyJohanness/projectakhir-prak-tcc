// Ngambil elemen form
const formulir = document.querySelector("form");

// // Bikin trigger event submit pada elemen form
formulir.addEventListener("submit", (e) => {
  e.preventDefault();
  kirim();
});

function kirim() {
  // Ngambil elemen input
  const elemen_judul = document.querySelector("#judul");
  const elemen_isbn = document.querySelector("#isbn");

  // Ngambil value (isbn) dari elemen input
  const id = elemen_judul.dataset.id;
  const judul = elemen_judul.value;
  const isbn = elemen_isbn.value;

  // Ngecek apakah harus POST atau PUT
  if (id == "") {
    // Tambah catatan
    axios
      .post("https://mahasiswa-jmw7ojw7cq-et.a.run.app/mahasiswa", {
        judul,
        isbn,
      })
      .then(() => {
        // bersihin formnya
        elemen_judul.dataset.id = "";
        elemen_judul.value = "";
        elemen_isbn.value = "";

        // manggil fungsi get catatan biar datanya di-refresh
        getCatatan();
      })
      .catch((error) => console.log(error.message));
  } else {
    axios
      .put(`https://mahasiswa-jmw7ojw7cq-et.a.run.app/mahasiswa/${id}`, {
        judul,
        isbn,
      })
      .then(() => {
        // bersihin formnya
        elemen_judul.dataset.id = "";
        elemen_judul.value = "";
        elemen_isbn.value = "";

        // manggil fungsi get catatan biar datanya direfresh
        getCatatan();
      })
      .catch((error) => console.log(error));
  }
}

// Ngambil catatan
function getCatatan() {
  axios
    .get("https://mahasiswa-jmw7ojw7cq-et.a.run.app/mahasiswa")
    .then(({ data }) => {
      const table = document.querySelector("#table-mhs");
      const { data: mahasiswa } = data;
      let tampilan = "";
      let no = 1;

      for (const mhs of mahasiswa) {
        tampilan += tampilkanCatatan(no, mhs);
        no++;
      }
      table.innerHTML = tampilan;

      hapusCatatan();
      editCatatan();
    })
    .catch((error) => {
      console.log(error.message);
    });
}

function tampilkanCatatan(no, mhs) {
  return `
    <tr>
      <td>${no}</td>
      <td class="judul">${buku.judul}</td>
      <td class="isbn">${buku.isbn}</td>
      <td><button data-id=${buku.id} class='btn-edit'>Edit</button></td>
      <td><button data-id=${buku.id} class='btn-hapus'>Hapus</button></td>
    </tr>
  `;
}

function hapusCatatan() {
  const kumpulan_tombol_hapus = document.querySelectorAll(".btn-hapus");

  kumpulan_tombol_hapus.forEach((btn) => {
    btn.addEventListener("click", () => {
      const id = btn.dataset.id;
      axios
        .delete(`https://mahasiswa-jmw7ojw7cq-et.a.run.app/mahasiswa/${id}`)
        .then(() => getCatatan())
        .catch((error) => console.log(error));
    });
  });
}

function editCatatan() {
  const kumpulan_tombol_edit = document.querySelectorAll(".btn-edit");

  kumpulan_tombol_edit.forEach((tombol_edit) => {
    tombol_edit.addEventListener("click", () => {
      const id = tombol_edit.dataset.id;
      const judul =
        tombol_edit.parentElement.parentElement.querySelector(
          ".judul"
        ).innerText;
      const isbn =
        tombol_edit.parentElement.parentElement.querySelector(
          ".isbn"
        ).innerText;

      // Ngambil elemen input
      const elemen_judul = document.querySelector("#judul");
      const elemen_isbn = document.querySelector("#isbn");

      elemen_judul.dataset.id = id;
      elemen_judul.value = judul;
      elemen_isbn.value = isbn;
    });
  });
}

getCatatan();
