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
  const elemen_nip = document.querySelector("#nip");

  // Ngambil value (nip) dari elemen input
  const id = elemen_nama.dataset.id;
  const nama = elemen_nama.value;
  const nip = elemen_nip.value;

  // Ngecek apakah harus POST atau PUT
  if (id == "") {
    // Tambah catatan
    axios
      .post("https://pegawai-jmw7ojw7cq-et.a.run.app/pegawai", {
        nama,
        nip,
      })
      .then(() => {
        // bersihin formnya
        elemen_nama.dataset.id = "";
        elemen_nama.value = "";
        elemen_nip.value = "";

        // manggil fungsi get catatan biar datanya di-refresh
        getCatatan();
      })
      .catch((error) => console.log(error.message));
  } else {
    axios
      .put(`https://pegawai-jmw7ojw7cq-et.a.run.app/pegawai/${id}`, {
        nama,
        nip,
      })
      .then(() => {
        // bersihin formnya
        elemen_nama.dataset.id = "";
        elemen_nama.value = "";
        elemen_nip.value = "";

        // manggil fungsi get catatan biar datanya direfresh
        getCatatan();
      })
      .catch((error) => console.log(error));
  }
}

// Ngambil catatan
function getCatatan() {
  axios
    .get("https://pegawai-jmw7ojw7cq-et.a.run.app/pegawai")
    .then(({ data }) => {
      const table = document.querySelector("#table-pegawai");
      const { data: pegawai } = data;
      let tampilan = "";
      let no = 1;

      for (const dos of pegawai) {
        tampilan += tampilkanCatatan(no, dos);
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

function tampilkanCatatan(no, pegawai) {
  return `
    <tr>
      <td>${no}</td>
      <td class="nama">${pegawai.nama}</td>
      <td class="nip">${pegawai.nip}</td>
      <td><button data-id=${pegawai.id} class='btn-edit'>Edit</button></td>
      <td><button data-id=${pegawai.id} class='btn-hapus'>Hapus</button></td>
    </tr>
  `;
}

function hapusCatatan() {
  const kumpulan_tombol_hapus = document.querySelectorAll(".btn-hapus");

  kumpulan_tombol_hapus.forEach((btn) => {
    btn.addEventListener("click", () => {
      const id = btn.dataset.id;
      axios
        .delete(`https://pegawai-jmw7ojw7cq-et.a.run.app/pegawai/${id}`)
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
      const nip =
        tombol_edit.parentElement.parentElement.querySelector(".nip").innerText;

      // Ngambil elemen input
      const elemen_nama = document.querySelector("#nama");
      const elemen_nip = document.querySelector("#nip");

      elemen_nama.dataset.id = id;
      elemen_nama.value = nama;
      elemen_nip.value = nip;
    });
  });
}

getCatatan();
