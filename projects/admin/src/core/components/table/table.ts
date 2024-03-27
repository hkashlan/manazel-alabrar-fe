import { Directive, EventEmitter, Input, Type } from '@angular/core';

export interface BasicRecord {
  id: number;
  name: string;
}

@Directive()
export class TableColumnComponent<T extends BasicRecord> {
  @Input() record!: T;
  @Input() entityName!: string;
  @Input() onChange = new EventEmitter();
}

export function componentDef<T>(component: new () => T, inputs: { [P in keyof T as Exclude<P, 'record'>]: T[P] }) {
  return { component, inputs };
}

export interface TableColumn<T extends BasicRecord> {
  name: string;
  dataKey?: keyof T;
  isSortable?: boolean;
  position?: 'right' | 'left';
  fn?: ((val: T[keyof T] | undefined, x: T) => string) | ((val: T[keyof T] | undefined) => string);
  componentDef?: {
    component: Type<TableColumnComponent<T>>;
    inputs?: Record<string, unknown>;
  };
}
