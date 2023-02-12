import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { HttpClientModule } from '@angular/common/http';
import { TranslateModule } from '@ngx-translate/core';
import { SharedMaterialModule } from './shared-material.module';

const modules = [
  CommonModule,
  RouterModule,
  SharedMaterialModule,
  HttpClientModule,
];

@NgModule({
  imports: [...modules],
  exports: [...modules, TranslateModule],
})
export class SharedModule {}
