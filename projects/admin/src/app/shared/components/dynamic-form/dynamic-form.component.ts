import { CommonModule } from '@angular/common';
import { Component, Input, OnInit, inject } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, ValidatorFn, Validators } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { APIService } from '../../../../core/services/api.service';
import { JSONSchema, SchemaInfo } from '../../model/json-schema';
import { getFirstType, schemaInfo } from '../../model/schame';

@Component({
  standalone: true,
  selector: 'app-dynamic-form',
  imports: [MatInputModule, ReactiveFormsModule, MatSlideToggleModule, CommonModule],
  templateUrl: './dynamic-form.component.html',
  styleUrls: ['./dynamic-form.component.scss'],
})
export class DynamicFormComponent implements OnInit {
  apiService = inject(APIService);
  @Input() entityName: string = '';

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
    this.dynamicForm.get('sd')?.hasValidator;
  }

  onSubmit() {
    if (!this.dynamicForm.valid) {
      this.dynamicForm.markAllAsTouched();
      return;
    }
    console.log(this.dynamicForm.value);
  }

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
