import { PipeTransform } from '@angular/core';

export interface TableColumn<T = any> {
  name: string;
  dataKey: keyof T;
  position?: 'right' | 'left';
  isSortable?: boolean;
  pipe?: PipeTransform;
}
