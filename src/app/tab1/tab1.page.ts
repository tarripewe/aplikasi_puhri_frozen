import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-tab1', // ✔ Nama selector sesuai
  templateUrl: 'tab1.page.html', // ✔ Mengarah ke file template yang benar
  styleUrls: ['tab1.page.scss'], // ✔ Gaya SCSS terhubung
  standalone: false, // ✔ 'false' jika bagian dari module (misalnya TabsPageModule)
})
export class Tab1Page {
  products = [
    {
      name: 'Sosis So Nice',
      harga: 12000,
      uom: 'pak',
      barcode: '265493564554647',
      stock: 'Out of stock',
      qty: 200,
    },
    {
      name: 'Nugget Fiesta',
      harga: 18000,
      uom: 'pak',
      barcode: '1234567890123',
      stock: 'In stock',
      qty: 200,
    },
    {
      name: 'Chicken Stick',
      harga: 15000,
      uom: 'pak',
      barcode: '9876543210987',
      stock: 'In stock',
      qty: 200,
    },
    {
      name: 'Bakso Sapi',
      harga: 14000,
      uom: 'pak',
      barcode: '3213213213210',
      stock: 'Out of stock',
      qty: 200,
    },
    {
      name: 'Dimsum Ayam',
      harga: 13000,
      uom: 'pak',
      barcode: '1112223334445',
      stock: 'Re stock',
      qty: 200,
    },
  ];

  constructor(private router: Router) {}

  goToTab2() {
    this.router.navigate(['/tabs/tab2']);
  }
}
