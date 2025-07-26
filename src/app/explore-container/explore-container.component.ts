import { CommonModule } from '@angular/common';
import { Component, Input, Output, EventEmitter } from '@angular/core';
import { IonicModule } from '@ionic/angular';

@Component({
  selector: 'app-explore-container',
  standalone: false,
  templateUrl: './explore-container.component.html',
  styleUrls: ['./explore-container.component.scss'],
  // imports: [CommonModule, IonicModule],
})
export class ExploreContainerComponent {
  @Input() name!: string;
  @Input() harga!: number;
  @Input() qty!: number;
  @Input() uom!: string;
  @Input() stock!: number; // ✅ INI YANG PENTING
  @Input() sku!: number;

  @Output() cardClicked = new EventEmitter<void>();

  handleClick() {
    this.cardClicked.emit();
  }

  formatRupiah(angka: number): string {
    return 'Rp ' + angka.toLocaleString('id-ID');
  }
}
