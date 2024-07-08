import { ProductImage } from '../../ProductImage';

export interface ProductVariantListItem {
  id: number;
  productName: string;
  productBrandName: string;
  sku: string;
  unitPrice: number;
  stock: number;
  isPublished: boolean;
  images: ProductImage[];
}
