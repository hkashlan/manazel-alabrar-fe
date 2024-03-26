import { CommonModule } from '@angular/common';
import { Component, Input, OnInit, inject } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, ValidatorFn, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { APIService } from '../../../../core/services/api.service';
import { JSONSchema, SchemaInfo } from '../../model/json-schema';
import { getFirstType, schemaInfo } from '../../model/schame';

@Component({
  standalone: true,
  selector: 'app-dynamic-form',
  imports: [MatInputModule, ReactiveFormsModule, MatSlideToggleModule, MatButtonModule, CommonModule],
  templateUrl: './dynamic-form.component.html',
  styleUrls: ['./dynamic-form.component.scss'],
})
export class DynamicFormComponent implements OnInit {
  apiService = inject(APIService);
  @Input() entityName: string = '';
  @Input() value: unknown;

  dynamicForm: FormGroup = new FormGroup({});
  schemaInfo!: SchemaInfo;

  getFirstType = getFirstType;
  createFormGroup() {
    const formGroup = new FormGroup({});
    for (const [propertyName, property] of Object.entries(this.schemaInfo.schema.properties)) {
      const type = Array.isArray(property.type) ? property.type[0] : property.type;
      if (type !== 'array') {
        const control = new FormControl(property.default, this.collectValidators(propertyName, property));
        formGroup.addControl(propertyName, control);
      }
    }

    this.dynamicForm = formGroup;
  }

  ngOnInit(): void {
    this.schemaInfo = schemaInfo(this.entityName, this.apiService);
    this.createFormGroup();
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    this.dynamicForm.setValue(this.value as any);
  }

  save() {
    if (!this.dynamicForm.valid) {
      this.dynamicForm.markAllAsTouched();
      return;
    }
  }

  cancel() {}

  private collectValidators(propertyName: string, property: JSONSchema): ValidatorFn[] {
    const validators: ValidatorFn[] = [];

    if (property.minimum) {
      validators.push(Validators.min(property.minimum));
    }

    if (property.maximum) {
      validators.push(Validators.min(property.maximum));
    }

    if (this.schemaInfo.schema.required?.includes(propertyName)) {
      validators.push(Validators.required);
    }

    if (propertyName.includes('email')) {
      validators.push(Validators.email);
    }

    return validators;
  }
}
