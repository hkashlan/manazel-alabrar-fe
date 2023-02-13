import { NgModule } from '@angular/core';
import { TableComponent } from '../components/table/table.component';
import { SharedModule } from './shared.module';

const modules = [SharedModule, TableComponent];

@NgModule({
  imports: modules,
  exports: modules,
})
export class CoreModule {}
