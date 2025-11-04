const tipe = document.getElementById('tipe');
const jumlah = document.getElementById('jumlah');
const catatan = document.getElementById('catatan');
const tambahBtn = document.getElementById('tambah');
const daftarTransaksi = document.getElementById('daftarTransaksi');
const saldoTeks = document.getElementById('saldo');

let transaksi = JSON.parse(localStorage.getItem('transaksi')) || [];

function updateUI() {
  daftarTransaksi.innerHTML = '';
  let saldo = 0;

  transaksi.forEach((t, i) => {
    const li = document.createElement('li');
    li.classList.add(t.tipe === 'pemasukan' ? 'income' : 'expense');
    li.innerHTML = `
      ${t.tipe === 'pemasukan' ? '+' : '-'} Rp${t.jumlah.toLocaleString()} - ${t.catatan}
      <button class="delete-btn" onclick="hapusTransaksi(${i})">×</button>
    `;
    daftarTransaksi.appendChild(li);
    saldo += t.tipe === 'pemasukan' ? t.jumlah : -t.jumlah;
  });

  saldoTeks.textContent = `Saldo saat ini: Rp${saldo.toLocaleString()}`;
  localStorage.setItem('transaksi', JSON.stringify(transaksi));
}

function tambahTransaksi() {
  const data = {
    tipe: tipe.value,
    jumlah: Number(jumlah.value),
    catatan: catatan.value.trim()
  };
  if (!data.jumlah || !data.catatan) {
    alert('Masukkan jumlah dan catatan!');
    return;
  }
  transaksi.push(data);
  jumlah.value = '';
  catatan.value = '';
  updateUI();
}

function hapusTransaksi(i) {
  transaksi.splice(i, 1);
  updateUI();
}

tambahBtn.addEventListener('click', tambahTransaksi);
updateUI();