import { Mahsulot } from './mahsulot.model';

export interface Buyurtma {
  id?: number;
  mahsulotlar: {
    mahsulot: Mahsulot;
    miqdor: number;
  }[];
  jami: number;
  sana: string;
}
