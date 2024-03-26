import { DatePipe } from '@angular/common';
import { Component, Input, OnInit, inject } from '@angular/core';
import { TableColumn } from '../../../../core/components/table/table';
import { TableComponent } from '../../../../core/components/table/table.component';
import { APIService } from '../../../../core/services/api.service';
import { Result } from '../../../../shared/models/result';
import { RestApiServiceUnkown } from '../../../../shared/services/rest-api.service';
import { JSONSchema, SchemaInfo } from '../../model/json-schema';
import { schemaInfo } from '../../model/schame';

@Component({
  selector: 'app-data-table',
  standalone: true,
  templateUrl: './data-table.component.html',
  imports: [TableComponent],
  providers: [DatePipe],
})
export class DataTableComponent<T> implements OnInit {
  datePipe = inject(DatePipe);
  apiService = inject(APIService);

  @Input() entityName: string = '';
  tableColumns: TableColumn<T>[] = [];
  schemaInfo!: SchemaInfo;
  restApiService!: RestApiServiceUnkown;
  result: Result<T> = {
    items: [],
    pages: 0,
  };

  ngOnInit(): void {
    this.schemaInfo = schemaInfo(this.entityName, this.apiService);

    this.schemaInfo.api.findAll().subscribe((result) => {
      this.result = result;
    });

    this.tableColumns = [];
    for (const key in this.schemaInfo.schema.properties) {
      const property: JSONSchema = this.schemaInfo.schema.properties[key];
      const type = Array.isArray(property.type) ? property.type[0] : property.type;
      if (type !== 'array') {
        const tableColumn: TableColumn<T> = {
          name: key,
          dataKey: key as keyof T,
          fn: this.getFn(key),
        };
        this.tableColumns.push(tableColumn);
      }
    }
  }

  private getFn(key: string): ((value: T[keyof T] | undefined) => string) | undefined {
    if (key.toLocaleLowerCase().indexOf('date') > 0) {
      return (value: T[keyof T] | undefined) => this.datePipe.transform(value as string) ?? '';
    } else {
      return undefined;
    }
  }
}
