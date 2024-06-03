// Ngambil elemen form
const formulir = document.querySelector("form");

// Bikin trigger event submit pada elemen form
formulir.addEventListener("submit", (e) => {
  e.preventDefault();
  kirim();
});

function kirim() {
  // Ngambil elemen input
  const elemen_judul = document.querySelector("#judul");
  const elemen_isbn = document.querySelector("#isbn");

  // Ngambil value dari elemen input
  const id = elemen_judul.dataset.id;
  const judul = elemen_judul.value;
  const isbn = elemen_isbn.value;

  // Ngecek apakah harus POST atau PUT
  if (id == "") {
    // Tambah buku
    axios
      .post("https://buku-jmw7ojw7cq-et.a.run.app/buku", {
        judul,
        isbn,
      })
      .then(() => {
        // Bersihin form
        elemen_judul.dataset.id = "";
        elemen_judul.value = "";
        elemen_isbn.value = "";

        // Manggil fungsi untuk refresh data buku
        getBuku();
      })
      .catch((error) => console.log(error.message));
  } else {
    // Edit buku
    axios
      .put(`https://buku-jmw7ojw7cq-et.a.run.app/buku/${id}`, {
        judul,
        isbn,
      })
      .then(() => {
        // Bersihin form
        elemen_judul.dataset.id = "";
        elemen_judul.value = "";
        elemen_isbn.value = "";

        // Manggil fungsi untuk refresh data buku
        getBuku();
      })
      .catch((error) => console.log(error));
  }
}

// Ngambil data buku
function getBuku() {
  axios
    .get("https://buku-jmw7ojw7cq-et.a.run.app/buku")
    .then(({ data }) => {
      const table = document.querySelector("#table-buku");
      const { data: buku } = data;
      let tampilan = "";
      let no = 1;

      buku.forEach((item) => {
        tampilan += tampilkanBuku(no, item);
        no++;
      });
      table.innerHTML = tampilan;

      hapusBuku();
      editBuku();
    })
    .catch((error) => {
      console.log(error.message);
    });
}

function tampilkanBuku(no, buku) {
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

function hapusBuku() {
  const btnHapusList = document.querySelectorAll(".btn-hapus");

  btnHapusList.forEach((btn) => {
    btn.addEventListener("click", () => {
      const id = btn.dataset.id;
      axios
        .delete(`https://buku-jmw7ojw7cq-et.a.run.app/buku/${id}`)
        .then(() => getBuku())
        .catch((error) => console.log(error));
    });
  });
}

function editBuku() {
  const btnEditList = document.querySelectorAll(".btn-edit");

  btnEditList.forEach((btn) => {
    btn.addEventListener("click", () => {
      const id = btn.dataset.id;
      const judul =
        btn.parentElement.parentElement.querySelector(".judul").innerText;
      const isbn =
        btn.parentElement.parentElement.querySelector(".isbn").innerText;

      const elemen_judul = document.querySelector("#judul");
      const elemen_isbn = document.querySelector("#isbn");

      elemen_judul.dataset.id = id;
      elemen_judul.value = judul;
      elemen_isbn.value = isbn;
    });
  });
}

getBuku();
