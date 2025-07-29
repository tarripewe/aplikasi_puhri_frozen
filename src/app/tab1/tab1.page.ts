import { Component, OnInit } from '@angular/core';
import { IonicModule, ToastController } from '@ionic/angular';
import { Router } from '@angular/router';
import { PostProvider } from '../providers/post-providers';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ExploreContainerComponentModule } from '../explore-container/explore-container.module';

@Component({
  selector: 'app-tab1',
  standalone: true,
  templateUrl: './tab1.page.html',
  styleUrls: ['./tab1.page.scss'],
  imports: [
    IonicModule,
    CommonModule,
    FormsModule,
    ExploreContainerComponentModule,
  ],
  providers: [PostProvider],
})
export class Tab1Page implements OnInit {
  products: any[] = [];
  allProducts: any[] = [];
  searchTerm: string = '';

  constructor(
    private router: Router,
    private postPvdr: PostProvider,
    private toastCtrl: ToastController
  ) {}

  ngOnInit() {
    this.loadProducts();
  }

  ionViewWillEnter() {
    this.loadProducts();
  }

  doRefresh(event: any) {
    setTimeout(() => {
      this.loadProducts().then(() => {
        event.target.complete();
      });
    }, 500);
  }

  loadData(event: any) {
    setTimeout(() => {
      this.loadProducts().then(() => {
        event.target.complete();
      });
    }, 1000);
  }

  loadProducts() {
    return new Promise((resolve) => {
      let body = { aksi: 'tampil' };

      this.postPvdr.postData(body, 'action.php').subscribe((data) => {
        this.products = data;
        this.allProducts = data; // <- penting! salin data asli
        resolve(true);
      });
    });
  }

  filterProducts(event: any) {
    const term = event.target.value?.toLowerCase() || '';
    this.products = this.allProducts.filter((item) =>
      item.nama_produk.toLowerCase().includes(term)
    );
  }

  goToTab2(produk: any) {
    this.router.navigate(['/tabs/tab2'], {
      state: {
        isEdit: true,
        produk,
      },
    });
  }
}


