import { ProductVariantsService } from 'src/app/services/product-variants.service';
import { Component } from '@angular/core';
import { Pagination } from '../services/categories.service';
import { ProductVariantListItem } from '../shared/models/dtos/product-variants/ProductVariantListItem';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent {
  products: ProductVariantListItem[] = [];
  pagination: Pagination = new Pagination({ pageIndex: 0, pageSize: 10 });

  constructor(private productVariantsService: ProductVariantsService) {}

  ngOnInit(): void {
    this.loadProducts();
  }

  loadProducts(): void {
    this.productVariantsService.getPaginatedListItem(this.pagination).subscribe(
      response => {
        console.log('Productos cargados:', response.data);
        this.products = response.data; // Suponiendo que los productos están en 'items'
      },
      error => {
        console.error('Error al cargar productos:', error);
      }
    );
  }
}
