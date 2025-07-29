import { Component, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-explore-container',
  standalone: false,
  templateUrl: './explore-container.component.html',
  styleUrls: ['./explore-container.component.scss'],
})
export class ExploreContainerComponent {
  @Input() name!: string;
  @Input() harga!: number;
  @Input() qty!: number;
  @Input() uom!: string;
  @Input() stock!: number;
  @Input() sku!: number;

  @Output() cardClicked = new EventEmitter<void>();

  handleClick() {
    this.cardClicked.emit();
  }

  formatRupiah(angka: number): string {
    return 'Rp ' + angka.toLocaleString('id-ID');
  }
}
