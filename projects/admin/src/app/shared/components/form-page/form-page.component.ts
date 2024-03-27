import { Component, Input, OnInit, inject } from '@angular/core';
import { APIService } from '../../../../core/services/api.service';
import { SchemaInfo } from '../../model/json-schema';
import { schemaInfo } from '../../model/schame';
import { DynamicFormComponent } from '../dynamic-form/dynamic-form.component';

@Component({
  selector: 'app-form-page',
  standalone: true,
  imports: [DynamicFormComponent],
  templateUrl: './form-page.component.html',
  styleUrl: './form-page.component.scss',
})
export class FormPageComponent implements OnInit {
  apiService = inject(APIService);

  @Input() entityName: string = '';
  @Input({ required: true }) id: number;
  value: unknown = null;

  schemaInfo!: SchemaInfo;

  ngOnInit(): void {
    this.schemaInfo = schemaInfo(this.entityName, this.apiService);
    if (this.id) {
      this.schemaInfo.api.findOne(this.id).subscribe((value) => (this.value = value));
    }
  }
}
