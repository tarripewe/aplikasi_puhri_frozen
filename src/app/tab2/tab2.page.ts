import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { IonicModule, ToastController } from '@ionic/angular';
import { PostProvider } from '../providers/post-providers';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-tab2',
  templateUrl: './tab2.page.html',
  styleUrls: ['./tab2.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, FormsModule],
})
export class Tab2Page {
  isEdit = false;

  form = {
    id_produk: 0,
    nama_produk: '',
    harga: 0,
    qty: 0,
    uom: '',
    stok_reminder: 0,
    sku: 0,
  };

  constructor(
    private router: Router,
    private toastCtrl: ToastController,
    private postPvdr: PostProvider
  ) {
    const nav = this.router.getCurrentNavigation();
    const state = nav?.extras?.state;

    if (state?.['isEdit'] && state?.['produk']) {
      this.isEdit = true;
      this.form = { ...state['produk'] };
    }
  }

  async submitForm() {
    const { nama_produk, harga, qty, uom, stok_reminder, sku } = this.form;
    if (!nama_produk || !harga || !qty || !uom || !stok_reminder || !sku) {
      this.showToast('Semua field wajib diisi');
      return;
    }

    let body = {
      aksi: this.isEdit ? 'edit' : 'tambah',
      id_produk: this.form.id_produk, // pastikan ini dikirim jika edit
      nama_produk: this.form.nama_produk,
      harga: this.form.harga,
      qty: this.form.qty,
      uom: this.form.uom,
      stok_reminder: this.form.stok_reminder,
      sku: this.form.sku,
    };

    if (this.isEdit) {
      body.id_produk = this.form.id_produk;
    }

    this.postPvdr.postData(body, 'action.php').subscribe({
      next: (data: any) => {
        if (data.success) {
          this.showToast(
            this.isEdit
              ? 'Produk berhasil diubah'
              : 'Produk berhasil ditambahkan'
          );
          this.router.navigate(['/tabs/tab1'], { state: { reload: true } });
        } else {
          this.showToast(data.msg || 'Gagal menyimpan data');
        }
      },
      error: () => {
        this.showToast('Gagal menyambung ke server');
      },
    });
  }

  async showToast(msg: string) {
    const toast = await this.toastCtrl.create({
      message: msg,
      duration: 2000,
      position: 'bottom',
    });
    toast.present();
  }
}
