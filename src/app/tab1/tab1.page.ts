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
export class Tab1Page {
  // products = [
  //   {
  //     name: 'Sosis So Nice',
  //     harga: 12000,
  //     uom: 'pak',
  //     barcode: '265493564554647',
  //     stock: 'Out of stock',
  //     qty: 200,
  //   },
  //   {
  //     name: 'Nugget Fiesta',
  //     harga: 18000,
  //     uom: 'pak',
  //     barcode: '1234567890123',
  //     stock: 'In stock',
  //     qty: 200,
  //   },
  //   {
  //     name: 'Chicken Stick',
  //     harga: 15000,
  //     uom: 'pak',
  //     barcode: '9876543210987',
  //     stock: 'In stock',
  //     qty: 200,
  //   },
  //   {
  //     name: 'Bakso Sapi',
  //     harga: 14000,
  //     uom: 'pak',
  //     barcode: '3213213213210',
  //     stock: 'Out of stock',
  //     qty: 200,
  //   },
  //   {
  //     name: 'Dimsum Ayam',
  //     harga: 13000,
  //     uom: 'pak',
  //     barcode: '1112223334445',
  //     stock: 'Re stock',
  //     qty: 200,
  //   },
  // ];

  products: any[] = [];

  constructor(
    private router: Router,
    private postPvdr: PostProvider,
    private toastCtrl: ToastController
  ) {}

  ngOnInit() {
    this.loadProducts();
  }

  doRefresh(event: any) {
    setTimeout(() => {
      this.ngOnInit();
      event.target.complete();
    }, 500);
  }

  loadProducts() {
    return new Promise((resolve) => {
      let body = { aksi: 'tampil' };

      this.postPvdr.postData(body, 'action.php').subscribe((data) => {
        this.products = data;
        resolve(true);
      });
    });
  }

  goToTab2() {
    this.router.navigate(['/tabs/tab2']);
  }
}
