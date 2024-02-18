import { CommonModule, DatePipe } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { HttpClientModule } from '@angular/common/http';
import { TranslateModule } from '@ngx-translate/core';
import { SharedMaterialModule } from './shared-material.module';

const modules = [CommonModule, RouterModule, SharedMaterialModule, HttpClientModule];

const pipes = [DatePipe];

@NgModule({
  imports: [...modules],
  exports: [...modules, TranslateModule],
  providers: [...pipes],
})
export class SharedModule {}
