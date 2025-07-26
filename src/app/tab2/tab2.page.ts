import { Component } from '@angular/core';

@Component({
  selector: 'app-tab2',
  templateUrl: './tab2.page.html',
  styleUrls: ['./tab2.page.scss'],
  standalone: false,
})
export class Tab2Page {

  isEdit: boolean = false; 

  form = {
    nama_produk: '',
    harga: 0,
    qty: 0,
    uom: '',
    stok_reminder: 0,
    sku: 0,
  };

  constructor() {}

 submitForm() {
    if (this.isEdit) {
      console.log('Edit produk:', this.form);
      // Proses update data
    } else {
      console.log('Tambah produk:', this.form);
      // Proses simpan data baru
    }
  }
}
