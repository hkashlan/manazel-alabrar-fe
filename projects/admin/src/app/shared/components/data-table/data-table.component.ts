import { DatePipe } from '@angular/common';
import { Component, Input, OnInit, inject } from '@angular/core';
import { TableColumn } from '../../../../core/components/table/table';
import { TableComponent } from '../../../../core/components/table/table.component';
import { APIService } from '../../../../core/services/api.service';
import { Result } from '../../../../shared/models/result';
import { RestApiServiceUnkown } from '../../../../shared/services/rest-api.service';
import { JSONSchema } from '../../model/json-schema';
import { getJSONSchema } from '../../model/schame';

@Component({
  selector: 'app-data-table',
  standalone: true,
  templateUrl: './data-table.component.html',
  styleUrl: './data-table.component.scss',
  imports: [TableComponent],
  providers: [DatePipe],
})
export class DataTableComponent implements OnInit {
  datePipe = inject(DatePipe);
  apiService = inject(APIService);

  @Input() entityName: string = '';
  tableColumns: TableColumn<never>[] = [];
  restApiService!: RestApiServiceUnkown;
  result: Result<unknown[]> = {
    items: [],
    pages: 0,
  };

  makeFirstLetterLowerCase(text: string): string {
    return text.charAt(0).toLowerCase() + text.slice(1);
  }

  ngOnInit(): void {
    const dataSchema: JSONSchema = getJSONSchema(this.entityName);
    const apiServiceName = this.makeFirstLetterLowerCase(this.entityName);
    this.restApiService = this.apiService[apiServiceName as keyof APIService] as RestApiServiceUnkown;

    this.restApiService.findAll().subscribe((result) => {
      this.result = result;
    });

    this.tableColumns = [];
    for (const key in dataSchema.properties) {
      const property: JSONSchema = dataSchema.properties[key] as JSONSchema;
      const type = Array.isArray(property.type) ? property.type[0] : property.type;
      if (type !== 'array') {
        this.tableColumns.push({
          name: key,
          dataKey: key,
          fn: this.getFn(key),
        });
      }
    }
    console.log(dataSchema);
  }

  private getFn(key: string) {
    if (key.toLocaleLowerCase().indexOf('date') > 0) {
      return (value: string) => this.datePipe.transform(value) ?? '';
    } else {
      return undefined;
    }
  }
}
