import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ToastController } from '@ionic/angular';
import { Router } from '@angular/router';
import { PostProvider } from '../providers/post-providers';

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

  constructor(
    private http: HttpClient,
    private toastController: ToastController,
    private router: Router,
    private postPvdr: PostProvider
  ) {}

  submitForm() {
    return new Promise(async (resolve, reject) => {
      // Validasi manual: jika ada field kosong
      if (
        !this.form.nama_produk ||
        !this.form.harga ||
        !this.form.qty ||
        !this.form.uom ||
        !this.form.stok_reminder ||
        !this.form.sku
      ) {
        this.showToast('Semua field wajib diisi!');
        reject('Field tidak lengkap');
        return;
      }

      let body = {
        aksi: 'tambah',
        nama_produk: this.form.nama_produk,
        harga: this.form.harga,
        qty: this.form.qty,
        uom: this.form.uom,
        stok_reminder: this.form.stok_reminder,
        sku: this.form.sku,
      };

      this.postPvdr.postData(body, 'action.php').subscribe({
        next: (data: any) => {
          if (data.success) {
            console.log('Produk berhasil ditambahkan');
            this.router.navigate(['/tabs/tab1']);
            resolve(true);
          } else {
            console.warn('Gagal:', data.msg);
            this.showToast(data.msg || 'Gagal menambahkan produk');
            reject(data.msg || 'Gagal menambahkan produk');
          }
        },
        error: (err) => {
          console.error('Error:', err);
          this.showToast('Gagal menyambung ke server');
          reject('Gagal menyambung ke server');
        },
      });
    });
  }

  async showToast(msg: string) {
    const toast = await this.toastController.create({
      message: msg,
      duration: 2000,
      position: 'bottom',
    });
    toast.present();
  }
}
