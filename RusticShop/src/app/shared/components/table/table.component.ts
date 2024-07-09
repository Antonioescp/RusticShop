import {
  Component,
  Input,
  ViewChild,
  Output,
  EventEmitter,
  OnInit,
} from '@angular/core';
import {
  MatPaginator,
  MatPaginatorIntl,
  PageEvent,
} from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Pagination } from 'src/app/services/categories.service';
import { PaginatedResponse } from '../../models/dtos/PaginatedResponse';
import { FormControl } from '@angular/forms';
import { debounceTime, distinctUntilChanged } from 'rxjs';

export interface TableColumnDef<Model> {
  def: string;
  header: string;
  sortable?: boolean;
  valueGetter: (row: Model) => string;
}

export interface RowActionsDef<Model> {
  icon: string;
  tooltip: string;
  color: string;
  execute: (row: Model) => void;
  disabled?: boolean;
}

export interface TableActionDef {
  label: string;
  execute: () => void;
  color: string;
  icon?: string;
  disabled?: boolean;
}

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.scss'],
})
export class TableComponent<Model> implements OnInit {
  @Input() columns: TableColumnDef<Model>[] = [];
  @Input() displayedColumns: string[] = [];

  @Input() rowActions: RowActionsDef<Model>[] = [];
  @Input() tableActions: TableActionDef[] = [];

  // paginator settings
  @Input() pageSizeOptions = [5, 10, 20];
  @Input() pageIndex = 0;
  @Input() pageSize = 5;
  @Input() showFirstLastButtons = true;

  // sorting settings
  @Input() sortColumn = '';
  @Input() sortOrder: 'asc' | 'desc' = 'asc';
  @Input() filterColumn = '';

  @Input() filterQuery?: string;
  debounceFilterQueryControl = new FormControl();

  @Input() title?: string;

  @Input() isFetchingData = false;
  @Output() isFetchingDataChange = new EventEmitter<boolean>();

  @Output() fetchData = new EventEmitter<PageEvent>();

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  dataSource = new MatTableDataSource<Model>([]);

  ngOnInit(): void {
    this.debounceFilterQueryControl.valueChanges
      .pipe(debounceTime(500), distinctUntilChanged())
      .subscribe(this.loadData.bind(this));
  }

  public loadData(query?: string): void {
    const pageEvent = new PageEvent();
    pageEvent.pageIndex = query ? this.pageIndex : this.paginator.pageIndex;
    pageEvent.pageSize = query ? this.pageSize : this.paginator.pageSize;
    this.filterQuery = query;
    this.getData(pageEvent);
  }

  getData(pageEvent: PageEvent) {
    this.isFetchingDataChange.emit(true);
    this.fetchData.emit(pageEvent);
  }

  public getPagination(pageEvent: PageEvent): Pagination {
    return new Pagination({
      defaultSortColumn: this.sortColumn,
      defaultSortOrder: this.sortOrder,
      pageIndex: pageEvent.pageIndex,
      pageSize: pageEvent.pageSize,
      sort: this.sort,
      defaultFilterColumn: this.filterColumn,
      filterQuery: this.filterQuery,
    });
  }

  public updateWithResults(result: PaginatedResponse<Model>) {
    this.paginator.length = result.totalCount;
    this.paginator.pageIndex = result.pageIndex;
    this.paginator.pageSize = result.pageSize;
    this.dataSource.data = result.data;
    this.isFetchingDataChange.emit(false);
  }
}
