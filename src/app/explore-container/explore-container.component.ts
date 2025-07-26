import { Component, Input } from '@angular/core';


@Component({
  selector: 'app-explore-container',
  templateUrl: './explore-container.component.html',
  styleUrls: ['./explore-container.component.scss'],
  standalone: false,
})

export class ExploreContainerComponent {
  @Input() name!: string;
  @Input() harga!: number;
  @Input() uom!: string;
  @Input() barcode!: string;
  @Input() stock!: string;
  @Input() qty!: number;

  formatRupiah(angka: number): string {
    return 'Rp ' + angka.toLocaleString('id-ID');
  }
}

