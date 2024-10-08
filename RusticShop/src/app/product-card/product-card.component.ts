import { Component, Input } from '@angular/core';
import { ProductVariantListItem } from '../shared/models/dtos/product-variants/ProductVariantListItem';

@Component({
  selector: 'app-product-card',
  templateUrl: './product-card.component.html',
  styleUrls: ['./product-card.component.scss'],
})
export class ProductCardComponent {
  @Input() product!: ProductVariantListItem;
}
