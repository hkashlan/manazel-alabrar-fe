import { Directive, Input, Type } from '@angular/core';

export interface BasicRecord {
  id: number | string;
}

@Directive()
export class TableColumnComponent<T> {
  @Input() record: T | undefined;
}

export function componentDef<T>(component: new () => T, inputs: { [P in keyof T as Exclude<P, 'record'>]: T[P] }) {
  return { component, inputs };
}

export interface TableColumn<T> {
  name: string;
  dataKey?: keyof T;
  isSortable?: boolean;
  position?: 'right' | 'left';
  fn?: (val: unknown, x: T) => string;
  componentDef?: {
    component: Type<unknown>;
    inputs?: Record<string, unknown>;
  };
}
