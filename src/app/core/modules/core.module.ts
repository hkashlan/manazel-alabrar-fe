import { NgModule } from '@angular/core';
import { ColumnDefinition, TableComponent } from '../components/table/table.component';
import { SharedModule } from './shared.module';

const modules = [SharedModule, TableComponent, ColumnDefinition];

@NgModule({
  imports: modules,
  exports: modules,
})
export class CoreModule {}
