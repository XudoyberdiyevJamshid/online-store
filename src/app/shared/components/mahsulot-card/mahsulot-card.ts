import { ChangeDetectionStrategy, Component, computed, input, output } from '@angular/core';
import { Mahsulot } from '../../../core/models/mahsulot.model';

@Component({
  selector: 'app-mahsulot-card',
  imports: [],
  templateUrl: './mahsulot-card.html',
  styleUrl: './mahsulot-card.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MahsulotCard {
  mahsulot = input.required<Mahsulot>();

  savatgaQoshildi = output<Mahsulot>();
  detailKorildi = output<number>();

  narxFormatlangan = computed(() => this.mahsulot().narxi.toLocaleString('uz-UZ') + " so'm");

  savatgaQosh() {
    this.savatgaQoshildi.emit(this.mahsulot());
  }

  detailKor() {
    this.detailKorildi.emit(this.mahsulot().id);
  }
}
