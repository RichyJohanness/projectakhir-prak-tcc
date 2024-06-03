// Ngambil elemen form
const formulir = document.querySelector("form");

// // Bikin trigger event submit pada elemen form
formulir.addEventListener("submit", (e) => {
  e.preventDefault();
  kirim();
});

function kirim() {
  // Ngambil elemen input
  const elemen_nama = document.querySelector("#nama");
  const elemen_nim = document.querySelector("#nim");

  // Ngambil value (nim) dari elemen input
  const id = elemen_nama.dataset.id;
  const nama = elemen_nama.value;
  const nim = elemen_nim.value;

  // Ngecek apakah harus POST atau PUT
  if (id == "") {
    // Tambah catatan
    axios
      .post("https://mahasiswa-jmw7ojw7cq-et.a.run.app/mahasiswa", {
        nama,
        nim,
      })
      .then(() => {
        // bersihin formnya
        elemen_nama.dataset.id = "";
        elemen_nama.value = "";
        elemen_nim.value = "";

        // manggil fungsi get catatan biar datanya di-refresh
        getCatatan();
      })
      .catch((error) => console.log(error.message));
  } else {
    axios
      .put(`https://mahasiswa-jmw7ojw7cq-et.a.run.app/mahasiswa/${id}`, {
        nama,
        nim,
      })
      .then(() => {
        // bersihin formnya
        elemen_nama.dataset.id = "";
        elemen_nama.value = "";
        elemen_nim.value = "";

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
      <td class="nama">${mhs.nama}</td>
      <td class="nim">${mhs.nim}</td>
      <td><button data-id=${mhs.id} class='btn-edit'>Edit</button></td>
      <td><button data-id=${mhs.id} class='btn-hapus'>Hapus</button></td>
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
      const nama =
        tombol_edit.parentElement.parentElement.querySelector(
          ".nama"
        ).innerText;
      const nim =
        tombol_edit.parentElement.parentElement.querySelector(".nim").innerText;

      // Ngambil elemen input
      const elemen_nama = document.querySelector("#nama");
      const elemen_nim = document.querySelector("#nim");

      elemen_nama.dataset.id = id;
      elemen_nama.value = nama;
      elemen_nim.value = nim;
    });
  });
}

getCatatan();
