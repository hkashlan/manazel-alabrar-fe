import { CommonModule } from '@angular/common';
import {
  AfterContentChecked,
  AfterViewInit,
  Component,
  ContentChildren,
  Directive,
  EventEmitter,
  Input,
  Output,
  QueryList,
  TemplateRef,
  ViewChild,
  computed,
  input,
} from '@angular/core';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatSort, MatSortModule, Sort } from '@angular/material/sort';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { TranslateModule } from '@ngx-translate/core';
import { TableColumn } from './table';

@Directive({
  selector: '[appColDef]',
  standalone: true,
})
export class ColumnDefinition {
  @Input() appColDef: string = '';

  constructor(public templateRef: TemplateRef<any>) {}
}

@Component({
  selector: 'app-table',
  standalone: true,
  imports: [MatFormFieldModule, MatTableModule, CommonModule, MatSortModule, MatPaginatorModule, TranslateModule],
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.scss'],
})
export class TableComponent implements AfterViewInit, AfterContentChecked {
  isPageable = input(false);
  tableColumns = input<TableColumn<any>[]>([] as any);
  paginationSizes = input<number[]>([5, 10, 15]);
  defaultPageSize = input<number>(10);
  displayedColumns = computed(() => this.tableColumns().map((tableColumn: TableColumn<any>) => tableColumn.name));

  @Output() sort: EventEmitter<Sort> = new EventEmitter();

  tableDataSource = new MatTableDataSource([] as unknown[]);
  templates: Map<any, TemplateRef<any>> = new Map();

  @ViewChild(MatPaginator, { static: false }) matPaginator!: MatPaginator;
  @ViewChild(MatSort, { static: true }) matSort!: MatSort;

  @ContentChildren(ColumnDefinition, { descendants: true }) _contentRowDefs?: QueryList<ColumnDefinition>;

  // this property needs to have a setter, to dynamically get changes from parent component
  @Input() set tableData(data: unknown[]) {
    this.setTableDataSource(data);
  }

  ngAfterContentChecked(): void {
    this._contentRowDefs?.forEach((t) => {
      this.templates.set(t.appColDef, t.templateRef);
    });
  }

  // we need this, in order to make pagination work with *ngIf
  ngAfterViewInit(): void {
    this.tableDataSource.paginator = this.matPaginator;
  }

  setTableDataSource(data: unknown[]) {
    this.tableDataSource = new MatTableDataSource(data);
    this.tableDataSource.paginator = this.matPaginator;
    this.tableDataSource.sort = this.matSort;
  }

  sortTable(sortParameters: Sort) {
    // defining name of data property, to sort by, instead of column name
    sortParameters.active = this.tableColumns().find((column) => column.name === sortParameters.active)!
      .dataKey as string;
    this.sort.emit(sortParameters);
  }

  getCompInputs(inputs: Record<string, unknown> | undefined, record: any): Record<string, unknown> | undefined {
    return { ...(inputs ?? {}), record: record };
  }
}
