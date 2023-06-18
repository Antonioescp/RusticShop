import { Component, AfterViewInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatSort } from '@angular/material/sort';
import { ProductVariantsService } from 'src/app/services/product-variants.service';
import {
  BaseEditDialogData,
  BaseEditDialogResult,
} from 'src/app/shared/components/base-edit-dialog.component';
import {
  ConfirmDialogComponent,
  ConfirmDialogData,
  ConfirmDialogResult,
} from 'src/app/shared/components/confirm-dialog/confirm-dialog.component';
import { ProductVariant } from 'src/app/shared/models/ProductVariant';
import { ProductVariantEditDialogComponent } from '../product-variant-edit-dialog/product-variant-edit-dialog.component';
import {
  RowActionsDef,
  TableActionDef,
  TableColumnDef,
  TableComponent,
} from 'src/app/shared/components/table/table.component';
import { ProductVariantListItem } from 'src/app/shared/models/dtos/product-variants/ProductVariantListItem';

@Component({
  selector: 'app-product-variants',
  templateUrl: './product-variants.component.html',
  styleUrls: ['./product-variants.component.scss'],
})
export class ProductVariantsComponent implements AfterViewInit {
  @ViewChild(TableComponent) table!: TableComponent<ProductVariantListItem>;

  columns: TableColumnDef<ProductVariantListItem>[] = [
    {
      def: 'id',
      header: 'ID',
      valueGetter: productVariant => productVariant.id.toString(),
      sortable: true,
    },
    {
      def: 'productBrandName',
      header: 'Marca del producto',
      valueGetter: productVariant => productVariant.productBrandName,
      sortable: true,
    },
    {
      def: 'productName',
      header: 'Nombre del producto',
      valueGetter: productVariant => productVariant.productName,
      sortable: true,
    },
    {
      def: 'sku',
      header: 'SKU',
      valueGetter: productVariant => productVariant.sku,
      sortable: true,
    },
    {
      def: 'unitPrice',
      header: 'Precio unitario',
      valueGetter: productVariant =>
        productVariant.unitPrice.toLocaleString('es-NI', {
          style: 'currency',
          currency: 'NIO',
        }),
    },
  ];

  tableActions: TableActionDef[] = [
    {
      label: 'Agregar variante',
      icon: 'add',
      color: 'primary',
      execute: () => this.onCreateVariant(),
    },
  ];

  rowActions: RowActionsDef<ProductVariantListItem>[] = [
    {
      tooltip: 'Editar',
      icon: 'edit',
      color: 'primary',
      execute: productVariant => this.onUpdateVariant(productVariant.id),
    },
    {
      tooltip: 'Eliminar',
      icon: 'delete',
      color: 'warn',
      execute: productVariant => this.onDeleteVariant(productVariant),
    },
  ];

  displayedColumns = [...this.columns.map(column => column.def), 'actions'];

  constructor(
    private productVariantsService: ProductVariantsService,
    private dialog: MatDialog,
    private snackBar: MatSnackBar
  ) {}

  ngAfterViewInit(): void {
    this.table.loadData();
  }

  fetchData(pageEvent: PageEvent) {
    this.productVariantsService
      .getPaginatedListItem(this.table.getPagination(pageEvent))
      .subscribe({
        next: results => {
          this.table.updateWithResults(results);
        },
        error: error => {
          console.error(error);
        },
      });
  }

  onDeleteVariant(productVariant: ProductVariantListItem): void {
    const dialogRef = this.dialog.open<
      ConfirmDialogComponent,
      ConfirmDialogData,
      ConfirmDialogResult
    >(ConfirmDialogComponent, {
      data: {
        title: `Eliminar la variante ${productVariant.sku}`,
        message: `¿Está seguro de que desea eliminar la variante ${productVariant.sku}?`,
        confirmColor: 'warn',
        confirmIcon: 'warning',
        cancelColor: 'primary',
        cancelIcon: 'cancel',
      },
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result?.confirmed) {
        this.deleteVariant(productVariant);
      }
    });
  }

  deleteVariant(productVariant: ProductVariantListItem) {
    this.productVariantsService.deleteById(productVariant.id).subscribe({
      next: () => {
        this.table.loadData();
        this.snackBar.open(
          `Variante "${productVariant.sku} eliminado con éxito."`
        );
      },
      error: error => {
        console.error(error);
        this.snackBar.open(
          `Variante "${productVariant.sku} no se ha podido eliminar."`
        );
      },
    });
  }

  onCreateVariant(): void {
    const dialogRef = this.dialog.open<
      ProductVariantEditDialogComponent,
      BaseEditDialogData,
      BaseEditDialogResult<ProductVariant>
    >(ProductVariantEditDialogComponent);

    dialogRef.afterClosed().subscribe(result => {
      if (result?.success) {
        this.table.loadData();
        this.snackBar.open(
          `Variante "${result.resource.sku}" ha sido creado con éxito.`
        );
      } else if (result?.success == false) {
        this.snackBar.open(
          `Variante "${result.resource.sku}" no se ha podido crear.`
        );
      }
    });
  }

  onUpdateVariant(id: number): void {
    const dialogRef = this.dialog.open<
      ProductVariantEditDialogComponent,
      BaseEditDialogData,
      BaseEditDialogResult<ProductVariant>
    >(ProductVariantEditDialogComponent, {
      data: { id },
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result?.success) {
        this.table.loadData();
        this.snackBar.open(
          `Variante "${result.resource.sku}" ha sido actualizado con éxito.`
        );
      } else if (result?.success == false) {
        this.snackBar.open(
          `Variante "${result.resource.sku}" no se ha podido actualizar.`
        );
      }
    });
  }
}
